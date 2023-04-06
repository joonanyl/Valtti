"use client"

import Image from "next/image"
import Link from "next/link"

type ProductProps = {
  id: string
  name: string
  avatar: string
  title: string
  reviews?: {
    id: string
    createdAt: string
    productId: string
    content: string
    rating: number
  }[]
}

export default function Product({
  id,
  name,
  avatar,
  title,
  reviews,
}: ProductProps) {
  const ratingAverage: number = reviews
    ? reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews?.length
    : 0

  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/product/${id}`}>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-gray-700">
              {`⭐️ ${ratingAverage.toFixed(1)}`}
            </p>
            <p className="text-sm font-bold text-gray-700">{`(${reviews?.length})`}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}