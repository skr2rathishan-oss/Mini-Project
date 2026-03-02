<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const router = useRouter();
const showMenu = ref(false);
const showNavbar = ref(true);
let lastScrollY = 0;

function goToProfile() {
  router.push("/profile");
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function onScroll() {
  const currentScrollY = window.scrollY;
  
  // Hide navbar when scrolling down
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    showNavbar.value = false;
  } else {
    // Show navbar when scrolling up
    showNavbar.value = true;
  }
  
  lastScrollY = currentScrollY;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <!-- Mobile only -->
  <header
    class="lg:hidden bg-white sticky top-0 z-50 border-b border-transparent transition-transform duration-300 ease-in-out"
    :class="showNavbar ? 'translate-y-0' : '-translate-y-full'"
  >
    <!-- Top bar with logo and profile -->
    <div class="px-4 py-2 flex items-center justify-center relative">
      <button
        type="button"
        @click="toggleMenu"
        class="absolute left-4 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
        aria-label="Menu"
      >
        <i class="fa-solid fa-bars text-slate-600 text-lg"></i>
      </button>
      <div class="flex items-center gap-2">
        
        <span class="font-bold text-lg text-slate-900">Shopnet</span>
      </div>
      <button
        type="button"
        @click="goToProfile"
        class="absolute right-4 w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 hover:bg-teal-700 transition-colors"
        aria-label="Profile"
      >
        <i class="fa-solid fa-user text-white text-lg"></i>
      </button>
    </div>

    <!-- Separator line -->
    <div class="h-px bg-slate-200"></div>
  </header>

  <!-- Search bar (always visible) -->
  <div class="lg:hidden bg-white sticky top-0 z-40 px-4 pb-4 pt-2">
    <div class="relative flex-1">
      <!-- Search icon -->
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 21l-4.35-4.35"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>

      <input
        v-model="search"
        type="text"
        placeholder="Search..."
        class="w-full bg-slate-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm
               text-slate-900 placeholder:text-slate-400
               focus:ring-2 focus:ring-blue-500/30 outline-none"
      />
    </div>
  </div>
</template>
