<script setup lang="ts">
import { getPageBlocks } from "vue3-notion"
import { onMounted, ref } from "vue"
import { useNuxtApp } from "#app"
import "../src/style.css"

const nuxtApp = useNuxtApp()
const { data } = await useAsyncData("count", () => getPageBlocks("2e22de6b770e4166be301490f6ffd420"))

onMounted(async () => {
  // react-notion tester: 2e22de6b770e4166be301490f6ffd420
  // equation tester: 2a1d5226d68246deba627012081693f9
  // table tester: bd1de400a8b349dc824f4f00e61d0797
  // todo tester: 235057194b954a60ace89c052a65d102
})
</script>

<template>
  <div v-if="data">
    <NotionRenderer :blockMap="data" fullPage prism katex todo />
  </div>
</template>
