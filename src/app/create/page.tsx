"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CreateWindow from "./components/create-window";
import PreviewWindow from "./components/preview-window";
import { AssetProp, TradeWindowToken } from "@/types";
import { stablecoins } from "@/static-data/token";
import CreateProvider from "./components/create-context";
import { useAuthGuard } from "@/hooks/use-auth-guard";

async function getFiatData(): Promise<AssetProp[]> {
  // Fetch data from your API
  return stablecoins as unknown as AssetProp[];
}

export default function CreatePage() {
  const { user, isLoading: authLoading } = useAuthGuard();
  const [stablecoinsData, setStablecoinsData] = useState<AssetProp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && !authLoading) {
      getFiatData().then((data) => {
        setStablecoinsData(data);
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
    <CreateProvider>
      <div className="space-y-4">
        <div className="text-sm w-full">
          <p className="pt-5 pl-5">
            Deploy your stablecoin to Solana Mainnet
          </p>
          <Image
            src="Line.svg"
            className="w-full mt-5"
            height={10}
            width={100}
            alt="line"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 p-5">
          <CreateWindow
            stablecoins={stablecoinsData as unknown as TradeWindowToken[]}
          />
          <PreviewWindow />
        </div>
      </div>
    </CreateProvider>
  );
}