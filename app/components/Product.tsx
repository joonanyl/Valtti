"use client"

import Image from "next/image"
import Link from "next/link"
import photographyPicture from "../../public/camera-1239384_1920.jpg"
import designPicture from "../../public/plans-1867745_1920.jpg"
import dogPicture from "../../public/dog-4259565_1920.jpg"

type ProductProps = {
  id: string
  name: string
  avatar: string
  title: string
  profession?: string
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
  profession,
}: ProductProps) {
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
    <div className="card w-96 bg-white shadow-sm my-8">
      <Link href={`/product/${id}`}>
        <div className="flex items-center gap-2">
          <figure>
            <Image
              className="rounded-t-lg"
              height={400}
              src={img}
              alt="Photography"
            />
          </figure>
        </div>
        <div className="card-body">
          <h2 className="card-title text-gray-700">{title}</h2>
          <div className="flex content-center justify-start space-x-1">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={avatar}
              alt="avatar"
            />
            <h3 className="font-bold text-gray-700 self-center">{name}</h3>
          </div>
        </div>
        <div className="card-actions flex items-center justify-between m-4">
          <div className="">
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-gray-700">
                {`⭐️ ${ratingAverage.toFixed(1)}`}
              </p>
              <p className="text-sm font-bold text-gray-700">{`(${reviews?.length})`}</p>
            </div>
          </div>
          <div className="badge badge-secondary badge-outline">
            {profession || "Valokuvaus"}
          </div>
        </div>
      </Link>
    </div>
  )
}
