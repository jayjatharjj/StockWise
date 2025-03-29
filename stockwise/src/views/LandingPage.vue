<template>
  <div class="flex h-screen bg-gray-100">
    <div class="w-56">
      <SidebarComponent />
    </div>
    <div class="flex flex-col flex-1">
      <HeaderComponent />
      <main class="flex-grow p-6">
        <div class="container mx-auto">
          <ProductTable />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '@/components/Header.vue'
import SidebarComponent from '@/components/Sidebar.vue'
import ProductTable from '@/views/Products.vue'

export default defineComponent({
  name: 'LandingPage',
  components: {
    HeaderComponent,
    SidebarComponent,
    ProductTable,
  },
})
</script>
