export type AuthProduct = {
  email: string
  id: string
  image: string
  name: string
  products: {
    createdAt: string
    id: string
    title: string
    reviews?: {
      createdAt: string
      id: string
      productId: string
      title: string
      userId: string
    }[]
  }[]
}
