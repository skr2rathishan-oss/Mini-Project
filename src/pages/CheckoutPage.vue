<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCheckoutStore } from "@/stores/checkout";
import { useCartStore } from "@/types/cart";

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

// Watch for cart selected items changes and update checkout (only in cart mode)
watch(() => cart.selectedItems, (newItems) => {
  if (checkout.mode === "cart" && newItems.length > 0) {
    checkout.setItems(newItems.map(item => ({ ...item.product, name: item.product.title, image: item.product.thumbnail, quantity: item.quantity })));
  }
}, { deep: true });
</script>

<template>
  <!-- Confirmation step -->
  <CheckoutConfirmation
    v-if="checkout.step === 'confirmation'"
    @complete="onComplete"
  />

  <!-- Shipping/Payment -->
  <div v-else class="h-screen w-full flex flex-col bg-white overflow-hidden gap-0.5">
    <CheckoutHeader @cancel="onBack" />

    <div class="grow flex flex-row overflow-hidden">
      <!-- Left -->
      <div class="grow custom-scrollbar px-12 lg:px-16">
        <div class="max-w-2xl mx-auto">
          <CheckoutShipping v-if="checkout.step === 'shipping'" />
          <CheckoutPayment v-else />
        </div>
      </div>

      <div class="w-full max-w-sm lg:max-w-md flex flex-row mr-20">
        <!-- Order Summary -->
        <OrderSummary class="flex-1 mt-15 mr-1.5 ml-0.5" />
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
