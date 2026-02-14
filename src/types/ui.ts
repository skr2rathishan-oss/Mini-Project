import { defineStore } from "pinia"

export interface HeroSlide {
  id: number
  badge: string
  title: string
  price: string 
  image: string
  bgColor: string
  productId: number
}

export const useUiStore = defineStore("ui", {
  state: () => ({
    isCartOpen: false,
  }),
  actions: {
    openCart() {
      this.isCartOpen = true;
    },
    closeCart() {
      this.isCartOpen = false;
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
  },
});
