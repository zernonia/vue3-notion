<script setup lang="ts">
import Prism from "prismjs"
import PrismBlock from "./helpers/prism.vue"
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import { computed } from "vue"

const props = defineProps({ overrideLang: String, overrideLangClass: String, ...defineNotionProps })
const { properties } = useNotionBlock(props)

const lang = computed(() => {
  return props.overrideLang || properties.value?.language?.[0]?.[0]?.toLowerCase()
})

const langClass = computed(() => {
  return props.overrideLangClass || `language-${lang.value}`
})

const supported = computed(() => {
  return Prism.languages[lang.value]
})
</script>

<script lang="ts">
export default {
  name: "NotionCode",
}
</script>

<template>
  <pre
    v-if="supported"
    :class="['notion-code', langClass]"
  ><PrismBlock :language="lang" :code="properties.title[0][0]" ></PrismBlock></pre>
  <pre v-else :class="['notion-code', langClass]"><code :class="langClass">{{ properties.title[0][0] }}</code></pre>
</template>
