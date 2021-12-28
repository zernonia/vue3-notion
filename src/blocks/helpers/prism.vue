<script setup lang="ts">
import Prism from "prismjs"
import { computed, toRefs } from "vue"

const props = defineProps({
  code: {
    type: String,
    required: true,
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

const { code, inline, language } = toRefs(props)
const prismLanguage = Prism.languages[language.value]
const className = computed(() => `language-${language.value}`)

const d = computed(() => Prism.highlight(code?.value, prismLanguage, "en"))
</script>

<template>
  <code v-if="inline" v-html="d"></code>
  <pre :class="className" v-else>
  <code  v-html="d"></code>
</pre>
</template>
