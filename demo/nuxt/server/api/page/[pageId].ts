import { NotionAPI } from "notion-client";

export default defineEventHandler(async (event) => {
  const pageId = event.context.params.pageId;

  const api = new NotionAPI();
  const page = await api.getPage(pageId.toString());

  return page;
});
