import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Product } from '../types/product'

export interface CartItem {
  product: Product
  quantity: number
}

const STORAGE_KEY = 'shopnet_cart_v1'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadFromStorage())

  function loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  }

  // auto-save to localStorage (persist across refresh)
  watch(
    items,
    (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
    { deep: true }
  )

  const count = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  )

  function add(product: Product, qty = 1) {
    const found = items.value.find((i) => i.product.id === product.id)
    if (found) found.quantity += qty
    else items.value.push({ product, quantity: qty })
  }

  function remove(productId: number) {
    items.value = items.value.filter((i) => i.product.id !== productId)
  }

  function clear() {
    items.value = []
  }

  function setQuantity(productId: number, quantity: number) {
    const found = items.value.find((i) => i.product.id === productId)
    if (!found) return
    found.quantity = Math.max(1, quantity)
  }

  function inc(productId: number) {
    const found = items.value.find((i) => i.product.id === productId)
    if (found) found.quantity += 1
  }

  function dec(productId: number) {
    const found = items.value.find((i) => i.product.id === productId)
    if (found) found.quantity = Math.max(1, found.quantity - 1)
  }

  return { items, count, subtotal, add, remove, clear, setQuantity, inc, dec }
})
