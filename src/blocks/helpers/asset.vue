<script setup lang="ts">
import { defineNotionProps, useNotionBlock } from "@/lib/blockable"
import { computed, StyleValue } from "vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { properties, f } = useNotionBlock(props)

const src = computed(() => {
  return f.value.display_source ?? properties.value?.source?.[0]
})

const aspectRatioStyle = computed(() => {
  let aspectRatio =
    f.value.block_width == 1 || f.value.block_height == 1
      ? 1 / f.value.block_aspect_ratio
      : `${f.value.block_width} / ${f.value.block_height} `

  return {
    width: f.value.block_width == 1 ? "100%" : `${f.value.block_width}px`,
    height: f.value.block_height == 1 ? `100%` : `${f.value.block_height}px`,
    maxWidth: "100%",
    position: "relative",
    aspectRatio,
  } as StyleValue
})
</script>

<script lang="ts">
export default {
  name: "NotionAsset",
}
</script>

<template>
  <div :style="aspectRatioStyle" v-if="src">
    <iframe style="width: 100%; height: 100%" :src="src" :allow="props.embedAllow" />
  </div>
</template>
