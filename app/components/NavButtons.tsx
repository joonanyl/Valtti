"use client"
import { IconButton, useColorMode } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"
import { NotificationDropdown } from "./NotificationDropdown"

export default function NavButtons() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <IconButton
        onClick={toggleColorMode}
        aria-label="Change color mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
      <NotificationDropdown />
    </>
  )
}
