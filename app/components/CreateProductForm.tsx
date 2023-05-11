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
} from "@chakra-ui/react"

export default function CreateProduct() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [location, setLocation] = useState("")
  const [profession, setProfession] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()

  interface NewProduct {
    title: string
    description: string
    price: number
    location: string
    profession: string
  }

  const { mutate } = useMutation(
    async (newProduct: NewProduct) =>
      await axios.post("/api/products/addProduct", newProduct),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message)
        }
        setIsDisabled(false)
      },
      onSuccess: (data) => {
        toast.success("Product has been created 🎉")
        queryClient.invalidateQueries(["products"])
        setTitle("")
        setIsDisabled(false)
      },
    }
  )

  const submitProduct = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate({ title, description, price, location, profession })
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.700")}>
      <Stack spacing={8} mx={"auto"} w={"2xl"} py={12}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Lisää uusi ilmoitus
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
            <FormControl id="title" isRequired>
              <FormLabel>Otsikko</FormLabel>
              <Input
                size={"lg"}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Kuvaus</FormLabel>
              <Textarea
                size={"lg"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl id="profession">
              <FormLabel>Ala</FormLabel>
              <Input
                size={"lg"}
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </FormControl>
            <FormControl id="price">
              <FormLabel>{"Hinnat (alk)"}</FormLabel>
              <NumberInput
                size={"lg"}
                min={0}
                defaultValue={10}
                value={price}
                onChange={(value) => setPrice(parseFloat(value))}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl id="location">
              <FormLabel>Sijainti</FormLabel>
              <Input
                size={"lg"}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
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
              onClick={submitProduct}
              isDisabled={isDisabled}>
              Create
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
