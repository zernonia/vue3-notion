<script setup lang="ts">
import { defineNotionProps, useNotionBlock } from "../../lib/blockable";
import { computed, StyleValue } from "vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { properties, f, format } = useNotionBlock(props);

const src = computed(() => {
  return f.value.display_source ?? properties.value?.source?.[0];
});

const aspectRatioStyle = computed(() => {
  let aspectRatio =
    f.value.block_width == 1 || f.value.block_height == 1
      ? 1 / f.value.block_aspect_ratio
      : `${f.value.block_width} / ${f.value.block_height} `;

  return {
    width: format.value.block_full_width
      ? "calc(100vw - 46px)"
      : format.value.block_page_width
      ? "100%"
      : `${f.value.block_width}px`,
    height: f.value.block_height == 1 ? `auto` : `${f.value.block_height}px`,
    maxWidth: "100%",
    position: "relative",
    aspectRatio: f.value.block_height == 1 ? aspectRatio : undefined,
  } as StyleValue;
});
</script>

<script lang="ts">
export default {
  name: "NotionAsset",
};
</script>

<template>
  <div :style="aspectRatioStyle" v-if="src">
    <iframe class="notion-asset-object-fit" :src="src" :allow="props.embedAllow" />
  </div>
</template>
