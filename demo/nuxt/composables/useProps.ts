export const useProps = () => {
  const mapPageUrl = (pageId: String) => {
    return `/page/${pageId}`
  }

  const pageLinkOptions = computed(() => ({
    component: defineNuxtLink({}),
    href: "to",
  }))

  return {
    mapPageUrl,
    pageLinkOptions,
  }
}
