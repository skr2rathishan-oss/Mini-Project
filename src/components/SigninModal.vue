<script setup lang="ts">
import { ref, watch } from 'vue'

type Profile = { name: string; email: string }

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'signIn', profile: Profile): void
  (e: 'navigateToSignUp'): void
  (e: 'navigateToForgot'): void
}>()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

function onClose() {
  emit('close')
}

function handleSubmit() {
  emit('signIn', {
    name: 'University Student',
    email: email.value || 'student@university.edu'
  })
}

function toggleShow() {
  showPassword.value = !showPassword.value
}

// Optional: reset fields when modal closes
watch(
  () => props.isOpen,
  (open) => {
    if (!open) {
      email.value = ''
      password.value = ''
      showPassword.value = false
    }
  }
)
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Overlay -->
    <button
      type="button"
      class="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
      aria-label="Close modal overlay"
      @click="onClose"
    />

    <!-- Modal -->
    <div
      class="relative bg-white w-full max-w-5xl h-[600px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
    >
      <!-- Left Side - Blue Brand Panel -->
      <div class="md:w-[45%] bg-teal-600 relative overflow-hidden flex flex-col justify-center px-12 text-white">
        <!-- Abstract Circles -->
        <div class="absolute top-[-100px] left-[-100px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-[#00a8c1]/30 rounded-full blur-2xl"></div>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-[40px] border-white/5 rounded-full"
        ></div>

        <div class="relative z-10 space-y-4">
          <h1 class="text-5xl font-black tracking-tight uppercase">Welcome</h1>
          <h2 class="text-xl font-bold uppercase tracking-[0.2em] text-cyan-200">Shopnet Premium</h2>
          <p class="text-sm text-white/70 max-w-xs leading-relaxed font-medium pt-4">
            Explore the latest in electronics and lifestyle gadgets designed for the modern university student.
          </p>
        </div>
      </div>

      <!-- Right Side - Sign In Form -->
      <div class="flex-1 bg-white p-12 md:p-16 flex flex-col relative">
        <!-- Close button -->
        <button
          type="button"
          class="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors"
          @click="onClose"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>

        <div class="max-w-md mx-auto w-full flex-grow flex flex-col justify-center">
          <h2 class="text-4xl font-black text-gray-900 mb-2">Sign in</h2>
          <p class="text-gray-400 text-sm font-medium mb-10">
            Access your personalized shopping experience.
          </p>

          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Email -->
            <div class="space-y-1.5">
              <div class="relative group">
                <div
                  class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004c8c] transition-colors"
                >
                  <i class="fa-solid fa-user"></i>
                </div>

                <input
                  v-model="email"
                  type="email"
                  required
                  placeholder="User Name or Email"
                  class="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold
                         focus:ring-2 focus:ring-[#004c8c]/10 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-1.5">
              <div class="relative group">
                <div
                  class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004c8c] transition-colors"
                >
                  <i class="fa-solid fa-lock"></i>
                </div>

                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="Password"
                  class="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-12 text-sm font-bold
                         focus:ring-2 focus:ring-[#004c8c]/10 outline-none transition-all placeholder:text-gray-300"
                />

                <button
                  type="button"
                  class="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 uppercase tracking-widest
                         hover:text-gray-900 transition-colors"
                  @click="toggleShow"
                >
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>

            <!-- Remember + Forgot -->
            <div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
              <label class="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-gray-800">
                <input
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-200 text-[#004c8c] focus:ring-[#004c8c]"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                class="text-[#004c8c] hover:underline"
                @click="emit('navigateToForgot')"
              >
                Forgot Password?
              </button>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full bg-[#004c8c] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest
                     hover:bg-[#003a6b] transition-all shadow-xl shadow-blue-900/10 mt-4"
            >
              Sign in
            </button>
          </form>

          <!-- Divider -->
          <div class="relative flex items-center my-8">
            <div class="flex-grow border-t border-gray-100"></div>
            <span class="flex-shrink mx-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Or</span>
            <div class="flex-grow border-t border-gray-100"></div>
          </div>

          <!-- Google -->
          <button
            type="button"
            class="w-full border-2 border-gray-100 py-4 rounded-2xl font-bold text-sm text-gray-600
                   hover:bg-gray-50 transition-all flex items-center justify-center space-x-3"
          >
            <i class="fa-brands fa-google text-lg"></i>
            <span>Sign in with Google</span>
          </button>

          <!-- Sign up -->
          <p class="text-center mt-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
            Don't have an account?
            <button
              type="button"
              class="text-[#004c8c] hover:underline font-black"
              @click="emit('navigateToSignUp')"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
