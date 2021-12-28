import { defineNuxtModule, addPluginTemplate } from "@nuxt/kit"
import { fileURLToPath } from "url"
import { dirname, resolve } from "pathe"

export default defineNuxtModule({
  name: "vue3-notion",
  configKey: "notion",
  setup(options, nuxt) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    addPluginTemplate({
      src: resolve(__dirname, "./library.ts"),
      filename: "vue3-notion.ts",
      options,
    })

    const notionDeps = ["vue3-notion, fragment-for-vue", "katex", "prismjs"]

    notionDeps.forEach((dep) => {
      nuxt.options.build.transpile.push(dep)
    })
  },
})
