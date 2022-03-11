import { onMounted, ref } from "vue"
import { getPageBlocks, getPageTable } from "./api"
import { BlockMap } from "./types"

const useGetPageBlocks = (...arg: Parameters<typeof getPageBlocks>) => {
  const data = ref<BlockMap>()

  onMounted(async () => {
    data.value = await getPageBlocks(...arg)
  })

  return {
    data,
  }
}

const useGetPageTable = (...arg: Parameters<typeof getPageTable>) => {
  const data = ref<BlockMap>()

  onMounted(async () => {
    data.value = await getPageTable(...arg)
  })

  return {
    data,
  }
}

export { useGetPageBlocks, useGetPageTable }
