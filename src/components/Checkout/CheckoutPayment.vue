<script setup lang="ts">
import { useCheckoutStore } from "@/stores/checkout";
const checkout = useCheckoutStore();
</script>

<template>
  <div class="animate-in fade-in slide-in-from-left-4 duration-500">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
        <i class="fa-solid fa-credit-card"></i>
      </div>
      <h2 class="text-xl font-bold text-slate-800 tracking-tight">Payment Method</h2>
    </div>

    <div class="space-y-3 mb-6">
      <div>
        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cardholder Name</label>
        <input v-model="checkout.cardName" type="text"
          class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          placeholder="John Doe" />
      </div>

      <div>
        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Card Number</label>
        <div class="relative">
          <input v-model="checkout.cardNumber" type="text"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            placeholder="0000 0000 0000 0000" />
          <div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
            <div class="w-6 h-4 bg-slate-400 rounded-sm"></div>
            <div class="w-6 h-4 bg-slate-600 rounded-sm"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-x-4">
        <div>
          <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Expiry Date</label>
          <input v-model="checkout.expiry" type="text"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            placeholder="MM/YY" />
        </div>
        <div>
          <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">CVV</label>
          <input v-model="checkout.cvv" type="text"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            placeholder="123" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-x-4 gap-y-3">
      <button
        @click="checkout.goShipping()"
        class="bg-slate-50 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
      >
        Go Back
      </button>
      <button
        @click="checkout.goConfirmation()"
        class="bg-teal-600 text-white py-3 rounded-xl font-bold text-sm shadow-xl shadow-teal-600/10 hover:bg-teal-700 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        Pay LKR {{ checkout.total.toFixed(2) }}
      </button>
    </div>
  </div>
</template>
