<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import { getTextContent } from "@/lib/utils"
import NotionTextRenderer from "@/blocks/helpers/text-renderer.vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { f, properties, title, description, pass } = useNotionBlock(props)
</script>

<script lang="ts">
export default {
  name: "NotionBookmark",
}
</script>

<template>
  <div class="notion-row">
    <a
      target="_blank"
      rel="noopener noreferrer"
      :class="['notion-bookmark', f.block_color && `notion-${f.block_color}`]"
      :href="properties.link"
    >
      <div>
        <div class="notion-bookmark-title">
          <NotionTextRenderer :text="title || properties.link" v-bind="pass" />
        </div>
        <div v-if="description" class="notion-bookmark-description">
          <NotionTextRenderer :text="description" v-bind="pass" />
        </div>
        <div class="notion-bookmark-link">
          <img v-if="f.bookmark_icon" :alt="getTextContent(title || properties.link)" :src="f.bookmark_icon" />
          <div>
            <NotionTextRenderer :text="properties.link" v-bind="pass" />
          </div>
        </div>
      </div>
      <div v-if="f.bookmark_cover" class="notion-bookmark-image">
        <img :alt="getTextContent(title || properties.link)" :src="f.bookmark_cover" />
      </div>
    </a>
  </div>
</template>
