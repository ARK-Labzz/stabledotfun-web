"use client";

import React, { useEffect, useState } from "react";
import { stablecoins, token } from "@/static-data/token";
import { AssetProp, TradeWindowToken } from "@/types";
import TradeWindow from "@/components/trade-window";
import { notFound } from "next/navigation";
import { TokenPriceChart } from "./components/chart-display";
import { generateTokenData } from "@/lib/utils";
import AssetInfo from "./components/asset-info";
import { PayoutTimeline } from "@/components/payout-timeline";
import { TransactionsDataTable } from "./components/data-table";
import { mockData, txcolumns } from "./components/columns";
import { useAuthGuard } from "@/hooks/use-auth-guard";

async function getData(): Promise<AssetProp[]> {
  // Fetch data from your API here.
  return token as AssetProp[];
}

async function getFiatData(): Promise<TradeWindowToken[]> {
  // Fetch data from your API here.
  return stablecoins as TradeWindowToken[];
}

interface AssetDetailProps {
  params: Promise<{ id: string }>;
}

export default function AssetDetail({ params }: AssetDetailProps) {
  const { user, isLoading: authLoading } = useAuthGuard();
  const [id, setId] = useState<string>("");
  const [tokenData, setTokenData] = useState<any[]>([]);
  const [token, setToken] = useState<AssetProp[]>([]);
  const [fiat, setFiat] = useState<TradeWindowToken[]>([]);
  const [data, setData] = useState<AssetProp | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    params.then(({ id }) => setId(id));
  }, [params]);

  useEffect(() => {
    if (user && !authLoading && id) {
      Promise.all([
        getData(),
        getFiatData(),
        generateTokenData()
      ]).then(([tokenData, fiatData, chartData]) => {
        setToken(tokenData);
        setFiat(fiatData);
        setTokenData(chartData);

        const dataArr = tokenData.filter((el) => el.id === id);
        const foundData = dataArr.length > 0 ? dataArr[0] : null;
        setData(foundData);
        setIsLoading(false);
      });
    }
  }, [user, authLoading, id]);

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

  if (!data) return notFound();

  const priceAvg = tokenData[tokenData.length - 1]?.price || 0;
  const dataArr = token.filter((el) => el.id === id);

  return (
    <div className="space-y-4 flex gap-4">
      <div className="flex flex-col flex-1 gap-4 rounded-xl border border-primary/10 p-4 bg-white/5">
        <TokenPriceChart token={tokenData} />
        <div className="bg-white/5 rounded-xl p-4 gap-4">
          <div className="relative flex gap-3 flex-row mb-4">
            <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-normal text-primary">
                Transactions
              </span>
            </div>
          </div>
          <TransactionsDataTable columns={txcolumns} data={mockData} />
        </div>
      </div>

      <div className="w-full lg:w-80 xl:w-85 space-y-4">
        <TradeWindow
          token={dataArr as unknown as TradeWindowToken[]}
          stablecoins={fiat}
        />
        <AssetInfo ticker={data.symbol} {...data} price={priceAvg} />
        <PayoutTimeline
          ticker={data.symbol}
          currentAmount={(data.currentInvestment / priceAvg).toString()}
          totalAmount={data.currentInvestment.toString()} // or whatever your total yield is
          onWithdraw={() => console.log("Withdraw clicked for", data.symbol)}
        />
      </div>
    </div>
  );
}