import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions)

      if (!session)
        return res
          .status(401)
          .json({ message: "You need to be signed in to access this page." })

      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email! },
      })

      const notifications = await prisma.notification.findMany({
        where: { recipientId: user?.id },
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
