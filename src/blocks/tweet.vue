<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "@/lib/blockable"
import { computed, nextTick, onBeforeMount, onMounted, ref, watch } from "vue"

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { properties, pass } = useNotionBlock(props)
const tweetId = computed(() => properties.value?.source?.[0]?.[0].split("status/")?.[1])
const el = ref<HTMLElement>()

const renderTweet = () => {
  //@ts-ignore
  const twttr = window["twttr"]
  //@ts-ignore
  twttr?.ready().then(({ widgets }) => {
    if (el.value) {
      el.value.innerHTML = ""
    }
    widgets.createTweetEmbed(tweetId.value, el.value, {})
  })
}

onBeforeMount(() => {
  let twttrScript = document.getElementById("twitter-widgets-js")
  if (!twttrScript) {
    var s = document.createElement("script")
    s.id = "twitter-widgets-js"
    s.src = "https://platform.twitter.com/widgets.js"
    document.body.appendChild(s)
  }
})
</script>

<script lang="ts">
export default {
  name: "NotionTweet",
}
</script>

<template>
  <div ref="el"></div>
</template>
