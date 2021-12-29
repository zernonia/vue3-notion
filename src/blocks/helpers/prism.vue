<script setup lang="ts">
import Prism from "prismjs"
import { computed, toRefs, useSlots } from "vue"

const slots = useSlots()
const props = defineProps({
  code: {
    type: String,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    default: "markup",
  },
})

const { inline, language } = toRefs(props)
const className = computed(() => `language-${language.value}`)

const defaultSlot = (slots && slots.default && slots.default()) || []
const code =
  props.code || (defaultSlot && defaultSlot.length && defaultSlot[0]?.children)
    ? (defaultSlot[0].children as string)
    : ""
const d = computed(() => Prism?.highlight(code, Prism?.languages[language.value], "en"))
</script>

<template>
  <code :class="className" v-if="inline" v-html="d"></code>
  <pre :class="className" v-else><code v-html="d"></code></pre>
</template>
