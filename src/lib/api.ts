const getPageTable = async (pageId: string, apiUrl = "https://api.vue-notion.workers.dev/v1") =>
  await fetch(`${apiUrl}/table/${pageId}`).then((res) => res.json())

const getPageBlocks = async (pageId: string, apiUrl = "https://api.vue-notion.workers.dev/v1") =>
  await fetch(`${apiUrl}/page/${pageId}`).then((res) => res.json())

export { getPageTable, getPageBlocks }
