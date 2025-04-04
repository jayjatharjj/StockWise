<template>
  <transition
    enter-active-class="transition ease-out duration-200"
    leave-active-class="transition ease-in duration-150"
    enter-from-class="opacity-0 -translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-1"
  >
    <div
      v-if="alert"
      class="fixed top-[50px] right-0 w-1/5 m-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50"
      role="alert"
    >
      <div class="flex justify-between items-start">
        <div>
          <strong class="font-bold">Error! </strong>
          <span class="block sm:inline">Price and stock cannot be less than zero.</span>
        </div>
      </div>
    </div>
  </transition>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold cursor-pointer" @click="startEditing(product, 'name')">
            <span v-if="!product.editing" :title="product.name.length > 20 ? product.name : ''">{{
              product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name
            }}</span>
            <input
              v-else
              v-model="product.name"
              @blur="saveEdit(product, index)"
              class="max-w-[200px] border rounded px-2"
              autofocus
            />
          </h3>
          <div class="flex flex-col justify-center">
            <div
              v-if="product.stock === 0"
              class="bg-black text-white px-2 py-1 rounded-full text-xs ml-3 h-5"
            >
              Out of Stock
            </div>
            <div
              v-else
              class="text-white px-2 py-1 rounded-full text-xs ml-3 h-5"
              :class="{
                'bg-red-500': product.stock > 20,
                'bg-yellow-500': product.stock >= 10 && product.stock <= 20,
                'bg-green-500': product.stock < 10,
              }"
            >
              {{ getStockStatus(product.stock) }}
            </div>
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
import { productService } from '@/api/productsApi'

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
      alert: false,
      alertTimeout: null as number | null,
    }
  },
  mounted() {
    this.categories = this.distinctCategories.sort()
  },
  methods: {
    async saveEdit(product: Product, index: number) {
      if (product.stock < 0) {
        this.stockErrorIndex = index
        product.stock = 0
        product.editing = true
        this.alertPopup()
        return
      }
      if (product.price < 0) {
        this.priceErrorIndex = index
        product.price = 0
        product.editing = true
        this.alertPopup()
        return
      }
      this.priceErrorIndex = -1
      this.stockErrorIndex = -1
      product.editing = false
      if (index !== -1) {
        if (product._id) {
          try {
            type EditableField = 'name' | 'price' | 'stock' | 'category'
            const editField = product.editingField as EditableField
            const newValue = product[editField]
            await productService.updateProduct(product._id, { [editField]: newValue })
            const updatedProducts = await productService.loadProducts()
            this.updateProductsCache(updatedProducts)
          } catch (error) {
            console.error('Update failed:', error)
          }
        } else {
          const originalProducts = this.getProducts()
          const updatedProducts = [
            ...originalProducts.slice(0, index),
            product,
            ...originalProducts.slice(index + 1),
          ]
          this.updateProductsCache(updatedProducts)
        }
      }
    },
    alertPopup() {
      this.alert = true
      if (this.alertTimeout) clearTimeout(this.alertTimeout)
      this.alertTimeout = setTimeout(() => {
        this.alert = false
      }, 2000)
    },
  },
})
</script>
