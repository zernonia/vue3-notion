<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable";
import NotionHeaderRenderer from "@/blocks/helpers/header-renderer.vue";
import NotionRenderer from "@/components/notion-renderer.vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { type, title, pass, block, format } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionHeader",
};
</script>

<template>
  <details v-if="format?.toggleable" class="notion-toggle">
    <summary><NotionHeaderRenderer class="notion-h" v-bind="pass"></NotionHeaderRenderer></summary>
    <div>
      <NotionRenderer
        v-for="(contentId, contentIndex) in block.value.content"
        v-bind="pass"
        :key="contentId"
        :level="pass.level + 1"
        :content-id="contentId"
        :content-index="contentIndex"
      ></NotionRenderer>
    </div>
  </details>
  <NotionHeaderRenderer v-else v-bind="pass"></NotionHeaderRenderer>
</template>
