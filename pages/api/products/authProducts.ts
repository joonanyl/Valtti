import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions)

    if (!session)
      return res
        .status(401)
        .json({ message: "You need to be signed in to access this page." })

    try {
      const data = await prisma.user.findUnique({
        where: { email: session.user!.email! },
        include: {
          products: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              reviews: true,
            },
          },
        },
      })
      return res.status(200).json(data)
    } catch (err) {
      res
        .status(404)
        .json({ err: "Error has occurred while fetching the products." })
    }
  }
}
