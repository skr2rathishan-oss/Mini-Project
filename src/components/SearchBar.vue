<script setup lang="ts">
import { ref } from 'vue'

/* local state for input text */
const query = ref('')

/* event sent to parent */
const emit = defineEmits<{
    (e: 'search', value: string): void
}>()

/* submit handler */
const handleSubmit = () => {
    emit('search', query.value)
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex w-full max-w-xl h-10">
        <!-- Input -->
        <input v-model="query" type="text" placeholder="Search products..." class="flex-1 px-4 rounded-l-lg border border-gray-300
         outline-none focus:outline-none focus:ring-0 focus:border-gray-300
         text-sm" />

        <!-- Button -->
        <button type="submit" class="px-4 bg-[#00a8c1] text-white rounded-r-lg
             hover:bg-[#008ba0] transition">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </form>
</template>
