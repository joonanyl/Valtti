import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session)
      return res
        .status(401)
        .json({ message: "You need to be signed in to create a post." })

    const title: string = req.body.title
    const user = await prisma.user.findUnique({
      where: { email: session.user!.email! },
    })

    if (title.length > 300) {
      return res.status(403).json({ message: "Title length is too long." })
    }
    if (!title.length) {
      return res.status(403).json({ message: "Title cannot be empty." })
    }
    try {
      if (user) {
        const result = await prisma.post.create({
          data: {
            title,
            userId: user.id,
          },
        })
        res.status(201).json(result)
      }
    } catch (err) {
      res.status(403).json({ err: "Error has occurred while creating a post." })
    }
  }
}
