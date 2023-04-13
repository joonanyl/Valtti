"use client"

import { useState } from "react"
import { Tabs } from "react-daisyui"
import UserProducts from "../dashboard/UserPosts"
import SellingOrders from "../dashboard/SellingOrders"

export default function ProfileTab() {
  const [tabValue, setTabValue] = useState(0)

  return (
    <>
      <Tabs value={tabValue} onChange={setTabValue}>
        <Tab value={0}>Service listings</Tab>
        <Tab value={1}>Selling orders</Tab>
        <Tab value={2}>Buying orders</Tab>
      </Tabs>
      {tabValue === 0 && <UserProducts />}
      {tabValue === 1 && <SellingOrders />}
    </>
  )
}
