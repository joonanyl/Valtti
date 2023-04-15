import "./globals.css"
import Nav from "./auth/Nav"
import { Roboto } from "next/font/google"
import QueryWrapper from "./auth/QueryWrapper"
import { Providers } from "./providers"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`mx-4 ${roboto.variable} font-sans`}>
        <Providers>
          <QueryWrapper>
            <Nav />
            {children}
          </QueryWrapper>
        </Providers>
      </body>
    </html>
  )
}
