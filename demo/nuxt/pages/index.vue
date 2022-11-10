<script setup lang="ts">
const { $notion } = useNuxtApp();
const { data } = await useAsyncData("notion-index", () => $notion.getPageBlocks("4b2dc28a5df74034a943f8c8e639066a"));
const { mapPageUrl, pageLinkOptions } = useProps();
</script>

<template>
  <div>
    <NotionRenderer :blockMap="data" fullPage prism katex :mapPageUrl="mapPageUrl" :pageLinkOptions="pageLinkOptions" />
  </div>
</template>
