import { Product } from "./Product"
import { User } from "./User"

export interface Order {
  id: string
  createdAt: Date
  updatedAt: Date
  totalPrice: number
  product: Product
  buyer: User
  seller: User
  status: boolean
  message: string
}
