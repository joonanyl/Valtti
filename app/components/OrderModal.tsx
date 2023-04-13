import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { Button, Modal, Textarea } from "react-daisyui"

interface NewOrder {
  productId: string
  message: string
}

type OrderModalProps = {
  open: boolean
  onClose: () => void
  productId: string
}

export default function OrderModal({
  open,
  onClose,
  productId,
}: OrderModalProps) {
  const [message, setMessage] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()

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
        console.log(data)
        toast.success("Your order has been created! 🎉")
        // queryClient.invalidateQueries(["orders"]) ?
        setMessage("")
        setIsDisabled(false)
      },
    }
  )

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate({ productId, message })
  }

  return (
    <Modal open={open}>
      <Modal.Header className="font-bold text-center">
        Order a service
      </Modal.Header>
      <Button
        size="sm"
        shape="circle"
        className="absolute right-5 top-5"
        onClick={onClose}>
        ✕
      </Button>
      <Modal.Body>
        <form onSubmit={submitOrder}>
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <Textarea
            className="w-full"
            placeholder="Provide details of what you wish from the service"
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}></Textarea>
        </form>
      </Modal.Body>
      <Modal.Actions>
        <Button disabled={isDisabled} onClick={submitOrder} type="submit">
          Order
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
