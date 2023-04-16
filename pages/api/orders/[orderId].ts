import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const id = Array.isArray(req.query.details)
        ? req.query.details[0]
        : req.query.details
      const data = await prisma.order.findUnique({
        where: {
          id: id,
        },
        include: {
          buyer: true,
          seller: true,
          product: true,
        },
      })
      return res.status(200).json(data)
    } catch (err) {
      res
        .status(404)
        .json({ err: "Error has occurred while fetching the order." })
    }
  }

  if (req.method === "PUT") {
    try {
      const { orderId } = req.query
      const { status } = req.query
      const statusValue = !!status && status.toString().toLowerCase() === "true"

      const updatedOrder = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: statusValue,
        },
      })

      const buyer = await prisma.user.findUnique({
        where: { id: updatedOrder.buyerId },
      })

      const seller = await prisma.order
        .findUnique({
          where: { id: orderId },
        })
        .buyer()

      const newNotification = await prisma.notification.create({
        data: {
          message: `You have a new order from ${buyer?.name}!`,
          recipient: { connect: { id: seller?.id } },
        },
      })

      res.status(200).json(updatedOrder)
    } catch (err) {
      console.log(err)
      res
        .status(400)
        .json({ err: "Error has occurred while updating the order status." })
    }
  }
}
