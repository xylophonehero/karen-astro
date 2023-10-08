import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
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
  ],
});
