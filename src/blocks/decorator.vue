<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionKatek from "@/blocks/helpers/katex.vue"
import { computed, PropType } from "vue"

const props = defineProps({
  content: Object as PropType<string[] | string>,
  ...defineNotionProps,
})
//@ts-ignore
const { props: blockProps, pass, type, hasPageLinkOptions, pageLinkProps } = useNotionBlock(props)

const text = computed(() => props.content?.[0])
const decorators = computed(() => props.content?.[1] || [])
const decoratorKey = computed(() => decorators.value?.[0]?.[0])
const decoratorValue = computed(() => decorators.value?.[0]?.[1])
const unappliedDecorators = computed(() => {
  const clonedDecorators = JSON.parse(JSON.stringify(decorators.value || []))
  clonedDecorators.shift() // remove applied decorator
  return clonedDecorators
})
const nextContent = computed(() => [text.value, unappliedDecorators.value])
const isPageLink = computed(() => text.value === "‣")
const isInlinePageLink = computed(() => decoratorValue.value?.[0] === "/")
const pageLinkTitle = computed(
  () => blockProps.blockMap?.[decoratorValue.value]?.value?.properties?.title?.[0]?.[0] || "link"
)
const target = computed(() => {
  if (type.value === "page") {
    return blockProps.pageLinkTarget
  }
  return blockProps.textLinkTarget
})
</script>

<script lang="ts">
export default {
  name: "NotionDecorator",
}
</script>

<template>
  <component
    v-if="isPageLink && hasPageLinkOptions"
    class="notion-link"
    v-bind="pageLinkProps(decoratorValue)"
    :is="blockProps.pageLinkOptions?.component"
  >
    {{ pageLinkTitle }}
  </component>
  <a
    v-else-if="isPageLink"
    class="notion-link"
    :target="blockProps.pageLinkTarget"
    :href="blockProps.mapPageUrl(decoratorValue)"
    >{{ pageLinkTitle }}</a
  >
  <component
    v-else-if="decoratorKey === 'a' && hasPageLinkOptions && isInlinePageLink"
    class="notion-link"
    v-bind="pageLinkProps(decoratorValue.slice(1))"
    :is="blockProps.pageLinkOptions?.component"
  >
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </component>
  <a
    v-else-if="decoratorKey === 'a' && isInlinePageLink"
    class="notion-link"
    :target="target"
    :href="blockProps.mapPageUrl(decoratorValue.slice(1))"
  >
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </a>
  <a v-else-if="decoratorKey === 'a'" class="notion-link" :target="target" :href="decoratorValue">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </a>
  <span v-else-if="decorators.length === 0">{{ text }}</span>
  <span v-else-if="decoratorKey === 'h'" :class="'notion-' + decoratorValue"
    ><NotionDecorator :content="nextContent" v-bind="pass" />
  </span>
  <code v-else-if="decoratorKey === 'c'" class="notion-inline-code">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </code>
  <b v-else-if="decoratorKey === 'b'">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </b>
  <em v-else-if="decoratorKey === 'i'">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </em>
  <s v-else-if="decoratorKey === 's'">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </s>
  <u v-else-if="decoratorKey === '_'" class="notion-underline">
    <NotionDecorator :content="nextContent" v-bind="pass" />
  </u>
  <NotionKatek v-else-if="decoratorKey === 'e' && blockProps.katex" :expression="decoratorValue" />
  <code v-else-if="decoratorKey === 'e'" class="notion-inline-code">
    {{ decoratorValue }}
  </code>
  <NotionDecorator v-else :content="nextContent" v-bind="pass" />
</template>
