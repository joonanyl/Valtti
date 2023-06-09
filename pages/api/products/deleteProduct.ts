import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions)

    if (!session)
      return res
        .status(401)
        .json({ message: "You need to be signed in to access this page." })

    try {
      const productId = req.body
      const result = await prisma.product.delete({
        where: {
          id: productId,
        },
      })
      return res.status(200).json(result)
    } catch (err) {
      console.log(err)

      res
        .status(404)
        .json({ err: "Error has occurred while deleting the product." })
    }
  }
}
