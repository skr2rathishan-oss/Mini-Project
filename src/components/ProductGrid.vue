<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../types/product'

defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  (e: 'productClick', product: Product): void
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-3 pt-6 md:grid-cols-4 md:gap-7 md:pt-10 lg:grid-cols-5 lg:gap-7 lg:ml-25 lg:mr-25">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
      @click="emit('productClick', p)"
    />
  </div>
</template>
