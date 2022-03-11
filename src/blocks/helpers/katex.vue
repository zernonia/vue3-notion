<script setup lang="ts">
import katex from "katex"
import { computed } from "vue"

const props = defineProps({
  expression: {
    type: String,
    required: true,
  },
})

const html = computed(() => katex.renderToString(props.expression))
</script>

<script lang="ts">
export default {
  name: "Katex",
}
</script>

<template>
  <span v-html="html"></span>
</template>
