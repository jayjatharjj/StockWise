<template>
  <header class="sticky py-4 top-0 w-full bg-white shadow-md" id="app-header">
    <div class="container mx-auto flex items-center justify-between py-3 px-4">
      <div class="flex items-center flex-grow lg:flex-grow-0"></div>
      <div class="hidden lg:flex flex-grow justify-end">
        <nav class="flex space-x-4"></nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'header',
})
</script>
