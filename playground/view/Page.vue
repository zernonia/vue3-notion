<script setup lang="ts">
import { NotionRenderer } from "@/components";
import { getPageBlocks } from "@/lib/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { mapPageUrl, pageLinkOptions } from "@/lib/props";

const route = useRoute();
const blockMap = ref();
onMounted(async () => {
  blockMap.value = await getPageBlocks(route.params.id as string);
});
</script>

<template>
  <div v-if="blockMap">
    <NotionRenderer
      :blockMap="blockMap"
      fullPage
      prism
      katex
      :mapPageUrl="mapPageUrl"
      :pageLinkOptions="pageLinkOptions"
    />
  </div>
</template>
