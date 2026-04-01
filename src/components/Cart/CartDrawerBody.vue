<script setup lang="ts">
import { computed } from "vue";

import type { CartItem } from "../../types/cart";

const props = defineProps<{
  items: CartItem[];
  selectedItems: CartItem[];
  progress: number;
  remainingForFreeShipping: number;
  formatMoney: (n: number) => string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "toggleAll", checked: boolean): void;
  (e: "toggleSelection", productId: number): void;
  (e: "removeItem", productId: number): void;
  (e: "updateQuantity", productId: number, delta: number): void;
}>();

const allSelected = computed(
  () => props.items.length > 0 && props.items.every((i) => i.selected)
);
</script>

<template>
  

  <!-- Items Area -->
  <div class="flex-1 overflow-y-auto">
    <!-- EMPTY -->
    <template v-if="items.length === 0">
      <div class="h-full flex flex-col items-center justify-center px-4 lg:px-8 py-12 text-center">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <i class="fa-solid fa-bag-shopping text-slate-400 text-xl"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mt-2">Your cart is empty</h3>
        <p class="text-sm text-slate-500 mt-2 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          type="button"
          class="px-8 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors active:scale-95"
          @click="emit('close')"
        >
          Start Shopping
        </button>
      </div>
    </template>

    <!-- LIST -->
    <template v-else>
      <div class="space-y-4 lg:space-y-6">
        <!-- Select All -->
        <div class="px-4 lg:px-6 pt-4 lg:pt-6 pb-3 lg:pb-4 border-b border-slate-200">
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              :checked="allSelected"
              class="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
              @change="emit('toggleAll', ($event.target as HTMLInputElement).checked)"
            />
            <span class="text-sm font-semibold text-slate-700">Select All Items ({{ items.length }})</span>
          </label>
        </div>

        <!-- Items List -->
        <div class="px-4 lg:px-6 space-y-3 lg:space-y-4 pb-4 lg:pb-6">
          <div v-for="item in items" :key="item.product.id" class="flex gap-3 lg:gap-4 pb-3 lg:pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
            <!-- Checkbox -->
            <label class="flex items-start pt-1 cursor-pointer">
              <input
                type="checkbox"
                :checked="item.selected"
                class="w-5 h-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer mt-0.5"
                @change="emit('toggleSelection', item.product.id)"
              />
            </label>

            <!-- Product Image -->
            <img
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="w-20 h-20 lg:w-24 lg:h-24 rounded-lg object-cover bg-slate-100 shrink-0"
            />

            <!-- Product Info -->
            <div class="flex-1 min-w-0 flex flex-col">
              <div class="flex items-start justify-between gap-2 mb-2">
                <div class="min-w-0">
                  <p class="text-sm lg:text-base font-bold text-slate-900 line-clamp-2">
                    {{ item.product.title }}
                  </p>
                  <p class="text-xs lg:text-sm text-teal-600 font-semibold mt-1">
                    {{ formatMoney(item.product.price) }}
                  </p>
                </div>
                <!-- Remove Button -->
                <button
                  type="button"
                  class="p-1.5 rounded-lg hover:bg-red-50 transition text-red-500 hover:text-red-600 shrink-0"
                  aria-label="Remove item"
                  @click="emit('removeItem', item.product.id)"
                >
                  <i class="fa-solid fa-trash text-base"></i>
                </button>
              </div>

              <!-- Quantity & Total Price -->
              <div class="flex items-center justify-between gap-2 mt-auto">
                <div class="inline-flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    type="button"
                    class="px-2.5 lg:px-3 py-1.5 lg:py-2 hover:bg-slate-100 active:bg-slate-200 transition text-slate-600 font-semibold"
                    @click="emit('updateQuantity', item.product.id, -1)"
                  >
                    −
                  </button>
                  <span class="px-3 lg:px-4 py-1.5 lg:py-2 text-sm lg:text-base font-bold text-slate-900 min-w-12 text-center">{{ item.quantity }}</span>
                  <button
                    type="button"
                    class="px-2.5 lg:px-3 py-1.5 lg:py-2 hover:bg-slate-100 active:bg-slate-200 transition text-slate-600 font-semibold"
                    @click="emit('updateQuantity', item.product.id, +1)"
                  >
                    +
                  </button>
                </div>

                <p class="text-sm lg:text-base font-bold text-slate-900 min-w-fit">
                  {{ formatMoney(item.product.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>
