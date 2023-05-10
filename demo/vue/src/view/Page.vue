<script setup lang="ts">
import { useRoute } from "vue-router";
import { NotionRenderer, useGetPageBlocks } from "vue3-notion";

const route = useRoute();

const { data: blockMap } = useGetPageBlocks(route.params.id?.toString());
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
