<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionNestedList from "@/blocks/helpers/nested-list.vue"
import NotionTextRenderer from "@/blocks/helpers/text-renderer.vue"
import { getListNumber } from "@/lib/utils"
import { computed } from "vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { block, type, title, pass } = useNotionBlock(props)

const start = computed(() => {
  return props.blockMap
    ? block.value?.value?.format?.list_start_index || getListNumber(block.value.value.id, props.blockMap)
    : 0
})
const isTopLevel = computed(() => type.value != props.blockMap?.[block.value.value.parent_id].value.type)
</script>

<script lang="ts">
export default {
  name: "NotionList",
}
</script>

<template>
  <ul v-if="isTopLevel && type === 'bulleted_list'" class="notion-list notion-list-disc">
    <li><NotionTextRenderer :text="title" v-bind="pass" /></li>
    <NotionNestedList v-if="block.value.content" v-bind="pass">
      <slot />
    </NotionNestedList>
  </ul>
  <ol v-else-if="isTopLevel && type === 'numbered_list'" class="notion-list notion-list-numbered" :start="start">
    <li><NotionTextRenderer :text="title" v-bind="pass" /></li>
    <NotionNestedList :class="[level == 1 ? 'notion-list-flat' : '']" v-if="block.value.content" v-bind="pass">
      <slot />
    </NotionNestedList>
  </ol>
  <span v-else>
    <li :class="[level != 1 ? 'notion-list-indent' : '']"><NotionTextRenderer :text="title" v-bind="pass" /></li>
    <NotionNestedList v-if="block.value.content" v-bind="pass">
      <slot />
    </NotionNestedList>
  </span>
</template>
