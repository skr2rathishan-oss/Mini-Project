<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form state
const isSignUp = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

// Toggle between signin and signup
const toggleMode = () => {
  isSignUp.value = !isSignUp.value
  // Reset form
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  name.value = ''
  showPassword.value = false
  showConfirmPassword.value = false
}

// Handle signin
const handleSignIn = async () => {
  if (!email.value || !password.value) {
    alert('Please fill in all fields')
    return
  }

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('User signed in:', { email: email.value })
    // Here you would typically handle authentication
    router.push('/')
  } catch (error) {
    console.error('Signin error:', error)
    alert('Signin failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Handle signup
const handleSignUp = async () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Please fill in all fields')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  if (password.value.length < 6) {
    alert('Password must be at least 6 characters long')
    return
  }

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('User signed up:', { name: name.value, email: email.value })
    // Here you would typically handle user registration
    alert('Account created successfully! Please sign in.')
    isSignUp.value = false
  } catch (error) {
    console.error('Signup error:', error)
    alert('Signup failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Handle form submission
const handleSubmit = () => {
  if (isSignUp.value) {
    handleSignUp()
  } else {
    handleSignIn()
  }
}

// Go back to home
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ isSignUp ? 'Create your account' : 'Sign in to your account' }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ isSignUp ? 'Join us to access your profile and manage orders' : 'Access your profile and manage your orders' }}
        </p>
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="bg-white py-8 px-6 shadow-lg rounded-lg space-y-4">
          <!-- Name field (only for signup) -->
          <div v-if="isSignUp">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your full name"
            />
          </div>

          <!-- Email field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your email"
            />
          </div>

          <!-- Password field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                :minlength="isSignUp ? 6 : undefined"
                class="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                :placeholder="isSignUp ? 'Create a password (min 6 characters)' : 'Enter your password'"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" class="text-gray-400"></i>
              </button>
            </div>
          </div>

          <!-- Confirm Password field (only for signup) -->
          <div v-if="isSignUp">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i :class="showConfirmPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'" class="text-gray-400"></i>
              </button>
            </div>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center">
              <i class="fa-solid fa-spinner fa-spin mr-2"></i>
              {{ isSignUp ? 'Creating Account...' : 'Signing In...' }}
            </span>
            <span v-else>
              {{ isSignUp ? 'Create Account' : 'Sign In' }}
            </span>
          </button>
        </div>

        <!-- Toggle between signin/signup -->
        <div class="text-center">
          <button
            type="button"
            @click="toggleMode"
            class="text-teal-600 hover:text-teal-500 text-sm font-medium"
          >
            {{ isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one" }}
          </button>
        </div>

        <!-- Back to home -->
        <div class="text-center">
          <button
            type="button"
            @click="goHome"
            class="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </form>
    </div>
  </div>
</template>