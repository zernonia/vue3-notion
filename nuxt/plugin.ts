import VueNotion from "vue3-notion"
import { getPageBlocks, getPageTable } from "vue3-notion"
import "vue3-notion/dist/style.css"

export default (nuxtApp) => {
  const notion = { getPageBlocks, getPageTable }
  nuxtApp.vueApp.use(VueNotion)
  nuxtApp.provide("notion", notion)
}
