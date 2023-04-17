"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import ProductCard from "../components/ProductCard"
import { SimpleGrid } from "@chakra-ui/react"
import { Product } from "../types/Product"

const fetchUserProducts = async () => {
  const response = await axios.get("/api/products/authProducts")
  return response.data
}

export default function UserProducts() {
  const { data, isLoading } = useQuery<Product[]>({
    queryFn: fetchUserProducts,
    queryKey: ["userProducts"],
  })

  if (isLoading) return <h1>Products are loading...</h1>

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, xl: 3 }}
      spacingX={"5px"}
      spacingY={"40px"}>
      {data?.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product?.user?.name!}
          avatar={product.user.image!}
          title={product.title}
          reviews={product?.reviews}
          profession={product?.profession}
          price={product?.price!}
        />
      ))}
    </SimpleGrid>
  )
}
