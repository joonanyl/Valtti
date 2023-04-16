"use client"

import axios, { AxiosError } from "axios"
import CreateProduct from "./components/CreateProductForm"
import { useQuery } from "@tanstack/react-query"
import ProductCard from "./components/ProductCard"
import { Products } from "./types/Products"
import { Box, Heading, SimpleGrid } from "@chakra-ui/react"

const getProducts = async () => {
  const response = await axios.get("/api/products/getProducts")
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery<Products[], AxiosError>({
    queryFn: getProducts,
    queryKey: ["products"],
  })

  if (error) return <div>Error: {error.message}</div>
  if (isLoading) return <p>Loading...</p>

  console.log(data)

  return (
    <main>
      <CreateProduct />
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
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={"20px"}>
          {data?.map((post) => (
            <ProductCard
              key={post.id}
              id={post.id}
              name={post.user.name}
              avatar={post.user.image}
              title={post.title}
              reviews={post?.reviews}
              profession={post?.profession}
              price={post?.price}
            />
          ))}
        </SimpleGrid>
      </Box>
    </main>
  )
}
