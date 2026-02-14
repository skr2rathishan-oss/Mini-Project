<script setup lang="ts">
import { computed } from "vue";
import { useCheckoutStore } from "@/stores/checkout";

const emit = defineEmits<{ (e: "cancel"): void }>();
const checkout = useCheckoutStore();

const isShipping = computed(() => checkout.step === "shipping");
const isPayment = computed(() => checkout.step === "payment");
const isConfirmation = computed(() => checkout.step === "confirmation");
</script>

<template>
  <header class="px-8 h-16 flex items-center justify-between shrink-0">

    <!-- Step Indicator -->
    <div class="flex-1 flex justify-center">
      <div class="flex items-center gap-6">
        <div :class="`flex items-center gap-2 transition-colors ${isShipping ? 'text-teal-600' : 'text-slate-300'}`">
          <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${isShipping ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`">
            1
          </div>
          <span class="font-bold text-sm">Address</span>
        </div>

        <div class="w-8 h-0.5 bg-slate-100"></div>

        <div :class="`flex items-center gap-2 transition-colors ${isPayment ? 'text-teal-600' : 'text-slate-300'}`">
          <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${isPayment ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`">
            2
          </div>
          <span class="font-bold text-sm">Payment</span>
        </div>

        <div class="w-8 h-0.5 bg-slate-100"></div>

        <div :class="`flex items-center gap-2 transition-colors ${isConfirmation ? 'text-teal-600' : 'text-slate-300'}`">
          <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${isConfirmation ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`">
            3
          </div>
          <span class="font-bold text-sm">Order Confirmation</span>
        </div>
      </div>
    </div>

    
  </header>
</template>
