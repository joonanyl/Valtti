"use client"
import { IconButton, useColorMode } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"

export default function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="Change color mode"
      size={"lg"}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    />
  )
}
