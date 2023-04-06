"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthProduct } from "../types/AuthProducts"
import EditProduct from "../components/EditProduct"

const fetchUserProducts = async () => {
  const response = await axios.get("/api/products/authProducts")
  return response.data
}

export default function UserProducts() {
  const { data, isLoading } = useQuery<AuthProduct>({
    queryFn: fetchUserProducts,
    queryKey: ["userProducts"],
  })

  if (isLoading) return <h1>Products are loading...</h1>
  console.log(data)

  return (
    <div>
      {data?.products?.map((product) => (
        <EditProduct
          key={product.id}
          id={product.id}
          avatar={data.image}
          name={data.name}
          title={product.title}
          reviews={product.reviews}
        />
      ))}
    </div>
  )
}
