import RedeemWindow from "./components/redeem-window";
import { stablecoins, token } from "@/static-data/token";
import RedeemProvider from "./components/redeem-context";
import RedeemMiniWindow from "./components/redeem-mini-window";
import { TradeWindowToken } from "@/types";

async function getData(): Promise<TradeWindowToken[]> {
  // Fetch data from your API here.
  return token as TradeWindowToken[];
}

export default async function RedeemPage() {
  const token = await getData();

  return (
    <RedeemProvider>
      <div className="space-y-2">
        <div className="text-xs text-white/50 mb-3">
          Exchange your <span className="text-primary">stablecoin</span> and get
          your initial supply
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <RedeemWindow stablecoins={stablecoins} token={token} />
          <RedeemMiniWindow />
        </div>
      </div>
    </RedeemProvider>
  );
}
