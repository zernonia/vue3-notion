<script setup lang="ts">
import { computed } from "vue";

const baseWidth = 46; // todo: add magic numbers to a config json

const props = defineProps({
  format: { type: Object, required: true },
});

const columnStyle = computed(() => {
  const columns = Number((1 / props.format.column_ratio).toFixed(0));
  const totalWidth = (columns - 1) * baseWidth;
  return {
    width: `calc((100% - ${totalWidth}px) * ${props.format.column_ratio})`,
  };
});

const spacerStyle = computed(() => ({ width: `${baseWidth}px` }));
</script>

<script lang="ts">
export default {
  name: "NotionColumn",
};
</script>

<template>
  <div class="notion-column" :style="columnStyle">
    <slot />
  </div>
  <div class="notion-spacer" :style="spacerStyle" />
</template>
