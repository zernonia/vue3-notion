<script lang="ts">
export default {
  name: "NotionTable",
}
</script>

<template>
  <div class="notion-simple-table-wrapper">
    <table class="notion-simple-table">
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
