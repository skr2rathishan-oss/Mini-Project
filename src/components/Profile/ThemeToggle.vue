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
  window.setTimeout(() => (pressed.value = false), 180);
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

    <!-- Premium Switch -->
    <div
      class="relative w-12 h-7 rounded-full px-1 flex items-center
             transition-colors duration-300"
      :class="isDark ? 'bg-teal-500' : 'bg-slate-300'"
    >
      <!-- Soft Glow -->
      <div
        class="absolute inset-0 rounded-full blur-md transition-opacity duration-300"
        :class="isDark ? 'opacity-50 bg-teal-400' : 'opacity-0 bg-transparent'"
      />

      <!-- Knob -->
      <div
        class="relative z-10 w-6 h-6 rounded-full bg-white shadow-lg
               flex items-center justify-center
               transition-transform duration-500 will-change-transform"
        :class="[
          isDark ? 'translate-x-5' : 'translate-x-0',
          pressed ? 'scale-95' : 'scale-100',
          isDark ? 'knob-spring-dark' : 'knob-spring-light'
        ]"
      >
        <!-- Icon morph -->
        <span class="relative w-4 h-4 block">
          <span
            class="absolute inset-0 flex items-center justify-center transition-all duration-300"
            :class="isDark ? 'opacity-0 scale-50 -rotate-90' : 'opacity-100 scale-100 rotate-0'"
          >
            ☀️
          </span>

          <span
            class="absolute inset-0 flex items-center justify-center transition-all duration-300"
            :class="isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'"
          >
            🌙
          </span>
        </span>
      </div>
    </div>
  </button>
</template>

<style scoped>
.knob-spring-light {
  animation: springLeft 500ms cubic-bezier(0.2, 0.9, 0.2, 1);
}
.knob-spring-dark {
  animation: springRight 500ms cubic-bezier(0.2, 0.9, 0.2, 1);
}

@keyframes springRight {
  0%   { transform: translateX(0) scale(1); }
  65%  { transform: translateX(22px) scale(1.08); }
  100% { transform: translateX(20px) scale(1); }
}

@keyframes springLeft {
  0%   { transform: translateX(20px) scale(1); }
  65%  { transform: translateX(-2px) scale(1.08); }
  100% { transform: translateX(0) scale(1); }
}
</style>
