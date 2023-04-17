"use client"

import Link from "next/link"
import Image from "next/image"
import Login from "./Login"
import NavButtons from "../components/NavButtons"
import Logged from "./Logged"
import { useColorMode } from "@chakra-ui/react"
import logoLight from "../../public/logo_light.png"
import logoDark from "../../public/logo_dark.png"

type NavBarProps = {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function NavBar({ user }: NavBarProps) {
  const { colorMode } = useColorMode()

  const logoSrc = colorMode === "light" ? logoDark : logoLight

  return (
    <nav className="navbar flex justify-between items-center py-8 mx-6">
      <Link href={"/"}>
        <Image width={100} height={100} src={logoSrc} alt="logo" />
      </Link>
      <div>
        <ul className="flex items-center gap-4">
          {!user && <Login />}
          {user && (
            <>
              <NavButtons />
              <Logged image={user.image || ""} />
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
