"use client"

import Image from "next/image"
import photographyPicture from "../../public/camera-1239384_1920.jpg"
import designPicture from "../../public/plans-1867745_1920.jpg"
import dogPicture from "../../public/dog-4259565_1920.jpg"
import OrderModal from "./OrderModal"

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Avatar,
  HStack,
} from "@chakra-ui/react"

type ProductProps = {
  id: string
  name: string
  avatar: string
  title: string
  description: string
  slug: string
  price: number
  profession?: string
  reviews?: {
    id: string
    createdAt: string
    productId: string
    content: string
    rating: number
  }[]
}

export default function ProductDetail({
  id,
  name,
  avatar,
  title,
  reviews,
  description,
  price,
  profession,
}: ProductProps) {
  const ratingAverage: number = reviews
    ? reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews?.length
    : 0

  let img

  if (profession === "Design") {
    img = designPicture
  } else if (profession === "Lemmikit") {
    img = dogPicture
  } else {
    img = photographyPicture
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            src={img}
            alt="product picture"
            sizes="100vw"
            className="rounded-md"
            style={{ objectFit: "cover" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
              {title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}>
              {`alk. ${price}€`}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }>
            <HStack>
              <Avatar src={avatar} />
              <Text fontSize={"lg"} textAlign={"left"}>
                {name}
              </Text>
            </HStack>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{description}</Text>
            </VStack>
          </Stack>

          <OrderModal productId={id} />
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
