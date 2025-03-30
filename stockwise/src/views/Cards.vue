<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold cursor-pointer" @click="startEditing(product, 'name')">
            <span v-if="!product.editing">{{ product.name }}</span>
            <input
              v-else
              v-model="product.name"
              @blur="saveEdit(product)"
              class="w-full border rounded px-2"
              autofocus
            />
          </h3>
          <div
        v-if="product.stock === 0"
        class="bg-red-500 text-white px-2 py-1 rounded-full text-xs -mt-2 -mr-2"
      >
        Out of Stock
      </div>
        </div>

        <div class="flex items-center">
          <span class="text-gray-600">Price:</span>
          <span class="ml-2 cursor-pointer" @click="startEditing(product, 'price')">
            <span v-if="!product.editing">${{ product.price.toFixed(2) }}</span>
            <input
              v-else
              v-model.number="product.price"
              type="number"
              step="0.01"
              @blur="saveEdit(product)"
              class="w-20 border rounded px-2"
            />
          </span>
        </div>

        <div class="flex items-center">
          <span class="text-gray-600">Stock:</span>
          <span class="ml-2 flex items-center">
            <span
              class="w-3 h-3 rounded-full mr-2"
              :class="{
                'bg-green-500': product.stock > 20,
                'bg-yellow-500': product.stock >= 10 && product.stock <= 20,
                'bg-red-500': product.stock < 10,
              }"
            ></span>
            <span class="text-sm text-gray-500">
              {{ getStockStatus(product.stock) }}
            </span>
            <span
              v-if="product.showStock"
              class="cursor-pointer px-2"
              @click="startEditing(product, 'stock')"
            >
              <span class="rounded px-2 bg-blue-100" v-if="!product.editing">{{ product.stock }}</span>
              <input
                v-else
                v-model.number="product.stock"
                type="number"
                @blur="saveEdit(product)"
                class="w-20 border rounded px-2"
              />
            </span>
          </span>
        </div>

        <div class="flex items-center">
          <span class="text-gray-600">Category:</span>
          <span class="ml-2 cursor-pointer" @click="startEditing(product, 'category')">
            <span v-if="!product.editing">{{ product.category }}</span>
            <select
              v-else
              v-model="product.category"
              @change="saveEdit(product)"
              class="border rounded px-2"
            >
              <option v-for="(cat, i) in distinctCategories" :key="i" :value="cat">
                {{ cat }}
              </option>
            </select>
          </span>
        </div>

        <div class="flex justify-between items-center pt-4 border-t mt-4">
          <button
            @click="toggleStockVisibility(product)"
            class="text-sm px-3 py-1 rounded"
            :class="{
              'bg-blue-100 text-blue-800': product.showStock,
              'bg-gray-100 text-gray-600': !product.showStock,
            }"
          >
            {{ product.showStock ? 'Hide Stock' : 'Show Stock' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import 'datatables.net'
import { useProducts, type Product } from '@/stores/ProductSharedState'

export default defineComponent({
  name: 'ProductCards',
  setup() {
    const { products, distinctCategories, setProducts } = useProducts()

    const startEditing = (product: any, field: string) => {
      product.editing = true
      product.editingField = field
    }

    const saveEdit = (product: any) => {
      product.editing = false
      setProducts([...products.value])
    }

    const toggleStockVisibility = (product: any) => {
      product.showStock = !product.showStock
    }

    const getStockStatus = (stock: number) => {
      if (stock === 0) return 'Out of Stock'
      if (stock < 10) return 'Low'
      if (stock <= 20) return 'Medium'
      return 'High'
    }

    return {
      products,
      distinctCategories,
      startEditing,
      saveEdit,
      toggleStockVisibility,
      getStockStatus,
    }
  },
})
</script>
