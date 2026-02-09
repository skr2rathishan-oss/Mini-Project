<script setup lang="ts">
import { computed } from 'vue'
import SearchBar from './SearchBar.vue'


/* ✅ Props = data coming from parent (App/Home) */
const props = defineProps<{
  cartCount: number
}>()

/* ✅ Emits = events we send to parent */
const emit = defineEmits<{
  (e: 'logoClick'): void
  (e: 'search', query: string): void
  (e: 'cartClick'): void
  (e: 'profileClick'): void
  (e: 'wishlistClick'): void
}>()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/categories' },
  { label: 'Deals', to: '/deals' },
  { label: 'Contact', to: '/contact' }
] as const


/* Example: you can compute things from props */
const hasCartItems = computed(() => props.cartCount > 0)
</script>

<template>
  <!-- Top Header -->
  <div class="hidden md:block bg-[#00a8c1] text-white text-sm py-1">
    <div class="max-w-375 mx-auto px-4 flex items-center justify-between text-xm">
      shooping made easy | free delivery on orders over $50 | 24/7 customer support
    </div>
  </div>


  <!-- Main Header -->
  <div class="max-w-375 mx-auto px-4 md:py-4 flex items-center gap-10 border-b border-gray-200">


    <!-- 1) Logo -->
    <button type="button" class="flex items-center space-x-2.5 cursor-pointer shrink-0 group"
      @click="emit('logoClick')">
      <div class="w-9 h-9 lg:w-11 lg:h-11 bg-linear-to-br from-[#00a8c1] to-blue-600 rounded-lg
             flex items-center justify-center text-white text-base lg:text-xl shadow-md
             group-hover:scale-105 transition-transform duration-300">
        <i class="fa-solid fa-shopping-bag"></i>
      </div>

      <span class="text-lg lg:text-2xl font-black text-gray-800 tracking-tighter uppercase font-montserrat">
        Shop<span class="text-[#00a8c1]">net</span>
      </span>
    </button>

    <!-- 2) Nav links (between logo and search) -->
    <nav class="hidden lg:flex items-center gap-6 shrink-0">
      <RouterLink v-for="l in navLinks" :key="l.label" :to="l.to"
        class="text-[11px] font-black uppercase tracking-widest text-gray-600 hover:text-[#00a8c1] transition">
        {{ l.label }}
      </RouterLink>
    </nav>

    <!-- 3) Search (grows) -->
    <div class="flex-1 min-w-[180px]">
      <!-- If you already created SearchBar.vue -->
      <SearchBar @search="emit('search', $event)" />
    </div>

    <!-- 4) Right icons -->
    <div class="flex items-center gap-4 lg:gap-6 shrink-0 ml-20 pl-4 mr-3.5 pr-2">


      <!-- Wishlist -->
      <button type="button" class="relative w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center
             text-gray-700 hover:bg-cyan-50 hover:text-[#00a8c1] transition cursor-pointer"
        @click="emit('wishlistClick')" title="Wishlist">
        <i class="fa-regular fa-heart text-lg"></i>
        <span class="absolute -top-1 -right-1 bg-[#ff4d6d] text-white text-[9px]
               w-5 h-5 rounded-full flex items-center justify-center font-bold">0</span>
      </button>

      <!-- Cart -->
      <button type="button" class="relative w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center
        cursor-pointer
             text-gray-700 hover:bg-cyan-50 hover:text-[#00a8c1] transition" @click="emit('cartClick')" title="Cart">
        <i class="fa-solid fa-cart-shopping text-lg"></i>
        <span class="absolute -top-1 -right-1 bg-[#00a8c1] text-white text-[9px]
               w-5 h-5 rounded-full flex items-center justify-center font-bold">{{ cartCount }}</span>
      </button>

      <!-- Profile -->
      <button type="button" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center
             text-gray-700 hover:bg-cyan-50 hover:text-[#00a8c1] transition cursor-pointer"
        @click="emit('profileClick')" title="Profile">
        <i class="fa-regular fa-user text-lg"></i>
      </button>


    </div>
  </div>



</template>
