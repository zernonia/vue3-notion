<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../../lib/blockable";
import NotionDecorator from "../../blocks/decorator.vue";
import { PropType } from "vue";

const props = defineProps({ text: Object as PropType<string[]>, ...defineNotionProps });
//@ts-ignore
const { pass, format } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionTextRenderer",
};
</script>

<template>
  <span>
    <NotionDecorator v-for="(t, i) in text" :key="i" :content="t" v-bind="pass" />
  </span>
</template>
