<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as api from '../services/api'
import type { Product } from '../types/product'
import ProductGrid from '../components/ProductGrid.vue'
import HeroSlider from '../components/HeroSlider.vue'
import MobileHeroSlide from '../components/MobileDesign/MobileHeroSlide.vue'
import type { HeroSlide } from '../types/ui'
import { getProductDetailView } from '../utils/deviceDetect'
import newYearBg from '../assets/images/new_year_offer_bg.png'

const route = useRoute()
const router = useRouter()

/* ---------------- Products (Grid) ---------------- */
const products = ref<Product[]>([])
const trendingProducts = ref<Product[]>([])
const offerProducts = ref<Product[]>([])
const loading = ref(true)
const error = ref('')

// Categories data
const categories = ref([
  { name: 'Electronics', icon: 'fa-solid fa-mobile-screen-button', count: 45 },
  { name: 'Clothing', icon: 'fa-solid fa-shirt', count: 32 },
  { name: 'Home & Garden', icon: 'fa-solid fa-house', count: 28 },
  { name: 'Sports', icon: 'fa-solid fa-basketball', count: 19 },
  { name: 'Books', icon: 'fa-solid fa-book', count: 15 },
  { name: 'Beauty', icon: 'fa-solid fa-spa', count: 22 },
  { name: 'Automotive', icon: 'fa-solid fa-car', count: 12 },
  { name: 'Toys', icon: 'fa-solid fa-gamepad', count: 18 }
])

// Featured brands
const featuredBrands = ref(['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG'])

async function loadProducts() {
  loading.value = true
  error.value = ''
  try {
    const q = (route.query.q as string | undefined) ?? ''

    // ✅ if user searched -> search endpoint
    // ✅ if no search -> fetch normal products
    const data = q ? await api.searchProducts(q) : await api.fetchProducts(20)

    products.value = data.products

    // Set trending products (top rated)
    trendingProducts.value = [...data.products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8)

    // Set offer products (high discount)
    offerProducts.value = [...data.products]
      .filter(p => p.discountPercentage > 10)
      .slice(0, 8)

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
import { LKR_RATE } from '../constants/currency'

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
  router.push(getProductDetailView(p.id))
}

const onHeroClick = (productId: number) => {
  router.push(getProductDetailView(productId))
}

const goToShop = () => {
  router.push('/Shop')
}

const filterByCategory = (category: string) => {
  router.push({ name: 'Shop', query: { category } })
}

const filterByBrand = (brand: string) => {
  router.push({ name: 'Shop', query: { brand } })
}
</script>

<template>
  <main class="space-y-10 md:space-y-16">

    <!-- ROW 1 — HERO SLIDER -->
    <section>
      <!-- Mobile Hero Slider -->
      <MobileHeroSlide v-if="slides.length" class="lg:hidden" :slides="slides" @dotClick="onDotClick"
        @slideClick="onHeroClick" />

      <!-- Desktop Hero Slider -->
      <HeroSlider v-if="slides.length" class="hidden lg:block" :slides="slides" :currentSlide="currentSlide"
        @dotClick="onDotClick" @slideClick="onHeroClick" />
    </section>

    <!-- ROW 2 — CATEGORIES -->
    <section class="hidden md:block container mx-auto px-4">
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 pb-3 mb-6">
        <h2 class="text-xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight uppercase">
          Shop by <span class="text-teal-500 font-semibold">Category</span>
        </h2>
        <button @click="goToShop" class="text-teal-600 hover:text-teal-700 font-medium text-sm">
          View All →
        </button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="category in categories" :key="category.name"
          class="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
          @click="filterByCategory(category.name)">
          <div class="w-12 h-12 mx-auto mb-3 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center">
            <i :class="category.icon" class="text-teal-600 dark:text-teal-400 text-xl"></i>
          </div>
          <h3 class="font-semibold text-gray-800 dark:text-slate-100">{{ category.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-slate-400">{{ category.count }} products</p>
        </div>
      </div>
    </section>

    <!-- ROW 3 — TRENDING PRODUCTS -->
    <section class="container mx-auto px-4">
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 pb-3 mb-3">
        <h2 class="text-xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight uppercase">
          Trending <span class="text-teal-500 font-semibold">Products</span>
        </h2>
        <button @click="goToShop" class="text-teal-600 hover:text-teal-700 font-medium text-sm">
          View All →
        </button>
      </div>
      <div v-if="loading" class="text-gray-500 dark:text-slate-400">Loading...</div>
      <div v-else-if="error" class="text-rose-600">{{ error }}</div>
      <ProductGrid v-else :products="trendingProducts" @productClick="openDetail" />
    </section>

    <!-- ROW 4 — NEW YEAR OFFERS -->
    <section class="container mx-auto px-4">
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 pb-3 mb-6">
        <h2 class="text-xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight uppercase">
          New Year <span class="text-teal-500 font-semibold">Offers</span>
        </h2>
        <button @click="goToShop" class="text-teal-600 hover:text-teal-700 font-medium text-sm">
          View All →
        </button>
      </div>
      <div class="rounded-2xl p-8 text-white relative overflow-hidden bg-cover bg-center shadow-lg"
        :style="{ backgroundImage: `linear-gradient(to right, rgba(13, 148, 136, 0.8), rgba(0, 0, 0, 0.0)), url(${newYearBg})` }">
        <div class="max-w-2xl relative z-10">
          <h3 class="text-3xl font-extrabold mb-3 text-white drop-shadow-md">🎉 Special New Year Discounts!</h3>
          <p class="text-teal-50 mb-6 font-medium text-lg drop-shadow">Get up to 50% off on selected items. Limited time
            offer!</p>
          <button @click="goToShop"
            class="bg-white text-teal-700 px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Shop Now →
          </button>
        </div>
      </div>
      <div class="mt-6">
        <ProductGrid :products="offerProducts" @productClick="openDetail" />
      </div>
    </section>

    <!-- ROW 5 — FEATURED BRANDS -->
    <section class="container mx-auto px-4 pb-10">
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 pb-3 mb-6">
        <h2 class="text-xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight uppercase">
          Featured <span class="text-teal-500 font-semibold">Brands</span>
        </h2>
        <button @click="goToShop" class="text-teal-600 hover:text-teal-700 font-medium text-sm">
          View All →
        </button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div v-for="brand in featuredBrands" :key="brand"
          class="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          @click="filterByBrand(brand)">
          <h4 class="font-semibold text-gray-800 dark:text-slate-100">{{ brand }}</h4>
        </div>
      </div>
    </section>

  </main>
</template>
