import VueNotion from "vue3-notion"
import { getPageBlocks, getPageTable } from "vue3-notion"

export default (nuxtApp: any) => {
  const notion = { getPageBlocks, getPageTable }
  nuxtApp.vueApp.use(VueNotion)
  nuxtApp.vueApp.provide("notion", notion)
  nuxtApp.provide("notion", notion)
}
