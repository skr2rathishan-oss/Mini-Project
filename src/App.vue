<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from './types/ui'
import { useCartStore } from './types/cart'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer..vue'
import CartDrawer from "./components/Cart/CartDrawer.vue";
import MobileBottomBar from "./components/MobileDesign/MobileBottomBar.vue";
import MobileNavbar from "./components/MobileDesign/MobileNavbar.vue";

const router = useRouter()
const ui = useUiStore()
const cart = useCartStore()
const cartCount = computed(() => cart.selectedItems.reduce((sum, item) => sum + item.quantity, 0))

const onLogoClick = () => router.push('/')
const onCartClick = () => ui.openCart()

const onSearch = (q: string) => {
  const trimmed = q.trim()
  if (!trimmed) return

  const currentRoute = router.currentRoute.value
  const baseQuery = currentRoute.name === 'shop' ? { ...currentRoute.query } : {}

  router.push({
    name: 'shop',
    query: {
      ...baseQuery,
      q: trimmed
    }
  })
}

const showFooter = computed(() => {
  const currentRoute = router.currentRoute.value.name
  return currentRoute !== 'shop' && currentRoute !== 'auth' && currentRoute !== 'checkout'
})

const showNavbar = computed(() => {
  const currentRoute = router.currentRoute.value.name
  return currentRoute !== 'auth'
})

const hideMobileNavbarOnProductPage = computed(() => {
  const currentRoute = router.currentRoute.value.name
  return currentRoute === 'productDetail' || currentRoute === 'mobileProductDetail'
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
/>


  <main :class="showNavbar ? 'min-h-screen lg:pt-20 pb-20 lg:pb-0' : 'min-h-screen pb-20 lg:pb-0'">
    <router-view />
    <CartDrawer
      :items="cart.items"
      :selectedItems="cart.selectedItems"
    />
  </main>

  <MobileBottomBar />
  
  <Footer v-if="showFooter" />
</template>
