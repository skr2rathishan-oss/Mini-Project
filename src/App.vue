<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUiStore } from './types/ui'
import { useCartStore } from './types/cart'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer..vue'
import CartDrawer from "./components/Cart/CartDrawer.vue";

const router = useRouter()
const ui = useUiStore()
const cart = useCartStore()
const cartCount = cart.count

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
