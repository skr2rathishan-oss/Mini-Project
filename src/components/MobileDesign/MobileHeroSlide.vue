<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

/* Same type as desktop */
export interface HeroSlide {
    id: number;
    badge: string;
    title: string;
    price: string;
    image: string;
    bgColor: string;
    productId: number;
}

const props = defineProps<{
    slides: HeroSlide[];
    autoPlay?: boolean;     // default true
    intervalMs?: number;    // default 5000
}>();

const emit = defineEmits<{
    (e: "dotClick", index: number): void;
    (e: "slideClick", productId: number): void;
}>();

const router = useRouter();

const current = ref(0);
const progressKey = ref(0);
let timer: number | undefined;

const autoPlay = computed(() => props.autoPlay ?? true);
const intervalMs = computed(() => props.intervalMs ?? 1000);

function start() {
    stop();
    if (!autoPlay.value) return;
    if (!props.slides?.length) return;

    timer = window.setInterval(() => {
        current.value = (current.value + 1) % props.slides.length;
        progressKey.value++;
        emit("dotClick", current.value);
    }, intervalMs.value);
}

function stop() {
    if (timer) {
        window.clearInterval(timer);
        timer = undefined;
    }
}

function setSlide(i: number) {
    current.value = i;
    progressKey.value++;
    emit("dotClick", i);
    start();
}

function goToShop() {
    router.push("/shop");
}

function slideClicked() {
    const s = props.slides[current.value];
    if (!s) return;
    emit("slideClick", s.productId);
}

const titleFirstLine = (title: string) => {
    const parts = title.trim().split(" ");
    if (parts.length <= 1) return title;
    return parts.slice(0, Math.ceil(parts.length / 2)).join(" ");
};

const titleSecondLine = (title: string) => {
    const parts = title.trim().split(" ");
    if (parts.length <= 1) return "";
    return parts.slice(Math.ceil(parts.length / 2)).join(" ");
};

watch(
    () => props.slides?.length,
    () => {
        current.value = 0;
        progressKey.value++;
        start();
    }
);

onMounted(start);
onBeforeUnmount(stop);
</script>

<style scoped>
@keyframes progress {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}

.progress-bar {
    animation: progress v-bind(intervalMs) linear 1 forwards;
}
</style>

<template>
    <!-- Mobile only -->
    <section class="lg:hidden px-4 py-0 pb-0">
        <!-- Progress bar -->
        <div v-if="autoPlay" class="absolute top-0 left-0 right-0 h-0.5 bg-gray-200 z-50">
            <div :key="progressKey" class="progress-bar h-full bg-teal-600 origin-left"></div>
        </div>

        <div class="relative h-44 rounded-3xl overflow-hidden bg-teal-600 shadow-xl" @mouseenter="stop"
            @mouseleave="start">
            <div v-for="(slide, index) in slides" :key="slide.id"
                class="absolute inset-0 transition-opacity duration-1000 flex items-center"
                :class="index === current ? 'opacity-100' : 'opacity-0'">
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-900/40 to-transparent z-10" />

                <!-- Background image -->


                <!-- Content -->
                <div class="relative z-20 px-6 flex flex-col items-start gap-1">
                    <!-- Badge (desktop content) -->
                    <span class="text-white/80 text-[10px] font-black uppercase tracking-wider">
                        {{ slide.badge }}
                    </span>

                    <!-- Title split like desktop -->
                    <h2 class="text-white text-2xl font-black leading-tight">
                        {{ titleFirstLine(slide.title) }}
                        <span class="text-white/90 italic"> {{ titleSecondLine(slide.title) }}</span>
                    </h2>

                    <!-- Price line (desktop content) -->
                    <p class="text-white/80 text-xs font-semibold mt-1">
                        From <span class="text-white font-black">{{ slide.price }}</span>
                    </p>

                    <!-- CTA buttons -->
                    <div class="mt-3 flex items-center gap-2">
                        <button type="button" @click="goToShop" class="px-5 py-2.5 bg-teal-600 text-white text-xs font-black rounded-lg
                     hover:bg-teal-700 transition-colors shadow-lg">
                            Shop Collection
                        </button>

                        <button type="button" @click="slideClicked" class="px-4 py-2.5 bg-white/10 text-white text-xs font-black rounded-lg
                     hover:bg-white/20 transition-colors border border-white/15">
                            View
                        </button>
                    </div>
                </div>

                <!-- Visual Flair (same as your React) -->
                <div class="item-right absolute right--2 top-0 h-full w-full flex items-center justify-end">
                    <img :src="slide.image" :alt="slide.title" class="h-full object-contain" />
                </div>
            </div>

            <!-- Dots -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-40">
                <button v-for="(_, i) in slides" :key="i" type="button" @click="setSlide(i)"
                    class="h-1.5 rounded-full transition-all duration-300"
                    :class="i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'"
                    :aria-label="`Go to slide ${i + 1}`" />
            </div>
        </div>
    </section>
</template>
