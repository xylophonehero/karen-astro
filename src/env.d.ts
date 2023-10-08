/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly STORYBLOK_TOKEN: string;
  readonly PUBLIC_ENV: "production" | "development" | "preview";
}
