<template>
  <div class="overflow-x-auto">
    <table
      ref="productTable"
      class="border border-gray-300 shadow-lg min-w-full divide-y divide-gray-700"
    >
      <thead class="bg-gray-600">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-100"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-100"
          >
            Price
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-100"
          >
            Stock
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-100"
          >
            Category
          </th>
        </tr>
      </thead>
      <tbody class="divide-y bg-gray-700 divide-gray-600 text-gray-100">
        <tr v-for="(product, index) in products" :key="index">
          <td class="px-6 py-4 text-sm">{{ product.name }}</td>
          <td class="px-6 py-4 text-sm">${{ product.price.toFixed(2) }}</td>
          <td class="px-6 py-4 text-sm">{{ product.stock }}</td>
          <td class="px-6 py-4 text-sm">{{ product.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick } from 'vue'
import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net'
import { useProducts, type Product } from '@/stores/ProductSharedState'

export default defineComponent({
  name: 'ProductTable',
  setup() {
    let table: any
    const { products } = useProducts()

    const productTable = ref<HTMLTableElement | null>(null)

    const initializeDataTable = () => {
      if (productTable.value) {
        table = $(productTable.value).DataTable({
          data: products.value,
          columns: [
            { data: 'name' },
            { data: 'price', render: (data: number) => `$${data.toFixed(2)}` },
            { data: 'stock' },
            { data: 'category' },
          ],
          paging: true,
          searching: true,
          info: true,
          pageLength: 10,
          lengthChange: false,
          stateSave: true,
        })
      }
    }

    const updateDataTable = () => {
      if (!table) return
      const state = table.state()

      table.clear()
      table.rows.add(products.value)
      table.draw()

      if (state) {
        table.state.restore(state)
      }
    }

    onMounted(() => {
      initializeDataTable()
    })

    watch(products, () => {
      updateDataTable()
    })

    return {
      products,
      productTable,
    }
  },
})
</script>
