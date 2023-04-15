"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Notification } from "../types/Notification"
import { Link } from "@chakra-ui/next-js"
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { BellIcon } from "@chakra-ui/icons"

const getUserNotifications = async () => {
  const response = await axios.get("/api/notifications")
  return response.data
}

export function NotificationDropdown() {
  const { data, error } = useQuery<Notification[]>({
    queryFn: getUserNotifications,
    queryKey: ["notifications"],
  })

  console.log(data)

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BellIcon />}
        size="lg"
        variant="ghost"
      />
      <MenuList>
        {data?.map((notification) => (
          <MenuItem key={notification.id}>
            <Link href={"/dashboard"}>{notification.message}</Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
