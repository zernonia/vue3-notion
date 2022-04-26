<script setup lang="ts">
const route = useRoute()
const { $notion } = useNuxtApp()
const { data, pending } = useLazyAsyncData(`notion-${route.params.id}`, () =>
  $notion.getPageBlocks(route.params.id.toString())
)
const { mapPageUrl, pageLinkOptions } = useProps()
</script>

<template>
  <div v-if="pending" class="notion">Loading...</div>
  <div v-else>
    <NotionRenderer :blockMap="data" fullPage prism katex :mapPageUrl="mapPageUrl" :pageLinkOptions="pageLinkOptions" />
  </div>
</template>
