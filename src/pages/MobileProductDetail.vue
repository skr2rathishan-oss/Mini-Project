<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Product } from '../types/product'
import { fetchProductById, fetchProducts } from '../services/api'
import { useCartStore } from '../stores/cartStore'
import { useCheckoutStore } from '../stores/checkout'

import ProductInfo from '../components/ProductInfo.vue'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const checkout = useCheckoutStore()

const loading = ref(true)
const error = ref('')
const product = ref<Product | null>(null)

const relatedProducts = ref<Product[]>([])
const activeImage = ref('')
const selectedColor = ref<string>('')

const LKR_RATE = 300

const priceLKR = computed(() => {
  if (!product.value) return ''
  return (product.value.price * LKR_RATE).toLocaleString()
})

function onAddToCart(p: Product) {
  cart.add(p)
  console.log('Added to cart:', p)
}

function onBuyNow(p: Product) {
  const buyNowItem = {
    id: p.id,
    name: p.title,
    price: p.price * LKR_RATE,
    quantity: 1,
    image: p.thumbnail || p.images?.[0] || ''
  }
  
  checkout.setBuyNowItem(buyNowItem)
  router.push('/checkout')
  console.log('Buy now:', buyNowItem)
}

function onWishlist() {
  console.log('Wishlist clicked')
}

async function load(id: number) {
  loading.value = true
  error.value = ''

  try {
    const p = await fetchProductById(id)
    product.value = p

    activeImage.value = p.images?.[0] || p.thumbnail || ''

    const colors = (p as any).colors as string[] | undefined
    selectedColor.value = colors?.[0] || ''

    const list = await fetchProducts(50)
    relatedProducts.value = (list.products || [])
      .filter((x: Product) => x.id !== id)
      .slice(0, 3)
  } catch (e: any) {
    error.value = e?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const id = Number(route.params.id)
  if (!Number.isFinite(id)) {
    error.value = 'Invalid product id'
    loading.value = false
    return
  }
  void load(id)
})

watch(
  () => route.params.id,
  (newId) => {
    const id = Number(newId)
    if (!Number.isFinite(id)) return
    void load(id)
  }
)
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
  -webkit-box-orient: vertical;
}
</style>
<script setup lang="ts">    
</script>