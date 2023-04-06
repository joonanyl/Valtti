export type ProductsType = {
  title: string
  id: string
  createdAt: string
  user: {
    name: string
    image: string
  }
  reviews?: {
    id: string
    createdAt: string
    productId: string
    content: string
    rating: number
  }[]
}
