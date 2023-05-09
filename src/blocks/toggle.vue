<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../lib/blockable";
import NotionTextRenderer from "../blocks/helpers/text-renderer.vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { title, pass } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionToggle",
};
</script>

<template>
  <details class="notion-toggle">
    <summary><NotionTextRenderer :text="title" v-bind="pass" /></summary>
    <div><slot /></div>
  </details>
</template>
