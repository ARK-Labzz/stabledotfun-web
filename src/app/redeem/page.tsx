"use client"

import { stablecoins, token } from "@/static-data/token";
import SwapProvider from "./components/swap-context";
import SwapWindow from "./components/swap-window";
import TokenDetails from "./components/token-details";
import { TradeWindowToken } from "@/types";

async function getData(): Promise<TradeWindowToken[]> {
  return token as TradeWindowToken[];
}

export default async function SwapPage() {
  const tokens = await getData();

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

