<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import NotionTextRenderer from "@/blocks/helpers/text-renderer.vue"
import { computed } from "vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { title, properties, pass } = useNotionBlock(props)
const checked = computed(() => properties.value?.checked?.[0] == "Yes")
</script>

<script lang="ts">
export default {
  name: "NotionTodo",
}
</script>

<template>
  <label class="notion-to-do-item">
    <input type="checkbox" class="notion-property-checkbox" :value="title" :checked="checked" disabled="true" />
    <label :class="{ 'notion-to-do-checked': checked }">
      <NotionTextRenderer :text="title" v-bind="pass" />
    </label>
  </label>
</template>
