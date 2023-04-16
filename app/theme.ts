import { extendTheme, type ThemeConfig } from "@chakra-ui/react"
import { Roboto } from "next/font/google"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

const theme = extendTheme({
  config,
  fonts: {
    body: roboto.style.fontFamily,
    heading: roboto.style.fontFamily,
  },
})

export default theme
