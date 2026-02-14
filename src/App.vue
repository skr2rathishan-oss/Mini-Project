<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from './types/ui'
import { useCartStore } from './types/cart'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer..vue'
import CartDrawer from "./components/Cart/CartDrawer.vue";

const router = useRouter()
const ui = useUiStore()
const cart = useCartStore()
const cartCount = computed(() => cart.selectedItems.reduce((sum, item) => sum + item.quantity, 0))

const onLogoClick = () => router.push('/')
const onCartClick = () => ui.openCart()

const onSearch = (q: string) => {
  if (q.trim()) {
    const currentRoute = router.currentRoute.value.name
    if (currentRoute === 'Shop') {
      // Stay on shop page but update search
      router.push({ name: 'Shop', query: { q } })
    } else {
      // Go to home page with search
      router.push({ name: 'home', query: { q } })
    }
  }
}

const showFooter = computed(() => {
  const currentRoute = router.currentRoute.value.name
  return currentRoute !== 'Shop' && currentRoute !== 'auth'
})

const showNavbar = computed(() => {
  const currentRoute = router.currentRoute.value.name
  return currentRoute !== 'auth'
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

  <main :class="showNavbar ? 'min-h-screen pt-20' : 'h-screen'">
    <router-view />
    <CartDrawer
      :items="cart.items"
      :selectedItems="cart.selectedItems"
    />
  </main>

  <Footer v-if="showFooter" />
</template>
