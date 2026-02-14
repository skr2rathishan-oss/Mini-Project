import { defineStore } from "pinia";
import type { ShippingOption } from "../constants/shipping";

export type CheckoutStep = "shipping" | "payment" | "confirmation";

export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type BuyNowItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type AddressData = {
  fullName: string;
  street: string;
  city: string;
  zipCode: string;
};

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    mode: "cart" as "cart" | "buyNow",
    buyNowItem: null as BuyNowItem | null,

    step: "shipping" as CheckoutStep,

    items: [] as CartItem[],

    address: {
      fullName: "",
      street: "",
      city: "",
      zipCode: "",
    } as AddressData,

    selectedShipping: {
      id: "standard",
      name: "Standard Delivery",
      duration: "3–5 business days",
      price: 0,
      icon: "truck",
    } as ShippingOption,

    // payment fields (keep yours)
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  }),

  getters: {
    subtotal(state) {
      if (state.mode === "buyNow" && state.buyNowItem) {
        return state.buyNowItem.price * state.buyNowItem.quantity;
      }
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    tax(): number {
      return this.subtotal * 0.05;
    },
    shipping(): number {
      return this.selectedShipping?.price ?? 0;
    },
    total(): number {
      return this.subtotal + this.tax + this.shipping;
    },
  },

  actions: {
    setItems(items: CartItem[]) {
      this.items = items;
    },
    setBuyNowItem(item: BuyNowItem) {
      this.mode = "buyNow";
      this.buyNowItem = item;
      this.step = "shipping";
    },
    goShipping() {
      this.step = "shipping";
    },
    goPayment() {
      this.step = "payment";
    },
    goConfirmation() {
      this.step = "confirmation";
    },
  },
});
