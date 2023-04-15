"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react"

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
    <TableContainer
      mx={{ base: "4", md: "6" }}
      borderColor="gray.200"
      borderWidth="1px"
      rounded="lg">
      <Table variant={"striped"}>
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Message</Th>
            <Th>Buyer</Th>
            <Th>Price</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.product.title}</Td>
              <Td>{order.message}</Td>
              <Td>{order.buyer.name}</Td>
              <Td>{order.product.price}</Td>
              <Td>{order.status ? "✅" : "❌"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
