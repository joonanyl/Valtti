"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthPosts } from "../types/AuthPosts"
import EditPost from "../components/EditPost"

const fetchUserPosts = async () => {
  const response = await axios.get("/api/posts/authPosts")
  return response.data
}

export default function UserPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchUserPosts,
    queryKey: ["authPosts"],
  })

  if (isLoading) return <h1>Posts are loading...</h1>
  console.log(data)

  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          key={post.id}
          id={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          reviews={post.reviews}
        />
      ))}
    </div>
  )
}
