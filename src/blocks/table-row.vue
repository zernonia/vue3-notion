<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionTextRenderer from "@/blocks/helpers/text-renderer.vue"
import { computed, toRefs } from "vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { parent, properties, pass } = useNotionBlock(props)

const {
  table_block_column_header: hasHeaderColumn,
  table_block_row_header: hasHeaderRow,
  table_block_column_order: columns,
} = parent.value.value.format

const cell = (columnId: string) => {
  return properties.value[columnId]
}
const isHeader = (columnIndex: number) => {
  return (hasHeaderColumn && props.contentIndex == 0) || (hasHeaderRow && columnIndex == 0)
}
</script>

<script lang="ts">
export default {
  name: "NotionTableRow",
}
</script>

<template>
  <tr class="notion-simple-table-row">
    <td v-for="(columnId, columnIndex) in columns" :key="columnIndex" class="notion-simple-table-data">
      <div :class="{ 'notion-simple-table-header': isHeader(columnIndex) }">
        <div class="notion-simple-table-cell-text">
          <NotionTextRenderer :text="cell(columnId)" v-bind="pass" />
        </div>
      </div>
    </td>
  </tr>
</template>
