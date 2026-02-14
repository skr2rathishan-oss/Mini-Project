<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as api from '../services/api'
import type { Product } from '../types/product'
import ProductGrid from '../components/ProductGrid.vue'
import HeroSlider from '../components/HeroSlider.vue'
import type { HeroSlide } from '../types/ui'

const route = useRoute()
const router = useRouter()

/* ---------------- Products (Grid) ---------------- */
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref('')

async function loadProducts() {
  loading.value = true
  error.value = ''
  try {
    const q = (route.query.q as string | undefined) ?? ''

    // ✅ if user searched -> search endpoint
    // ✅ if no search -> fetch normal products
    const data = q ? await api.searchProducts(q) : await api.fetchProducts(20)

    products.value = data.products
  } catch {
    error.value = 'Failed to load products.'
  } finally {
    loading.value = false
  }
}

/* ---------------- Hero Slider (DummyJSON) ---------------- */
const slides = ref<HeroSlide[]>([])
const currentSlide = ref(0)

const bgList = ['bg-teal-600']


const LKR_RATE = 300 

function toSlide(p: Product, index: number): HeroSlide {
  const discountBadge =
    p.discountPercentage >= 15 ? `Save ${Math.round(p.discountPercentage)}%` : 'Featured'

  return {
    id: p.id,
    badge: discountBadge,
    title: p.title,
    price: `LKR ${(p.price * LKR_RATE).toLocaleString()}`,  // Fix: Multiply by LKR_RATE for consistency
    image: p.images?.[0] || p.thumbnail,
    bgColor: bgList[index % bgList.length] || 'bg-[#f3f9fb]',
    productId: p.id
  }
}


async function loadHeroSlides() {
  try {
    // ✅ get products for hero (featured)
    const data = await api.fetchFeaturedProducts(8)

    // ✅ choose best 3 by rating (or discount)
    const featured = [...data.products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3)

    slides.value = featured.map(toSlide)
  } catch {
    // if hero fails, we simply show nothing (avoid breaking the page)
    slides.value = []
  }
}

const nextSlide = () => {
  if (slides.value.length === 0) return
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const onDotClick = (idx: number) => {
  currentSlide.value = idx
}

let timer: number | undefined

onMounted(async () => {
  await Promise.all([loadHeroSlides(), loadProducts()])
  timer = window.setInterval(nextSlide, 6000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})

watch(() => route.query.q, loadProducts)

/* ---------------- Navigation ---------------- */
const openDetail = (p: Product) => {
  router.push(`/product/${p.id}`)
}

const onHeroClick = (productId: number) => {
  router.push(`/product/${productId}`)
}
</script>

<template>
  <main class="space-y-10 md:space-y-16">

    <!-- ROW 1 — HERO SLIDER -->
    <section>
      <HeroSlider v-if="slides.length" :slides="slides" :currentSlide="currentSlide" @dotClick="onDotClick"
        @slideClick="onHeroClick" />
    </section>

    <!-- ROW 2 — SECTION HEADER -->
    <section class="container mx-auto px-4 mb-0">
      <div class="flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 class="text-xl md:text-3xl font-bold text-gray-800 tracking-tight uppercase">
          Trending <span class="text-teal-500 font-semibold">Products</span>
        </h2>
      </div>
    </section>

    <!-- ROW 3 — PRODUCT GRID -->
    <section class="container mx-auto px-4 pb-10 pt-0 mt-0">
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-rose-600">{{ error }}</div>

      <ProductGrid v-else :products="products" @productClick="openDetail" />
    </section>

  </main>
</template>
