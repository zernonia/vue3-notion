<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../lib/blockable";
import NotionCode from "./code.vue";
import NotionKatek from "../blocks/helpers/katex.vue";
import { computed } from "vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { properties, pass } = useNotionBlock(props);

const equation = computed(() => properties.value.title?.[0]?.[0]);
</script>

<script lang="ts">
export default {
  name: "NotionEquation",
};
</script>

<template>
  <div v-if="props.katex">
    <NotionKatek :expression="equation" />
  </div>
  <NotionCode v-else v-bind="pass" overrideLang="latex" overrideLangClass="language-latex" />
</template>
