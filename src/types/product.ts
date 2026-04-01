export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  category: string
  subCategory?: string
  brand?: string
  thumbnail: string
  images: string[]
  colors?: string[]
  reviews?: ProductReview[]
}

export interface ProductResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
