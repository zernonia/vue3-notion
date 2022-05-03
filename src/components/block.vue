<script setup lang="ts">
import { defineAsyncComponent } from "vue"
import { defineNotionProps, useNotionBlock } from "@/lib/blockable"
import { availableType } from "@/lib/constant"
import NotionBookmark from "@/blocks/bookmark.vue"
import NotionCallout from "@/blocks/callout.vue"
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
import NotionTableOfContents from "@/blocks/table-of-contents.vue"

const NotionCode = defineAsyncComponent(() =>
  import("@/blocks/code.vue").then(async (m) => {
    await Promise.all([
      import("prismjs/components/prism-markup-templating"),
      import("prismjs/components/prism-markup"),
      import("prismjs/components/prism-bash"),
      import("prismjs/components/prism-c"),
      import("prismjs/components/prism-cpp"),
      import("prismjs/components/prism-csharp"),
      import("prismjs/components/prism-docker"),
      import("prismjs/components/prism-java"),
      import("prismjs/components/prism-js-templates"),
      import("prismjs/components/prism-typescript"),
      import("prismjs/components/prism-coffeescript"),
      import("prismjs/components/prism-diff"),
      import("prismjs/components/prism-git"),
      import("prismjs/components/prism-go"),
      import("prismjs/components/prism-graphql"),
      import("prismjs/components/prism-handlebars"),
      import("prismjs/components/prism-json"),
      import("prismjs/components/prism-less"),
      import("prismjs/components/prism-makefile"),
      import("prismjs/components/prism-markdown"),
      import("prismjs/components/prism-objectivec"),
      import("prismjs/components/prism-ocaml"),
      import("prismjs/components/prism-python"),
      import("prismjs/components/prism-reason"),
      import("prismjs/components/prism-rust"),
      import("prismjs/components/prism-sass"),
      import("prismjs/components/prism-scss"),
      import("prismjs/components/prism-solidity"),
      import("prismjs/components/prism-sql"),
      import("prismjs/components/prism-stylus"),
      import("prismjs/components/prism-swift"),
      import("prismjs/components/prism-wasm"),
      import("prismjs/components/prism-yaml"),
    ])
    return m
  })
)

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
  <NotionTableOfContents v-else-if="isType('table_of_contents')" v-bind="pass"></NotionTableOfContents>
  <hr v-else-if="isType('divider')" class="notion-hr" />
</template>
