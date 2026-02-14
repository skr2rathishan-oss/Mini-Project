<script setup lang="ts">
import { computed } from "vue";

type CartItem = any; // replace later with your type

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
      <div class="h-full flex flex-col items-center justify-center p-8 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="fa-solid fa-bag-shopping text-gray-400 text-[20px]"></i>
        </div>
        <h3 class="text-lg font-medium text-gray-900">Your cart is empty</h3>
        <p class="text-sm text-gray-500 mt-2 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          type="button"
          class="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          @click="emit('close')"
        >
          Start Shopping
        </button>
      </div>
    </template>

    <!-- LIST -->
    <template v-else>
      <div class="p-6 space-y-8">
        <!-- Select All -->
        <div class="flex items-center gap-3 pb-4 border-b">
          <input
            type="checkbox"
            :checked="allSelected"
            class="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
            @change="emit('toggleAll', ($event.target as HTMLInputElement).checked)"
          />
          <span class="text-sm font-medium text-gray-700">Select All Items</span>
        </div>

        <!-- Items List -->
        <div class="space-y-6">
          <div v-for="item in items" :key="item.product.id" class="flex gap-4">
            <input
              type="checkbox"
              :checked="item.selected"
              class="mt-2 w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              @change="emit('toggleSelection', item.product.id)"
            />

            <img
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="w-16 h-16 rounded-xl object-cover bg-gray-100"
            />

            <div class="flex-1">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-bold text-gray-900 line-clamp-1">
                    {{ item.product.title }}
                  </p>
                  <p class="text-xs text-gray-500 mt-0.5">
                    {{ formatMoney(item.product.price) }}
                  </p>
                </div>

                <button
                  type="button"
                  class="p-2 rounded-full hover:bg-gray-100 transition"
                  aria-label="Remove item"
                  @click="emit('removeItem', item.product.id)"
                >
                  <i class="fa-solid fa-trash text-gray-500"></i>
                </button>
              </div>

              <div class="mt-3 flex items-center justify-between">
                <div class="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    class="px-3 py-2 hover:bg-gray-50"
                    @click="emit('updateQuantity', item.product.id, -1)"
                  >
                    −
                  </button>
                  <span class="px-4 py-2 text-sm font-bold text-gray-900">{{ item.quantity }}</span>
                  <button
                    type="button"
                    class="px-3 py-2 hover:bg-gray-50"
                    @click="emit('updateQuantity', item.product.id, +1)"
                  >
                    +
                  </button>
                </div>

                <p class="text-sm font-bold text-gray-900">
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
