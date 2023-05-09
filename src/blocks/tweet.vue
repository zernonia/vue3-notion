<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../lib/blockable";
import { computed, onBeforeMount, getCurrentInstance, ref, onMounted } from "vue";
import { useTwttr } from "./helpers/tweet";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { properties } = useNotionBlock(props);

const tweetId = computed(() => properties.value?.source?.[0]?.[0].split("status/")?.[1].split("?")[0]);
const el = ref<HTMLElement>();
const error = ref();

const renderTweet = () => {
  //@ts-ignore
  const twttr = window["twttr"];
  //@ts-ignore
  twttr?.ready().then(({ widgets }) => {
    widgets
      .createTweetEmbed(tweetId.value, el.value, {})
      .then((element: any) => {
        error.value = element ? undefined : "error";
      })
      .catch((err: any) => {
        error.value = err;
      });
  });
};
useTwttr(renderTweet);
onMounted(() => {
  renderTweet();
});
</script>

<script lang="ts">
export default {
  name: "NotionTweet",
};
</script>

<template>
  <div v-if="!error" class="notion-tweet" ref="el"></div>
  <div v-else class="notion-tweet-error">Error loading Tweet</div>
</template>
