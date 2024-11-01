export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt3 Notion",
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
      link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
    },
  },
  modules: ["@nuxt/devtools", ["vue3-notion/nuxt", { css: true }]],
  routeRules:{
    '**': { isr: 120 } // every 2 * 60 seconds
  }
});
