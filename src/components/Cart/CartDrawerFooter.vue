<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps<{
  selectedCount: number;
  subtotal: number;
  progress: number;
  total: number;
  formatMoney: (n: number) => string;
}>();

function handleCheckout() {
  router.push('/checkout');
}
</script>

<template>
  <div class="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
    <button
      type="button"
      class="flex items-center justify-between w-full mb-4 text-sm font-medium text-gray-600 hover:text-black transition-colors"
    >
      <span class="flex items-center gap-2">
        <i class="fa-solid fa-gift"></i> Add a promo code
      </span>
      <i class="fa-solid fa-chevron-right"></i>
    </button>

    <div class="space-y-2 mb-6">
      <div class="flex justify-between text-sm text-gray-600">
        <span>Subtotal ({{ selectedCount }} items)</span>
        <span>{{ formatMoney(subtotal) }}</span>
      </div>

      <div class="flex justify-between text-sm text-gray-600">
        <span>Estimated Shipping</span>
        <span :class="progress === 100 ? 'text-green-600 font-medium' : ''">
          {{ progress === 100 ? "FREE" : formatMoney(15) }}
        </span>
      </div>

      <div class="flex justify-between text-base font-bold text-gray-900 pt-2 border-t mt-2">
        <span>Total</span>
        <span>{{ formatMoney(total) }}</span>
      </div>
    </div>

    <button
      type="button"
      :disabled="selectedCount === 0"
      class="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300"
      :class="selectedCount > 0
        ? 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg active:scale-[0.98] cursor-pointer'
        : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
      @click="handleCheckout"
    >
      <template v-if="selectedCount > 0">
        <i class="fa-solid fa-lock "></i>
        Secure Checkout
      </template>
      <template v-else>
        Select Items to Checkout
      </template>
    </button>

   
  </div>
</template>
