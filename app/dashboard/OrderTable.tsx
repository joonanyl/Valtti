import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"
import { Order } from "../types/Order"

type OrderTableProps = {
  orders: Order[]
}

export default function OrderTable({ orders }: OrderTableProps) {
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
          {orders?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.product.title}</Td>
              <Td>{order.message}</Td>
              <Td>{order.buyer ? order.buyer.name : order.seller?.name}</Td>
              <Td>{order.product.price}</Td>
              <Td>{order.status ? "✅" : "❌"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
