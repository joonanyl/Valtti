"use client"

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"
import { Link } from "@chakra-ui/next-js"
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
import { useColorMode } from "@chakra-ui/react"
import logoLight from "../../public/logo_light.png"
import logoDark from "../../public/logo_dark.png"
import Image from "next/image"

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: React.ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  const { colorMode } = useColorMode()

  const logoSrc = colorMode === "light" ? logoDark : logoLight

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      pt={4}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={6}
        spacing={4}
        justify={"center"}
        align={"center"}>
        <Image src={logoSrc} alt="Logo" width={80} />
        <Stack direction={"row"} spacing={6}>
          <Link href={"/"}>Valtti</Link>
          <Link href={"#"}>UKK</Link>
          <Link href={"#"}>Blog</Link>
          <Link href={"#"}>Ota yhteyttä</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}>
          <Text>© 2023 Valtti</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaLinkedin />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
