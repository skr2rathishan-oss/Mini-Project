<script setup lang="ts">
import type { Product } from "../../types/product";

const props = defineProps<{ products: Product[] }>();
defineEmits<{ (e: "productClick", p: Product): void }>();

const LKR_RATE = 300;

const getPriceLKR = (price: number) => (price * LKR_RATE).toLocaleString();
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    <button
      v-for="p in products"
      :key="p.id"
      type="button"
      @click="$emit('productClick', p)"
      class="group text-left bg-white border border-gray-100 rounded-2xl overflow-hidden
             hover:border-teal-600/40 hover:shadow-md transition"
    >
      <div class="aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
        <img
          :src="p.thumbnail"
          :alt="p.title"
          class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
      </div>

      <div class="p-3">
        <p class="text-sm font-extrabold text-gray-900 line-clamp-2">{{ p.title }}</p>
        <div class="mt-2 flex items-center justify-between">
          <p class="text-teal-700 font-black text-sm">LKR {{ getPriceLKR(p.price) }}</p>
          <p class="text-xs text-gray-400 truncate max-w-[80px]">{{ p.brand }}</p>
        </div>
      </div>
    </button>
  </div>
</template>
