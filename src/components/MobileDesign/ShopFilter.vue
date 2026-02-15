<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface Props {
  categories: string[]
  brands: string[]
  selectedCategory: string
  selectedBrand: string
  minPrice: string
  maxPrice: string
  resultCount: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:selectedCategory', value: string): void
  (e: 'update:selectedBrand', value: string): void
  (e: 'update:minPrice', value: string): void
  (e: 'update:maxPrice', value: string): void
  (e: 'clear'): void
}>()

const isOpen = ref(false)

// Dropdown expand/collapse states
const expandedSections = ref<{
  category: boolean
  brand: boolean
  price: boolean
  rating: boolean
}>({
  category: true,
  brand: true,
  price: true,
  rating: false
})

// Local state for filters (synced from props)
const localCategory = ref(props.selectedCategory)
const localBrand = ref(props.selectedBrand)
const localMinPrice = ref(props.minPrice)
const localMaxPrice = ref(props.maxPrice)
const localRating = ref<number | null>(null)

// Watch props changes
watch(() => props.selectedCategory, (val) => {
  localCategory.value = val
})
watch(() => props.selectedBrand, (val) => {
  localBrand.value = val
})
watch(() => props.minPrice, (val) => {
  localMinPrice.value = val
})
watch(() => props.maxPrice, (val) => {
  localMaxPrice.value = val
})

// Check if any filter is active
const hasActiveFilters = computed(() => {
  return localCategory.value !== 'all' || 
         localBrand.value !== 'all' || 
         localMinPrice.value !== '' || 
         localMaxPrice.value !== '' ||
         localRating.value !== null
})

function openFilter() {
  isOpen.value = true
}

function closeFilter() {
  isOpen.value = false
}

function applyFilters() {
  emit('update:selectedCategory', localCategory.value)
  emit('update:selectedBrand', localBrand.value)
  emit('update:minPrice', localMinPrice.value)
  emit('update:maxPrice', localMaxPrice.value)
  closeFilter()
}

function resetFilters() {
  localCategory.value = 'all'
  localBrand.value = 'all'
  localMinPrice.value = ''
  localMaxPrice.value = ''
  localRating.value = null
  emit('clear')
  closeFilter()
}

function toggleSection(section: 'category' | 'brand' | 'price' | 'rating') {
  expandedSections.value[section] = !expandedSections.value[section]
}

// Handle ESC key
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen.value) {
      closeFilter()
    }
  })
})
</script>

<template>
  <!-- Filter Button (Mobile/Tablet Only) -->
  <div class="relative lg:hidden">
    <button
      @click="openFilter"
      class="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
    >
      <i class="fa-solid fa-filter text-base"></i>
      <span>Filter</span>
      <span v-if="hasActiveFilters" class="ml-1 bg-white text-sky-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
        {{ resultCount }}
      </span>
    </button>

    <!-- Filter Dropdown Popup -->
    <transition
      enter-active-class="transition duration-150"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-[70vh] overflow-y-auto z-50"
      >
        <!-- Header -->
        <div class="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <h2 class="text-base font-bold text-slate-900">Filters</h2>
          <button
            @click="closeFilter"
            type="button"
            class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close filter"
          >
            <i class="fa-solid fa-xmark text-lg text-slate-600"></i>
          </button>
        </div>

        <!-- Filter Content -->
        <div class="px-4 py-2">
          <!-- Category Filter - Dropdown -->
          <div class="border-b border-slate-200">
            <button
              @click="toggleSection('category')"
              type="button"
              class="w-full flex items-center justify-between py-3 text-left hover:bg-slate-50 transition-colors"
            >
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Category</h3>
              <i :class="['fa-solid', 'fa-chevron-down', 'text-slate-600', 'transition-transform', expandedSections.category ? 'rotate-180' : '']"></i>
            </button>
            <div v-if="expandedSections.category" class="pb-2 space-y-1 animate-in fade-in duration-200">
              <button
                v-for="cat in categories"
                :key="cat"
                @click="localCategory = cat"
                type="button"
                class="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                :class="localCategory === cat
                  ? 'bg-teal-100 text-teal-700 font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              >
                {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
              </button>
            </div>
          </div>

          <!-- Brand Filter - Dropdown -->
          <div class="border-b border-slate-200">
            <button
              @click="toggleSection('brand')"
              type="button"
              class="w-full flex items-center justify-between py-3 text-left hover:bg-slate-50 transition-colors"
            >
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Brand</h3>
              <i :class="['fa-solid', 'fa-chevron-down', 'text-slate-600', 'transition-transform', expandedSections.brand ? 'rotate-180' : '']"></i>
            </button>
            <div v-if="expandedSections.brand" class="pb-2 space-y-1 animate-in fade-in duration-200">
              <button
                v-for="brand in brands"
                :key="brand"
                @click="localBrand = brand"
                type="button"
                class="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                :class="localBrand === brand
                  ? 'bg-teal-100 text-teal-700 font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              >
                {{ brand.charAt(0).toUpperCase() + brand.slice(1) }}
              </button>
            </div>
          </div>

          <!-- Price Range Filter - Dropdown -->
          <div class="border-b border-slate-200">
            <button
              @click="toggleSection('price')"
              type="button"
              class="w-full flex items-center justify-between py-3 text-left hover:bg-slate-50 transition-colors"
            >
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Price Range</h3>
              <i :class="['fa-solid', 'fa-chevron-down', 'text-slate-600', 'transition-transform', expandedSections.price ? 'rotate-180' : '']"></i>
            </button>
            <div v-if="expandedSections.price" class="pb-2 space-y-1.5 animate-in fade-in duration-200">
              <div class="flex gap-2">
                <input
                  v-model="localMinPrice"
                  type="number"
                  placeholder="Min"
                  class="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  v-model="localMaxPrice"
                  type="number"
                  placeholder="Max"
                  class="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <p class="text-xs text-slate-500">
                <span v-if="localMinPrice || localMaxPrice">
                  {{ localMinPrice ? `$${localMinPrice}` : 'Any' }} - {{ localMaxPrice ? `$${localMaxPrice}` : 'Any' }}
                </span>
                <span v-else>Set price range</span>
              </p>
            </div>
          </div>

          <!-- Rating Filter - Dropdown -->
          <div>
            <button
              @click="toggleSection('rating')"
              type="button"
              class="w-full flex items-center justify-between py-3 text-left hover:bg-slate-50 transition-colors"
            >
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Rating</h3>
              <i :class="['fa-solid', 'fa-chevron-down', 'text-slate-600', 'transition-transform', expandedSections.rating ? 'rotate-180' : '']"></i>
            </button>
            <div v-if="expandedSections.rating" class="pb-2 space-y-1 animate-in fade-in duration-200">
              <button
                v-for="stars in [5, 4, 3, 2, 1]"
                :key="stars"
                @click="localRating = localRating === stars ? null : stars"
                type="button"
                class="w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2"
                :class="localRating === stars
                  ? 'bg-teal-100 text-teal-700 font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
              >
                <span v-for="i in stars" :key="i" class="text-amber-400">★</span>
                <span class="text-xs">{{ stars }}+ stars</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="border-t border-slate-200 px-4 py-2 flex gap-2 bg-slate-50">
          <button
            @click="resetFilters"
            type="button"
            class="flex-1 px-4 py-2 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors text-sm"
          >
            Reset
          </button>
          <button
            @click="applyFilters"
            type="button"
            class="flex-1 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </transition>

    <!-- Backdrop overlay -->
    <div
      v-if="isOpen"
      @click="closeFilter"
      class="fixed inset-0 z-40"
    />
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-in.fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
