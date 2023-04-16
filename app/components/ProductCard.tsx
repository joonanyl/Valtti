"use client"

import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import photographyPicture from "../../public/camera-1239384_1920.jpg"
import designPicture from "../../public/plans-1867745_1920.jpg"
import dogPicture from "../../public/dog-4259565_1920.jpg"
import {
  Flex,
  Circle,
  Box,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react"
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"

type ProductProps = {
  id: string
  name: string
  avatar: string
  title: string
  profession?: string
  price: number
  reviews?: {
    id: string
    createdAt: Date
    productId: string
    content: string
    rating: number
  }[]
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

  console.log(profession)

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
                {price.toFixed(2)}€
              </Box>
            </Flex>
          </Box>
        </Box>
      </Link>
    </Flex>
  )

  return (
    <div className="card w-96 bg-white shadow-sm my-8">
      <Link href={`/product/${id}`}>
        <div className="flex items-center gap-2">
          <figure>
            <Image
              className="rounded-t-lg"
              height={400}
              src={img}
              alt="Photography"
            />
          </figure>
        </div>
        <div className="card-body">
          <h2 className="card-title text-gray-700">{title}</h2>
          <div className="flex content-center justify-start space-x-1">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={avatar}
              alt="avatar"
            />
            <h3 className="font-bold text-gray-700 self-center">{name}</h3>
          </div>
        </div>
        <div className="card-actions flex items-center justify-between m-4">
          <div className="">
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-gray-700">
                {`⭐️ ${ratingAverage.toFixed(1)}`}
              </p>
              <p className="text-sm font-bold text-gray-700">{`(${reviews?.length})`}</p>
            </div>
          </div>
          <div className="badge badge-secondary badge-outline">
            {profession || "Valokuvaus"}
          </div>
        </div>
      </Link>
    </div>
  )
}
