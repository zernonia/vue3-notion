<script setup lang="ts">
import { NotionRenderer, getPageBlocks } from "vue3-notion"
import { onMounted, ref } from "vue"
import { useNuxtApp } from "#app"
const blockMap = ref()

onMounted(async () => {
  // react-notion tester: 2e22de6b770e4166be301490f6ffd420
  // equation tester: 2a1d5226d68246deba627012081693f9
  // table tester: bd1de400a8b349dc824f4f00e61d0797
  // todo tester: 235057194b954a60ace89c052a65d102
  console.log(useNuxtApp())
  blockMap.value = await getPageBlocks("2e22de6b770e4166be301490f6ffd420")
})
</script>

<template>
  <div v-if="blockMap">
    <NotionRenderer :blockMap="blockMap" fullPage prism katex todo />
  </div>
</template>
