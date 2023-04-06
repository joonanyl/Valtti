"use client"

import ProductDetail from "@/app/components/ProductDetail"
import { ProductType } from "@/app/types/Product"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AddReview from "@/app/components/AddReview"
import Image from "next/image"

/*
    TODO: LUO TÄHÄN OIKEA POSTDETAILVIEW
*/

type URL = {
  params: {
    slug: string
  }
}

interface Review {
  id: number
  user: {
    image: string
    name: string
  }
  createdAt: string
  content?: string
}

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/products/${slug}`)
  return response.data
}

export default function ProductDetailPage(url: URL) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["productDetails"],
  })

  if (isLoading) return "Loading..."
  if (data) {
    return (
      <div>
        <ProductDetail
          id={data.id}
          name={data.user.name}
          avatar={data.user.image}
          title={data.title}
          reviews={data.reviews}
          description={data.description}
        />
        {data?.reviews?.map((review: Review) => (
          <div key={review.id} className="my-6 bg-white p-8 rounded-md">
            <div className="flex items-center gap-2">
              <Image
                width={24}
                height={24}
                src={review.user?.image}
                alt="avatar"
              />
              <h3 className="font-bold">{review.user?.name}</h3>
              <h2 className="text-sm">{review.createdAt}</h2>
            </div>
            <div className="py-4">{review.content}</div>
          </div>
        ))}
        <AddReview id={data?.id} />
      </div>
    )
  }
}
