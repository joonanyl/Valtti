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

      const data = await prisma.notification.findUnique({
        where: { id: id },
      })
      res.status(200).json(data)
    } catch (err) {
      res
        .status(404)
        .json({ err: "Error has occurred while fetching the notification." })
    }
  }
}
