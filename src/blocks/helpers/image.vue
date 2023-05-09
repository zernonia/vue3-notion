<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../../lib/blockable";
import { computed, StyleValue } from "vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { caption, properties, block, f } = useNotionBlock(props);
const alt = computed(() => {
  return caption?.value?.[0][0];
});

const src = computed(() => {
  return props.mapImageUrl(properties.value?.source[0][0], block.value);
});

const aspectRatioStyle = computed(() => {
  let aspectRatio =
    f.value.block_width == 1 || f.value.block_height == 1
      ? 1 / f.value.block_aspect_ratio
      : `${f.value.block_width} / ${f.value.block_height} `;

  return {
    width: `${f.value.block_width}px`,
    height: `100%`,
    maxWidth: "100%",
    position: "relative",
    aspectRatio,
  } as StyleValue;
});

const basicStyle = computed(() => {
  return {
    width: f.value.block_width == 1 ? "100%" : `${f.value.block_width}px`,
    height: f.value.block_height == 1 ? "100%" : `${f.value.block_height}px`,
  };
});
</script>

<script lang="ts">
export default {
  name: "NotionImage",
};
</script>

<template>
  <div v-if="f.block_aspect_ratio" :style="aspectRatioStyle">
    <img class="notion-image-inset" :alt="alt || 'Notion image'" :src="src" />
  </div>
  <img v-else :alt="alt" :src="src" :style="basicStyle" />
</template>
