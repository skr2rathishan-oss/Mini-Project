import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useCheckoutStore } from '../stores/checkout'
import { fetchProductById, fetchProducts } from '../services/api'
import type { Product } from '../types/product'
import { LKR_RATE } from '../constants/currency'

export function useProductDetail() {
  const router = useRouter()
  const cart = useCartStore()
  const checkout = useCheckoutStore()

  const loading = ref(true)
  const error = ref('')
  const product = ref<Product | null>(null)

  const relatedProducts = ref<Product[]>([])
  const activeImage = ref('')
  const selectedColor = ref<string>('')

  const priceLKR = computed(() => {
    if (!product.value) return ''
    return (product.value.price * LKR_RATE).toLocaleString()
  })

  function onAddToCart(p: Product | null) {
    if (!p) return
    cart.add(p)
  }

  function onBuyNow(p: Product | null) {
    if (!p) return
    const buyNowItem = {
      id: p.id,
      name: p.title,
      price: p.price * LKR_RATE,
      quantity: 1,
      image: p.thumbnail || p.images?.[0] || ''
    }
    checkout.setBuyNowItem(buyNowItem)
    router.push('/checkout')
  }

  function onWishlist() {
    console.log('Wishlist clicked')
  }

  async function load(id: number) {
    loading.value = true
    error.value = ''

    try {
      const p = await fetchProductById(id)
      product.value = p

      activeImage.value = p.images?.[0] || p.thumbnail || ''

      const colors = p.colors
      selectedColor.value = colors?.[0] || ''

      const list = await fetchProducts(50)
      relatedProducts.value = (list.products || [])
        .filter((x: Product) => x.id !== id)
        .slice(0, 3)
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    product,
    relatedProducts,
    activeImage,
    selectedColor,
    priceLKR,
    onAddToCart,
    onBuyNow,
    onWishlist,
    load
  }
}
