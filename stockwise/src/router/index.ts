import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '@/views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products',
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductsPage,
    },
  ],
})

export default router
