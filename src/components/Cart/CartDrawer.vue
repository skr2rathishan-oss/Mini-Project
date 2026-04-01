<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useUiStore } from "../../types/ui";
import { useCartStore } from "../../stores/cartStore";

import CartDrawerHeader from "./CartDrawerHeader.vue";
import CartDrawerBody from "./CartDrawerBody.vue";
import CartDrawerFooter from "./CartDrawerFooter.vue";

const ui = useUiStore();
const cart = useCartStore();
import { LKR_RATE } from "../../constants/currency";

/** UI state */
const isOpen = computed(() => ui.isCartOpen);

/** Cart state */
const items = computed(() => cart.items);
const selectedItems = computed(() => cart.selectedItems);
const subtotal = computed(() => cart.subtotal);
const subtotalLKR = computed(() => subtotal.value * LKR_RATE);

/** Shipping + totals */
const shippingThreshold = 200 * LKR_RATE;

const progress = computed(() => {
  const p = (subtotalLKR.value / shippingThreshold) * 100;
  return Math.min(100, Math.max(0, p));
});

const remainingForFreeShipping = computed(() =>
  Math.max(0, shippingThreshold - subtotalLKR.value)
);

const shippingFee = computed(() => (progress.value >= 100 ? 0 : 15));
const total = computed(() => subtotal.value + shippingFee.value);

/** Derived helpers */
const itemCount = computed(() => items.value.length);
const selectedCount = computed(() => selectedItems.value.length);

function close() {
  ui.closeCart();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

/** Prevent background scroll when drawer is open */
watch(isOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});

function formatMoney(n: number) {
  return `LKR ${(n * LKR_RATE).toLocaleString()}`;
}
</script>

<template>
  <Teleport to="body">
    <!-- Wrapper appears/disappears -->
    <div v-if="isOpen" class="fixed inset-0 z-200 flex justify-end">
      <!-- Backdrop fade -->
      <Transition name="fade">
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="close"
        />
      </Transition>

      <!-- Drawer slide -->
      <Transition name="drawer">
        <div
          class="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
          @click.stop
        >
          <!-- HEADER -->
          <CartDrawerHeader :count="itemCount" @close="close" />

          <!-- BODY -->
          <CartDrawerBody
            :items="items"
            :selectedItems="selectedItems"
            :progress="progress"
            :remainingForFreeShipping="remainingForFreeShipping"
            :formatMoney="formatMoney"
            @close="close"
            @toggleAll="cart.toggleAll"
            @toggleSelection="cart.toggleSelection"
            @removeItem="cart.removeItem"
            @updateQuantity="cart.updateQuantity"
          />

          <!-- FOOTER -->
          <CartDrawerFooter
            :selectedCount="selectedCount"
            :subtotal="subtotal"
            :progress="progress"
            :total="total"
            :formatMoney="formatMoney"
          />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
/* Backdrop fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Drawer slide (smooth premium easing) */
.drawer-enter-active,
.drawer-leave-active {
  transition:
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 200ms ease;
  will-change: transform;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
  opacity: 0.75;
}
.drawer-enter-to,
.drawer-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
