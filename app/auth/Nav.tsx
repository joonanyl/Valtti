import Link from "next/link"
import Login from "./Login"
import Logged from "./Logged"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import Image from "next/image"
import { NotificationDropdown } from "../components/NotificationDropdown"

export default async function Nav() {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <nav className="navbar flex justify-between items-center py-8">
      <Link href={"/"}>
        <Image width={100} height={100} src="/logo_light.png" alt="logo" />
      </Link>
      <div>
        <ul className="flex items-center gap-6">
          {!session?.user && <Login />}
          {session?.user && (
            <>
              <NotificationDropdown />
              <Logged image={session.user.image || ""} />
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
