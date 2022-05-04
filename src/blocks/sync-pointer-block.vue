<script setup lang="ts">
import { computed } from "vue"
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionRenderer from "@/components/notion-renderer.vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { block, pass } = useNotionBlock(props)

const referencePointerId = computed(() => block.value.value.format?.transclusion_reference_pointer?.id ?? "")
</script>

<template>
  <NotionRenderer
    v-bind="pass"
    :key="referencePointerId"
    :level="pass.level + 1"
    :content-id="referencePointerId"
    :content-index="contentIndex"
  ></NotionRenderer>
</template>

<script lang="ts">
export default {
  name: "NotionSyncPointerBlock",
}
</script>
