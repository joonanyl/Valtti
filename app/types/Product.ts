import { Order } from "./Order"
import { User } from "./User"
import { Review } from "./Review"

export interface Product {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description?: string
  price?: number
  location?: string
  profession?: string
  user: User
  reviews?: Review[]
  orders?: Order[]
}
