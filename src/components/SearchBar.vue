<script setup lang="ts">
import { ref } from 'vue'

const query = ref('')

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

const handleSubmit = () => {
  emit('search', query.value)
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="relative w-full"
  >
    <!-- Search Icon -->
    <i
      class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2
             text-gray-400 text-sm pointer-events-none"
    ></i>

    <!-- Input -->
    <input
      v-model="query"
      type="text"
      placeholder="Search products..."
      class="w-full h-11 pl-10 pr-4 rounded-full
             bg-gray-100/70 border border-transparent
             text-sm text-gray-700 placeholder-gray-400
             outline-none transition-all duration-200

             focus:bg-white
             focus:border-teal-500/40
             focus:ring-4 focus:ring-teal-500/10"
    />
  </form>
</template>
