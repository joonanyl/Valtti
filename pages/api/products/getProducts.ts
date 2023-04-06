import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.product.findMany({
        include: {
          user: true,
          reviews: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      res.status(200).json(data)
    } catch (err) {
      console.log(err)

      res.status(400).json({ err: "Error fetching products" })
    }
  }
}
