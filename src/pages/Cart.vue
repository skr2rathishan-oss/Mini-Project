<template>
  <div class="min-h-screen flex flex-col bg-white lg:bg-slate-50">
    <!-- Header -->
    <div class="px-4 lg:px-6 py-4 lg:py-6 border-b border-slate-200 bg-white sticky top-0 z-10">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center gap-3">
          <span class="w-8 lg:w-10 h-8 lg:h-10 bg-teal-600 rounded-lg flex items-center justify-center shadow-md">
            <i class="fa-solid fa-bag-shopping text-white text-base lg:text-lg"></i>
          </span>
          <h1 class="text-xl lg:text-3xl font-bold text-slate-900">Shopping Cart</h1>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl w-full mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <!-- Cart Items - Full width on mobile, 2/3 on desktop -->
      <div class="w-full lg:flex-1">
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

      <!-- Summary & Checkout - Sticky on mobile/desktop -->
      <div class="w-full lg:w-96">
        <CartDrawerFooter
          :selectedCount="cart.selectedItems.length"
          :subtotal="cart.subtotal"
          :progress="cart.progress"
          :total="total"
          :formatMoney="cart.formatMoney"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { computed } from 'vue'
import CartDrawerBody from '../components/Cart/CartDrawerBody.vue'
import CartDrawerFooter from '../components/Cart/CartDrawerFooter.vue'

const router = useRouter()
const cart = useCartStore()

// Calculate total with shipping
const total = computed(() => {
  const shippingFee = cart.progress >= 100 ? 0 : 15
  return cart.subtotal + shippingFee
})

const onClose = () => {
  router.push('/')
}
</script>