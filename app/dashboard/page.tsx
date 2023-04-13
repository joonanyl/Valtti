import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import UserPosts from "./UserPosts"
import SellingOrders from "./SellingOrders"
// import ProfileTab from "../components/ProfileTab"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <main>
      <h1 className="text-2xl font-bold">
        Welcome back, {session?.user?.name}
      </h1>
      <div className="my-4">
        <h2 className="text-xl font-bold">Your listings</h2>
        <UserPosts />
      </div>
      <div className="left-0">
        <h2 className="text-xl font-bold my-4">Orders for you to do!</h2>
        <SellingOrders />
      </div>
    </main>
  )
}
