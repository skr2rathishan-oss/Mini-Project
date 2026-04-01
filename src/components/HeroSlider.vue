
<template>
  <section class="relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">

    <!-- Light mode: soft teal gradient | Dark mode: deep teal glow from left -->
    <div class="absolute inset-0 bg-linear-to-r from-teal-50/60 to-transparent dark:from-teal-500/5 dark:to-transparent pointer-events-none"></div>

    <!-- Dark mode: extra top separator line so it visually lifts from the navbar -->
    <div class="absolute top-0 left-0 right-0 h-px bg-transparent dark:bg-teal-600/20"></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 h-155">
      <!-- Slides -->
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
:class="
  index === currentSlide
    ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
    : 'opacity-0 translate-x-6 scale-[0.98] pointer-events-none'"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          <!-- LEFT: Text -->
          <div
            class="z-10 transition-all duration-700 transform"
            :class="index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'"
          >
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-600/15 dark:border dark:border-teal-500/30 px-4 py-2 rounded-full
                     text-teal-700 dark:text-teal-300 font-extrabold text-xs uppercase tracking-widest mb-6"
            >
              <i class="fa-solid fa-star text-[11px]"></i>
              <span>{{ slide.badge }}</span>
            </div>

            <!-- Title -->
            <h1 class="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.08] mb-6">
              {{ titleFirstLine(slide.title) }}
              <br />
              <span class="text-teal-600 dark:text-teal-400 italic">
                {{ titleSecondLine(slide.title) }}
              </span>
            </h1>

            <!-- Price line -->
            <p class="text-xl text-gray-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
              From <span class="text-teal-600 dark:text-teal-400 font-black">{{ slide.price }}</span>
            </p>

            <!-- Buttons -->
            <div class="flex items-center gap-4">
              <button
                type="button"
                @click="goToShop"
                class="group relative inline-flex items-center justify-center
                       bg-teal-600 text-white px-8 py-4 rounded-2xl
                       font-extrabold text-lg hover:bg-teal-700 transition-all
                       shadow-xl hover:shadow-teal-500/20 dark:shadow-teal-400/10 overflow-hidden cursor-pointer"
              >
                <span class="relative z-10">Shop Collection</span>
                <i class="fa-solid fa-arrow-right ml-2 relative z-10 transition-transform group-hover:translate-x-1"></i>
                <span
                  class="absolute inset-0 bg-linear-to-tr from-teal-400/0 via-teal-400/0 to-white/20
                         translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                ></span>
              </button>

              <button
                type="button"
                class="inline-flex items-center justify-center bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700
                       text-gray-700 dark:text-slate-200 px-8 py-4 rounded-2xl font-extrabold text-lg
                       hover:border-teal-100 dark:hover:border-teal-600/50 hover:bg-teal-50/30 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                View Lookbook
              </button>
            </div>

            <!-- Small stats row -->
            <div class="mt-10 flex items-center gap-8 text-gray-500 dark:text-slate-400">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-circle-check text-teal-600 dark:text-teal-400"></i>
                <span class="text-sm font-semibold">Premium Quality</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-truck-fast text-teal-600 dark:text-teal-400"></i>
                <span class="text-sm font-semibold">Fast Delivery</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-shield-halved text-teal-600 dark:text-teal-400"></i>
                <span class="text-sm font-semibold">Secure Payments</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: Image Card -->
          <div
            class="relative transition-all duration-700 transform"
            :class="index === currentSlide ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'"
          >
            <!-- Background blobs -->
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-teal-200 dark:bg-teal-500 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
            <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-300 dark:bg-teal-600 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>

            <div class="relative group">
              <!-- Tilt background -->
              <div
                class="absolute inset-0 bg-teal-600 dark:bg-teal-500/60 rounded-4xl
                       rotate-3 group-hover:rotate-6 transition-transform duration-500"
              ></div>

              <!-- Foreground card -->
              <div class="relative bg-white dark:bg-slate-800 p-4 rounded-4xl shadow-2xl dark:shadow-teal-900/30 overflow-hidden border border-gray-100 dark:border-slate-700">
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="w-full h-105 object-contain rounded-3xl
                         transition-transform duration-700 group-hover:scale-105"
                />

                <!-- Floating label -->
                <div
                  class="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-2xl shadow-xl
                         border border-white/50 dark:border-slate-700/50 animate-bounce-slow"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                      <i class="fa-solid fa-star"></i>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-gray-900 dark:text-white">Best Seller</p>
                      <p class="text-xs text-gray-500 dark:text-slate-400">Top rated</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DOT NAVIGATION -->
      <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          v-for="(_, i) in slides"
          :key="i"
          type="button"
          @click="emit('dotClick', i)"
          :class="[
            'transition-all duration-300 rounded-full h-2',
            i === currentSlide ? 'bg-teal-600 dark:bg-teal-400 w-12' : 'bg-gray-300 dark:bg-slate-600 w-3 hover:bg-gray-400 dark:hover:bg-slate-500'
          ]"
          :aria-label="`Go to slide ${i + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { HeroSlide } from '../types/ui'

const router = useRouter()

function goToShop() {
  router.push('/shop')
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

/* Title split helper (UI-only) */
const titleFirstLine = (title: string) => {
  const parts = title.trim().split(' ')
  if (parts.length <= 1) return title
  return parts.slice(0, Math.ceil(parts.length / 2)).join(' ')
}

const titleSecondLine = (title: string) => {
  const parts = title.trim().split(' ')
  if (parts.length <= 1) return ''
  return parts.slice(Math.ceil(parts.length / 2)).join(' ')
}
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}
</style>