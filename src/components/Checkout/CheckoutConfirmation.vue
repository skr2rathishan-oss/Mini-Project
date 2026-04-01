<script setup lang="ts">
const emit = defineEmits<{ (e: "complete"): void }>();
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-6 overflow-hidden">
    <div class="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-xl animate-in zoom-in-95 duration-500">
      <div class="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <!-- CheckCircle2 -->
        <svg class="w-10 h-10 text-teal-600 dark:text-teal-400" viewBox="0 0 24 24" fill="none">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h1 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">Order Confirmed!</h1>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
        Thank you for your purchase. We've sent a confirmation email with your order details and tracking number.
      </p>

      <div class="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-4 mb-6 text-left">
        <div class="flex justify-between text-[11px] mb-2">
          <span class="text-slate-600 dark:text-slate-400 font-semibold">Order Number</span>
          <span class="text-slate-800 dark:text-slate-200 font-bold">#SN-92841</span>
        </div>
        <div class="flex justify-between text-[11px]">
          <span class="text-slate-600 dark:text-slate-400 font-semibold">Estimated Delivery</span>
          <span class="text-slate-800 dark:text-slate-200 font-bold">2-3 Business Days</span>
        </div>
      </div>

      <button
        @click="emit('complete')"
        class="w-full bg-teal-600 text-white py-3 rounded-xl font-bold text-sm shadow-xl shadow-teal-600/10 hover:bg-teal-700 transition-all active:scale-95"
      >
        Continue Shopping
      </button>
    </div>
  </div>
</template>
