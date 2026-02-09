<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const cart = useCartStore()
const router = useRouter()

// optional: simple shipping/tax examples (you can remove if not needed)
const shipping = computed(() => (cart.subtotal > 50000 || cart.count === 0 ? 0 : 1500))
const total = computed(() => cart.subtotal + shipping.value)
</script>

<template>
  <div class="container mx-auto px-4 py-10">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl md:text-3xl font-black text-gray-800">
        Your <span class="text-[#00a8c1]">Cart</span>
      </h1>

      <button
        v-if="cart.count"
        class="text-sm font-bold text-rose-600 hover:underline"
        @click="cart.clear()"
      >
        Clear cart
      </button>
    </div>

    <!-- Empty cart -->
    <div v-if="cart.count === 0" class="border rounded-2xl p-8 text-center">
      <p class="text-gray-600 font-semibold">Your cart is empty.</p>
      <button
        class="mt-5 bg-[#00a8c1] text-white px-6 py-3 rounded-xl font-black hover:bg-[#008ba0] transition"
        @click="router.push('/')"
      >
        Continue Shopping
      </button>
    </div>

    <!-- Cart items + summary -->
    <div v-else class="grid lg:grid-cols-3 gap-8">
      <!-- Items -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cart.items"
          :key="item.product.id"
          class="flex gap-4 border rounded-2xl p-4"
        >
          <img
            :src="item.product.thumbnail"
            :alt="item.product.title"
            class="w-24 h-24 object-cover rounded-xl"
          />

          <div class="flex-1">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-black text-gray-800 line-clamp-1">
                  {{ item.product.title }}
                </p>
                <p class="text-xs text-gray-500 mt-1 line-clamp-2">
                  {{ item.product.description }}
                </p>
              </div>

              <button
                class="text-rose-600 text-sm font-bold hover:underline"
                @click="cart.remove(item.product.id)"
              >
                Remove
              </button>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <p class="font-black text-[#00a8c1]">
                LKR {{ item.product.price.toLocaleString() }}
              </p>

              <!-- Quantity control -->
              <div class="flex items-center gap-2">
                <button
                  class="w-9 h-9 rounded-lg border hover:bg-gray-50 font-black"
                  @click="cart.dec(item.product.id)"
                >
                  -
                </button>
                <span class="w-10 text-center font-black">{{ item.quantity }}</span>
                <button
                  class="w-9 h-9 rounded-lg border hover:bg-gray-50 font-black"
                  @click="cart.inc(item.product.id)"
                >
                  +
                </button>
              </div>
            </div>

            <div class="mt-2 text-right text-sm font-bold text-gray-700">
              Item total:
              <span class="font-black">
                LKR {{ (item.product.price * item.quantity).toLocaleString() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="border rounded-2xl p-6 h-fit">
        <h2 class="text-lg font-black text-gray-800 mb-4">Summary</h2>

        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Items</span>
            <span class="font-bold">{{ cart.count }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal</span>
            <span class="font-bold">LKR {{ cart.subtotal.toLocaleString() }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-600">Shipping</span>
            <span class="font-bold">LKR {{ shipping.toLocaleString() }}</span>
          </div>

          <div class="border-t pt-3 flex justify-between text-base">
            <span class="font-black">Total</span>
            <span class="font-black text-[#00a8c1]">LKR {{ total.toLocaleString() }}</span>
          </div>
        </div>

        <button
          class="mt-6 w-full bg-[#00a8c1] text-white py-3 rounded-xl font-black hover:bg-[#008ba0] transition"
          @click="router.push('/checkout')"
        >
          Checkout
        </button>

        <button
          class="mt-3 w-full border py-3 rounded-xl font-black hover:bg-gray-50 transition"
          @click="router.push('/')"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</template>
