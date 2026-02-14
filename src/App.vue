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

const onSearch = (q: string) => alert('Searching: ' + q)

</script>

<template>
  <Navbar
    :cartCount="cartCount"
    @logoClick="onLogoClick"
    @cartClick="onCartClick"
    @search="onSearch"
  />

  <main class="min-h-screen">
    <router-view />
    <CartDrawer
      :items="cart.items"
      :selectedItems="cart.selectedItems"
    />
  </main>

  <Footer />
</template>
