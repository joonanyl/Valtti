export type Products = {
  title: string
  id: string
  createdAt: string
  profession: string
  price: number
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
