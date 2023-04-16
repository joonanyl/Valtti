import "./globals.css"
import Nav from "./auth/Nav"
import QueryWrapper from "./auth/QueryWrapper"
import { Providers } from "./providers"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
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
