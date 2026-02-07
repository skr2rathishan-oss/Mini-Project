<!-- src/components/Navbar.vue -->
<template>
  <header class="bg-white sticky top-0 z-50 shadow-sm font-inter transition-colors duration-300">
    <!-- Top Utility Bar -->
    <div class="bg-white border-b border-gray-100 md:block h-5 flex items-center pl-25">
      <div
        class="container mx-auto px-4 flex justify-between items-center text-[10px] text-gray-500 font-semibold uppercase tracking-widest ml-5 py-0.5">
        <p>University Mini-Project E-Commerce Platform - Shopnet 2025</p>

        <div class="flex items-center space-x-6 mr-5 pr-0">
          <a href="#" class="hover:text-[#00a8c1] transition-colors">Support</a>

          <!-- Currency Dropdown -->
          <div class="relative" @click="toggleCurrency">
            <div class="flex items-center cursor-pointer hover:text-[#00a8c1] transition-colors group">
              <span>{{ selectedCurrency }}</span>
              <i class="fa-solid fa-chevron-down ml-1 text-[8px]"></i>
            </div>

            <!-- Dropdown menu -->
            <div v-if="isOpen"
              class="absolute right-0 mt-2 w-20 bg-white border border-gray-200 rounded shadow-md z-50">
              <p v-for="cur in currencies" :key="cur" @click.stop="selectCurrency(cur)"
                class="px-3 py-1 text-xs hover:bg-gray-100 cursor-pointer">
                {{ cur }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>


    <!-- Main Header -->
    <div class="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4 lg:gap-12">
      <!-- Logo -->
      <div @click="emit('logoClick')" class="flex items-center space-x-2.5 cursor-pointer shrink-0 group">
        <div
          class="w-9 h-9 lg:w-11 lg:h-11 bg-gradient-to-br from-[#00a8c1] to-blue-600 rounded-lg flex items-center justify-center text-white text-base lg:text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
          <i class="fa-solid fa-shopping-bag"></i>
        </div>
        <span class="text-lg lg:text-2xl font-black text-gray-800 tracking-tighter uppercase font-montserrat">
          Shop<span class="text-[#00a8c1]">net</span>
        </span>

      </div>

      <!-- Search Bar -->
      <form @submit.prevent="handleSearchSubmit" class="flex-1 max-w-none lg:max-w-4xl flex h-10 lg:h-11">
        <div class="relative w-full">
          <input v-model="searchValue" type="text" placeholder="Search premium electronics..." class="w-full h-full bg-gray-100 border border-gray-200 dark:border-slate-100

             rounded-l-xl py-2 px-5
             focus:ring-2 focus:ring-[#00a8c1]/20 focus:border-[#00a8c1]
             focus:bg-gray-100
             caret-black
             outline-none transition-all
             placeholder:text-gray-400 dark:placeholder:text-slate-500
             text-xs font-semibold text-black dark:text-white" />
        </div>

        <button type="submit" class="bg-[#00a8c1] text-white px-4 lg:px-8 rounded-r-xl hover:bg-[#008ba0]
           transition-colors flex items-center justify-center shadow-md dark:shadow-none">
          <i class="fa-solid fa-magnifying-glass font-bold text-xs lg:text-sm"></i>
        </button>
      </form>


      <!-- User Actions (Desktop) -->
      <div class="hidden lg:flex items-center space-x-8 shrink-0">
        <!-- Account Button / Dropdown -->
        <div class="relative hover:* text-[#00a8c1] transition-colors cursor-pointer">
          <button @click="handleAccountClick"
            class="text-gray-700 dark:text-slate-300 hover:text-[#00a8c1] transition-colors flex items-center group"
            :title="isLoggedIn ? (userProfile?.name ?? '') : 'Sign In'">
            <div :class="[
              'w-10 h-10 rounded-full flex items-center justify-center transition-all',
              isLoggedIn
                ? 'bg-cyan-50 dark:bg-slate-900 text-[#00a8c1]'
                : 'bg-gray-50 text-gray-400 group-hover:bg-cyan-50 group-hover:text-[#00a8c1] border-1'
            ]">
              <i :class="[isLoggedIn ? 'fa-solid fa-user-check' : 'fa-regular fa-user', 'text-lg']"></i>
            </div>
          </button>

          <!-- User Dropdown Menu -->
          <template v-if="isLoggedIn && isUserMenuOpen">
            <div class="fixed inset-0 z-40" @click="isUserMenuOpen = false"></div>

            <div
              class="absolute top-full right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden z-50 animate-fade-in-up py-2">
              <div class="px-6 py-4 border-b border-gray-50 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
                <p class="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                  Signed in as
                </p>
                <p class="font-black text-gray-900 dark:text-white text-sm truncate">
                  {{ userProfile?.email }}
                </p>
              </div>

              <div class="py-2">
                <button v-for="(item, idx) in userMenuItems" :key="idx" @click="handleUserMenuItem(item)"
                  class="w-full flex items-center space-x-3 px-6 py-2.5 text-[10px] font-bold text-gray-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-slate-800 hover:text-[#00a8c1] transition-all">
                  <i :class="['fa-solid', item.icon, 'w-5 text-sm']"></i>
                  <span class="uppercase tracking-widest">{{ item.label }}</span>
                </button>
              </div>

              <div class="pt-2 border-t border-gray-50 dark:border-slate-800">
                <button @click="handleLogout"
                  class="w-full flex items-center space-x-3 px-6 py-3 text-[10px] font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all uppercase tracking-widest">
                  <i class="fa-solid fa-arrow-right-from-bracket w-5 text-sm"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </template>
        </div>

        <div class="flex items-center space-x-6">
          <div class="relative cursor-pointer group">
            <i
              class="fa-regular fa-heart text-xl text-gray-700 dark:text-slate-300 group-hover:text-[#00a8c1] transition-colors"></i>
            <span
              class="absolute -top-1.5 -right-1.5 bg-[#ff4d6d] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold  ring-white dark:ring-slate-950">0</span>
          </div>

          <div @click="emit('cartClick')" class="flex items-center space-x-3 cursor-pointer">
            <div class="relative">
              <i
                class="fa-solid fa-cart-shopping text-xl text-gray-700 dark:text-slate-300 group-hover:text-[#00a8c1] transition-colors"></i>
              <span
                class="absolute -top-1.5 -right-1.5 bg-[#00a8c1] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center ring-white dark:ring-slate-950">{{
                  cartCount }}</span>
            </div>

            <div class="hidden xl:block leading-none">
              <p class="text-[9px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-widest mb-0.5">
                My Cart
              </p>
              <p class="text-xs font-black text-gray-800 dark:text-white font-montserrat">
                LKR {{ cartValue.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <div class="bg-[#00a8c1] shadow-lg">
      <div class="container mx-auto px-4 flex items-center h-10">
        <div
          class="h-full bg-[#0096ab] px-4 lg:px-6 flex items-center text-white text-[10px] font-black uppercase tracking-widest cursor-pointer border-r border-white/10 space-x-3 shrink-0 hover:bg-[#008ba0] transition-colors">
          <i class="fa-solid fa-bars-staggered text-xs"></i>
          <span class="hidden sm:inline">All Categories</span>
          <i class="fa-solid fa-chevron-down text-[7px] opacity-60"></i>
        </div>

        <nav class="flex items-center h-full flex-1 overflow-x-auto no-scrollbar ml-2">
          <a v-for="(link, idx) in navLinks" :key="idx" href="#" @click.prevent="link.action && link.action()"
            class="h-full flex items-center px-4 lg:px-5 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors whitespace-nowrap group">
            <span>{{ link.label }}</span>
            <i v-if="link.hasDropdown"
              class="fa-solid fa-chevron-down ml-2 text-[6px] opacity-60 group-hover:rotate-180 transition-transform"></i>
          </a>
        </nav>

        <div class="hidden xl:flex items-center h-full px-6 text-white space-x-2.5 shrink-0 border-l border-white/10">
          <i class="fa-solid fa-phone-volume text-xs opacity-90"></i>
          <span class="text-[10px] font-black tracking-widest">+94 112 678952</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type UserProfile = { name: string; email: string } | null
type Category = { id: string; name: string }

const props = defineProps<{
  cartCount: number
  categories: Category[]
  selectedCategory: string
  isLoggedIn: boolean
  userProfile: UserProfile
}>()

const emit = defineEmits<{
  (e: 'cartClick'): void
  (e: 'selectCategory', cat: string): void
  (e: 'search', query: string): void
  (e: 'logoClick'): void
  (e: 'settingsClick'): void
  (e: 'signInClick'): void
  (e: 'logout'): void
}>()

const searchValue = ref('')
const isUserMenuOpen = ref(false)
const selectedCurrency = ref('USD')
const isOpen = ref(false)
const currencies = ['USD', 'EUR', 'GBP', 'LKR']

const handleSearchSubmit = () => {
  emit('search', searchValue.value)
}

const toggleCurrency = () => {
  isOpen.value = !isOpen.value
}

const selectCurrency = (currency: string) => {
  selectedCurrency.value = currency
  isOpen.value = false
}

const cartValue = computed(() => props.cartCount * 300 * 29.99)

const handleAccountClick = () => {
  if (!props.isLoggedIn) {
    emit('signInClick')
    return
  }
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const handleLogout = () => {
  emit('logout')
  isUserMenuOpen.value = false
}

type MenuItem = { icon: string; label: string; link?: string; onClick?: () => void }

const userMenuItems = computed<MenuItem[]>(() => [
  { icon: 'fa-user-circle', label: 'My Profile', link: '#' },
  { icon: 'fa-box-open', label: 'My Orders', link: '#' },
  { icon: 'fa-heart', label: 'Wishlist', link: '#' },
  { icon: 'fa-location-dot', label: 'Saved Addresses', link: '#' },
  { icon: 'fa-gear', label: 'Settings', onClick: () => emit('settingsClick') }
])

const handleUserMenuItem = (item: MenuItem) => {
  if (item.onClick) item.onClick()
  isUserMenuOpen.value = false
}

const navLinks = computed(() => [
  { label: 'Home', action: () => emit('logoClick') },
  { label: 'Electronics', hasDropdown: true as const },
  { label: "Today's Deals" },
  { label: 'Flash Sale' },
  { label: 'New Arrivals' }
])
</script>
