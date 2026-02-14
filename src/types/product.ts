export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  category: string
  brand?: string
  thumbnail: string
  images: string[]
}

export interface ProductResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
