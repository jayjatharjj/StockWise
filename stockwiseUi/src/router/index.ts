import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import ProductTable from '@/views/Products.vue'
import ProductCards from '@/views/Cards.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/cards',
      component: LandingPage,
      children: [
        {
          path: '/products',
          name: 'Products',
          component: ProductTable,
        },
        {
          path: '/cards',
          name: 'Cards',
          component: ProductCards,
        },
      ],
    },
  ],
})

export default router
