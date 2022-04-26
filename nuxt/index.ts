import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit"

export default defineNuxtModule({
  meta: {
    name: "vue3-notion",
    configKey: "notion",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    addPlugin(resolve("./plugin"))

    const notionDeps = ["vue3-notion, fragment-for-vue", "katex", "prismjs"]

    notionDeps.forEach((dep) => {
      nuxt.options.build.transpile.push(dep)
    })

    nuxt.options.css.push("vue3-notion/dist/style.css")
  },
})
