<script setup lang="ts">
import { ref } from 'vue'
import ToggleSwitch from './Profile/ThemeToggle.vue'

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleAccount = () => {
  // Navigate to account page
  console.log('Navigate to Account')
  closeDropdown()
}

const handleSettings = () => {
  // Navigate to settings page
  console.log('Navigate to Settings')
  closeDropdown()
}

const handleOrders = () => {
  // Navigate to orders page
  console.log('Navigate to Orders')
  closeDropdown()
}

const handleThemeToggle = () => {
  closeDropdown()
}
</script>

<template>
  <div class="relative">
    <!-- Profile Button -->
    <button
      @click="toggleDropdown"
      class="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center
             hover:bg-teal-50 hover:text-teal-600 transition cursor-pointer"
      title="Profile"
    >
      <i class="fa-regular fa-user text-lg"></i>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isDropdownOpen"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>

    <div
      v-if="isDropdownOpen"
      class="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2"
    >
      <!-- Account -->
      <button
        @click="handleAccount"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
      >
        <i class="fa-regular fa-user text-gray-500"></i>
        Account
      </button>

      <!-- Day/Light Mode Toggle -->
      <ToggleSwitch @toggle="handleThemeToggle" />

      <!-- Settings -->
      <button
        @click="handleSettings"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
      >
        <i class="fa-solid fa-gear text-gray-500"></i>
        Settings
      </button>

      <!-- Orders -->
      <button
        @click="handleOrders"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
      >
        <i class="fa-solid fa-box text-gray-500"></i>
        Orders
      </button>
    </div>
  </div>
</template>
