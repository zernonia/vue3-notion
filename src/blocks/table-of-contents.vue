<script setup lang="ts">
import { Block } from "@/entry"
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionTableOfContentsItem from "@/blocks/helpers/table-of-contents-item.vue"
import { computed } from "vue"

interface BlockLevel extends Block {
  level: number
}

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { pass, parent, hasPageLinkOptions, pageLinkProps } = useNotionBlock(props)
const headers = ["header", "sub_header", "sub_sub_header"]
const headerObjects = computed(() => {
  if (!props.blockMap) return
  let temp: BlockLevel[] = []
  Object.entries(props.blockMap).forEach(([key, value]) => {
    if (headers.includes(value.value.type) && value.value.parent_id == parent.value.value.id) {
      let level = 0
      if (temp.length) {
        let prevBlock = temp[temp.length - 1]
        if (value.value.type == "header") {
        } else if (value.value.type == "sub_header") {
          level = 1
        } else if (value.value.type == prevBlock.value.type) {
          level = prevBlock.level
        } else if (value.value.type != prevBlock.value.type) {
          level = prevBlock.level + 1
        }
      }
      temp.push({ ...value, level })
    }
  })

  return temp
})
</script>

<script lang="ts">
export default {
  name: "NotionTableOfContent",
}
</script>

<template>
  <div class="notion-table-of-contents">
    <template v-for="header in headerObjects">
      <component
        v-if="hasPageLinkOptions"
        class="notion-page-link"
        v-bind="pageLinkProps(header.value.id)"
        :is="props.pageLinkOptions?.component"
      >
        <NotionTableOfContentsItem :text="header.value.properties.title" :level="header.level" />
      </component>
      <a v-else class="notion-page-link" :target="props.pageLinkTarget" :href="`#${header.value.id}`">
        <NotionTableOfContentsItem :text="header.value.properties.title" :level="header.level" />
      </a>
    </template>
  </div>
</template>
