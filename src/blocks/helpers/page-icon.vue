<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import { getTextContent } from "@/lib/utils"

const props = defineProps({ big: Boolean, ...defineNotionProps })
const { icon, format, block, title } = useNotionBlock(props)
</script>

<script lang="ts">
export default {
  name: "NotionPageIcon",
}
</script>

<template>
  <img
    v-if="icon?.includes('http')"
    :class="[format.page_cover && 'notion-page-icon-offset', big ? 'notion-page-icon-cover' : 'notion-page-icon']"
    :src="props.mapImageUrl(icon, block)"
    :alt="title ? getTextContent(title) : 'Icon'"
  />
  <span
    v-else-if="icon"
    role="img"
    :aria-label="icon"
    :class="[
      'notion-emoji',
      format.page_cover && 'notion-page-icon-offset',
      big ? 'notion-page-icon-cover' : 'notion-page-icon',
    ]"
  >
    {{ icon }}
  </span>
</template>
