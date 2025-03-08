import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { WalletProvider } from "@/hooks/use-wallet"

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable | Launch Stablecoins",
  description: "Create and manage stablecoins",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} bg-[#051016] text-white`}>
        <WalletProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-4">{children}</main>
            </div>
          </div>
        </WalletProvider>
      </body>
    </html>
  )
}

