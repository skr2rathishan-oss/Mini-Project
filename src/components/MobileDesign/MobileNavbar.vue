<script setup lang="ts">
import { ref } from "vue";

const search = ref("");

</script>

<template>
  <!-- Mobile only -->
  <header class="lg:hidden px-4 pt-4 pb-2 bg-white sticky top-0 z-50 border-b border-transparent">
    <div class="flex items-center gap-3">
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

      <button
        type="button"
        class="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center
               shadow-lg transition-transform duration-300 hover:rotate-12 shrink-0"
        aria-label="Shopnet"
      >
        <i class="fa-solid fa-bag-shopping text-white text-lg"></i>
      </button>
    </div>
  </header>
</template>
