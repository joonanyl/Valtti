import { Product } from "./Product"
import { Order } from "./Order"
import { Review } from "./Review"

export interface User {
  id: string
  name?: string
  email?: string
  emailVerified?: Date
  image?: string
  products?: Product[]
  reviews?: Review[]
  sellingOrders?: Order[]
  buyingOrders?: Order[]
  notifications?: Notification[]
}
