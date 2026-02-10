import type { Product, ProductResponse } from '../types/product'

const BASE = 'https://dummyjson.com'

/* ---------------- Fetch all products ---------------- */
export async function fetchProducts(limit: number = 50): Promise<ProductResponse> {
  const res = await fetch(`${BASE}/products?limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

/* ---------------- Search products ---------------- */
export async function searchProducts(q: string): Promise<ProductResponse> {
  const res = await fetch(`${BASE}/products/search?q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error('Failed to search products')
  return res.json()
}

/* ---------------- Featured products (for Hero Slider) ---------------- */
export async function fetchFeaturedProducts(limit: number = 5): Promise<ProductResponse> {
  const res = await fetch(`${BASE}/products?limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch featured products')
  return res.json()
}

/* ---------------- Fetch single product by ID ---------------- */
export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}
