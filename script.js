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

      if (entries.length === 0) {
        break;
      }

      // Download each entry
      for (const entry of entries) {
        const entryId = entry.sys.id;
        const filePath = path.join(directory, `${entryId}.json`);
        fs.writeFileSync(filePath, JSON.stringify(entry, null, 2));
      }

      page++;
    }

    console.log(`Downloaded entries of content type ${contentTypeId}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

downloadEntries();
