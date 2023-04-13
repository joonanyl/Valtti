"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Table } from "react-daisyui"
import Link from "next/link"

type Order = {
  buyer: {
    email: string
    id: string
    name: string
  }
  product: {
    id: string
    price: number
    title: string
  }
  createdAt: Date
  id: string
  message: string
  productId: string
  status: boolean
}

const fetchUserSellingOrders = async () => {
  const response = await axios.get("/api/orders/userOrders")
  return response.data
}

export default function SellingOrders() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<Order[]>({
    queryFn: fetchUserSellingOrders,
    queryKey: ["sellingOrders"],
  })

  const handleUpdate = async (orderId: string) => {
    try {
      console.log(orderId)
      await axios.put(`/api/orders/${orderId}?status=true`)
      queryClient.invalidateQueries(["sellingOrders"])
    } catch {
      console.log(error)
    }
  }

  if (isLoading) return <h1 className="my-4">Orders are loading...</h1>
  if (error) return <h1>Error....</h1>
  console.log(data)

  return (
    <Table zebra={true}>
      <Table.Head>
        <span>Product</span>
        <span>Message</span>
        <span>Buyer</span>
        <span>Price</span>
        <span>Status</span>
        <span></span>
      </Table.Head>
      <Table.Body>
        {data?.map((order) => (
          <Table.Row key={order.id}>
            <Link href={`/product/${order.product.id}`}>
              <span>{order.product.title}</span>
            </Link>
            <span>{order.message}</span>
            <span>{order.buyer.name}</span>
            <span>{order.product.price}</span>
            <span>{order.status ? "completed" : "In progress"}</span>
            <span>
              <button className="btn" onClick={() => handleUpdate(order.id)}>
                Mark done
              </button>
            </span>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
