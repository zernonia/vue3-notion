<script setup lang="ts">
import { useNuxtApp } from "#app"
import { mapPageUrl, pageLinkOptions } from "@/props"

const route = useRoute()
const { $notion } = useNuxtApp()
const { data } = await useAsyncData(`notion-${route.params.id}`, () => $notion.getPageBlocks(route.params.id))
</script>

<template>
  <div>
    <NotionRenderer :blockMap="data" fullPage prism katex :mapPageUrl="mapPageUrl" :pageLinkOptions="pageLinkOptions" />
  </div>
</template>
