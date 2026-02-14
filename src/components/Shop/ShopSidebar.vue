<script setup lang="ts">
const props = defineProps<{
  resultCount: number;
  categories: string[];
  brands: string[];
  selectedCategory: string;
  selectedBrand: string;
  minPrice: string;
  maxPrice: string;
}>();

const emit = defineEmits<{
  (e: "update:selectedCategory", v: string): void;
  (e: "update:selectedBrand", v: string): void;
  (e: "update:minPrice", v: string): void;
  (e: "update:maxPrice", v: string): void;
  (e: "clear"): void;
}>();
</script>

<template>
  <aside class="w-full lg:w-72 flex-shrink-0">
    <div class="space-y-8">
      <!-- Summary -->
      <div class="bg-teal-50 border border-teal-100 rounded-2xl p-4">
        <div class="flex items-center gap-3 text-teal-800">
          <!-- Filter icon -->
          <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 5h16M6 12h12M10 19h4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h2 class="font-bold">{{ resultCount }} Results</h2>
        </div>
        <p class="text-xs text-teal-700/80 mt-1">Filter by luxury essentials</p>
      </div>

      <!-- Filters -->
      <div class="space-y-6">
        <!-- Category -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Category</label>
            <button
              type="button"
              class="text-[10px] text-teal-600 font-bold hover:underline"
              @click="emit('clear')"
            >
              Clear
            </button>
          </div>

          <div class="relative">
            <select
              class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm appearance-none
                     focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              :value="selectedCategory"
              @change="emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
            >
              <option v-for="c in categories" :key="c" :value="c">
                {{ c === "all" ? "All Categories" : c }}
              </option>
            </select>

            <!-- ChevronDown -->
            <svg
              class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <!-- Brand -->
        <div class="space-y-3">
          <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Brand</label>

          <div class="relative">
            <select
              class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm appearance-none
                     focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              :value="selectedBrand"
              @change="emit('update:selectedBrand', ($event.target as HTMLSelectElement).value)"
            >
              <option v-for="b in brands" :key="b" :value="b">
                {{ b === "all" ? "All Brands" : b }}
              </option>
            </select>

            <!-- ChevronDown -->
            <svg
              class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <!-- Price Range -->
        <div class="space-y-3">
          <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Price Range</label>

          <div class="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min"
              class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm
                     focus:ring-2 focus:ring-teal-500/20 outline-none"
              :value="minPrice"
              @input="emit('update:minPrice', ($event.target as HTMLInputElement).value)"
            />
            <input
              type="number"
              placeholder="Max"
              class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm
                     focus:ring-2 focus:ring-teal-500/20 outline-none"
              :value="maxPrice"
              @input="emit('update:maxPrice', ($event.target as HTMLInputElement).value)"
            />
          </div>
        </div>

        <!-- Availability (UI only, optional) -->
        <div class="space-y-3">
          <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Availability</label>
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              <span class="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">In Stock</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              <span class="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">On Sale</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              <span class="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Pre-order</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Banner -->
      <div class="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative group">
        <div class="relative z-10">
          <h3 class="font-bold text-lg mb-2">Member Rewards</h3>
          <p class="text-slate-400 text-xs mb-4">Get 10% cash back on your first premium purchase.</p>
          <button
            type="button"
            class="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors uppercase tracking-widest"
          >
            Join Now →
          </button>
        </div>
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  </aside>
</template>
