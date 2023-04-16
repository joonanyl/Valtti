"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthProduct } from "../types/AuthProducts"
import EditProduct from "../components/EditProduct"
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
    <SimpleGrid mt={20} columns={2} spacing={"20px"}>
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
