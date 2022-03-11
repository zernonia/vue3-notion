<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionTextRenderer from "@/blocks/helpers/text-renderer.vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { properties, title, pass, blockColorClass } = useNotionBlock(props)
</script>

<script lang="ts">
export default {
  name: "NotionText",
}
</script>
<template>
  <p v-if="properties" :class="['notion-text', blockColorClass()]">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </p>
  <div v-else class="notion-blank">&nbsp;</div>
</template>
