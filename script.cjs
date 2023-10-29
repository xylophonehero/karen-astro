const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Define your Contentful space ID, access token, and content type ID
const spaceId = "9hqhye2e9vh3";
const accessToken = "xfqbx79wB8E-Rpfti_10sa4MgEuhUZS4KwsiV02pijM";
const contentTypeId = "portfolio";

// Define the Contentful API endpoint
const apiUrl = `https://cdn.contentful.com/spaces/${spaceId}/entries`;

// Create a directory to save the downloaded content
const directory = path.join(__dirname, contentTypeId);

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

// Initialize page and limit for pagination
let page = 1;
const limit = 100; // You can adjust this based on your needs

async function downloadEntries() {
  try {
    while (true) {
      const response = await axios.get(apiUrl, {
        params: {
          access_token: accessToken,
          content_type: contentTypeId,
          limit: limit,
          skip: (page - 1) * limit,
        },
      });

      const entries = response.data.items;
      const includes = response.data.includes;

      if (entries.length === 0) {
        break;
      }

      // Download each entry and update asset links
      for (const entry of entries) {
        const entryId = entry.sys.id;
        const filePath = path.join(directory, `${entryId}.json`);

        // Replace asset links with URLs
        const updatedEntry = replaceAssetLinks(entry, includes);

        fs.writeFileSync(filePath, JSON.stringify(updatedEntry, null, 2));
      }

      page++;
    }

    console.log(`Downloaded entries of content type ${contentTypeId}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

const assetFields = ["thumb", "mainMedia", "pdf"];
function replaceAssetLinks(entry, includes) {
  const updatedEntry = JSON.parse(JSON.stringify(entry)); // Clone the entry object

  for (const assetField of assetFields) {
    // Iterate over assets and update links
    const asset = updatedEntry.fields[assetField];
    const assetId = asset?.sys.id;
    if (!assetId) break;
    const assetData = includes.Asset.find((asset) => asset.sys.id === assetId);

    if (assetData) {
      const assetUrl = assetData.fields.file.url;
      updatedEntry.fields[assetField].url = assetUrl;
    }
  }

  return updatedEntry;
}

downloadEntries();
