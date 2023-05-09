<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../../lib/blockable";
import { getTextContent } from "../../lib/utils";
import DefaultPageIcon from "./default-page-icon.vue";

const props = defineProps({ big: Boolean, ...defineNotionProps });
//@ts-ignore
const { icon, format, block, title } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionPageIcon",
};
</script>

<template>
  <div :class="[format?.page_cover && 'notion-page-icon-offset', big ? 'notion-page-icon-cover' : 'notion-page-icon']">
    <img
      v-if="icon?.includes('http')"
      :src="props.mapImageUrl(icon, block)"
      :alt="title ? getTextContent(title) : 'Icon'"
      class="notion-page-icon"
    />
    <span v-else-if="icon" role="img" :aria-label="icon" class="notion-page-icon">
      {{ icon }}
    </span>
    <DefaultPageIcon class="notion-page-icon" v-else-if="!big"></DefaultPageIcon>
  </div>
</template>
