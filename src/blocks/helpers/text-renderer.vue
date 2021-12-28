<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionDecorator from "@/blocks/decorator.vue"

const props = defineProps({ text: Array, ...defineNotionProps })
const { pass } = useNotionBlock(props)
</script>

<script lang="ts">
export default {
  name: "NotionTextRenderer",
}
</script>

<template>
  <span>
    <NotionDecorator v-for="(t, i) in text" :key="i" :content="t" v-bind="pass" />
  </span>
</template>
