import React from "react";
import { stablecoins, token } from "@/static-data/token";
import { AssetProp, TradeWindowToken } from "@/types";
import TradeWindow from "@/components/trade-window";
import { notFound } from "next/navigation";
import { TokenPriceChart } from "./components/chart-display";
import { generateTokenData } from "@/lib/utils";
import AssetInfo from "./components/asset-info";
import { PayoutTimeline } from "@/components/payout-timeline";

async function getData(): Promise<AssetProp[]> {
  // Fetch data from your API here.
  return token as AssetProp[];
}

async function getFiatData(): Promise<TradeWindowToken[]> {
  // Fetch data from your API here.
  return stablecoins as TradeWindowToken[];
}

export default async function AssetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getData();
  const fiat = await getFiatData();
  const tokenData = await generateTokenData();

  const dataArr = token.filter((el) => el.id === id);
  const data = dataArr.length > 0 ? dataArr[0] : null;

  if (!data) return notFound();

  const priceAvg = tokenData[tokenData.length - 1].price;

  return (
    <div className="space-y-4 flex gap-4">
      <div className="flex flex-col flex-1 gap-4 rounded-xl border border-primary/10 p-4 bg-white/5">
        <TokenPriceChart token={tokenData} />
        <div className="h-[350px] bg-white/5 rounded-xl animate-pulse"></div>
      </div>

      <div className="w-full lg:w-80 xl:w-85 space-y-4">
        <TradeWindow
          token={dataArr as unknown as TradeWindowToken[]}
          stablecoins={fiat}
        />
        <AssetInfo ticker={data.symbol} {...data} price={priceAvg} />
        <PayoutTimeline
          ticker={data.symbol}
          totalDays={7}
          endDate={"March 6, 2025"}
          currentAmount={(data.currentInvestment / priceAvg).toString()}
        />
      </div>
    </div>
  );
}
