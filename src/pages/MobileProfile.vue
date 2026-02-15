<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import ThemeToggle from '../components/Profile/ThemeToggle.vue'

const router = useRouter()
const auth = useAuthStore()

// Redirect to auth if not logged in
if (!auth.isLoggedIn) {
  router.push('/auth')
}

// Compute user initials for avatar
const userInitials = computed(() => {
  if (!auth.user || !auth.user.name) return 'AB'
  const nameArray = auth.user.name.split(' ')
  return (nameArray[0]?.[0] || 'A') + (nameArray[1]?.[0] || 'B')
})

// Profile menu items
const profileMenuItems = [
  { id: 'edit', icon: 'fa-user-pen', label: 'Edit Profile', action: 'editProfile' },
  { id: 'orders', icon: 'fa-box', label: 'My Orders', action: 'myOrders' },
  { id: 'addresses', icon: 'fa-map-location-dot', label: 'Saved Addresses', action: 'addresses' },
  { id: 'settings', icon: 'fa-gear', label: 'Settings', action: 'settings' },
]

function handleMenuAction(action: string) {
  console.log('Menu action:', action)
  // TODO: Add navigation to respective pages when they exist
}

function handleLogout() {
  auth.signOut()
  router.push('/auth')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-24 lg:pb-8">
    <!-- Header -->
    <div class="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div class="px-4 lg:px-6 py-4 lg:py-5">
        <h1 class="text-xl lg:text-2xl font-bold text-slate-900">My Profile</h1>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 lg:px-6 py-6 lg:py-8 max-w-2xl mx-auto">
      <!-- Profile Avatar & Info Section -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8 mb-6 text-center">
        <!-- Avatar -->
        <div class="w-20 h-20 lg:w-24 lg:h-24 bg-linear-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span class="text-3xl lg:text-4xl font-bold text-white">{{ userInitials }}</span>
        </div>

        <!-- User Info -->
        <div>
          <h2 class="text-lg lg:text-xl font-bold text-slate-900 mt-4 mb-1">
            {{ auth.user?.name }}
          </h2>
          <p class="text-sm lg:text-base text-slate-500 font-medium">
            {{ auth.user?.email }}
          </p>
        </div>

        <!-- Member Since (Optional) -->
        <div class="mt-4 pt-4 border-t border-slate-100">
          <p class="text-xs lg:text-sm text-slate-500">
            <i class="fa-solid fa-calendar mr-2 text-teal-600"></i>
            Member since January 2024
          </p>
        </div>
      </div>

      <!-- Profile Menu Items -->
      <div class="space-y-3 lg:space-y-4 mb-8">
        <button
          v-for="item in profileMenuItems"
          :key="item.id"
          type="button"
          @click="handleMenuAction(item.action)"
          class="w-full bg-white border border-slate-200 rounded-xl p-4 lg:p-5 flex items-center justify-between hover:border-teal-500 hover:bg-teal-50 transition-all active:scale-95 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
              <i :class="`fa-solid ${item.icon} text-teal-600 text-base`"></i>
            </div>
            <span class="text-sm lg:text-base font-semibold text-slate-900">{{ item.label }}</span>
          </div>
          <i class="fa-solid fa-chevron-right text-slate-300 text-sm group-hover:text-teal-600 transition"></i>
        </button>
      </div>

      <!-- Preferences Section -->
      <div class="bg-white border border-slate-200 rounded-xl shadow-sm mb-8">
        <ThemeToggle />
      </div>

      <!-- Additional Info Cards -->
      <div class="grid grid-cols-2 gap-4 lg:gap-6 mb-8">
        <!-- Orders Count -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 lg:p-6 text-center">
          <div class="text-2xl lg:text-3xl font-bold text-teal-600 mb-1">
            <i class="fa-solid fa-box text-2xl lg:text-3xl"></i>
          </div>
          <p class="text-xs lg:text-sm text-slate-500 font-medium">Total Orders</p>
          <p class="text-lg lg:text-xl font-bold text-slate-900 mt-1">5</p>
        </div>

        <!-- Loyalty Points (Optional) -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 lg:p-6 text-center">
          <div class="text-2xl lg:text-3xl font-bold text-amber-500 mb-1">
            <i class="fa-solid fa-star text-2xl lg:text-3xl"></i>
          </div>
          <p class="text-xs lg:text-sm text-slate-500 font-medium">Loyalty Points</p>
          <p class="text-lg lg:text-xl font-bold text-slate-900 mt-1">1,250</p>
        </div>
      </div>

      <!-- Logout Button -->
      <button
        type="button"
        @click="handleLogout"
        class="w-full bg-red-50 border-2 border-red-200 text-red-600 font-bold py-3 lg:py-4 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <i class="fa-solid fa-sign-out-alt text-base"></i>
        <span>Logout</span>
      </button>

      <!-- Footer Info -->
      <div class="mt-8 pt-6 border-t border-slate-200 text-center">
        <p class="text-xs lg:text-sm text-slate-500">
          Need help? <a href="#" class="text-teal-600 font-semibold hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  </div>
</template>
