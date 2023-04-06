"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "react-hot-toast"

type ReviewProps = {
  id: string
}

type Review = {
  title: string
  productId: string
}

export default function AddReview({ id }: ReviewProps) {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

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
        setTitle("")
        setIsDisabled(false)
        toast.success("Created your review!")
        queryClient.invalidateQueries(["productDetails"])
      },
    }
  )

  const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    setTitle(value)
  }

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate({ title, productId: id })
  }

  return (
    <form onSubmit={submitReview} className="my-8 p-4 bg-gray-300 rounded-md">
      <h3>Add a review</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={handleClick}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
          placeholder="Write your review here..."
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit">
          Create
        </button>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}>{`${title.length} / 300`}</p>
      </div>
    </form>
  )
}
