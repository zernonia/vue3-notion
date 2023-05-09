<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../lib/blockable";
import NotionTextRenderer from "../blocks/helpers/text-renderer.vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { properties, title, pass } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionQuote",
};
</script>

<template>
  <blockquote v-if="properties" class="notion-quote">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </blockquote>
</template>
