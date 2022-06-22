import { reactive, onBeforeMount } from "vue"

const store = reactive({
  callbacks: [] as any[],
})

export const useTwttr = (cb: () => any) => {
  onBeforeMount(() => {
    let twttrScript = document.getElementById("twitter-widgets-js")
    if (!twttrScript) {
      store.callbacks.push(cb)
      var s = document.createElement("script")
      s.id = "twitter-widgets-js"
      s.src = "https://platform.twitter.com/widgets.js"
      s.onload = () => store.callbacks.forEach((cb) => cb())
      document.body.appendChild(s)
    } else {
      store.callbacks.push(cb)
    }
  })
}
