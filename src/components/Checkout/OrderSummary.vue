<script setup lang="ts">
import { useCheckoutStore } from "@/stores/checkout";

const checkout = useCheckoutStore();
</script>

<template>
  <div class="flex flex-col max-h-96 rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
    <div class="p-4 shrink-0">
      <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        Order Summary
      </h3>
    </div>

    <!-- BUY NOW: Single Item -->
    <template v-if="checkout.mode === 'buyNow' && checkout.buyNowItem">
      <!-- Single Item Display -->
      <div class="flex-grow overflow-y-auto custom-scrollbar px-4 space-y-3 py-3">
        <div class="flex gap-3 group">
          <div
            class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/50 transition-transform group-hover:scale-105"
          >
            <img :src="checkout.buyNowItem.image" :alt="checkout.buyNowItem.name" class="w-full h-full object-cover" />
          </div>

          <div class="flex-grow min-w-0">
            <h4 class="text-[11px] font-bold text-slate-800 truncate leading-tight">{{ checkout.buyNowItem.name }}</h4>

            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[9px] bg-slate-100 px-1 py-0.5 rounded text-slate-500 font-bold">
                Qty {{ checkout.buyNowItem.quantity }}
              </span>

              <span class="text-[11px] font-black text-teal-700">
                LKR {{ checkout.buyNowItem.price.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Section for Buy Now -->
      <div class="p-4 border-t border-slate-100 mt-3">
        <div class="space-y-1.5 mb-4">
          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-500 font-semibold">Subtotal</span>
            <span class="text-slate-800 font-bold">LKR {{ checkout.subtotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-500 font-semibold">Tax (5%)</span>
            <span class="text-slate-800 font-bold">LKR {{ checkout.tax.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-500 font-semibold">Shipping</span>
            <span
              class="font-bold"
              :class="checkout.shipping === 0
                ? 'text-teal-600 text-[9px] uppercase tracking-wider'
                : 'text-slate-800'"
            >
              {{ checkout.shipping === 0 ? 'Free' : `LKR ${checkout.shipping.toFixed(2)}` }}
            </span>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200">
          <div class="flex justify-between items-baseline">
            <div class="space-y-0.5">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                Total Payable
              </span>

              <div class="flex items-center gap-1 text-[8px] text-teal-600 font-bold">
                <i class="fa-solid fa-circle-check"></i>
                Guaranteed Price
              </div>
            </div>

            <div class="text-right">
              <span class="text-2xl font-black text-slate-900 tracking-tighter">
                <span class="text-xs align-top mt-0.5 mr-0.5 font-bold">LKR</span>
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
      <div class="flex-grow overflow-y-auto custom-scrollbar px-4 space-y-3">
        <div v-for="item in checkout.items" :key="item.id" class="flex gap-3 group">
          <div
            class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/50 transition-transform group-hover:scale-105"
          >
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          </div>

          <div class="flex-grow min-w-0">
            <h4 class="text-[11px] font-bold text-slate-800 truncate leading-tight">{{ item.name }}</h4>

            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[9px] bg-slate-100 px-1 py-0.5 rounded text-slate-500 font-bold">
                Qty {{ item.quantity }}
              </span>

              <span class="text-[11px] font-black text-teal-700">
                LKR {{ item.price.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Section for Cart -->
      <div class="p-4 border-t border-slate-100 mt-3">
        <div class="space-y-1.5 mb-4">
          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-500 font-semibold">Subtotal</span>
            <span class="text-slate-800 font-bold">LKR {{ checkout.subtotal.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-500 font-semibold">Tax (5%)</span>
            <span class="text-slate-800 font-bold">LKR {{ checkout.tax.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-500 font-semibold">Shipping</span>
            <span
              class="font-bold"
              :class="checkout.shipping === 0
                ? 'text-teal-600 text-[9px] uppercase tracking-wider'
                : 'text-slate-800'"
            >
              {{ checkout.shipping === 0 ? 'Free' : `LKR ${checkout.shipping.toFixed(2)}` }}
            </span>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200">
          <div class="flex justify-between items-baseline">
            <div class="space-y-0.5">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                Total Payable
              </span>

              <div class="flex items-center gap-1 text-[8px] text-teal-600 font-bold">
                <i class="fa-solid fa-circle-check"></i>
                Guaranteed Price
              </div>
            </div>

            <div class="text-right">
              <span class="text-2xl font-black text-slate-900 tracking-tighter">
                <span class="text-xs align-top mt-0.5 mr-0.5 font-bold">LKR</span>
                {{ checkout.total.toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
