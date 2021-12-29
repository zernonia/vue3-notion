<script setup lang="ts">
import { useNuxtApp } from "#app"
import { mapPageUrl, pageLinkOptions } from "@/props"

const { $notion } = useNuxtApp()
const { data } = await useAsyncData("notion-index", () => $notion.getPageBlocks("4b2dc28a5df74034a943f8c8e639066a"))
</script>

<template>
  <div>
    <NotionRenderer :blockMap="data" fullPage prism katex :mapPageUrl="mapPageUrl" :pageLinkOptions="pageLinkOptions" />
  </div>
</template>

<style>
.notion {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0rem;
}
.notion-page-cover {
  max-width: 1200px;
  box-sizing: border-box;
  border-radius: 25px;
}
</style>
