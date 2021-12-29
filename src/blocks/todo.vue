<script setup lang="ts">
// TODO: add notion styling
// TODO: add strikethrough
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionTextRenderer from "@/blocks/helpers/text-renderer.vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { title, properties, pass } = useNotionBlock(props)
</script>

<script lang="ts">
export default {
  name: "NotionTodo",
}
</script>

<template>
  <div>
    <input type="checkbox" :value="title" :checked="properties.checked" disabled="true" />
    <label>
      <NotionTextRenderer :text="title" v-bind="pass" />
    </label>
  </div>
</template>
