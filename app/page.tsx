"use client"

import axios, { AxiosError } from "axios"
import AddProduct from "./components/AddProduct"
import { useQuery } from "@tanstack/react-query"
import Product from "./components/Product"
import { Products } from "./types/Products"

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
      <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Add a new listing
        </div>
        <div className="collapse-content">
          <AddProduct />
        </div>
      </div>
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
