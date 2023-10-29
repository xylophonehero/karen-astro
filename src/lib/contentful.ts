import contentful from "contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken:
    import.meta.env.PUBLIC_ENV === "development"
      ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
      : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host:
    import.meta.env.PUBLIC_ENV === "development"
      ? "preview.contentful.com"
      : "cdn.contentful.com",
});
