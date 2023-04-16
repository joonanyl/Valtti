"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
  Textarea,
  Button,
  NumberInput,
  NumberInputField,
  HStack,
} from "@chakra-ui/react"
import { BsStar, BsStarFill } from "react-icons/bs"

type ReviewProps = {
  productId: string
}

type Review = {
  content: string
  productId: string
  rating: number
}

interface StarProps {
  filled: boolean
  onClick: () => void
}

const Star = ({ filled, onClick }: StarProps) => {
  return (
    <button onClick={onClick}>
      {filled ? <BsStarFill color="orange" /> : <BsStar color="orange" />}
    </button>
  )
}

export default function CreateProduct({ productId }: ReviewProps) {
  const [content, setContent] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [rating, setRating] = useState(1)

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (data: Review) => axios.post("/api/products/addReview", { data }),
    {
      onError: (error) => {
        setIsDisabled(false)
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message)
        }
      },
      onSuccess: (data) => {
        setContent("")
        setIsDisabled(false)
        toast.success("Created your review!")
        queryClient.invalidateQueries(["productDetails"])
      },
    }
  )

  const handleStarClick = (value: number) => {
    setRating(value)
  }

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate({ content, productId, rating })
  }

  const starSelect = [1, 2, 3, 4, 5].map((value) => (
    <Star
      key={value}
      onClick={() => handleStarClick(value)}
      filled={value <= rating}
    />
  ))

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.700")}>
      <Stack spacing={8} mx={"auto"} w={"2xl"} py={8}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Lisää uusi arvostelu
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          boxShadow={"lg"}
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          px={{ base: "10", sm: "10", md: "20", lg: "40" }}
          w={"100%"}>
          <Stack spacing={4}>
            <FormControl id="content" isRequired>
              <FormLabel>Arvostelu</FormLabel>
              <Textarea
                size={"lg"}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
            <FormControl id="rating" isRequired>
              <FormLabel>Arvosana</FormLabel>
              <HStack mb={4}>{starSelect}</HStack>
            </FormControl>
            <Button
              className="bg-gradient-to-r from-teal-400 to-cyan-400"
              mt={8}
              size={"lg"}
              w={"full"}
              color={useColorModeValue("gray.900", "white")}
              _hover={{
                boxShadow: "xl",
              }}
              onClick={submitReview}
              isDisabled={isDisabled}>
              Lisää
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
