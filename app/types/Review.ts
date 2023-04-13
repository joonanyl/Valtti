import { Product } from "./Product"
import { User } from "./User"

export interface Review {
  id: string
  createdAt: Date
  productId: string
  userId: string
  content: string
  rating: number
  product: Product
  user: User
}
