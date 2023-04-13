import { User } from "./User"

export interface Notification {
  id: string
  createdAt: Date
  read: boolean
  message: string
  recipient: User
  recipientId: string
}
