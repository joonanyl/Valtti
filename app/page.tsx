import CreateProduct from "./components/CreateProductForm"

import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

import ListingGrid from "./components/ListingGrid"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <>
      <main>
        {user && <CreateProduct />}
        <ListingGrid />
      </main>
    </>
  )
}
