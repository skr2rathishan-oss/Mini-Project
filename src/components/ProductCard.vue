<script setup lang="ts">
import type { Product } from '../types/product'
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ (e: 'click', product: Product): void }>()

const cart = useCartStore()

const LKR_RATE = 300

const soldText = computed(() => {
  const soldCount = Math.floor((props.product.rating * 1000) + (props.product.id * 50))
  return soldCount > 1000 ? `${(soldCount / 1000).toFixed(1)}k+ sold` : `${soldCount} sold`
})

const priceLKR = computed(() => (props.product.price * LKR_RATE).toLocaleString())

function addToCart() {
  cart.add(props.product)
}
</script>

<template>
  <button
    type="button"
    @click="emit('click', props.product)"
    class="group relative w-full text-left bg-white dark:bg-slate-800
           border border-gray-100 dark:border-slate-700 rounded-md overflow-hidden shadow-sm
           cursor-pointer
           transition-all duration-300 ease-out
           hover:-translate-y-0.5 hover:shadow-md hover:border-teal-600/40
           active:scale-[0.98]"
  >
    <!-- Discount Badge -->
    <div v-if="props.product.discountPercentage > 0" class="absolute top-0 right-0 z-10">
      <div class="bg-teal-50 text-teal-600 text-[9px] font-bold px-1 py-0.5 relative">
        <span class="relative z-10">-{{ Math.round(props.product.discountPercentage) }}%</span>
        <div class="absolute -bottom-0.75 left-0 right-0 h-1 bg-teal-50 clip-path-triangle"></div>
      </div>
    </div>

    <!-- Image -->
    <div class="aspect-square bg-white flex items-center justify-center overflow-hidden relative">
      <img
        :src="props.product.thumbnail"
        :alt="props.product.title"
        class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Free Shipping -->
      <div class="absolute bottom-0 left-0 right-0 flex space-x-1 p-1">
        <div class="bg-teal-600 text-white text-[7px] px-1 py-0.5 rounded-sm font-bold uppercase">
          Free
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="p-2 flex flex-col grow bg-white dark:bg-slate-800">
      <!-- Title -->
      <div class="mb-1 h-8 overflow-hidden">
        <span class="inline-flex items-center bg-teal-600 text-white text-[10px] px-1 rounded-sm mr-1 font-bold">
          Preferred
        </span>

        <h3 class="inline text-[12px] text-gray-800 dark:text-slate-100 line-clamp-2 leading-tight">
          {{ props.product.title }}
        </h3>
      </div>

      <!-- Price -->
      <div class="mt-auto flex items-center justify-between">
        <div class="flex items-baseline text-teal-600">
          <span class="text-[12px] mr-0.5">LKR</span>
          <span class="text-sm font-bold">{{ priceLKR }}</span>
        </div>

        <span class="text-[12px] text-gray-400 dark:text-slate-400">
          {{ soldText }}
        </span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click.stop="addToCart()"
        class="mt-2 w-full bg-teal-600 text-white text-xs py-1 rounded hover:bg-teal-700 transition cursor-pointer font-bold flex items-center justify-center gap-1"
      >
        Add to Cart
      </button>
    </div>

    <!-- Hover Border -->
    <div
      class="absolute inset-0 border border-transparent
             group-hover:border-teal-600 transition-colors
             pointer-events-none rounded-md cursor-pointer"
    ></div>
  </button>
</template>

<style scoped>
.clip-path-triangle {
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}
</style>
