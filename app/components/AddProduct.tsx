"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

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
        console.log(data)
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
    <form onSubmit={submitProduct} className="bg-gray-700 my-8 p-8 rounded-md">
      <h1 className="font-bold text-lg text-center py-2">Add a new listing</h1>
      <div className="flex flex-col my-4">
        <p className="font-bold text-md">Title</p>
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="Title"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"></textarea>
      </div>
      <div className="flex items-center gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}>{`${title.length} / 300`}</p>
      </div>
      <div className="flex flex-col my-4">
        <p className="font-bold text-md">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          value={description}
          placeholder="Description"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"></textarea>
        <p
          className={`font-bold text-sm ${
            description.length > 1500 ? "text-red-700" : "text-gray-700"
          }`}>{`${description.length} / 1500`}</p>
      </div>
      <div className="flex flex-col my-4">
        <p className="font-bold text-md">Price</p>
        <input
          step="0.01"
          min="0"
          type="number"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          name="price"
          value={price}
          className="p-4 text-lg rounded-md my-2 bg-gray-200"></input>
      </div>
      <div className="flex flex-col my-4">
        <p className="font-bold text-md">Location</p>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          name="location"
          value={location}
          placeholder="Location"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"></input>
      </div>
      <div className="flex flex-col my-4">
        <p className="font-bold text-md">profession</p>
        <input
          type="text"
          onChange={(e) => setProfession(e.target.value)}
          name="profession"
          value={profession}
          placeholder="profession of work"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"></input>
      </div>
      <button
        disabled={isDisabled}
        className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        type="submit">
        Create
      </button>
    </form>
  )
}
