import { NotionBlockProps } from "@/lib/types"

const getPageTable = async (pageId: string, apiUrl = "https://api.vue-notion.workers.dev/v1") =>
  await fetch(`${apiUrl}/table/${pageId}`)
    .then((res) => res.json())
    .then((data) => data as NotionBlockProps)
    .catch((err) => err)

const getPageBlocks = async (pageId: string, apiUrl = "https://api.vue-notion.workers.dev/v1") =>
  await fetch(`${apiUrl}/page/${pageId}`)
    .then((res) => res.json())
    .then((data) => data as NotionBlockProps)
    .catch((err) => err)

export { getPageTable, getPageBlocks }
