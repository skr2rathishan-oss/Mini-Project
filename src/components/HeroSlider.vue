<template>
  <section class="relative overflow-hidden bg-white">
    <!-- Soft background gradient (desktop hero feel) -->
    <div class="absolute inset-0 bg-linear-to-r from-teal-50/60 to-transparent pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 h-130">
      <!-- Slides -->
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="absolute inset-0"
        :class="index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          <!-- LEFT: Text -->
          <div
            class="z-10 transition-all duration-700 transform"
            :class="index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'"
          >
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-full
                     text-teal-700 font-extrabold text-xs uppercase tracking-widest mb-6"
            >
              <i class="fa-solid fa-star text-[11px]"></i>
              <span>{{ slide.badge }}</span>
            </div>

            <!-- Title (React-style big + teal italic on second line) -->
            <h1 class="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.08] mb-6">
              {{ titleFirstLine(slide.title) }}
              <br />
              <span class="text-teal-600 italic">
                {{ titleSecondLine(slide.title) }}
              </span>
            </h1>

            <!-- Price line (keeps your old data) -->
            <p class="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              From <span class="text-teal-600 font-black">{{ slide.price }}</span>
            </p>

            <!-- Buttons -->
            <div class="flex items-center gap-4">
              <button
                type="button"
                @click="emit('slideClick', slide.productId)"
                class="group relative inline-flex items-center justify-center
                       bg-teal-600 text-white px-8 py-4 rounded-2xl
                       font-extrabold text-lg hover:bg-teal-700 transition-all
                       shadow-xl hover:shadow-teal-500/20 overflow-hidden"
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
                class="inline-flex items-center justify-center bg-white border-2 border-gray-100
                       text-gray-700 px-8 py-4 rounded-2xl font-extrabold text-lg
                       hover:border-teal-100 hover:bg-teal-50/30 transition-all"
              >
                View Lookbook
              </button>
            </div>

            <!-- Small stats row (no external images) -->
            <div class="mt-10 flex items-center gap-8 text-gray-500">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-circle-check text-teal-600"></i>
                <span class="text-sm font-semibold">Premium Quality</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-truck-fast text-teal-600"></i>
                <span class="text-sm font-semibold">Fast Delivery</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-shield-halved text-teal-600"></i>
                <span class="text-sm font-semibold">Secure Payments</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: Image Card (uses slide.image from your JSON) -->
          <div
            class="relative transition-all duration-700 transform"
            :class="index === currentSlide ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'"
          >
            <!-- Background blobs -->
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-teal-200 rounded-full blur-3xl opacity-20"></div>
            <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-300 rounded-full blur-3xl opacity-20"></div>

            <div class="relative group">
              <!-- Tilt background -->
              <div
                class="absolute inset-0 bg-teal-600 rounded-4xl
                       rotate-3 group-hover:rotate-6 transition-transform duration-500"
              ></div>

              <!-- Foreground card -->
              <div class="relative bg-white p-4 rounded-4xl shadow-2xl overflow-hidden border border-gray-100">
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="w-full h-105 object-contain rounded-3xl
                         transition-transform duration-700 group-hover:scale-105"
                />

                <!-- Floating label -->
                <div
                  class="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl
                         border border-white/50 animate-bounce-slow"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <i class="fa-solid fa-star"></i>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-gray-900">Best Seller</p>
                      <p class="text-xs text-gray-500">Top rated</p>
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
            i === currentSlide ? 'bg-teal-600 w-12' : 'bg-gray-300 w-3 hover:bg-gray-400'
          ]"
          :aria-label="`Go to slide ${i + 1}`"
        />
      </div>
    </div>
  </section>
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

void props
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