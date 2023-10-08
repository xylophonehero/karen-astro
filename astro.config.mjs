import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import netlify from "@astrojs/netlify/functions";
import robotsTxt from "astro-robots-txt";
const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: process.env.PUBLIC_ENV !== "production",
      components: {
        page: "storyblok/Page",
        section: "storyblok/Section",
        rich_text: "storyblok/RichText",
        testimonial_grid: "storyblok/TestimonialGrid",
        cta_block: "storyblok/CtaBlock",
        grid: "storyblok/Grid",
        service: "storyblok/Service",
        contact_form: "storyblok/ContactForm",
      },
    }),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          disallow: process.env.PUBLIC_ENV !== "production" ? "/" : "",
        },
      ],
    }),
  ],
  output: process.env.PUBLIC_ENV === "preview" ? "server" : "static",
  adapter: process.env.PUBLIC_ENV === "preview" ? netlify() : undefined,
});
