<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionCode from "./code.vue"
import { computed } from "vue"

const props = defineProps({ ...defineNotionProps })
const { properties, pass } = useNotionBlock(props)

const equation = computed(() => properties.value.title?.[0]?.[0])
</script>

<script lang="ts">
export default {
  name: "NotionEquation",
}
</script>

<template>
  <div v-if="props.katex">
    <component :is="'katex-element'" :expression="equation" />
  </div>
  <NotionCode v-else v-bind="pass" overrideLang="latex" overrideLangClass="language-latex" />
</template>
