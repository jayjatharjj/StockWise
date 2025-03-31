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
              @blur="saveEdit(product, index)"
              class="w-full border rounded px-2"
              autofocus
            />
          </h3>
          <div
            v-if="product.stock === 0"
            class="bg-black text-white px-2 py-1 rounded-full text-xs ml-3"
          >
            Out of Stock
          </div>
          <div
            v-else
            class="text-white px-2 py-1 rounded-full text-xs ml-3"
            :class="{
              'bg-red-500': product.stock > 20,
              'bg-yellow-500': product.stock >= 10 && product.stock <= 20,
              'bg-green-500': product.stock < 10,
            }"
          >
            {{ getStockStatus(product.stock) }}
          </div>
        </div>

        <div class="flex items-center">
          <span class="text-gray-600">Price:</span>
          <span class="ml-2 cursor-pointer" @click="startEditing(product, 'price')">
            <span v-if="!product.editing">${{ product.price.toFixed(2) }}</span>
            <div v-else class="relative">
              <input
                v-model.number="product.price"
                type="number"
                step="0.01"
                min="0"
                @blur="saveEdit(product, index)"
                class="w-20 border rounded px-2"
                :class="{ 'border-red-500': priceErrorIndex === index }"
              />
            </div>
          </span>
        </div>

        <div class="flex items-center">
          <span class="text-gray-600">Stock:</span>
          <span class="ml-2 flex items-center">
            <span
              class="w-3 h-3 rounded-full mr-2"
              :class="{
                'bg-black': product.stock == 0,
                'bg-red-500': product.stock > 20,
                'bg-yellow-500': product.stock >= 10 && product.stock <= 20,
                'bg-green-500': product.stock < 10 && product.stock > 0,
              }"
            ></span>
            <span
              v-if="product.showStock"
              class="cursor-pointer px-1"
              @click="startEditing(product, 'stock')"
            >
              <span class="rounded px-2 bg-blue-100" v-if="!product.editing">{{
                product.stock
              }}</span>
              <div v-else class="relative">
                <input
                  v-model.number="product.stock"
                  type="number"
                  min="0"
                  @blur="saveEdit(product, index)"
                  class="w-20 border rounded px-2"
                  :class="{ 'border-red-500': stockErrorIndex === index }"
                />
              </div>
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
              @change="saveEdit(product, index)"
              class="border rounded px-2"
            >
              <option v-for="(category, i) in categories" :key="i" :value="category">
                {{ category }}
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
          <button
            v-if="product.editing"
            class="text-sm px-3 py-1 rounded bg-red-100 text-gray-600"
            @click="cancelEdit(product)"
          >
            Cancel
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
    const { products, distinctCategories, getProducts, updateProductsCache } = useProducts()

    const startEditing = (product: any, field: string) => {
      product.editing = true
      product.editingField = field
    }

    const cancelEdit = (product: Product) => {
      product.editing = false
    }

    const toggleStockVisibility = (product: any) => {
      product.showStock = !product.showStock
    }

    const getStockStatus = (stock: number) => {
      if (stock === 0) return 'Out of Stock'
      if (stock < 10) return 'Low Stock'
      if (stock <= 20) return 'Medium Stock'
      return 'High Stock'
    }

    return {
      products,
      distinctCategories,
      startEditing,
      cancelEdit,
      toggleStockVisibility,
      getStockStatus,
      getProducts,
      updateProductsCache,
    }
  },
  data() {
    return {
      categories: [] as string[],
      stockErrorIndex: -1,
      priceErrorIndex: -1,
    }
  },
  mounted() {
    this.categories = this.distinctCategories.sort()
  },
  methods: {
    saveEdit(product: Product, index: number) {
      if (product.stock < 0) {
        this.stockErrorIndex = index
        product.stock = 0
        product.editing = true
        return
      }
      if (product.price < 0) {
        this.priceErrorIndex = index
        product.price = 0
        product.editing = true
        return
      }
      this.priceErrorIndex = -1
      this.stockErrorIndex = -1
      product.editing = false
      if (index !== -1) {
        const originalProducts = this.getProducts()
        const updatedProducts = [
          ...originalProducts.slice(0, index),
          product,
          ...originalProducts.slice(index + 1),
        ]
        this.updateProductsCache(updatedProducts)
      }
    },
  },
})
</script>
