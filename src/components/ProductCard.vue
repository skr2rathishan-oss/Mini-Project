<script setup lang="ts">
import type { Product } from '../types/product'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'click', product: Product): void
}>()
</script>

<template>
  <button
    type="button"
    class="text-left w-full border rounded-xl p-3 hover:shadow transition"
    @click="emit('click', props.product)"
  >
    <img
      :src="props.product.thumbnail"
      :alt="props.product.title"
      class="w-full h-32 object-cover rounded-lg"
    />

    <p class="font-bold mt-2 text-sm line-clamp-1">
      {{ props.product.title }}
    </p>
    <p class="text-[#00a8c1] font-black text-sm">
      LKR {{ props.product.price }}
    </p>

    <p class="text-xs text-gray-500 mt-1 line-clamp-2">
      {{ props.product.description }}
    </p>
  </button>
</template>
