import "./globals.css"
import Nav from "./auth/Nav"
import QueryWrapper from "./auth/QueryWrapper"
import { Providers } from "./providers"
import Footer from "./components/Footer"

export const metadata = {
  title: {
    default: "Valtti",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <QueryWrapper>
            <Nav />
            {children}
            <Footer />
          </QueryWrapper>
        </Providers>
      </body>
    </html>
  )
}
