"use client"

import ProductDetail from "@/app/components/ProductDetail"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AddReview from "@/app/components/AddReview"
import Image from "next/image"
import CreateReviewForm from "@/app/components/CreateReviewForm"
import ReviewCard from "@/app/components/ReviewCard"
import { VStack, Heading } from "@chakra-ui/react"

type URL = {
  params: {
    slug: string
  }
}

interface Review {
  id: string
  user: {
    image: string
    name: string
  }
  createdAt: string
  content?: string
  rating: number
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

  return (
    <main>
      <ProductDetail
        id={data.id}
        name={data.user.name}
        avatar={data.user.image}
        title={data.title}
        reviews={data.reviews}
        description={data.description}
        price={data.price}
        slug={url.params.slug}
        profession={data.profession}
      />
      <CreateReviewForm productId={data?.id} />
      <VStack mx={{ base: 2, lg: 28 }} my={8} spacing={6}>
        <Heading fontSize={"4xl"} textAlign={"center"} my={6}>
          Arvostelut
        </Heading>
        {data?.reviews?.map((review: Review) => (
          <ReviewCard
            key={review.id}
            content={review?.content!}
            createdAt={review.createdAt}
            id={review.id}
            rating={review.rating}
            userImage={review.user.image}
            userName={review.user.name}
          />
        ))}
      </VStack>
    </main>
  )
}
