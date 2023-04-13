"use client"

import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <li>
      <button onClick={() => signIn()} className="btn disabled:opacity-25">
        Sign in
      </button>
    </li>
  )
}
