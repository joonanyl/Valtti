export type PostType = {
  id: string
  title: string
  updatedAt?: string
  user: {
    id: string
    name: string
    email: string
    image: string
  }
  reviews?: {
    id: string
    createdAt: string
    postid: string
    content: string
    rating: number
    userId: string
    user: {
      id: string
      name: string
      email: string
      image: string
    }
  }[]
}
