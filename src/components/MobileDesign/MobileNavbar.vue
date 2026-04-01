<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import SearchBar from "../SearchBar.vue";

const router = useRouter();
const showMenu = ref(false);
const showNavbar = ref(true);
let lastScrollY = 0;

withDefaults(defineProps<{
  showSearch?: boolean
}>(), {
  showSearch: true
})

const emit = defineEmits<{
  (e: 'search', query: string): void
}>();

function goToProfile() {
  router.push("/profile");
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function onSearch(query: string) {
  emit('search', query);
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
  <div v-if="showSearch" class="lg:hidden bg-white sticky top-0 z-40 px-4 pb-4 pt-2">
    <SearchBar @search="onSearch" />
  </div>
</template>
