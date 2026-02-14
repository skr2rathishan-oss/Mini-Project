<script setup lang="ts">
import type { Product } from "../../types/product";
import PremiumProductCard from "./PremiumProductCard.vue";

defineProps<{ products: Product[] }>();
defineEmits<{ (e: "productClick", p: Product): void; (e: "addToCart", p: Product): void }>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
    <PremiumProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
      @click="$emit('productClick', $event)"
      @add="$emit('addToCart', $event)"
    />
  </div>
</template>
