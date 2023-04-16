"use client"

import Image from "next/image"
import { useState } from "react"
import Toggle from "../dashboard/Toggle"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "react-hot-toast"

type EditProductProps = {
  id: string
  avatar: string
  name: string
  title: string
  reviews?: {
    id: string
    productId: string
    userId: string
  }[]
}

export default function EditProduct({
  id,
  avatar,
  name,
  title,
  reviews,
}: EditProductProps) {
  const [toggle, setToggle] = useState(false)
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/products/deleteProduct", { data: id }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error("Error deleting the product")
        }
      },
      onSuccess: (data) => {
        toast.success("The product has been deleted")
        queryClient.invalidateQueries(["userProducts"])
      },
    }
  )

  const deletePost = () => {
    mutate(id)
  }

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg w-60">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
            className="rounded-full"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            Reviews ({reviews?.length})
          </p>
          <button
            onClick={() => setToggle(true)}
            className="text-sm font-bold text-red-500">
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  )
}
