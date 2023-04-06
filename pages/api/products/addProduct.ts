import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

/*
  TARVITSEE OIKEAT REQ PARAMETRIT
*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session)
      return res
        .status(401)
        .json({ message: "You need to be signed in to create a product." })

    const { title, description, price, location } = req.body
    console.log(req.body)

    const user = await prisma.user.findUnique({
      where: { email: session.user!.email! },
    })

    if (title.length > 300) {
      return res.status(403).json({ message: "Title length is too long." })
    }
    if (!title.length) {
      return res.status(403).json({ message: "Title cannot be empty." })
    }

    if (!description.length) {
      return res.status(403).json({ message: "Please add a description." })
    }

    if (!price) {
      return res.status(403).json({ message: "Please add a price." })
    }

    if (!location) {
      return res.status(403).json({ message: "Please add a location." })
    }

    try {
      if (user) {
        const result = await prisma.product.create({
          data: {
            title,
            description,
            price,
            location,
            userId: user.id,
          },
        })
        res.status(201).json(result)
      }
    } catch (err) {
      console.log(err)
      res
        .status(403)
        .json({ err: "Error has occurred while creating a product." })
    }
  }
}
