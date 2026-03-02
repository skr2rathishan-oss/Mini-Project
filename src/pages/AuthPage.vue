<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import AuthCard from "../components/AuthCardPage/AuthCard.vue";
import SignInForm from "../components/AuthCardPage/SignInForm.vue";
import RegisterForm from "../components/AuthCardPage/RegisterForm.vue";
import ForgotPasswordForm from "../components/AuthCardPage/ForgotPasswordForm.vue";

const router = useRouter();
const auth = useAuthStore();

const title = computed(() => {
  if (auth.view === "signin") return "Nice to see you again";
  if (auth.view === "register") return "Create your account";
  return "Reset your password";
});

const subtitle = computed(() => {
  if (auth.view === "signin") return "Please enter your details to continue.";
  if (auth.view === "register") return "Create an account to continue shopping.";
  return "Enter your email and we’ll send a reset link.";
});

function onBack() {
  router.push("/shop"); // back to shop (change if your shop route differs)
}
</script>

<template>
  <div class="h-screen flex bg-gray-50">
    <!-- Left Panel: Image Section -->
    <div class="hidden lg:block lg:w-3/5 relative overflow-hidden">
      <img
        src="../assets/images/best-ecommerce-website-templates.jpg"
        alt="Lighthouse at dusk"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

      <!-- Back Button -->
      <button
        @click="onBack"
        class="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full font-medium cursor-pointer"
      >
        <!-- ArrowLeft icon (inline SVG) -->
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to Shop
      </button>
    </div>

    <!-- Right Panel -->
    <div class="w-full lg:w-2/5 flex items-start justify-center p-4 md:p-6 lg:p-8 bg-white">
      <AuthCard :title="title" :subtitle="subtitle">
        <SignInForm v-if="auth.view === 'signin'" />
        <RegisterForm v-else-if="auth.view === 'register'" />
        <ForgotPasswordForm v-else />
      </AuthCard>
    </div>
  </div>
</template>
