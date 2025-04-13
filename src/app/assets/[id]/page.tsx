import React from "react";
import { stablecoins, token } from "@/static-data/token";
import { AssetProp, TradeWindowToken } from "@/types";
import TradeWindow from "@/components/trade-window";
import { notFound } from "next/navigation";
import { TokenPriceChart } from "./components/chart-display";
import { generateTokenData } from "@/lib/utils";
import AssetInfo from "./components/asset-info";

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
      <div className="flex flex-col flex-1 rounded-xl border border-primary/10 p-4 bg-white/5">
        <TokenPriceChart token={tokenData} />
      </div>

      <div className="w-full lg:w-70 xl:w-75 space-y-4">
        <TradeWindow
          token={dataArr as unknown as TradeWindowToken[]}
          stablecoins={fiat}
        />
        <AssetInfo
          ticker={data.symbol}
          {...data}
          price={priceAvg}
        />
      </div>
    </div>
  );
}
