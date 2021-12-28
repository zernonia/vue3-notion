<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionTextRenderer from "@/blocks/helpers/text-renderer.vue"

const props = defineProps({ ...defineNotionProps })
const { type, title, pass } = useNotionBlock(props)
</script>

<script lang="ts">
export default {
  name: "NotionHeader",
}
</script>

<template>
  <h1 class="notion-h1" v-if="type === 'header'">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </h1>
  <h2 class="notion-h2" v-else-if="type === 'sub_header'">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </h2>
  <h3 class="notion-h3" v-else-if="type === 'sub_sub_header'">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </h3>
</template>
