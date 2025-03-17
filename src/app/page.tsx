import TradeWindow from "@/components/trade-window";
import UserPanel from "./components/user-panel";
import AssetShowcase from "@/components/asset-showcase";
import { AssetProp, TradeWindowToken } from "@/types";
import { token } from "@/static-data/token";

async function getData(): Promise<AssetProp[]> {
  // Fetch data from your API here.
  return token as AssetProp[];
}

export default async function Dashboard() {
  const username = "cre8tivebuka";

  const token = await getData();

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400">
        Welcome,{" "}
        <span className="text-primary">{username ? username : "user"}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <UserPanel />

        <div className="flex-1 flex flex-col gap-3">
          <AssetShowcase asset={token} />
          {/* <AssetHolding asset={assetMock} /> */}
          {/* TODO - Fix the Asset Holding component responsiveness */}
        </div>

        <div className="w-full lg:w-75 xl:w-80 space-y-4">
          <TradeWindow
            className="h-full"
            token={token as unknown as TradeWindowToken[]}
          />
        </div>
      </div>
    </div>
  );
}
