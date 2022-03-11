<script setup lang="ts">
import { defineNotionProps, useNotionBlock } from "@/lib/blockable"
import { computed, StyleValue } from "vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { type, properties, f } = useNotionBlock(props)

const src = computed(() => {
  return type.value === "figma" ? properties.value?.source[0][0] : f.value.display_source
})

const style = computed(() => {
  const aspectRatio = f.value.block_aspect_ratio || f.value.block_height / f.value.block_width
  return {
    paddingBottom: `${aspectRatio * 100}%`,
    position: "relative",
  } as StyleValue
})
</script>

<script lang="ts">
export default {
  name: "NotionAsset",
}
</script>

<template>
  <div :style="style" v-if="src">
    <iframe class="notion-image-inset" style="width: 100%" :src="src" :allow="props.embedAllow" />
  </div>
</template>
