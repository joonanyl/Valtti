"use client"

import Post from "@/app/components/Post"
import { PostType } from "@/app/types/Post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

/*
    TODO: LUO TÄHÄN OIKEA POSTDETAILVIEW
*/

type URL = {
  params: {
    slug: string
  }
}

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["postDetails"],
  })

  if (isLoading) return "Loading..."
  if (data) {
    return (
      <div>
        <Post
          id={data.id}
          name={data.user.name}
          avatar={data.user.image}
          title={data.title}
          reviews={data.reviews}
        />
      </div>
    )
  }
}
