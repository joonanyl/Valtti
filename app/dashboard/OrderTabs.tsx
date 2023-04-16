"use client"

import { Order } from "../types/Order"
import OrderTable from "./OrderTable"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const fetchUserSellingOrders = async () => {
  const response = await axios.get("/api/orders/sellingOrders")
  return response.data
}

const fetchUserBuyingOrders = async () => {
  const response = await axios.get("/api/orders/buyingOrders")
  return response.data
}

export default function OrderTabs() {
  const {
    data: buyingOrders = [],
    isLoading: isBuyingOrdersLoading,
    error: buyingOrdersError,
  } = useQuery<Order[]>({
    queryFn: fetchUserBuyingOrders,
    queryKey: ["buyingOrders"],
  })

  const {
    data: sellingOrders = [],
    isLoading: isSellingOrdersLoading,
    error: sellingOrdersError,
  } = useQuery<Order[]>({
    queryFn: fetchUserSellingOrders,
    queryKey: ["sellingOrders"],
  })

  if (isBuyingOrdersLoading || isSellingOrdersLoading) {
    return <p>Loading...</p>
  }

  if (buyingOrdersError || sellingOrdersError) {
    return <p>Something went wrong...</p>
  }

  console.log(buyingOrders)
  console.log(sellingOrders)

  return (
    <Tabs isLazy>
      <TabList>
        <Tab>Ostotilaukset</Tab>
        <Tab>Myyntitilaukset</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <OrderTable orders={buyingOrders} />
        </TabPanel>
        <TabPanel>
          <OrderTable orders={sellingOrders} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
