<script setup lang="ts">
import { computed, ref } from "vue";
import { useUiStore } from "../../types/ui";

const ui = useUiStore();
const isDark = computed(() => ui.theme === "dark");

/** click press effect */
const pressed = ref(false);

function toggle() {
  pressed.value = true;
  ui.toggleTheme();
  window.setTimeout(() => (pressed.value = false), 150);
}
</script>

<template>
  <button
    type="button"
    @click="toggle"
    class="w-full flex items-center justify-between px-3 py-2 rounded-xl
           hover:bg-slate-50 transition active:scale-[0.98]"
  >
    <!-- Label -->
    <div class="flex items-center gap-2">
      <span class="text-sm font-semibold text-slate-800">Theme</span>
      <span class="text-xs text-slate-400">
        {{ isDark ? "Dark" : "Light" }}
      </span>
    </div>

    <!-- Switch -->
    <div
      class="relative w-12 h-7 rounded-full px-1 flex items-center
             transition-colors duration-300"
      :class="isDark ? 'bg-teal-500' : 'bg-slate-300'"
    >
      <!-- Glow -->
      <div
        class="absolute inset-0 rounded-full blur-md transition-opacity duration-300"
        :class="isDark ? 'opacity-40 bg-teal-400' : 'opacity-0'"
      />

      <!-- Knob -->
      <div
        class="relative z-10 w-5 h-5 rounded-full bg-white shadow-lg
               transition-all duration-300 ease-in-out"
        :class="[
          isDark ? 'translate-x-5' : 'translate-x-0',
          pressed ? 'scale-95' : 'scale-100'
        ]"
      >
      </div>
    </div>
  </button>
</template>

<style scoped>
/* No spring animation needed — smooth sliding handled by transition */
</style>
