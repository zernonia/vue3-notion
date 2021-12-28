import { defineNuxtModule, addPluginTemplate } from "@nuxt/kit-edge"
import { fileURLToPath } from "url"
import { dirname, resolve } from "pathe"

export default defineNuxtModule({
  name: "vue3-notion",
  configKey: "notion",
  setup(options, nuxt) {
    const filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(filename)
    console.log(__dirname)
    addPluginTemplate({
      src: resolve(__dirname, "plugin.ts"),
      filename: "vue3-notion.ts",
      options,
    })

    const notionDeps = ["vue3-notion, fragment-for-vue", "katex", "prismjs"]

    notionDeps.forEach((dep) => {
      nuxt.options.build.transpile.push(dep)
    })
  },
})

module.exports.meta = require("../package.json")
