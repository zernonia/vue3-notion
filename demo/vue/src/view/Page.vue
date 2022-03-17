<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { NotionRenderer, getPageBlocks } from "vue3-notion"

const route = useRoute()
const blockMap = ref()
onMounted(async () => {
  blockMap.value = await getPageBlocks(route.params.id as string)
})
</script>

<template>
  <div v-if="blockMap">
    <NotionRenderer :blockMap="blockMap" fullPage prism katex />
  </div>
</template>

<style>
body {
  margin: 0;
  box-sizing: border-box;
}
</style>
