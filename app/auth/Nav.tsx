import Link from "next/link"
import Login from "./Login"
import Logged from "./Logged"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import Image from "next/image"
import NavButtons from "../components/NavButtons"
import NavBar from "./NavBar"

export default async function Nav() {
  const session = await getServerSession(authOptions)

  const user = session?.user

  return <NavBar user={user} />
}
