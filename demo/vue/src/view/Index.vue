<script setup lang="ts">
import { NotionRenderer, useGetPageBlocks } from "vue3-notion";

const { data: blockMap } = useGetPageBlocks("4b2dc28a5df74034a943f8c8e639066a");
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
