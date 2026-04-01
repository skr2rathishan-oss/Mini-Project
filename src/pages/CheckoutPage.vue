<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCheckoutStore } from "@/stores/checkout";
import { useCartStore } from "@/stores/cartStore";

import CheckoutHeader from "../components/Checkout/CheckoutHeader.vue";
import CheckoutShipping from "../components/Checkout/CheckoutShipping.vue";
import CheckoutPayment from "../components/Checkout/CheckoutPayment.vue";
import CheckoutConfirmation from "../components/Checkout/CheckoutConfirmation.vue";
import OrderSummary from "@/components/Checkout/OrderSummary.vue";

const router = useRouter();
const checkout = useCheckoutStore();
const cart = useCartStore();

function onBack() {
  router.push("/shop"); // cancel goes back to shop
}

function onComplete() {
  router.push("/"); // continue shopping
  checkout.$reset();
  cart.clear();
}

onMounted(() => {
  // Only set cart items if mode is "cart" and cart has selected items
  if (checkout.mode === "cart" && cart.selectedItems.length > 0) {
    checkout.setItems(cart.selectedItems.map(item => ({ ...item.product, name: item.product.title, image: item.product.thumbnail, quantity: item.quantity })));
  }
});

// Watch for underlying cart counts and update seamlessly
watch(
  () => [cart.selectedItems.length, cart.subtotal],
  () => {
    const newItems = cart.selectedItems;
    if (checkout.mode === "cart" && newItems.length > 0) {
      checkout.setItems(
        newItems.map((item) => ({
          ...item.product,
          name: item.product.title,
          image: item.product.thumbnail,
          quantity: item.quantity,
        }))
      );
    }
  }
);
</script>

<template>
  <!-- Confirmation step -->
  <CheckoutConfirmation
    v-if="checkout.step === 'confirmation'"
    @complete="onComplete"
  />

  <!-- Shipping/Payment -->
  <div v-else class="fixed inset-0 z-40 h-screen w-full flex flex-col overflow-hidden bg-white dark:bg-slate-900">
    <CheckoutHeader @cancel="onBack" />

    <div class="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
      <!-- Left -->
      <div class="flex-1 min-h-0 px-4 lg:px-10 py-4 lg:py-4 lg:min-w-0">
        <div class="max-w-2xl mx-auto h-full">
          <CheckoutShipping v-if="checkout.step === 'shipping'" />
          <CheckoutPayment v-else />
        </div>
      </div>

      <!-- Order Summary - Below on mobile, Right side on desktop -->
      <div class="w-full lg:w-auto lg:flex-none px-4 lg:px-0 py-4 lg:pt-7 lg:pb-4 lg:pl-6 lg:pr-4 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700">
        <div class="max-w-sm mx-auto lg:mx-0 lg:max-w-2xl h-full">
          <OrderSummary />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
