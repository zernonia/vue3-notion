<script setup lang="ts">
import { useNuxtApp } from "#app"
import { mapPageUrl, pageLinkOptions } from "@/props"

const { $notion } = useNuxtApp()
const { data } = await useAsyncData("notion-index", () => $notion.getPageBlocks("2e22de6b770e4166be301490f6ffd420"))

// react-notion tester: 2e22de6b770e4166be301490f6ffd420
// equation tester: 2a1d5226d68246deba627012081693f9
// table tester: bd1de400a8b349dc824f4f00e61d0797
// todo tester: 235057194b954a60ace89c052a65d102
</script>

<template>
  <div>
    <NotionRenderer :blockMap="data" fullPage prism katex :mapPageUrl="mapPageUrl" :pageLinkOptions="pageLinkOptions" />
  </div>
</template>
