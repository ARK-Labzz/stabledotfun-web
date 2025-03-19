import TradeWindow from "@/components/trade-window";
import UserPanel from "./components/user-panel";
import AssetShowcase from "@/components/asset-showcase";
import { AssetProp, TradeWindowToken } from "@/types";
import { stablecoins, token } from "@/static-data/token";
import UsernameBlock from "./components/username-block";
import AssetHolding from "@/components/asset-holding";

async function getData(): Promise<AssetProp[]> {
  // Fetch data from your API here.
  return token as AssetProp[];
}

async function getFiatData(): Promise<TradeWindowToken[]> {
  // Fetch data from your API here.
  return stablecoins as TradeWindowToken[];
}

export default async function Dashboard() {
  const token = await getData();
  const fiat = await getFiatData()

  return (
    <div className="space-y-4">
      <UsernameBlock />

      <div className="flex flex-col lg:flex-row gap-3">
        <UserPanel />

        <div className="flex-1 flex w-full lg:w-[40vw] 2xl:w-[50vw] flex-col gap-3">
          <AssetShowcase asset={token} />
          <AssetHolding asset={token} />
        </div>

        <div className="w-full lg:w-70 xl:w-75 space-y-4">
          <TradeWindow
            className="h-full"
            token={token as unknown as TradeWindowToken[]}
            stablecoins={fiat}
          />
        </div>
      </div>
    </div>
  );
}

