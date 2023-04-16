"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "react-hot-toast"

type ReviewProps = {
  id: string
}

type Review = {
  content: string
  productId: string
  rating: number
}

export default function AddReview({ id }: ReviewProps) {
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

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    setContent(value)
  }

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setRating(value)
  }

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate({ content, productId: id, rating })
  }

  return (
    <form
      onSubmit={submitReview}
      className="my-8 p-4 bg-base-300 text-white rounded-md">
      <h3 className="font-bold text-xl text-center">Add a review</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={handleInputChange}
          value={content}
          type="text"
          name="content"
          className="p-6 mx-4 text-lg rounded-md my-2"
          placeholder="Write your review here..."
        />
        <div className="flex flex-col my-2">
          <label className="font-bold text-md my-2">Rating</label>
          <div className="rating">
            <input
              type="radio"
              name="rating-2"
              value={1}
              className="mask mask-star-2 bg-orange-400"
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              name="rating-2"
              value={2}
              className="mask mask-star-2 bg-orange-400"
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              name="rating-2"
              value={3}
              className="mask mask-star-2 bg-orange-400"
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              name="rating-2"
              value={4}
              className="mask mask-star-2 bg-orange-400"
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              name="rating-2"
              value={5}
              className="mask mask-star-2 bg-orange-400"
              onChange={handleRatingChange}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className="text-sm bg-primary text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit">
          Create
        </button>
        <p
          className={`font-bold text-sm ${
            content.length > 300 ? "text-red-700" : "text-gray-700"
          }`}>{`${content.length} / 300`}</p>
      </div>
    </form>
  )
}
