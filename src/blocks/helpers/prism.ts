import * as Vue from "vue"
import Prism from "prismjs"
import { Slots, VNode } from "vue"

declare type Data = Record<string, unknown>

export default Vue.defineComponent({
  props: {
    code: {
      type: String,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "markup",
    },
  },
  setup(props, { slots, attrs }: { slots: Slots; attrs: Data }) {
    const { h } = Vue
    const slotsData = (slots && slots.default && slots.default()) || []
    const code = props.code || (slotsData.length > 0 ? slotsData[0].children : "")
    const { inline, language } = props
    const prismLanguage = Prism.languages[language]
    const className = `language-${language}`

    if (inline) {
      return (): VNode =>
        //@ts-ignore
        h("code", { ...attrs, class: [attrs.class, className], innerHTML: Prism.highlight(code, prismLanguage) })
    }

    //@ts-ignore
    const d = Prism.highlight(code, prismLanguage)
    return (): VNode =>
      h("pre", { ...attrs, class: [attrs.class] }, [
        h("code", {
          class: className,
          innerHTML: d,
        }),
      ])
  },
})
