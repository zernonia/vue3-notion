<script setup lang="ts">
import { useNotionBlock } from "@/lib/blockable"
import Decorator from "@/blocks/decorator.vue"
</script>

<script lang="ts">
export default {
  name: "NotionPageHeader",
}
</script>

<template>
  <header class="notion-page-header">
    <div class="notion-nav-breadcrumbs">
      <!-- todo: breadcrumbs -->
    </div>
  </header>
</template>
