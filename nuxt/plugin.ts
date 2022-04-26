import VueNotion from "vue3-notion"
import { getPageBlocks, getPageTable } from "vue3-notion"
import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(({ vueApp }) => {
  const notion = { getPageBlocks, getPageTable }
  vueApp.use(VueNotion)
  return {
    provide: {
      notion,
    },
  }
})
