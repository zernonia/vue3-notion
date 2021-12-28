import { defaultMapImageUrl, defaultMapPageUrl } from "@/lib/utils"
import { computed, PropType } from "vue"
import { NotionBlockProps, BlockList } from "./types"

export const defineNotionProps = {
  blockMap: { type: Object as PropType<BlockList>, required: true },
  contentId: { type: String, required: false },
  contentIndex: { type: Number, default: 0 },
  embedAllow: { type: String, default: "fullscreen" },
  fullPage: { type: Boolean, default: false },
  hideList: { type: Array, default: () => [] },
  level: { type: Number, default: 0 },
  mapImageUrl: { type: Function, default: defaultMapImageUrl },
  mapPageUrl: { type: Function, default: defaultMapPageUrl },
  pageLinkOptions: Object,
  pageLinkTarget: { type: String, default: "_self" },
  prism: { type: Boolean, default: false },
  katex: { type: Boolean, default: false },
  textLinkTarget: { type: String, default: "_blank" },
  todo: { type: Boolean, default: false },
}

export const useNotionBlock = (props: Readonly<NotionBlockProps>) => {
  const block = computed(() => {
    if (!props.blockMap) return
    const id = props.contentId || Object.keys(props.blockMap)[0]
    return props.blockMap[id]
  })

  const pass = computed(() => {
    return {
      blockMap: props.blockMap,
      contentId: props.contentId,
      contentIndex: props.contentIndex,
      embedAllow: props.embedAllow,
      fullPage: props.fullPage,
      hideList: props.hideList,
      level: props.level,
      mapImageUrl: props.mapImageUrl,
      mapPageUrl: props.mapPageUrl,
      pageLinkOptions: props.pageLinkOptions,
      prism: props.prism,
      katex: props.katex,
      todo: props.todo,
    }
  })

  const f = computed(() => {
    return {
      block_aspect_ratio: block.value?.value?.format?.block_aspect_ratio,
      block_height: block.value?.value?.format?.block_height || 1,
      block_width: block.value?.value?.format?.block_width || 1,
      block_color: block.value?.value?.format?.block_color,
      bookmark_icon: block.value?.value?.format?.bookmark_icon,
      bookmark_cover: block.value?.value?.format?.bookmark_cover,
      display_source: block.value?.value?.format?.display_source,
    }
  })

  const format = computed(() => block.value?.value.format)
  const properties = computed(() => block.value?.value.properties)

  const icon = computed(() => format.value?.page_icon)
  const width = computed(() => format.value?.block_width)

  const title = computed(() => properties.value?.title)
  const caption = computed(() => properties.value?.caption)
  const description = computed(() => properties.value?.description)

  const type = computed(() => {
    return block.value?.value.type
  })

  const visible = computed(() => {
    return !props.hideList.includes(type.value)
  })

  const hasPageLinkOptions = computed(() => {
    return props.pageLinkOptions?.component && props.pageLinkOptions?.href
  })
  const parent = computed(() => {
    return props.blockMap[block.value?.value.parent_id]
  })

  const isType = (t: any) => {
    if (Array.isArray(t)) {
      return visible.value && t.includes(type.value)
    }
    return visible.value && type.value === t
  }

  const blockColorClass = (suffix = "") => {
    const blockColor = block.value?.value?.format?.block_color
    return blockColor ? `notion-${blockColor}${suffix}` : undefined
  }

  const pageLinkProps = (id: string) => {
    return {
      [props.pageLinkOptions.href]: props.mapPageUrl(id),
    }
  }

  return {
    props,
    block,
    pass,
    f,
    format,
    properties,
    icon,
    width,
    title,
    caption,
    description,
    type,
    visible,
    hasPageLinkOptions,
    parent,

    isType,
    blockColorClass,
    pageLinkProps,
  }
}
