"use client"

import axios, { AxiosError } from "axios"
import AddProduct from "./components/AddProduct"
import { useQuery } from "@tanstack/react-query"
import Product from "./components/Product"
import { Products } from "./types/Products"
import { useColorMode } from "@chakra-ui/react"

const getProducts = async () => {
  const response = await axios.get("/api/products/getProducts")
  return response.data
}

export default function Home() {
  const { toggleColorMode } = useColorMode()
  const { data, error, isLoading } = useQuery<Products[], AxiosError>({
    queryFn: getProducts,
    queryKey: ["products"],
  })

  if (error) return <div>Error: {error.message}</div>
  if (isLoading) return <p>Loading...</p>

  console.log(data)

  return (
    <main>
      <AddProduct />
      <div className="flex justify-center align-middle gap-12">
        {data?.map((post) => (
          <Product
            key={post.id}
            id={post.id}
            name={post.user.name}
            avatar={post.user.image}
            title={post.title}
            reviews={post?.reviews}
            profession={post?.profession}
          />
        ))}
      </div>
    </main>
  )
}
