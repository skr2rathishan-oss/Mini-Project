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
  <div class="rounded-2xl bg-white border border-slate-200 shadow-lg p-4 lg:p-6 sticky bottom-0 lg:relative">
    <!-- Promo Code Button - Hidden on mobile initially -->
    <button
      type="button"
      class="hidden lg:flex w-full items-center justify-between mb-6 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
    >
      <span class="flex items-center gap-2">
        <i class="fa-solid fa-gift group-hover:scale-110 transition-transform"></i> Add a promo code
      </span>
      <i class="fa-solid fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
    </button>

    <!-- Summary breakdown -->
    <div class="space-y-2 mb-4 lg:mb-6 pb-4 lg:pb-6 border-b border-slate-200">
      <div class="flex justify-between text-xs lg:text-sm text-slate-600">
        <span>Subtotal</span>
        <span class="font-semibold text-slate-900">{{ formatMoney(subtotal) }}</span>
      </div>

      <div class="flex justify-between text-xs lg:text-sm text-slate-600">
        <span>Shipping</span>
        <span :class="progress === 100 ? 'text-teal-600 font-semibold' : 'text-slate-900 font-semibold'">
          {{ progress === 100 ? "FREE" : formatMoney(15) }}
        </span>
      </div>

      <!-- Free Shipping Progress -->
      <div v-if="progress < 100" class="mt-3 pt-3 border-t border-slate-200">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[11px] lg:text-xs font-semibold text-slate-600">Free Shipping Progress</span>
          <span class="text-[11px] lg:text-xs font-bold text-teal-600">{{ Math.round(progress) }}%</span>
        </div>
        <div class="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div class="h-full bg-linear-to-r from-teal-500 to-teal-600 rounded-full" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Total Amount -->
    <div class="mb-4 lg:mb-6 space-y-2">
      <div class="flex items-end justify-between gap-2">
        <span class="text-sm lg:text-base font-bold text-slate-600">Total Amount:</span>
        <div class="text-right">
          <p class="text-2xl lg:text-3xl font-black text-teal-600">{{ formatMoney(total) }}</p>
          <p class="text-[10px] lg:text-xs text-slate-500 mt-0.5">{{ selectedCount }} item{{ selectedCount !== 1 ? 's' : '' }} selected</p>
        </div>
      </div>
    </div>

    <!-- Checkout Button -->
    <button
      type="button"
      :disabled="selectedCount === 0"
      class="w-full py-3 lg:py-4 rounded-xl lg:rounded-2xl flex items-center justify-center gap-2 font-bold text-sm lg:text-base transition-all duration-300 active:scale-95"
      :class="selectedCount > 0
        ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 cursor-pointer'
        : 'bg-slate-200 text-slate-400 cursor-not-allowed'"
      @click="handleCheckout"
    >
      <template v-if="selectedCount > 0">
        <i class="fa-solid fa-lock text-sm"></i>
        <span>Secure Checkout</span>
      </template>
      <template v-else>
        <i class="fa-solid fa-check-circle text-sm"></i>
        <span>Select Items to Checkout</span>
      </template>
    </button>

    <!-- Mobile-only note -->
    <p class="text-[11px] lg:text-xs text-slate-500 text-center mt-3 lg:mt-4">
      <i class="fa-solid fa-shield-halved text-xs mr-1 text-teal-600"></i>
      Secure & encrypted checkout
    </p>
  </div>
</template>
