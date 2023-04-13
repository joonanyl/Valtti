import prisma from "@/prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { Order } from "@/app/types/Order"

// Todo: figure this shit out :D
type OrderApiResponse = NextApiResponse<Order | { message: string }>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res
        .status(401)
        .json({ message: "You need to be signed in to create a product." })
    }

    const { productId, message } = req.body

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true },
    })
    console.log(product)

    const buyer = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    })

    try {
      const order = await prisma.order.create({
        data: {
          totalPrice: product?.price ?? 0,
          product: { connect: { id: product?.id } },
          buyer: { connect: { id: buyer?.id } },
          seller: { connect: { id: product?.user?.id } },
          status: false,
          message,
        },
        include: {
          product: true,
          buyer: true,
          seller: true,
        },
      })
      res.status(201).json(order)
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ error: "Error has occurred while creating your order." })
    }
  }
}
