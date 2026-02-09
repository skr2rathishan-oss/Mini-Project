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
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ml-25 mr-25">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
      @click="emit('productClick', $event)"
    />
  </div>
</template>
