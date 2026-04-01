<template>
  <footer class="hidden lg:block bg-white border-t border-gray-100 pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2 lg:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <ShoppingBag class="text-white w-5 h-5" />
            </div>
            <span class="text-xl font-black tracking-tighter text-gray-900">
              SHOP<span class="text-teal-600">NET</span>
            </span>
          </div>

          <p class="text-gray-500 leading-relaxed mb-6 max-w-sm">
            The world's premier destination for high-end, sustainable beauty and lifestyle essentials.
            Join our community of 1M+ style enthusiasts.
          </p>

          <div class="flex gap-4">
            <a
              v-for="(social, i) in socials"
              :key="i"
              href="#"
              class="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-teal-600 hover:border-teal-100 hover:bg-teal-50 transition-all"
              :aria-label="social.label"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Shop -->
        <div>
          <h4 class="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Shop</h4>
          <ul class="space-y-4">
            <li v-for="item in shopLinks" :key="item">
              <a href="#" class="text-gray-500 hover:text-teal-600 transition-colors text-sm">
                {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
          <ul class="space-y-4">
            <li v-for="item in supportLinks" :key="item">
              <a href="#" class="text-gray-500 hover:text-teal-600 transition-colors text-sm">
                {{ item }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="bg-teal-50/50 p-8 rounded-3xl border border-teal-100/50">
          <h4 class="font-bold text-gray-900 mb-2">Join the Club</h4>
          <p class="text-sm text-gray-500 mb-6">
            Get 15% off your first order and exclusive access to launches.
          </p>

          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="email@example.com"
              class="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
            />
            <button
              type="button"
              class="absolute right-2 top-1.5 w-9 h-9 bg-teal-600 text-white rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors"
              @click="handleSubscribe"
              aria-label="Subscribe"
            >
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>

          <p v-if="status" class="mt-3 text-xs text-gray-500">
            {{ status }}
          </p>
        </div>
      </div>

      <!-- Bottom -->
      <div class="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-400">&copy; 2024 SHOPNET Global. All rights reserved.</p>

        <div class="flex gap-6">
          <a href="#" class="text-xs text-gray-400 hover:text-teal-600 transition-colors">Privacy Policy</a>
          <a href="#" class="text-xs text-gray-400 hover:text-teal-600 transition-colors">Terms of Service</a>
          <a href="#" class="text-xs text-gray-400 hover:text-teal-600 transition-colors">Cookie Settings</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, type Component } from "vue";
import { ShoppingBag, Instagram, Twitter, Facebook, ArrowRight } from "lucide-vue-next";

type SocialItem = {
  label: string;
  icon: Component;
};

const shopLinks = ["Beauty Collection", "Skincare Rituals", "Exclusive Deals", "Gift Cards", "New Arrivals"];
const supportLinks = ["Order Tracking", "Shipping Policy", "Returns & Exchanges", "Contact Support"];

const socials: SocialItem[] = [
  { label: "Instagram", icon: Instagram },
  { label: "Twitter", icon: Twitter },
  { label: "Facebook", icon: Facebook },
];

const email = ref<string>("");
const status = ref<string>("");

function handleSubscribe() {
  if (!email.value.trim()) {
    status.value = "Please enter your email.";
    return;
  }
  // TODO: connect to your API
  status.value = `Thanks! We'll reach out to ${email.value}.`;
  email.value = "";
}
</script>
