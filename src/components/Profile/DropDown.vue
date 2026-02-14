<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useUiStore } from "../../types/ui";
import ThemeToggle from "./ThemeToggle.vue";
import { useRouter } from "vue-router";

const ui = useUiStore();
const router = useRouter();
const menuRef = ref<HTMLElement | null>(null);

// Debug: watch the state
watch(() => ui.isProfileMenuOpen, (newVal) => {
  console.log('isProfileMenuOpen changed to:', newVal);
});

function close() {
  ui.closeProfileMenu();
}

function go(path: string) {
  close();
  router.push(path);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

function onClickOutside(e: MouseEvent) {
  const target = e.target as Node;
  if (!menuRef.value) return;
  if (!menuRef.value.contains(target)) close();
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("mousedown", onClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("mousedown", onClickOutside);
});
</script>

<template>
  <Transition name="menu">
    <div
      v-if="ui.isProfileMenuOpen"
      ref="menuRef"
      class="absolute right-0 mt-3 w-72 rounded-2xl border border-slate-200
             bg-white shadow-xl p-3 z-50"
      style="top: 100%; margin-top: 8px;"
    >
      <div class="px-3 py-2">
        <p class="text-sm font-black text-slate-900">Account</p>
        <p class="text-xs text-slate-400">Manage your profile & orders</p>
      </div>

      <div class="h-px bg-slate-100 my-2"></div>

      <button class="menuItem" @click="go('/profile')">My Profile</button>
      <button class="menuItem" @click="go('/orders')">Orders</button>
      <button class="menuItem" @click="go('/wishlist')">Wishlist</button>
      <button class="menuItem" @click="go('/settings')">Settings</button>

      <div class="h-px bg-slate-100 my-2"></div>

      <ThemeToggle />
    </div>
  </Transition>
</template>

<style scoped>
.menuItem {
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(51 65 85);
  transition: background-color 150ms ease;
}
.menuItem:hover {
  background: rgb(248 250 252);
}

.menu-enter-active,
.menu-leave-active {
  transition: all 150ms ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
