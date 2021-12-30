<script setup lang="ts">
import { defineNotionProps, useNotionBlock } from "@/lib/blockable"
import { availableType } from "@/lib/constant"
import NotionBookmark from "@/blocks/bookmark.vue"
import NotionCallout from "@/blocks/callout.vue"
import NotionCode from "@/blocks/code.vue"
import NotionColumn from "@/blocks/column.vue"
import NotionEquation from "@/blocks/equation.vue"
import NotionFigure from "@/blocks/helpers/figure.vue"
import NotionHeader from "@/blocks/header.vue"
import NotionList from "@/blocks/list.vue"
import NotionPage from "@/blocks/page.vue"
import NotionQuote from "@/blocks/quote.vue"
import NotionTable from "@/blocks/table.vue"
import NotionTableRow from "@/blocks/table-row.vue"
import NotionText from "@/blocks/text.vue"
import NotionTodo from "@/blocks/todo.vue"
import NotionToggle from "@/blocks/toggle.vue"
import NotionTableOfContent from "@/blocks/table-of-contents.vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { pass, type, format, isType } = useNotionBlock(props)
if (!availableType.includes(type.value)) console.warn(`${type.value.toUpperCase()} is not implemented yet`)
// console.log(type.value)
</script>

<template>
  <div style="width: 100%" v-if="isType('page')">
    <NotionPage v-bind="pass">
      <slot />
    </NotionPage>
  </div>
  <NotionHeader v-else-if="isType(['header', 'sub_header', 'sub_sub_header'])" v-bind="pass" />
  <NotionBookmark v-else-if="isType('bookmark')" v-bind="pass" />
  <NotionCallout v-else-if="isType('callout')" v-bind="pass" />
  <NotionCode v-else-if="isType('code')" v-bind="pass" />
  <NotionEquation v-else-if="isType('equation')" v-bind="pass" />
  <NotionText v-else-if="isType('text')" v-bind="pass" />
  <NotionQuote v-else-if="isType('quote')" v-bind="pass" />
  <NotionTodo v-else-if="isType('to_do')" v-bind="pass" />
  <NotionToggle v-else-if="isType('toggle')" v-bind="pass">
    <slot />
  </NotionToggle>
  <div v-else-if="isType('column_list')" class="notion-row">
    <slot />
  </div>
  <NotionColumn v-else-if="isType('column')" :format="format">
    <slot />
  </NotionColumn>
  <NotionList v-else-if="isType(['bulleted_list', 'numbered_list'])" v-bind="pass">
    <slot />
  </NotionList>
  <NotionFigure v-else-if="isType(['image', 'embed', 'figma', 'video', 'audio'])" v-bind="pass" />
  <NotionTable v-else-if="isType('table')" v-bind="pass"><slot /></NotionTable>
  <NotionTableRow v-else-if="isType('table_row')" v-bind="pass" />
  <NotionTableOfContent v-else-if="isType('table_of_contents')" v-bind="pass"></NotionTableOfContent>
  <hr v-else-if="isType('divider')" class="notion-hr" />
</template>
