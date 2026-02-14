<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>
    <CartDrawerBody
      :items="cart.items"
      :selectedItems="cart.selectedItems"
      :progress="cart.progress"
      :remainingForFreeShipping="cart.remainingForFreeShipping"
      :formatMoney="cart.formatMoney"
      @close="onClose"
      @toggleAll="cart.toggleAll"
      @toggleSelection="cart.toggleSelection"
      @removeItem="cart.removeItem"
      @updateQuantity="cart.updateQuantity"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '../types/cart'
import CartDrawerBody from '../components/Cart/CartDrawerBody.vue'

const router = useRouter()
const cart = useCartStore()

const onClose = () => {
  router.push('/')
}
</script>