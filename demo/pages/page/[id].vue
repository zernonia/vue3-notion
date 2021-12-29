<script setup lang="ts">
import { useNuxtApp } from "#app"
const route = useRoute()
const { $notion } = useNuxtApp()
const { data } = await useAsyncData("notion", () => $notion.getPageBlocks(route.params.id))
</script>

<template>
  <div>
    <NotionRenderer :blockMap="data" fullPage prism katex todo />
  </div>
</template>
