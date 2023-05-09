<script setup lang="ts">
import { PropType, computed } from "vue";

const props = defineProps({ text: Object as PropType<string[]>, level: { type: Number, default: 0 } });
const computedText = computed(() => (props.text ? props.text.map((i) => i[0]).join("") : ""));
const computedStyle = computed(() => ({
  paddingLeft: 1.5 * props.level + "rem",
}));
</script>

<script lang="ts">
export default {
  name: "NotionTableOfContentItem",
};
</script>

<template>
  <span class="notion-table-of-contents-item" :style="computedStyle">{{ computedText }}</span>
</template>
