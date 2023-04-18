import { Product } from "./Product"

export interface Picture {
  id: string
  url: string
  product: Product
  productId: string
}
