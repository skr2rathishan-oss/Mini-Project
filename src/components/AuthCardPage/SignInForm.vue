<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();

const login = ref("");
const password = ref("");

const showPassword = ref(false);
const rememberMe = ref(false);

const error = ref("");
const loading = ref(false);

async function submit() {
  error.value = "";
  loading.value = true;

  try {
    // Demo sign-in: use login as email for now
    auth.signIn(login.value, password.value);

    // Redirect after login (if you added redirectAfterLogin in store)
    // If not using redirectAfterLogin, just go home.
    // @ts-ignore
    router.push(auth.redirectAfterLogin || "/");
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "Sign in failed";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="submit">
    <!-- Login Input -->
    <div>
      <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Login</label>
      <input
        v-model="login"
        type="text"
        placeholder="Email or phone number"
        class="w-full bg-gray-100/80 border-none rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder:text-gray-400 font-medium"
      />
    </div>

    <!-- Password Input -->
    <div class="relative">
      <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
      <div class="relative">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter password"
          class="w-full bg-gray-100/80 border-none rounded-xl py-4 px-4 pr-12 text-sm focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder:text-gray-400 font-medium"
        />

        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Toggle password visibility"
        >
          <!-- Eye / EyeOff (inline SVG) -->
          <svg v-if="!showPassword" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M3 3l18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path
              d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M9.88 5.08A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a18.32 18.32 0 0 1-3.17 4.34"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.11 6.11C3.7 7.9 2 12 2 12s3.5 7 10 7c1.06 0 2.06-.18 3-.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-sm font-bold text-red-600">{{ error }}</p>

    <!-- Remember Me & Forgot Password -->
    <div class="flex items-center justify-between py-1">
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="rememberMe = !rememberMe"
          class="w-10 h-5 rounded-full transition-colors relative flex items-center px-1"
          :class="rememberMe ? 'bg-teal-600' : 'bg-gray-200'"
          aria-label="Remember me"
        >
          <div
            class="w-3.5 h-3.5 bg-white rounded-full transition-transform duration-200 shadow-sm"
            :class="rememberMe ? 'translate-x-5' : 'translate-x-0'"
          ></div>
        </button>
        <span class="text-xs font-bold text-gray-500">Remember me</span>
      </div>

      <button
        type="button"
        class="text-xs font-bold text-teal-600 hover:underline"
        @click="auth.setView('forgot')"
      >
        Forgot password?
      </button>
    </div>

    <!-- Sign In Button -->
    <button
      type="submit"
      :disabled="loading"
      class="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-teal-500/20 hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-60"
    >
      {{ loading ? "Signing in..." : "Sign in" }}
    </button>

    <!-- Divider -->
    <div class="relative flex items-center justify-center py-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-100"></div>
      </div>
      <span class="relative bg-white px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        Or sign in with
      </span>
    </div>

    <!-- Google Button -->
    <button
      type="button"
      class="w-full bg-[#2d2d2d] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-[#1a1a1a] transition-all"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill-rule="evenodd" />
        <path fill="#34A853" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill-rule="evenodd" />
        <path fill="#FBBC05" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill-rule="evenodd" />
      </svg>
      Or sign in with Google
    </button>

    <!-- Sign up link -->
    <p class="mt-6 text-center text-xs font-bold text-gray-400">
      Don't have an account?
      <button type="button" class="text-teal-600 hover:underline" @click="auth.setView('register')">
        Sign up now
      </button>
    </p>
  </form>
</template>
