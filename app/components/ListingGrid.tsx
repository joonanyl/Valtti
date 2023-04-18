"use client"

import axios, { AxiosError } from "axios"
import { Box, Heading, SimpleGrid } from "@chakra-ui/react"
import ProductCard from "./ProductCard"
import { useQuery } from "@tanstack/react-query"
import { Product } from "../types/Product"

const getProducts = async () => {
  const response = await axios.get("/api/products/getProducts")
  return response.data
}

export default function ListingGrid() {
  const { data, error, isLoading } = useQuery<Product[], AxiosError>({
    queryFn: getProducts,
    queryKey: ["products"],
  })

  if (error) return <div>Error: {error.message}</div>
  if (isLoading) return <p>Loading...</p>

  return (
    <Box my={20}>
      <Heading
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
        textAlign={"center"}>
        Ilmoitukset
      </Heading>
      <SimpleGrid
        mt={20}
        columns={{ base: 1, md: 2, xl: 3 }}
        spacingX={{ md: "10px", lg: 0 }}
        spacingY={"40px"}>
        {data?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.user?.name}
            avatar={product.user?.image}
            title={product.title}
            reviews={product?.reviews}
            profession={product?.profession}
            price={product?.price}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
