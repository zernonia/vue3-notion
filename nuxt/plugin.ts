import VueNotion from "vue3-notion"
import { getPageBlocks, getPageTable } from "vue3-notion"

export default (nuxtApp) => {
  const notion = { getPageBlocks, getPageTable }
  nuxtApp.vueApp.use(VueNotion)
  nuxtApp.provide("notion", notion)
}
