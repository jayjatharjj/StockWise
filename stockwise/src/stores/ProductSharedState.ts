import { ref, computed, watch } from 'vue'

export interface Product {
  name: string
  price: number
  stock: number
  category: string
  editing?: boolean
  editingField?: string
  showStock?: boolean
}

const cachedProducts = localStorage.getItem('products')
const defaultProducts: Product[] = [
  { name: 'Product A', price: 29.99, stock: 100, category: 'Electronics' },
  { name: 'Product B', price: 49.99, stock: 50, category: 'Books' },
  { name: 'Product C', price: 19.99, stock: 150, category: 'Clothing' },
  { name: 'Product D', price: 99.99, stock: 20, category: 'Sports' },
]

let products = ref<Product[]>(cachedProducts ? JSON.parse(cachedProducts) : defaultProducts)
if (!cachedProducts) {
  localStorage.setItem('products', JSON.stringify(defaultProducts))
}

export function useProducts() {
  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts
    localStorage.setItem('products', JSON.stringify(newProducts))
  }

  const getProducts = () => {
    const storedProducts = localStorage.getItem('products')
    return storedProducts ? JSON.parse(storedProducts) as Product[] : []
  }

  const minPrice = ref(
    products.value.length ? Math.min(...products.value.map(p => p.price)) : 0
  )

  const maxPrice = ref(
    products.value.length ? Math.max(...products.value.map(p => p.price)) : 0
  )

  const minStock = ref(
    products.value.length ? Math.min(...products.value.map(p => p.stock)) : 0
  )

  const maxStock = ref(
    products.value.length ? Math.max(...products.value.map(p => p.stock)) : 0
  )
  
  const distinctProducts = computed(() => {
    const names = products.value.map(p => p.name)
    return Array.from(new Set(names))
  })

  const distinctCategories = computed(() => {
    const categories = products.value.map(p => p.category)
    return Array.from(new Set(categories))
  })

  return {
    products,
    setProducts,
    getProducts,
    minPrice,
    maxPrice,
    minStock,
    maxStock,
    distinctProducts,
    distinctCategories
  }
}