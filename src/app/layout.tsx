import type React from "react";
import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/sidebar";
import Header from "@/components/header";
import { WalletProvider } from "@/hooks/use-wallet";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import DynamicProvider from "@/components/providers/dynamic-lab";
import QueryProvider from "@/components/providers/query-provider";
import WagmiConnector from "@/components/providers/wagmi-connector";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable | Launch Stablecoins",
  description: "Create and manage stablecoins",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  maximumScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.className} bg-background text-white max-w-[100vw] overflow-x-hidden`}>
        <DynamicProvider>
          <QueryProvider>
            <WagmiConnector>
              <SidebarProvider defaultOpen={false}>
                <WalletProvider>
                  <AppSidebar />
                  <div className="relative flex min-h-screen flex-col flex-1">
                    <Header />
                    {/* Added extra padding at the bottom for mobile to account for the fixed navbar */}
                    <main className="flex-1 p-4 pt-30 mt-10 md:mt-0 md:pt-4 pb-24 md:pb-4">
                      {children}
                      <Toaster />
                    </main>
                  </div>
                </WalletProvider>
              </SidebarProvider>
            </WagmiConnector>
          </QueryProvider>
        </DynamicProvider>
      </body>
    </html>
  );
}