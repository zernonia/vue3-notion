<script setup lang="ts">
import Prism from "prismjs"
import PrismBlock from "./helpers/prism.vue"
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import { computed } from "vue"

const props = defineProps({ overrideLang: String, overrideLangClass: String, ...defineNotionProps })
//@ts-ignore
const { properties } = useNotionBlock(props)
const lang = computed(() => {
  return props.overrideLang || properties.value?.language?.[0]?.[0]?.toLowerCase()
})

const langClass = computed(() => {
  return props.overrideLangClass || `language-${lang.value}`
})

const supported = computed(() => {
  return lang.value ? Prism?.languages[lang.value] : false
})

const computedSlot = computed(() => properties.value?.title.map((i) => i?.[0]).join(""))
</script>

<script lang="ts">
export default {
  name: "NotionCode",
}
</script>

<template>
  <div v-if="supported" :class="['notion-code']">
    <PrismBlock :language="lang">{{ computedSlot }}</PrismBlock>
  </div>
  <div v-else :class="['notion-code']">
    <pre><div :class="langClass">{{ computedSlot }}</div></pre>
  </div>
</template>
