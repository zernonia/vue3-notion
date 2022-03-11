import { defineNuxtModule, addPluginTemplate } from "@nuxt/kit"
import { fileURLToPath } from "url"
import { dirname, resolve } from "pathe"

export default defineNuxtModule({
  meta: {
    name: "vue3-notion",
    configKey: "vue3-notion",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  setup(options, nuxt) {
    const filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(filename)
    addPluginTemplate({
      src: resolve(__dirname, "plugin.ts"),
      filename: "vue3-notion.ts",
      options,
    })

    const notionDeps = ["vue3-notion, fragment-for-vue", "katex", "prismjs"]

    notionDeps.forEach((dep) => {
      nuxt.options.build.transpile.push(dep)
    })

    nuxt.options.css.push("vue3-notion/dist/style.css")
  },
})
