<script setup lang="ts">
defineProps<{ count: number }>();
defineEmits<{ (e: "close"): void }>();
</script>

<template>
  <div class="px-6 py-4 border-b flex items-center justify-between bg-white">
    
    <!-- Left side: Icon + Title -->
    <div class="flex items-center gap-3">
      <!-- Teal cart icon (same as navbar style) -->
      <span
        class="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center
               shadow-md transition-transform duration-300 hover:rotate-12"
      >
        <i class="fa-solid fa-bag-shopping text-white text-lg"></i>
      </span>

      <!-- Title -->
      <h2 class="text-lg font-bold text-gray-900">
        Your Cart ({{ count }})
      </h2>
    </div>

    <!-- Close button -->
    <button
      type="button"
      class="p-2 rounded-full text-gray-500 hover:text-teal-600 hover:bg-teal-50
             transition-colors duration-200 cursor-pointer"
      aria-label="Close cart"
      @click="$emit('close')"
    >
      <i class="fa-solid fa-xmark text-[18px]"></i>
    </button>
  </div>
</template>
