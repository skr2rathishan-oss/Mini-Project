<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
}>();
</script>

<template>
  <div class="w-full max-w-md mt-0">
    <!-- Website Logo & Name -->
    <div class="flex items-center justify-start gap-3 mb-8">
      <div class="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg ">
        <i class="fa-solid fa-bag-shopping text-white text-xl"></i>
      </div>
      <span class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">ShopNet</span>
    </div>

    <h1 class="text-3xl font-black text-gray-900 dark:text-white mb-1 pt-0">{{ title }}</h1>
    <p class="text-gray-400 dark:text-gray-500 mb-4 text-sm font-medium">{{ subtitle }}</p>
    <slot />

  </div>
</template>
