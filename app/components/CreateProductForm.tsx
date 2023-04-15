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
    <form onSubmit={submitProduct}>
      <h1>Add a new listing</h1>
      <div>
        <p>Title</p>
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="Title"></textarea>
      </div>
      <p
        className={`font-bold text-sm ${
          title.length > 300 ? "text-red-700" : "text-gray-700"
        }`}>{`${title.length} / 300`}</p>
      <div>
        <p>Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          value={description}
          placeholder="Description"></textarea>
        <p
          className={`font-bold text-sm ${
            description.length > 1500 ? "text-red-700" : "text-gray-700"
          }`}>{`${description.length} / 1500`}</p>
      </div>
      <div>
        <p>Price</p>
        <input
          step="0.01"
          min="0"
          type="number"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          name="price"
          value={price}></input>
      </div>
      <div>
        <p>Location</p>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          name="location"
          value={location}
          placeholder="Location"></input>
      </div>
      <div>
        <p>Profession</p>
        <input
          type="text"
          onChange={(e) => setProfession(e.target.value)}
          name="profession"
          value={profession}
          placeholder="profession of work"></input>
      </div>
      <button disabled={isDisabled} type="submit">
        Create
      </button>
    </form>
  )
}
