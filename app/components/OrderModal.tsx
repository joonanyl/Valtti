"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

interface NewOrder {
  productId: string
  message: string
}

type OrderModalProps = {
  productId: string
}

export default function OrderModal({ productId }: OrderModalProps) {
  const [message, setMessage] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutate } = useMutation(
    async (newOrder: NewOrder) =>
      await axios.post("/api/orders/createOrder", newOrder),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message)
        }
        setIsDisabled(false)
      },
      onSuccess: (data) => {
        toast.success("Your order has been created! 🎉")
        setMessage("")
        setIsDisabled(false)
        onClose()
      },
    }
  )

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate({ productId, message })
  }

  return (
    <>
      <Button
        className="bg-gradient-to-r from-teal-400 to-cyan-400"
        onClick={onOpen}
        rounded={"none"}
        w={"full"}
        mt={8}
        size={"lg"}
        py={"7"}
        _hover={{ boxShadow: "xl" }}>
        Tilaa
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order a service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="message">
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Provide details of what you wish from the service"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-gradient-to-r from-teal-400 to-cyan-400"
              _hover={{ boxShadow: "lg" }}
              mr={3}
              onClick={submitOrder}
              isDisabled={isDisabled}>
              Tilaa
            </Button>
            <Button onClick={onClose}>Peruuta</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
