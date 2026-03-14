import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProductPage from '../pages/ProductPage.vue'
import SubProductPage from '../pages/SubProductPage.vue'
import DesignPage from '../pages/DesignPage.vue'
import ComponentsPage from '../pages/ComponentsPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/ai-tools/:category',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/tool/:id',
    name: 'subproduct',
    component: SubProductPage
  },
  {
    path: '/design',
    name: 'design',
    component: DesignPage
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsPage
  },
  {
    // Catch-all redirect to home
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
