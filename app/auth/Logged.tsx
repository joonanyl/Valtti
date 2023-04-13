"use client"

import Image from "next/image"
import { signOut } from "next-auth/react"
import Link from "next/link"

type User = {
  image: string
}

export default function Logged({ image }: User) {
  return (
    <li className="flex gap-8 items-center">
      <div className="dropdown dropdown-bottom dropdown-end">
        <Image
          width={48}
          height={48}
          src={image}
          className="w-14 rounded-full"
          alt="Avatar"
          priority
          tabIndex={0}
        />
        <ul
          tabIndex={0}
          className="dropdown-content menu m-2 p-2 bg-base-300 rounded-box w-52">
          <li>
            <Link href={"/dashboard"}>Profile</Link>
          </li>
          <li>
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        </ul>
      </div>
    </li>
  )
}
