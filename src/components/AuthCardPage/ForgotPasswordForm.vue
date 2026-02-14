<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const email = ref("");
</script>

<template>
  <form class="space-y-4" @submit.prevent="auth.setView('signin')">
    <div>
      <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
      <input v-model="email" type="email" placeholder="Enter your email"
        class="w-full bg-gray-100/80 border-none rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder:text-gray-400 font-medium" />
    </div>

    <button class="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-teal-500/20 hover:bg-teal-700 active:scale-[0.98] transition-all">
      Send reset link
    </button>

    <p class="mt-6 text-center text-xs font-bold text-gray-400">
      Back to
      <button type="button" class="text-teal-600 hover:underline" @click="auth.setView('signin')">
        Sign in
      </button>
    </p>
  </form>
</template>
