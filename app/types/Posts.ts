export type PostsType = {
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
    postid: string
    content: string
    rating: number
  }[]
}
