<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../../lib/blockable";
import { getListNumber } from "../../lib/utils";
import { computed } from "vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { block, type } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionNestedList",
};
</script>

<template>
  <ul v-if="type === 'bulleted_list'" class="notion-list notion-list-disc">
    <slot />
  </ul>
  <ol v-else class="notion-list notion-list-numbered">
    <slot />
  </ol>
</template>
