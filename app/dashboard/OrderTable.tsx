"use client"

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react"
import { Order } from "../types/Order"
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

type OrderTableProps = {
  orders: Order[]
}

export default function OrderTable({ orders }: OrderTableProps) {
  const queryClient = useQueryClient()

  const isBuyingOrder = typeof orders[0]?.seller !== "undefined"

  const handleUpdate = async (orderId: string) => {
    try {
      await axios.put(`/api/orders/${orderId}?status=true`)
      queryClient.invalidateQueries(["sellingOrders"])
      toast.success("Tilaus viimeistelty! Hyvää työtä 🔥")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <TableContainer
      mx={{ base: "4", md: "6" }}
      borderColor="gray.200"
      borderWidth="1px"
      rounded="lg">
      <Table variant={"striped"}>
        <Thead>
          <Tr>
            <Th>Ilmoitus</Th>
            <Th>Viesti</Th>
            <Th>Tilaaja</Th>
            <Th>Hinta</Th>
            <Th>Tila</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.product.title}</Td>
              <Td>{order.message}</Td>
              <Td>{order.buyer ? order.buyer.name : order.seller?.name}</Td>
              <Td>{order.product.price}</Td>
              <Td>{order.status ? "✅" : "❌"}</Td>
              {!isBuyingOrder && !order.status ? (
                <Td>
                  <Button
                    onClick={() => handleUpdate(order.id)}
                    className="bg-gray-700"
                    color={"white"}>
                    Merkitse tehdyksi
                  </Button>
                </Td>
              ) : (
                <Td bg="transparent" />
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
