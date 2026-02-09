import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Array<{ product: any; quantity: number }>>([])

  const count = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  const add = (product: any, quantity = 1) => {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
  }

  const remove = (productId: number) => {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  const inc = (productId: number) => {
    const item = items.value.find(i => i.product.id === productId)
    if (item) item.quantity++
  }

  const dec = (productId: number) => {
    const item = items.value.find(i => i.product.id === productId)
    if (item && item.quantity > 1) item.quantity--
  }

  const clear = () => {
    items.value = []
  }

  return { items, count, subtotal, add, remove, inc, dec, clear }
})