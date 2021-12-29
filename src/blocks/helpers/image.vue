<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import { computed, StyleValue } from "vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { caption, properties, block, f } = useNotionBlock(props)
const alt = computed(() => {
  return caption?.value?.[0][0]
})

const src = computed(() => {
  return props.mapImageUrl(properties.value?.source[0][0], block.value)
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
  name: "NotionImage",
}
</script>

<template>
  <div v-if="f.block_aspect_ratio" :style="style">
    <img class="notion-image-inset" :alt="alt || 'Notion image'" :src="src" />
  </div>
  <img v-else :alt="alt" :src="src" />
</template>
