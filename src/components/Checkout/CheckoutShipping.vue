<script setup lang="ts">
import { computed } from "vue";
import { useCheckoutStore } from "@/stores/checkout";
import { SHIPPING_OPTIONS, type ShippingOption } from "../../constants/shipping";

const checkout = useCheckoutStore();

const selectedShipping = computed(() => checkout.selectedShipping);

function setSelectedShipping(option: ShippingOption) {
  checkout.selectedShipping = option;
}

function onNext() {
  // Simple validation
  if (
    !checkout.address.fullName.trim() ||
    !checkout.address.street.trim() ||
    !checkout.address.city.trim() ||
    !checkout.address.zipCode.trim()
  ) {
    alert("Please fill all required shipping fields.");
    return;
  }

  checkout.goPayment();
}
</script>

<template>
  <div class="animate-in slide-in-from-left-4 duration-500 flex flex-col">
    <!-- Header -->
    <div class="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
      <div class="w-7 lg:w-8 h-7 lg:h-8 bg-teal-50 dark:bg-teal-900/30 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400 text-sm lg:text-base">
        <i class="fa-solid fa-truck"></i>
      </div>
      <h2 class="text-lg lg:text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">Shipping Information</h2>
    </div>

    <!-- Inputs -->
    <div class="grid grid-cols-2 gap-x-3 lg:gap-x-4 gap-y-2 lg:gap-y-3 mb-6">
      <div class="col-span-2">
        <input
          type="text"
          v-model="checkout.address.fullName"
          placeholder="Recipient Full Name"
          class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-xs lg:text-sm font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
        />
      </div>

      <div class="col-span-2">
        <input
          type="text"
          v-model="checkout.address.street"
          placeholder="Address (Street, House No.)"
          class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-xs lg:text-sm font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
        />
      </div>

      <div>
        <input
          type="text"
          v-model="checkout.address.city"
          placeholder="City"
          class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-xs lg:text-sm font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
        />
      </div>

      <div>
        <input
          type="text"
          v-model="checkout.address.zipCode"
          placeholder="Zip Code"
          class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-xs lg:text-sm font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
        />
      </div>
    </div>

    <!-- Delivery Options -->
    <div class="mb-4 lg:mb-6">
      <label class="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 lg:mb-3 block">
        Delivery Options
      </label>

      <div class="space-y-1.5 lg:space-y-2">
        <div
          v-for="option in SHIPPING_OPTIONS"
          :key="option.id"
          @click="setSelectedShipping(option)"
          class="flex items-center justify-between p-2 lg:p-3 rounded-xl border-2 cursor-pointer transition-all"
          :class="selectedShipping.id === option.id
            ? 'border-teal-600 bg-teal-50/20 dark:bg-teal-900/20'
            : 'border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/50'"
        >
          <div class="flex items-center gap-2 lg:gap-3">
            <div
              class="w-8 lg:w-10 h-8 lg:h-10 rounded-lg flex items-center justify-center transition-colors text-xs lg:text-sm"
              :class="selectedShipping.id === option.id ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'"
            >
              <i :class="`fa-solid fa-${option.icon}`"></i>
            </div>

            <div>
              <h4 class="text-[11px] lg:text-xs font-bold text-slate-800 dark:text-slate-200">{{ option.name }}</h4>
              <p class="text-[9px] lg:text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{{ option.duration }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 lg:gap-3">
            <span class="text-[10px] lg:text-xs font-bold" :class="option.price === 0 ? 'text-teal-600 dark:text-teal-400' : 'text-slate-700 dark:text-slate-300'">
              {{ option.price === 0 ? 'Free' : `LKR ${option.price.toFixed(2)}` }}
            </span>

            <div
              class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
              :class="selectedShipping.id === option.id ? 'border-teal-600 bg-teal-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'"
            >
              <i v-if="selectedShipping.id === option.id" class="fa-solid fa-check text-[7px] lg:text-[8px] text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Next button -->
    <button
      @click="onNext"
      class="w-full py-2 lg:py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-xl shadow-teal-600/10 transition-all flex items-center justify-center gap-2 lg:gap-3 text-xs lg:text-sm"
    >
      Proceed to Payment
      <i class="fa-solid fa-chevron-right text-[8px] lg:text-[10px]"></i>
    </button>
  </div>
</template>
