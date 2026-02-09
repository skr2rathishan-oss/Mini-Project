<template>
  <div class="relative w-full h-45 sm:h-65 md:h-130 overflow-hidden group">
    <!-- Slides -->
    <div
      v-for="(slide, index) in slides"
      :key="slide.id"
      :class="[
        'absolute inset-0 transition-opacity duration-1000 flex items-center',
        slide.bgColor,
        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
      ]"
    >
      <div class="container mx-auto px-6 md:px-24 flex items-center justify-between h-full relative">

        <!-- TEXT CONTENT -->
        <div
          :class="[
            'max-w-xl transition-all duration-1000 transform',
            index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          ]"
        >
          <!-- Badge -->
          <p class="text-[9px] sm:text-xs md:text-base font-bold text-[#00a8c1] mb-2 md:mb-3 uppercase tracking-widest">
            {{ slide.badge }}
          </p>

          <!-- Title -->
          <h1 class="text-lg sm:text-2xl md:text-6xl font-black text-gray-800 dark:text-white mb-2 md:mb-6 leading-tight">
            {{ slide.title }}
          </h1>

          <!-- Price -->
          <p class="text-sm sm:text-lg md:text-3xl font-medium text-gray-700 dark:text-slate-300 mb-4 md:mb-10">
            From <span class="text-[#00a8c1] font-black">{{ slide.price }}</span>
          </p>

          <!-- Button -->
          <button
            type="button"
            @click="emit('slideClick', slide.productId)"
            class="bg-[#00a8c1] text-white px-5 py-2 md:px-10 md:py-4 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-[#008ba0] transition-all shadow-lg hover:-translate-y-1"
          >
            Shop Collection
          </button>
        </div>

        <!-- IMAGE -->
        <div class="hidden sm:block w-1/2 h-full relative">
          <img
            :src="slide.image"
            :alt="slide.title"
            :class="[
              'h-full w-full object-contain object-bottom transition-all duration-1000 transform',
              index === currentSlide ? 'scale-105 rotate-0 opacity-100' : 'scale-90 rotate-3 opacity-0'
            ]"
          />
        </div>
      </div>
    </div>

    <!-- DOT NAVIGATION -->
    <div class="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2 md:space-x-4">
      <button
        v-for="(_, i) in slides"
        :key="i"
        type="button"
        @click="emit('dotClick', i)"
        :class="[
          'transition-all duration-500 rounded-full',
          'h-2 md:h-3',
          i === currentSlide
            ? 'bg-[#00a8c1] w-6 md:w-12'
            : 'bg-gray-300 dark:bg-slate-700 w-2 md:w-4 hover:bg-gray-400'
        ]"
        :aria-label="`Go to slide ${i + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/* ---------------- TYPES ---------------- */
export interface HeroSlide {
  id: number
  badge: string
  title: string
  price: string
  image: string
  bgColor: string
  productId: number
}

/* ---------------- PROPS ---------------- */
const props = defineProps<{
  slides: HeroSlide[]
  currentSlide: number
}>()

/* ---------------- EMITS ---------------- */
const emit = defineEmits<{
  (e: 'dotClick', index: number): void
  (e: 'slideClick', productId: number): void
}>()

/* silence unused warning in strict TS */
void props
</script>
