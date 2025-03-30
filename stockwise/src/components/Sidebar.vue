<template>
  <aside
    class="w-56 bg-gray-900 text-white h-screen fixed top-0 left-0 flex flex-col"
    :class="{ hidden: !isOpen, block: isOpen }"
  >
    <div class="px-6 py-4 flex items-center justify-between border-b border-gray-700">
      <h2>StockWise</h2>
    </div>
    <nav class="flex-grow overflow-y-auto py-4">
      <ul class="space-y-2 px-4">
        <li>
          <button
            @click="toggleContent"
            class="flex items-center w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700"
          >
            <i class="fas fa-address-book text-lg"></i>
            <span class="ml-3" v-if="!isMinimized">Products</span>
          </button>
          <ul v-if="contentOpen" class="pl-6 mt-1 space-y-1">
            <li>
              <a href="/products" class="block px-3 py-2 text-gray-400 hover:text-white"
                >Stock List</a
              >
            </li>
            <li>
              <a href="/cards" class="block px-3 py-2 text-gray-400 hover:text-white">Stock Cards</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'sidebar',
  data() {
    return {
      isOpen: true,
      isMinimized: false,
      contentOpen: true,
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    },
    toggleMinimize() {
      this.isMinimized = !this.isMinimized
    },
    toggleContent() {
      this.contentOpen = !this.contentOpen
    },
  },
})
</script>
