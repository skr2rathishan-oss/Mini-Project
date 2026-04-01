<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUiStore } from './types/ui'
import { useCartStore } from './stores/cartStore'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CartDrawer from "./components/Cart/CartDrawer.vue";
import MobileBottomBar from "./components/MobileDesign/MobileBottomBar.vue";
import MobileNavbar from "./components/MobileDesign/MobileNavbar.vue";

const router = useRouter()
const route = useRoute()
const ui = useUiStore()
const cart = useCartStore()
const cartCount = computed(() => cart.selectedItems.reduce((sum, item) => sum + item.quantity, 0))

const onLogoClick = () => router.push('/')
const onCartClick = () => ui.openCart()

const onSearch = (q: string) => {
  const trimmed = q.trim()
  if (!trimmed) return

  const baseQuery = route.name === 'shop' ? { ...route.query } : {}

  router.push({
    name: 'shop',
    query: {
      ...baseQuery,
      q: trimmed
    }
  })
}

const showFooter = computed(() => {
  const name = route.name
  return name !== 'shop' && name !== 'auth' && name !== 'checkout'
})

const showNavbar = computed(() => {
  return route.name !== 'auth'
})

const hideMobileNavbarOnProductPage = computed(() => {
  const name = route.name
  return name === 'productDetail' || name === 'mobileProductDetail'
})

const showMobileSearch = computed(() => {
  const name = route.name
  return name === 'home' || name === 'shop'
})

</script>

<template>
  <Navbar
    v-if="showNavbar"
    :cartCount="cartCount"
    @logoClick="onLogoClick"
    @cartClick="onCartClick"
    @search="onSearch"
  />

  <MobileNavbar
  :class="hideMobileNavbarOnProductPage ? 'hidden lg:block' : 'block lg:hidden'"
    @search="onSearch"
    :showSearch="showMobileSearch"
/>


  <main :class="showNavbar ? 'min-h-screen lg:pt-20 pb-20 lg:pb-0 bg-white dark:bg-slate-900 transition-colors duration-300' : 'min-h-screen pb-20 lg:pb-0 bg-white dark:bg-slate-900 transition-colors duration-300'">
    <router-view />
    <CartDrawer
      :items="cart.items"
      :selectedItems="cart.selectedItems"
    />
  </main>

  <MobileBottomBar />
  
  <Footer v-if="showFooter" />
</template>
