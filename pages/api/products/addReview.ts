import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res
      .status(401)
      .json({ message: "You need to be signed in to create a review." })
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
  })

  console.log(user)

  if (req.method === "POST") {
    const { title, productId, rating } = req.body.data
    console.log(rating)

    if (!title.length) {
      return res
        .status(401)
        .json({ message: "You cannot create an empty review" })
    }
    try {
      const result = await prisma.review.create({
        data: {
          content: title,
          userId: user!.id,
          productId,
          rating,
        },
      })
      res.status(201).json(result)
    } catch (err) {
      console.log(err)
      res
        .status(403)
        .json({ err: "Error has occurred while creating a review." })
    }
  }
}
