<script setup lang="ts">
import { useCheckoutStore } from "@/stores/checkout";
const checkout = useCheckoutStore();
</script>

<template>
  <div class="animate-in fade-in slide-in-from-left-4 duration-500 h-full flex flex-col">
    <div class="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-3.5">
      <div class="w-7 lg:w-8 h-7 lg:h-8 bg-teal-50 dark:bg-teal-900/30 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400 text-sm lg:text-base">
        <i class="fa-solid fa-credit-card"></i>
      </div>
      <h2 class="text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">Payment Method</h2>
    </div>

    <div class="space-y-3 lg:space-y-3.5 mb-4 lg:mb-4">
      <div>
        <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 lg:mb-2">Cardholder Name</label>
        <input v-model="checkout.cardName" type="text"
          class="w-full bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl py-2 lg:py-2.5 px-3 lg:px-4 text-xs lg:text-sm font-medium outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
          placeholder="John Doe" />
      </div>

      <div>
        <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 lg:mb-2">Card Number</label>
        <div class="relative">
          <input v-model="checkout.cardNumber" type="text"
            class="w-full bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl py-2 lg:py-2.5 px-3 lg:px-4 text-xs lg:text-sm font-medium outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
            placeholder="0000 0000 0000 0000" />
          <div class="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
            <div class="w-5 lg:w-6 h-3 lg:h-4 bg-slate-400 dark:bg-slate-600 rounded-sm"></div>
            <div class="w-5 lg:w-6 h-3 lg:h-4 bg-slate-600 dark:bg-slate-700 rounded-sm"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-x-3 lg:gap-x-5 gap-y-2.5 lg:gap-y-3">
        <div>
          <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 lg:mb-2">Expiry Date</label>
          <input v-model="checkout.expiry" type="text"
            class="w-full bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl py-2 lg:py-2.5 px-3 lg:px-4 text-xs lg:text-sm font-medium outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
            placeholder="MM/YY" />
        </div>
        <div>
          <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 lg:mb-2">CVV</label>
          <input v-model="checkout.cvv" type="text"
            class="w-full bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl py-2 lg:py-2.5 px-3 lg:px-4 text-xs lg:text-sm font-medium outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
            placeholder="123" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-x-2 lg:gap-x-4 gap-y-2 lg:gap-y-2.5 mt-auto">
      <button
        @click="checkout.goShipping()"
        class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-2 lg:py-2.5 px-2 rounded-xl font-semibold text-xs lg:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
      >
        Go Back
      </button>
      <button
        @click="checkout.goConfirmation()"
        class="bg-teal-600 text-white py-2 lg:py-2.5 px-2 rounded-xl font-bold text-xs lg:text-sm shadow-xl shadow-teal-600/10 hover:bg-teal-700 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        Pay LKR {{ checkout.total.toFixed(2) }}
      </button>
    </div>
  </div>
</template>
