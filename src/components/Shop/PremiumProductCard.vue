<script setup lang="ts">
import type { Product } from "../../types/product";
import { computed } from 'vue';

const props = defineProps<{ product: Product }>();
defineEmits<{ (e: "add", p: Product): void; (e: "click", p: Product): void }>();

const LKR_RATE = 300;

const priceLKR = computed(() => (props.product.price * LKR_RATE).toLocaleString());
</script>

<template>
  <div class="group relative flex flex-col bg-white dark:bg-slate-800 rounded-lg lg:rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm lg:hover:shadow-lg lg:transition-shadow lg:duration-300" style="height: calc(100% - 2px);">
    <!-- Image Section -->
    <div class="relative">
      <button
        type="button"
        class="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-700 text-left cursor-pointer"
        @click="$emit('click', product)"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-full object-cover lg:group-hover:scale-110 lg:transition-transform lg:duration-700 lg:ease-out"
          loading="lazy"
        />

        <!-- Discount badge -->
        <div v-if="product.discountPercentage > 0" class="absolute top-2 left-2 lg:top-3 lg:left-3">
          <div
            class="px-1.5 py-0.5 lg:px-2 lg:py-0.5 bg-white/90 backdrop-blur text-[8px] lg:text-[9px] font-black text-slate-950 rounded-full
                   border border-slate-200 uppercase tracking-widest shadow-sm"
          >
            -{{ Math.round(product.discountPercentage) }}%
          </div>
        </div>

        <!-- Hover Add to Cart -->
        <div
          class="absolute bottom-2 left-2 right-2 lg:bottom-4 lg:left-4 lg:right-4 lg:translate-y-4 lg:opacity-0
                 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:transition-all lg:duration-500"
        >
          <button
            type="button"
            class="w-full bg-slate-950 text-white py-2 lg:py-3 rounded-lg lg:rounded-xl font-bold text-xs lg:text-sm flex items-center justify-center gap-2
                   hover:bg-teal-600 transition-all shadow-xl shadow-slate-950/20"
            @click.stop="$emit('add', product)"
          >
            + Add to Cart
          </button>
        </div>
      </button>
    </div>

    <!-- Details Section -->
    <div class="px-1.5 py-1.5 lg:px-4 lg:py-3 bg-white dark:bg-slate-800">
      <div class="flex items-center justify-between mb-1 lg:mb-2">
        <p class="text-[7px] lg:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.12em] lg:tracking-[0.15em]">
          {{ product.category }}
        </p>
        <div class="flex items-center gap-0.5">
          <span class="text-amber-400 text-xs lg:text-sm">★</span>
          <span class="text-[8px] lg:text-[10px] font-bold text-slate-900 dark:text-slate-100">{{ product.rating }}</span>
        </div>
      </div>

      <h3 class="text-xs lg:text-sm font-bold text-slate-950 dark:text-slate-100 mb-1 lg:mb-2 lg:group-hover:text-teal-600 lg:transition-colors leading-tight line-clamp-2">
        {{ product.title }}
      </h3>

      <span class="text-sm lg:text-base font-black text-slate-950 dark:text-slate-100 tracking-tighter">
        LKR {{ priceLKR }}
      </span>
    </div>
  </div>
</template>
