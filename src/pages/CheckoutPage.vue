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
  <div v-else class="min-h-screen w-full flex flex-col bg-white">
    <CheckoutHeader @cancel="onBack" />

    <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
      <!-- Left -->
      <div class="flex-1 overflow-y-auto custom-scrollbar px-4 lg:px-16 py-6 lg:py-10 lg:min-w-0">
        <div class="max-w-2xl mx-auto">
          <CheckoutShipping v-if="checkout.step === 'shipping'" />
          <CheckoutPayment v-else />
        </div>
      </div>

      <!-- Order Summary - Below on mobile, Right side on desktop -->
      <div class="w-full lg:w-auto lg:flex-none px-4 lg:px-0 py-6 lg:py-10 lg:mr-8 border-t lg:border-t-0 lg:border-l border-slate-200">
        <div class="max-w-sm mx-auto lg:max-w-md">
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
