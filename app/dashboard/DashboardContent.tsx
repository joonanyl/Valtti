"use client"

import { Box, Flex, Heading, Stack } from "@chakra-ui/react"
import UserPosts from "./UserPosts"
import OrderTabs from "./OrderTabs"

export default function DashBoardContent() {
  return (
    <Flex direction={"column"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20 }}>
        <Heading fontWeight={600} fontSize={"4xl"}>
          Sinun ilmoituksesi
        </Heading>
        <UserPosts />
      </Stack>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        mb={{ base: 20, md: 36 }}
        mx={{ base: 5 }}>
        <Heading fontWeight={600} fontSize={"4xl"}>
          Tilaukset
        </Heading>
        <OrderTabs />
      </Stack>
    </Flex>
  )
}
