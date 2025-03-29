<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <div class="overflow-x-auto">
      <table ref="productTable" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stock
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          <tr v-for="product in products" :key="product.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ product.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ product.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              ${{ product.price.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {{ product.stock }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net'

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

export default defineComponent({
  name: 'ProductTable',
  setup() {
    const cachedProducts = localStorage.getItem('products')
    const defaultProducts: Product[] = [
      { id: 1, name: 'Product A', price: 29.99, stock: 100 },
      { id: 2, name: 'Product B', price: 49.99, stock: 50 },
      { id: 3, name: 'Product C', price: 19.99, stock: 150 },
      { id: 4, name: 'Product D', price: 99.99, stock: 20 },
    ]
    const products = ref<Product[]>(cachedProducts ? JSON.parse(cachedProducts) : defaultProducts)

    if (!cachedProducts) {
      localStorage.setItem('products', JSON.stringify(defaultProducts))
    }

    const productTable = ref<HTMLTableElement | null>(null)

    onMounted(() => {
      if (productTable.value) {
        $(productTable.value).DataTable({
          paging: true,
          searching: true,
          info: true,
        })
      }
    })

    return {
      products,
      productTable,
    }
  },
})
</script>
