import { Block, BlockMap } from "./types"

// utils from react-notion
export const getTextContent = (text: string[]) => {
  return text.reduce((prev, current) => prev + current[0], "")
}

const groupBlockContent = (blockMap: BlockMap) => {
  const output: any[] = []

  let lastType: any = undefined
  let index = -1

  Object.keys(blockMap).forEach((id) => {
    blockMap[id].value.content?.forEach((blockId) => {
      const blockType = blockMap[blockId]?.value?.type

      if (blockType && blockType !== lastType) {
        index++
        lastType = blockType
        output[index] = []
      }

      output[index].push(blockId)
    })

    lastType = undefined
  })

  return output
}

export const getListNumber = (blockId: string, blockMap: BlockMap) => {
  const groups = groupBlockContent(blockMap)
  const group = groups.find((g) => g.includes(blockId))

  if (!group) {
    return
  }

  return group.indexOf(blockId) + 1
}

export const defaultMapImageUrl = (image = "", block: Block) => {
  const url = new URL(
    `https://www.notion.so${image.startsWith("/image") ? image : `/image/${encodeURIComponent(image)}`}`
  )

  if (block && !image.includes("/images/page-cover/")) {
    const table = block.value.parent_table === "space" ? "block" : block.value.parent_table
    url.searchParams.set("table", table)
    url.searchParams.set("id", block.value.id)
    url.searchParams.set("cache", "v2")
  }

  return url.toString()
}

export const defaultMapPageUrl = (pageId = "") => {
  pageId = pageId.replace(/-/g, "")

  return `/${pageId}`
}
