<template>
  <div class="flex h-screen">
    <div class="w-56">
      <SidebarComponent />
    </div>
    <div class="flex flex-col flex-1">
      <HeaderComponent />
      <main class="flex-grow p-6">
        <div class="container mx-auto">
          <div class="p-4">
            <div class="lg:flex lg:items-center lg:justify-between">
              <button
                @click="toggleFilter()"
                class="m-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Filter
              </button>
              <button
                @click="showModal = true"
                class="m-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Import CSV
              </button>
            </div>
            <transition
              enter-active-class="transition ease-out duration-200"
              leave-active-class="transition ease-in duration-150"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div v-if="showFilter" class="mx-2 bg-gray-100 rounded overflow-hidden shadow-md">
                <div class="px-6 py-4">
                  <div class="md:flex md:items-center mb-2">
                    <div class="w-1/4 text-l">Price Range</div>
                    <div class="w-1/4 text-l">Stock Range</div>
                    <div class="w-1/4 text-l">Stock Status</div>
                    <div class="w-1/4 text-l">Category</div>
                  </div>
                  <div class="md:flex md:items-center mb-2">
                    <div class="w-1/4">
                      <label
                        class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        Min
                      </label>
                      <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="number"
                        v-model="minPrice"
                      />
                    </div>
                    <div class="w-1/4">
                      <label
                        class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        Min
                      </label>
                      <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="number"
                        v-model="minStock"
                      />
                    </div>
                    <div class="w-1/4">
                      <label class="md:w-2/3 block text-gray-500 font-bold">
                        <input class="mr-2 leading-tight" type="checkbox" />
                        <span class="text-sm"> Out of Stock </span>
                      </label>
                    </div>
                    <div class="w-1/4 relative inline-block text-left">
                      <div
                        class="absolute w-56 max-h-[100px] overflow-y-auto rounded-md bg-white focus:outline-hidden"
                      >
                        <div class="py-1 bg-gray-100" role="none">
                          <div v-for="(category, index) in distinctCategories" :key="index">
                            <label class="md:w-2/3 block text-gray-500 font-bold">
                              <input class="mr-2 leading-tight" type="checkbox" />
                              <span class="text-sm"> {{ category }} </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="md:flex md:items-center">
                    <div class="w-1/4">
                      <label
                        class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        Max
                      </label>
                      <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="number"
                        v-model="maxPrice"
                      />
                    </div>
                    <div class="w-1/4">
                      <label
                        class="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        Max
                      </label>
                      <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="number"
                        v-model="maxStock"
                      />
                    </div>
                    <div class="w-1/4">
                      <label class="md:w-2/3 block text-gray-500 font-bold">
                        <input class="mr-2 leading-tight" type="checkbox" />
                        <span class="text-sm"> Low on Stocks </span>
                      </label>
                    </div>
                    <div class="w-1/4"></div>
                  </div>
                  <div class="md:flex md:items-center">
                    <div class="my-2">
                      <button
                        class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button"
                        @click="applyFilter"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            <ProductCards />
            <!-- <ProductTable /> -->
            <div
              v-if="showModal"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <div class="bg-white dark:bg-gray-800 rounded-lg w-96">
                <div class="flex justify-between items-center mb-4 p-6 border-b-2">
                  <h2 class="text-xl font-bold dark:text-gray-200">Import CSV</h2>
                  <button @click="closeModal" class="text-gray-600 dark:text-gray-300">
                    &times;
                  </button>
                </div>
                <div class="justify-between items-center p-6">
                  <input type="file" accept=".csv" @change="handleFileUpload" />
                  <div class="mt-4 flex justify-end">
                    <button
                      @click="closeModal"
                      class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HeaderComponent from '@/components/Header.vue'
import SidebarComponent from '@/components/Sidebar.vue'
import ProductTable from '@/views/Products.vue'
import ProductCards from '@/views/Cards.vue'
import Swal from 'sweetalert2'
import { useProducts, type Product } from '@/stores/ProductSharedState'

export default defineComponent({
  name: 'LandingPage',
  components: {
    HeaderComponent,
    SidebarComponent,
    ProductTable,
    ProductCards
  },
  setup() {
    const {
      products,
      setProducts,
      getProducts,
      minPrice,
      maxPrice,
      minStock,
      maxStock,
      distinctProducts,
      distinctCategories,
    } = useProducts()
    let loadingSwal: ReturnType<typeof Swal.fire>
    const Loading = (message: string) => {
      loadingSwal = Swal.fire({
        title: message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        heightAuto: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })
    }
    const saveSuccess = (message: string) => {
      if (Swal.isVisible()) {
        Swal.close()
      }
      Swal.fire({
        text: message,
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn fw-semibold btn-light-primary',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    }
    const saveFail = (message: string) => {
      if (Swal.isVisible()) {
        Swal.close()
      }
      Swal.fire({
        text: message,
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn fw-semibold btn-light-primary',
        },
      })
    }
    const showModal = ref(false)
    const closeModal = () => {
      showModal.value = false
    }
    const showFilter = ref(false)
    const toggleFilter = () => {
      showFilter.value = !showFilter.value
    }
    const parseCSV = (csvText: string): Product[] => {
      const lines = csvText.trim().split('\n')
      const dataLines = lines.slice(1)
      return dataLines.map((line) => {
        const [name, price, stock, category] = line.split(',').map((item) => item.trim())
        return {
          name,
          price: Number(price),
          stock: Number(stock),
          category,
        }
      })
    }

    const handleFileUpload = (e: Event) => {
      Loading('Import data from CSV')
      const target = e.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        const file = target.files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
          const csvText = event.target?.result as string
          try {
            const importedProducts = parseCSV(csvText)
            setProducts(importedProducts)
          } catch (error) {
            console.error('Error parsing CSV', error)
            saveFail('Import failed, Please try again')
          }
          saveSuccess('Data imported successfully')
        }
        reader.readAsText(file)
      }
    }

    const applyFilter = () => {
      const originalProducts: Product[] = getProducts()
      products.value = originalProducts.filter(
        (product) =>
          product.price >= minPrice.value &&
          product.price <= maxPrice.value &&
          product.stock >= minStock.value &&
          product.stock <= maxStock.value,
      )
    }

    return {
      products,
      minPrice,
      maxPrice,
      minStock,
      maxStock,
      distinctProducts,
      distinctCategories,
      applyFilter,
      showModal,
      closeModal,
      handleFileUpload,
      Loading,
      saveSuccess,
      saveFail,
      showFilter,
      toggleFilter,
    }
  },
})
</script>
