import type React from "react";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
// import "@fontsource-variable/sora"
import "./globals.css";
import AppSidebar from "@/components/sidebar";
import Header from "@/components/header";
import { WalletProvider } from "@/hooks/use-wallet";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable | Launch Stablecoins",
  description: "Create and manage stablecoins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} bg-[#051016] text-white`}>
        <SidebarProvider defaultOpen={false}>
          <WalletProvider>
            <AppSidebar />
            <div className="flex min-h-screen flex-col flex-1">
              <Header />
              <main className="flex-1 p-4 pt-30 mt-10 md:mt-0 md:pt-4">
                {children}
              </main>
            </div>
          </WalletProvider>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
