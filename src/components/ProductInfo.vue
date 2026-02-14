<script setup lang="ts">
import type { Product } from '../types/product'
import { computed } from 'vue'

const props = defineProps<{
  product: Product
  selectedColor: string
}>()

const emit = defineEmits<{
  (e: 'update:selectedColor', color: string): void
  (e: 'add'): void
  (e: 'buy'): void
  (e: 'wishlist'): void
}>()

// ⭐ If your API gives rating like 4.2, we show 4 filled stars
const filledStars = computed(() => Math.floor(props.product.rating ?? 0))
</script>

<template>
  <div class="flex flex-col">
    <!-- Category row -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-xs font-black text-teal-600 tracking-widest uppercase">
        {{ product.category }}
      </span>
      <span class="text-slate-300">•</span>
      <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        {{ (product as any).subCategory ?? '—' }}
      </span>
    </div>

    <!-- Title + Wishlist -->
    <div class="flex justify-between items-start mb-4">
      <h1 class="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
        {{ product.title }}
      </h1>

      <button type="button" class="p-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors"
        @click="emit('wishlist')" aria-label="Add to wishlist">
        <i class="fa-regular fa-heart text-slate-400 text-[24px]" aria-hidden="true"></i>
      </button>
    </div>

    <!-- Rating -->
    <div class="flex items-center gap-4 mb-8">
      <div class="flex items-center gap-1">
        <i v-for="i in 5" :key="i" class="text-[18px]"
          :class="i <= filledStars ? 'fa-solid fa-star text-yellow-400' : 'fa-regular fa-star text-slate-300'"
          aria-hidden="true"></i>
      </div>

      <span class="text-sm font-bold text-slate-900">{{ product.rating }}</span>
      <span class="text-slate-300">/</span>
      <span class="text-sm font-semibold text-slate-400 tracking-tight">
        {{ (product as any).reviews?.length ?? 0 }} Reviews <!-- Fix: Use .length to get the count -->
      </span>
    </div>

    <!-- Description -->
    <p class="text-slate-500 leading-relaxed text-lg mb-10 border-l-2 border-teal-500 pl-6 italic">
      {{ product.description }}
    </p>

    <!-- Colors -->
    <div class="mb-10" v-if="(product as any).colors?.length">
      <label class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">
        Select Finish Tone
      </label>

      <div class="flex gap-4">
        <button v-for="color in (product as any).colors" :key="color" type="button"
          @click="emit('update:selectedColor', color)"
          class="w-12 h-12 rounded-full border-4 transition-all flex items-center justify-center p-0.5" :class="props.selectedColor === color
            ? 'border-teal-500 scale-110 shadow-xl'
            : 'border-transparent'" :aria-label="`Select color ${color}`">
          <div class="w-full h-full rounded-full shadow-inner" :style="{ backgroundColor: color }"></div>
        </button>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 mb-10">
      <button type="button"
        class="flex-1 py-5 px-8 rounded-2xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all"
        @click="emit('buy')">
        BUY NOW
      </button>

      <button type="button"
        class="flex-1 py-5 px-8 rounded-2xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 active:scale-95"
        @click="emit('add')">
        ADD TO BASKET
      </button>
    </div>

    <!-- Info Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-8">
      <div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-100/50 hover:bg-slate-100 transition-colors group">
        <div class="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
          <i class="fa-solid fa-truck-fast text-teal-600 text-[20px]" aria-hidden="true"></i>
        </div>
        <div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">
            Dispatched In
          </p>
          <p class="text-sm font-black text-slate-800">
            2 - 3 WORKING DAYS
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-100/50 hover:bg-slate-100 transition-colors group">
        <div class="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
          <i class="fa-solid fa-shield-check text-teal-600 text-[20px]" aria-hidden="true"></i>
        </div>
        <div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">
            Delivery Policy
          </p>
          <p class="text-sm font-black text-slate-800">
            UNIVERSITY - <span class="text-teal-600">FREE</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
