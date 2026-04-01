<script setup lang="ts">
import { useCheckoutStore } from "@/stores/checkout";

const checkout = useCheckoutStore();
</script>

<template>
  <div class="flex flex-col max-h-96 lg:max-h-screen rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700 overflow-hidden dark:bg-slate-800">
    <div class="p-3 lg:p-4 shrink-0">
      <h3 class="text-[9px] lg:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
        Order Summary
      </h3>
    </div>

    <!-- BUY NOW: Single Item -->
    <template v-if="checkout.mode === 'buyNow' && checkout.buyNowItem">
      <!-- Single Item Display -->
      <div class="grow overflow-y-auto custom-scrollbar px-3 lg:px-4 space-y-2 lg:space-y-3 py-2 lg:py-3">
        <div class="flex gap-2 lg:gap-3 group">
          <div
            class="w-10 lg:w-12 h-10 lg:h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700 border border-slate-200/50 dark:border-slate-600/50 transition-transform group-hover:scale-105"
          >
            <img :src="checkout.buyNowItem.image" :alt="checkout.buyNowItem.name" class="w-full h-full object-cover" />
          </div>

          <div class="grow min-w-0">
            <h4 class="text-[10px] lg:text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">{{ checkout.buyNowItem.name }}</h4>

            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[8px] lg:text-[9px] bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-slate-500 dark:text-slate-400 font-bold">
                Qty {{ checkout.buyNowItem.quantity }}
              </span>

              <span class="text-[10px] lg:text-[11px] font-black text-teal-700 dark:text-teal-400">
                LKR {{ checkout.buyNowItem.price.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Section for Buy Now -->
      <div class="p-3 lg:p-4 border-t border-slate-100 dark:border-slate-700 mt-2 lg:mt-3">
        <div class="space-y-1 lg:space-y-1.5 mb-3 lg:mb-4">
          <div class="flex justify-between items-center text-[10px] lg:text-[11px]">
            <span class="text-slate-500 dark:text-slate-400 font-semibold">Subtotal</span>
            <span class="text-slate-800 dark:text-slate-200 font-bold">LKR {{ checkout.subtotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center text-[10px] lg:text-[11px]">
            <span class="text-slate-500 dark:text-slate-400 font-semibold">Tax (5%)</span>
            <span class="text-slate-800 dark:text-slate-200 font-bold">LKR {{ checkout.tax.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center text-[10px] lg:text-[11px]">
            <span class="text-slate-500 dark:text-slate-400 font-semibold">Shipping</span>
            <span
              class="font-bold"
              :class="checkout.shipping === 0
                ? 'text-teal-600 dark:text-teal-400 text-[8px] lg:text-[9px] uppercase tracking-wider'
                : 'text-slate-800 dark:text-slate-200'"
            >
              {{ checkout.shipping === 0 ? 'Free' : `LKR ${checkout.shipping.toFixed(2)}` }}
            </span>
          </div>
        </div>

        <div class="pt-2 lg:pt-3 border-t border-slate-200 dark:border-slate-700">
          <div class="flex justify-between items-baseline">
            <div class="space-y-0.5">
              <span class="text-[8px] lg:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                Total Payable
              </span>

              <div class="flex items-center gap-1 text-[7px] lg:text-[8px] text-teal-600 dark:text-teal-400 font-bold">
                <i class="fa-solid fa-circle-check"></i>
                Guaranteed Price
              </div>
            </div>

            <div class="text-right">
              <span class="text-lg lg:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                <span class="text-[8px] lg:text-xs align-top mt-0.5 mr-0.5 font-bold">LKR</span>
                {{ checkout.total.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- CART: Multiple Items List -->
    <template v-else>
      <!-- Item List Scrollable area -->
      <div class="grow overflow-y-auto custom-scrollbar px-3 lg:px-4 space-y-2 lg:space-y-3">
        <div v-for="item in checkout.items" :key="item.id" class="flex gap-2 lg:gap-3 group">
          <div
            class="w-10 lg:w-12 h-10 lg:h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700 border border-slate-200/50 dark:border-slate-600/50 transition-transform group-hover:scale-105"
          >
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          </div>

          <div class="grow min-w-0">
            <h4 class="text-[10px] lg:text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">{{ item.name }}</h4>

            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[8px] lg:text-[9px] bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-slate-500 dark:text-slate-400 font-bold">
                Qty {{ item.quantity }}
              </span>

              <span class="text-[10px] lg:text-[11px] font-black text-teal-700 dark:text-teal-400">
                LKR {{ item.price.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Section for Cart -->
      <div class="p-3 lg:p-4 border-t border-slate-100 dark:border-slate-700 mt-2 lg:mt-3">
        <div class="space-y-1 lg:space-y-1.5 mb-3 lg:mb-4">
          <div class="flex justify-between items-center text-[10px] lg:text-[11px]">
            <span class="text-slate-500 dark:text-slate-400 font-semibold">Subtotal</span>
            <span class="text-slate-800 dark:text-slate-200 font-bold">LKR {{ checkout.subtotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center text-[10px] lg:text-[11px]">
            <span class="text-slate-500 dark:text-slate-400 font-semibold">Tax (5%)</span>
            <span class="text-slate-800 dark:text-slate-200 font-bold">LKR {{ checkout.tax.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center text-[10px] lg:text-[11px]">
            <span class="text-slate-500 dark:text-slate-400 font-semibold">Shipping</span>
            <span
              class="font-bold"
              :class="checkout.shipping === 0
                ? 'text-teal-600 dark:text-teal-400 text-[8px] lg:text-[9px] uppercase tracking-wider'
                : 'text-slate-800 dark:text-slate-200'"
            >
              {{ checkout.shipping === 0 ? 'Free' : `LKR ${checkout.shipping.toFixed(2)}` }}
            </span>
          </div>
        </div>

        <div class="pt-2 lg:pt-3 border-t border-slate-200 dark:border-slate-700">
          <div class="flex justify-between items-baseline">
            <div class="space-y-0.5">
              <span class="text-[8px] lg:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                Total Payable
              </span>

              <div class="flex items-center gap-1 text-[7px] lg:text-[8px] text-teal-600 dark:text-teal-400 font-bold">
                <i class="fa-solid fa-circle-check"></i>
                Guaranteed Price
              </div>
            </div>

            <div class="text-right">
              <span class="text-lg lg:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                <span class="text-[8px] lg:text-xs align-top mt-0.5 mr-0.5 font-bold">LKR</span>
                {{ checkout.total.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
