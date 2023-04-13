"use client"

import Image from "next/image"
import Link from "next/link"
import photographyPicture from "../../public/camera-1239384_1920.jpg"
import designPicture from "../../public/plans-1867745_1920.jpg"
import dogPicture from "../../public/dog-4259565_1920.jpg"
import { useState } from "react"
import { Button, Modal } from "react-daisyui"
import OrderModal from "./OrderModal"

type ProductProps = {
  id: string
  name: string
  avatar: string
  title: string
  description: string
  slug: string
  price: number
  profession?: string
  reviews?: {
    id: string
    createdAt: string
    productId: string
    content: string
    rating: number
  }[]
}

export default function ProductDetail({
  id,
  name,
  avatar,
  title,
  reviews,
  description,
  slug,
  price,
  profession,
}: ProductProps) {
  const [showModal, setShowModal] = useState(false)

  const toggleVisible = () => {
    setShowModal(!showModal)
  }

  const ratingAverage: number = reviews
    ? reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews?.length
    : 0

  let img

  if (profession === "Design") {
    img = designPicture
  } else if (profession === "Lemmikit") {
    img = dogPicture
  } else {
    img = photographyPicture
  }

  return (
    <div className="bg-base-300 text-white my-4 px-8 rounded-lg max-h-2xl flex flex-col justify-center">
      <div className="flex justify-center">
        <Image className="my-6" src={img} alt="Photography" />
      </div>
      <h2 className="font-bold text-2xl text-center my-4">{title}</h2>
      <div className="flex items-center align-middle justify-between mx-2">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-md">{name}</h3>
        </div>
        <h3 className="font-bold text-md">Starting from {price}€</h3>
      </div>
      <div className="my-2"></div>
      <p className="p-2 text-md text-center">{description}</p>
      <div className="flex items-center align-middle justify-between m-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">
            {`⭐️ ${ratingAverage.toFixed(1)}`}
          </h3>
          <p className="text-sm font-bold">{`(${reviews?.length})`}</p>
        </div>
        <Button className="text-white" onClick={toggleVisible}>
          Order
        </Button>
        <OrderModal productId={id} open={showModal} onClose={toggleVisible} />
      </div>
    </div>
  )
}
