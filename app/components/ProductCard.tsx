"use client"

import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import photographyPicture from "../../public/camera-1239384_1920.jpg"
import designPicture from "../../public/plans-1867745_1920.jpg"
import dogPicture from "../../public/dog-4259565_1920.jpg"
import { Flex, Box, Badge, useColorModeValue } from "@chakra-ui/react"
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"
import { Review } from "../types/Review"

type ProductProps = {
  id: string
  name?: string
  avatar?: string
  title: string
  profession?: string
  price?: number
  reviews?: Review[]
}

interface RatingProps {
  rating: number
  numReviews: number
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            )
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} arvostelua
      </Box>
    </Box>
  )
}

export default function ProductCard({
  id,
  name,
  avatar,
  title,
  reviews,
  profession,
  price,
}: ProductProps) {
  const ratingAverage: number = reviews
    ? reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews?.length
    : 0
  const ratingTotal: number | undefined = reviews?.reduce(
    (acc, review) => acc + review.rating,
    0
  )

  let img: StaticImageData

  if (profession === "Design") {
    img = designPicture
  } else if (profession === "Lemmikit") {
    img = dogPicture
  } else {
    img = photographyPicture
  }

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Link href={`/product/${id}`}>
        <Box
          bg={useColorModeValue("white", "gray.800")}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          _hover={{ boxShadow: "xl" }}
          position="relative">
          <Image
            className="rounded-t-lg"
            height={400}
            src={img}
            alt="Product picture"
          />
          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="blue">
                {profession}
              </Badge>
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {title}
              </Box>
            </Flex>
            <Flex justifyContent="space-between" alignContent="center">
              <Rating rating={ratingTotal!} numReviews={reviews?.length!} />
              <Box
                fontSize="2xl"
                color={useColorModeValue("gray.800", "white")}>
                <Box as="span" color={"gray.600"} fontSize="lg">
                  alk.
                </Box>
                {price?.toFixed(2)}€
              </Box>
            </Flex>
          </Box>
        </Box>
      </Link>
    </Flex>
  )
}
