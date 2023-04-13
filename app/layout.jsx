import "./globals.css"
import Nav from "./auth/Nav"
import { Roboto } from "next/font/google"
import QueryWrapper from "./auth/QueryWrapper"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`mx-4 md:mx-20 xl:mx-64 ${roboto.variable} font-sans`}>
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
