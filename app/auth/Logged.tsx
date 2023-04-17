"use client"

import { signOut } from "next-auth/react"
import { Link } from "@chakra-ui/next-js"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Stack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react"
import { BsPerson, BsPersonFill, BsBoxArrowInRight } from "react-icons/bs"

type User = {
  image: string
}

export default function Logged({ image }: User) {
  return (
    <li className="flex gap-8 items-center">
      <Flex justifyContent={"center"}>
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <Avatar cursor={"pointer"} size={"sm"} src={image} />
          </PopoverTrigger>
          <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
            <PopoverArrow />
            <PopoverBody>
              <Stack>
                <Link href={"/dashboard"}>
                  <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={
                      <BsPerson
                        color={useColorModeValue("gray.800", "white")}
                      />
                    }
                    justifyContent="space-between"
                    fontWeight="normal"
                    fontSize="sm">
                    Hallinnointi
                  </Button>
                </Link>
                <Button
                  w="194px"
                  variant="ghost"
                  rightIcon={
                    <BsBoxArrowInRight
                      color={useColorModeValue("gray.800", "white")}
                    />
                  }
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={() => signOut()}>
                  Kirjaudu ulos
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </li>
  )
}
