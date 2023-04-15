"use client"

import { signOut } from "next-auth/react"
import { Link } from "@chakra-ui/next-js"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  chakra,
  Button,
  Avatar,
} from "@chakra-ui/react"

type User = {
  image: string
}

export default function Logged({ image }: User) {
  return (
    <li className="flex gap-8 items-center">
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}>
          <Avatar size={"md"} src={image} />
        </MenuButton>
        <MenuList alignItems={"center"}>
          <MenuItem>
            <Link href={"/dashboard"}>Profile</Link>
          </MenuItem>
          <MenuItem onClick={() => signOut}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </li>
  )
}
