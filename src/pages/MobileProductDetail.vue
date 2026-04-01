<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductDetail } from '../composables/useProductDetail'
import ProductInfo from '../components/ProductInfo.vue'
import { LKR_RATE } from '../constants/currency'

const route = useRoute()
const router = useRouter()

const {
  loading,
  error,
  product,
  relatedProducts,
  activeImage,
  selectedColor,
  priceLKR,
  onAddToCart,
  onBuyNow,
  onWishlist,
  load
} = useProductDetail()

onMounted(() => {
  const id = Number(route.params.id)
  if (Number.isFinite(id)) void load(id)
})

watch(() => route.params.id, (newId) => {
  const id = Number(newId)
  if (Number.isFinite(id)) void load(id)
})
</script>

<template>
  <div class="bg-white min-h-screen font-sans text-gray-900 transition-colors duration-300">
    <!-- States -->
    <div v-if="loading" class="py-16 text-center text-sm text-gray-500">
      Loading product...
    </div>

    <div v-else-if="error" class="py-16 text-center text-sm text-red-500">
      {{ error }}
    </div>

    <!-- Mobile Layout -->
    <div v-else-if="product" class="pb-24">
      <!-- Product Image Section -->
      <div class="w-full">
        <div class="bg-[#f9f9f9] aspect-square w-full flex items-center justify-center p-4 relative border-b-2 border-teal-500">
          <img
            :src="activeImage"
            :alt="product.title"
            class="max-w-full max-h-full object-contain"
          />

        <!-- Price Badge -->
          <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-xl border border-teal-500">
            <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Price</p>
            <p class="text-xs font-black text-slate-900">LKR {{ priceLKR }}</p>
          </div>
        </div>

        <!-- Thumbnail Gallery -->
        <div class="flex gap-2 p-4 overflow-x-auto bg-gray-50">
          <button
            v-for="(img, idx) in product.images?.slice(0, 4)"
            :key="idx"
            type="button"
            @click="activeImage = img"
            class="shrink-0 w-16 h-16 bg-white p-1 cursor-pointer border-3 transition-all rounded-lg"
            :class="activeImage === img ? 'border-teal-500 shadow-md' : 'border-transparent'"
          >
            <img :src="img" class="w-full h-full object-contain" :alt="`view-${idx}`" />
          </button>
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="px-4 py-6">
        <ProductInfo
          :product="product"
          :selected-color="selectedColor"
          @update:selectedColor="selectedColor = $event"
          @add="onAddToCart(product)"
          @buy="onBuyNow(product)"
          @wishlist="onWishlist"
        />
      </div>

      <!-- Recently Viewed Section -->
      <div v-if="relatedProducts.length > 0" class="mt-8 px-4 pb-6">
        <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest mb-4">
          You might also like
        </h3>

        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="item in relatedProducts"
            :key="item.id"
            type="button"
            class="group text-left cursor-pointer"
            @click="router.push(`/mobile-product/${item.id}`)"
          >
            <div class="bg-[#f9f9f9] aspect-square mb-2 flex items-center justify-center p-3 rounded-lg">
              <img
                :src="item.thumbnail"
                class="max-w-full max-h-full object-contain"
                :alt="item.title"
              />
            </div>

            <div class="text-[10px] font-bold">
              <p class="text-gray-600 line-clamp-2 mb-1">
                {{ item.title }}
              </p>
              <p class="text-teal-600 font-black">
                LKR {{ (item.price * LKR_RATE).toLocaleString() }}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>