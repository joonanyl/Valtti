import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const userId = req.query
      const notifications = await prisma.notification.findMany({
        where: { recipientId: userId },
        orderBy: { createdAt: "desc" },
      })
      res.status(200).json(notifications)
    } catch (err) {
      res
        .status(404)
        .json({ err: "Error has occurred while fetching the notifications." })
    }
  }
}
