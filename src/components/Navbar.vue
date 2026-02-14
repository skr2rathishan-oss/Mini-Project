<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import SearchBar from './SearchBar.vue'
import Profile from './Profile/DropDown.vue'
import { useUiStore } from "../types/ui";
const ui = useUiStore();

const props = defineProps<{
  cartCount: number
}>()

const emit = defineEmits<{
  (e: 'logoClick'): void
  (e: 'search', query: string): void
  (e: 'cartClick'): void
  (e: 'profileClick'): void
  (e: 'wishlistClick'): void
}>()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/Shop' },
  { label: 'Deals', to: '/Deals' },
  { label: 'Contact', to: '/Contact' }  
] as const

const hasCartItems = computed(() => props.cartCount > 0)

const openProfileMenu = () => {
  console.log('openProfileMenu called, current state:', ui.isProfileMenuOpen);
  ui.openProfileMenu();
  console.log('after openProfileMenu, state:', ui.isProfileMenuOpen);
}
</script>

<template>
  <!-- Desktop Header -->
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white h-20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="h-20 flex items-center justify-between">
        <!-- LEFT: Logo + Nav -->
        <div class="flex items-center gap-12">
          <!-- Logo -->
          <button class="flex items-center gap-2 group" @click="emit('logoClick')">
            <span class="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center
                     shadow-lg transition-transform duration-300 group-hover:rotate-12">
              <i class="fa-solid fa-bag-shopping text-white text-lg"></i>
            </span>

            <span class="text-2xl font-black tracking-tight text-gray-900">
              SHOP<span class="text-teal-600">NET</span>
            </span>
          </button>

          <!-- Nav Links -->
          <nav class="flex items-center gap-8">
            <RouterLink v-for="l in navLinks" :key="l.label" :to="l.to" class="text-[13px] font-semibold tracking-wide text-gray-600
                     hover:text-teal-600 transition-colors">
              {{ l.label }}
            </RouterLink>
          </nav>
        </div>

        <!-- RIGHT: Search + Icons -->
        <div class="flex items-center gap-4">

          <!-- Search -->
          <div class="w-[320px]">
            <SearchBar @search="emit('search', $event)" />
          </div>

         

          <!-- Wishlist -->
          <button class="relative w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center
                   hover:bg-red-50 hover:text-red-500 transition cursor-pointer" @click="emit('wishlistClick')" title="Wishlist">
            <i class="fa-regular fa-heart text-lg"></i>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <!-- Cart -->
          <button class="relative w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center
                   hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer" @click="ui.openCart()" title="Cart">
            <i class="fa-solid fa-bag-shopping text-lg"></i>

            <span class="absolute -top-1 -right-1 bg-teal-600 text-white text-[10px] font-bold
                     w-5 h-5 rounded-full flex items-center justify-center shadow"
              :class="hasCartItems ? 'opacity-100' : 'opacity-60'">
              {{ props.cartCount }}
            </span>
          </button>
          <!-- Profile -->
          <div class="relative">
            <button
              @click="openProfileMenu"
              class="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center
                     hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer"
              title="Profile"
            >
              <i class="fa-regular fa-user text-lg"></i>
            </button>
            <Profile />
          </div>

        </div>
     
      </div>
    </div>
  </header>
</template>
