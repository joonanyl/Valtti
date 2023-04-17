"use client"

import { signIn } from "next-auth/react"
import { Button } from "@chakra-ui/react"

export default function Login() {
  return (
    <li>
      <Button onClick={() => signIn()}>Kirjaudu</Button>
    </li>
  )
}
