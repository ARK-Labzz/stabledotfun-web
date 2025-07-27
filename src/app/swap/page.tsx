"use client";

import { useEffect, useState } from "react";
import { stablecoins, token } from "@/static-data/token";
import SwapProvider from "./components/swap-context";
import SwapWindow from "./components/swap-window";
import TokenDetails from "./components/token-details";
import { TradeWindowToken } from "@/types";
import { useAuthGuard } from "@/hooks/use-auth-guard";

async function getData(): Promise<TradeWindowToken[]> {
  return token as TradeWindowToken[];
}

export default function SwapPage() {
  const { user, isLoading: authLoading } = useAuthGuard();
  const [tokens, setTokens] = useState<TradeWindowToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && !authLoading) {
      getData().then((data) => {
        setTokens(data);
        setIsLoading(false);
      });
    }
  }, [user, authLoading]);

  // Show loading state while auth is loading
  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If no user after loading, useAuthGuard will handle redirect
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <SwapProvider>
      <div className="space-y-4">
        <div className="text-xs text-white/50 mb-3">
          Swap your <span className="text-primary">coins</span> instantly
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <SwapWindow stablecoins={stablecoins} tokens={tokens} />
          <div className="order-first lg:order-last">
            <TokenDetails />
          </div>
        </div>
      </div>
    </SwapProvider>
  );
}