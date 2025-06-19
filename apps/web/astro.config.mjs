// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// import mdx from "@astrojs/mdx";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), markdoc(), keystatic(), icon()],
  adapter: cloudflare(),
});