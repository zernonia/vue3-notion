<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../lib/blockable";
import NotionPageIcon from "../blocks/helpers/page-icon.vue";
import NotionTextRenderer from "../blocks/helpers/text-renderer.vue";
import NotionRenderer from "../components/notion-renderer.vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { pass, title, blockColorClass, block } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionCallout",
};
</script>

<template>
  <div :class="['notion-callout', blockColorClass()]">
    <div style="font-size: 12px">
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-callout-text">
      <NotionRenderer
        v-if="block.value.content"
        v-for="(contentId, contentIndex) in block.value.content"
        v-bind="pass"
        :key="contentId"
        :level="pass.level + 1"
        :content-id="contentId"
        :content-index="contentIndex"
      />
      <NotionTextRenderer v-else :text="title" v-bind="pass" />
    </div>
  </div>
</template>
