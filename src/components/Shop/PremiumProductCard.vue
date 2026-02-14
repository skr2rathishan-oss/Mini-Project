<script setup lang="ts">
import type { Product } from "../../types/product";
import { computed } from 'vue';

const props = defineProps<{ product: Product }>();
defineEmits<{ (e: "add", p: Product): void; (e: "click", p: Product): void }>();

const LKR_RATE = 300;

const priceLKR = computed(() => (props.product.price * LKR_RATE).toLocaleString());
</script>

<template>
  <div class="group relative flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300" style="height: calc(100% - 5px);">
    <!-- Image Section -->
    <div class="relative">
      <button
        type="button"
        class="relative aspect-square w-full overflow-hidden bg-slate-100 text-left cursor-pointer"
        @click="$emit('click', product)"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        <!-- Discount badge -->
        <div v-if="product.discountPercentage > 0" class="absolute top-3 left-3">
          <div
            class="px-2 py-0.5 bg-white/90 backdrop-blur text-[9px] font-black text-slate-950 rounded-full
                   border border-slate-200 uppercase tracking-widest shadow-sm"
          >
            -{{ Math.round(product.discountPercentage) }}%
          </div>
        </div>

        <!-- Hover Add to Cart -->
        <div
          class="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0
                 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
        >
          <button
            type="button"
            class="w-full bg-slate-950 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2
                   hover:bg-teal-600 transition-all shadow-xl shadow-slate-950/20"
            @click.stop="$emit('add', product)"
          >
            + Add to Cart
          </button>
        </div>
      </button>
    </div>

    <!-- Details Section -->
    <div class="px-4 py-3 bg-white">
      <div class="flex items-center justify-between mb-2">
        <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">
          {{ product.category }}
        </p>
        <div class="flex items-center gap-1">
          <span class="text-amber-400">★</span>
          <span class="text-[10px] font-bold text-slate-900">{{ product.rating }}</span>
        </div>
      </div>

      <h3 class="text-sm font-bold text-slate-950 mb-2 group-hover:text-teal-600 transition-colors leading-tight line-clamp-2">
        {{ product.title }}
      </h3>

      <span class="text-base font-black text-slate-950 tracking-tighter">
        LKR {{ priceLKR }}
      </span>
    </div>
  </div>
</template>
