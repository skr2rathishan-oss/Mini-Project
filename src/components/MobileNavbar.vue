<script setup lang="ts">
import { ref } from "vue";

const locationText = ref("Road 13/A, Gulshan 2, Dhaka...");
const search = ref("");

function onFilterClick() {
  // TODO: open filter modal / drawer
  console.log("Filter clicked");
}

function onBellClick() {
  // TODO: open notifications
  console.log("Notifications clicked");
}
</script>

<template>
  <!-- Mobile only -->
  <header class="lg:hidden px-4 pt-4 pb-2 bg-white sticky top-0 z-50 border-b border-transparent">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
          <!-- MapPin -->
          <svg class="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-slate-400 font-medium leading-none">
            Location
          </span>
          <span class="text-sm text-slate-800 font-bold truncate max-w-[200px]">
            {{ locationText }}
          </span>
        </div>
      </div>

      <button
        type="button"
        @click="onBellClick"
        class="relative w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200"
        aria-label="Notifications"
      >
        <!-- Bell -->
        <svg class="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M13.73 21a2 2 0 0 1-3.46 0"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>

        <!-- Red dot -->
        <span class="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
      </button>
    </div>

    <div class="flex gap-3">
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
        @click="onFilterClick"
        class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/60"
        aria-label="Filters"
      >
        <!-- SlidersHorizontal -->
        <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
          <path d="M4 21v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M4 10V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M12 21v-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M12 8V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M20 21v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M20 12V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M2 10h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M10 8h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M18 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  </header>
</template>
