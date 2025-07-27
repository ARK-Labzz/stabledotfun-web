import type React from "react";
import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/sidebar";
import Header from "@/components/header";
import { WalletProvider } from "@/hooks/use-wallet";
import { AuthProvider } from "@/contexts/auth-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/providers/query-provider";
import SplashProvider from "@/components/providers/splash-provider";
import { Analytics } from "@vercel/analytics/next"

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable.fun | Buy Stablecoins",
  description: "Your Stablecoin factory - Create and manage stablecoins with ease",
  manifest: "/manifest.json",
  themeColor: "#7fcdd3",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Stable.fun",
  },
  icons: {
    icon: [
      { url: "/ios/32.png", sizes: "32x32", type: "image/png" },
      { url: "/ios/16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/ios/180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Stable.fun",
    "msapplication-TileColor": "#7fcdd3",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  maximumScale: 1.0,
  themeColor: "#7fcdd3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/ios/180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ios/32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ios/16.png" />
        <meta name="msapplication-TileColor" content="#7fcdd3" />
        <meta name="theme-color" content="#7fcdd3" />
      </head>
      <body className={`${sora.className} bg-background text-white w-full overflow-x-hidden`}>
        <SplashProvider>
          <QueryProvider>
            <AuthProvider>
              <SidebarProvider defaultOpen={false}>
                <WalletProvider>
                  <AppSidebar />
                  <div className="relative flex min-h-screen flex-col flex-1">
                    <Header />
                    {/* Added extra padding at the bottom for mobile to account for the fixed navbar */}
                    <main className="flex-1 p-4 pt-30 md:mt-0 md:pt-4 pb-24 md:pb-4">
                      {children}
                      <Toaster />
                    </main>
                  </div>
                </WalletProvider>
              </SidebarProvider>
            </AuthProvider>
          </QueryProvider>
        </SplashProvider>
        <Analytics />
      </body>
    </html>
  );
}