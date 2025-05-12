import React from "react";
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
