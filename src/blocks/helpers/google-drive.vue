<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../../lib/blockable";
import { computed } from "vue";
import { useTimeAgo } from "@vueuse/core";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { format, block, hasPageLinkOptions, pageLinkProps } = useNotionBlock(props);

const properties = computed(() => format.value.drive_properties);

const constructThumbnail = (src?: string) => {
  if (!src) return;
  const q = new URLSearchParams({
    table: "block",
    id: block.value.value.id,
    cache: "v2",
  });
  return "https://www.notion.so/image/" + encodeURIComponent(src) + "?" + q;
};
const constructDomain = (src?: string) => {
  if (!src) return;
  return new URL(src).hostname;
};
</script>

<script lang="ts">
export default {
  name: "NotionGoogleDrive",
};
</script>

<template>
  <div class="notion-google-drive">
    <a rel="noopener noreferrer" target="_blank" :href="properties.url" class="notion-google-drive-link">
      <div class="notion-google-drive-preview">
        <img :src="constructThumbnail(properties.thumbnail)" :alt="properties.title" />
      </div>

      <div className="notion-google-drive-body">
        <div className="notion-google-drive-body-title">
          {{ properties.title }}
        </div>

        <div className="notion-google-drive-body-modified-time">
          Last modified
          {{ properties.user_name ? `by ${properties.user_name} ` : "" }}
          {{ useTimeAgo(properties.modified_time).value }}
        </div>

        <div className="notion-google-drive-body-source">
          <div
            className="notion-google-drive-body-source-icon"
            :style="{ backgroundImage: 'url(' + properties.icon + ')' }"
          />
          <div className="notion-google-drive-body-source-domain">{{ constructDomain(properties.url) }}</div>
        </div>
      </div>
    </a>
  </div>
</template>
