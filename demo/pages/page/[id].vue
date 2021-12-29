<script setup lang="ts">
import { useNuxtApp } from "#app"
const route = useRoute()
const { $notion } = useNuxtApp()
const { data } = await useAsyncData("notion", () => $notion.getPageBlocks(route.params.id))

const mapPageUrl = (pageId: String) => {
  return `/page/${pageId}`
}
</script>

<template>
  <div>
    <NotionRenderer :blockMap="data" fullPage prism katex :mapPageUrl="mapPageUrl" />
  </div>
</template>
