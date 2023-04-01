"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function AddReview({ id }) {
  const [title, setTitle] = useState("")

  const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    setTitle(value)
  }

  return (
    <form className="my-8">
      <h3>Add a review</h3>
      <div className="flex flex-col my-2">
        <input
          onClick={handleClick}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
    </form>
  )
}
