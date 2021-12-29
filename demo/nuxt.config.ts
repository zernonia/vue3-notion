import { defineNuxtConfig } from "nuxt3"

export default defineNuxtConfig({
  meta: {
    title: "Nuxt3 Notion",
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
    link: [{ rel: "icon", type: "image/svg", href: "/logo.svg" }],
  },
  // vite: {
  //   optimizeDeps: {
  //     include: ["prismjs"],
  //   },
  // },
  // build: {
  //   transpile: ["prismjs"],
  // },
  buildModules: ["vue3-notion/nuxt"],

  css: ["vue3-notion/dist/style.css"],
})
