<script setup lang="ts">
import { defineNotionProps, useNotionBlock } from "../lib/blockable";
import NotionBlock from "../components/block.vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { pass, block } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionRenderer",
};
</script>

<template>
  <NotionBlock v-bind="pass" v-if="block">
    <NotionRenderer
      v-for="(contentId, contentIndex) in block.value.content"
      v-bind="pass"
      :key="contentId"
      :level="pass.level + 1"
      :content-id="contentId"
      :content-index="contentIndex"
    />
  </NotionBlock>
</template>
