import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Manrope } from "next/font/google"
import "./globals.css"
import { I18nProvider } from "@/components/i18n"
import { LayoutClient } from "./layout-client"

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Triangle Auction",
  description: "Triangle Auction",
  generator: "trufe",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${manrope.variable}`}>
        <I18nProvider>
          <LayoutClient>{children}</LayoutClient>
        </I18nProvider>
      </body>
    </html>
  )
}
