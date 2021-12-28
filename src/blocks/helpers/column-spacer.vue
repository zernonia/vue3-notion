<script setup lang="ts">
import { computed } from "vue"

const baseWidth = 46 // todo: add magic numbers to a config json

const spacerStyle = computed(() => {
  return { width: `${baseWidth}px` }
})
</script>

<template>
  <div class="notion-spacer" :style="spacerStyle" />
</template>
