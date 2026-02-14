<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Product } from '../types/product'
import { fetchProductById, fetchProducts } from '../services/api'
import { useCartStore } from '../stores/cartStore'

import ProductInfo from '../components/ProductInfo.vue'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

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


// 🔥 Replace these with your cart store later
function onAddToCart(p: Product) {
  cart.add(p)
  console.log('Added to cart:', p)
}
function onBuyNow(p: Product) {
  cart.add(p)
  router.push('/cart')  // Assuming there's a cart page
  console.log('Buy now:', p)
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

    // pick default color if exists
    const colors = (p as any).colors as string[] | undefined
    selectedColor.value = colors?.[0] || ''

    // related
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
    <div class="max-w-7xl mx-auto px-6 py-10 md:py-12">

      <!-- States -->
      <div v-if="loading" class="py-16 text-center text-sm text-gray-500">
        Loading product...
      </div>

      <div v-else-if="error" class="py-16 text-center text-sm text-red-500">
        {{ error }}
      </div>

      <!-- Page -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10">
        <!-- Left: Image -->
        <div class="lg:col-span-6">
          <div
            class="bg-[#f9f9f9] aspect-square w-full flex items-center justify-center p-10 md:p-12 relative rounded-3xl h-130 border-2 border-teal-500"
          >
            <img
              :src="activeImage"
              :alt="product.title"
              class="max-w-full max-h-full object-contain"
            />

            <!-- Price badge (optional) -->
            <div class="absolute bottom-5 left-5 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl border border-teal-500">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</p>
              <p class="text-sm font-black text-slate-900">LKR {{ priceLKR }}</p>
            </div>
          </div>

          <!-- Recently Viewed -->
          <div class="mt-12">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">
                Recently viewed
              </h3>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <button
                v-for="item in relatedProducts"
                :key="item.id"
                type="button"
                class="group text-left cursor-pointer"
                @click="router.push(`/product/${item.id}`)"
              >
                <div class="bg-[#f9f9f9] aspect-square mb-3 flex items-center justify-center p-4 rounded-2xl">
                  <img
                    :src="item.thumbnail"
                    class="max-w-full max-h-full object-contain"
                    :alt="item.title"
                  />
                </div>

                <div class="flex justify-between items-center text-[10px] font-bold">
                  <span class="text-gray-500 truncate pr-2 uppercase">
                    {{ item.title }}
                  </span>
                  <span class="whitespace-nowrap text-slate-900">
                    LKR {{ (item.price * LKR_RATE).toLocaleString() }}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Middle: Thumbnails -->
        <div class="lg:col-span-1 flex lg:flex-col gap-3 lg:gap-4">
          <button
            v-for="(img, idx) in product.images?.slice(0, 4)"
            :key="idx"
            type="button"
            @click="activeImage = img"
            class="w-20 lg:w-full aspect-square bg-[#f9f9f9] p-2 cursor-pointer border-4 transition-all rounded-2xl"
            :class="activeImage === img ? 'border-teal-500 shadow-xl' : 'border-transparent hover:border-slate-200'"
          >
            <img :src="img" class="w-full h-full object-contain" :alt="`view-${idx}`" />
          </button>
        </div>

        <!-- Right: New UI Product Info -->
        <div class="lg:col-span-5 lg:pl-8">
          <ProductInfo
            :product="product"
            :selected-color="selectedColor"
            @update:selectedColor="selectedColor = $event"
            @add="onAddToCart(product)"
            @buy="onBuyNow(product)"
            @wishlist="onWishlist"
          />
        </div>
      </div>
    </div>
  </div>
</template>
