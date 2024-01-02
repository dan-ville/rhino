import { Inter } from "next/font/google"
import { Header, AppContextProvider } from "@/components"
import "./globals.css"
import "../styles/root-layout.scss"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rhino",
  description: "Workout science for the dedicated athlete.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <Header />
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}
