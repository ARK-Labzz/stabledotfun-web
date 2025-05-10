import UsernameBlock from "./components/username-block";
import AssetShowcase from "@/components/asset-showcase";
import StablecoinCards from "@/components/stablecoin-cards";
import InvestmentCalculator from "@/components/investment-calculator";
import { AssetProp, TradeWindowToken } from "@/types";
import { stablecoins, token } from "@/static-data/token";

// Mock data enhancement - we'll enhance the data with additional fields needed
const enhanceTokenData = (tokenData: AssetProp[]): AssetProp[] => {
  return tokenData.map((item, index) => ({
    ...item,
    supply: 1000000 + (index * 500000),
    tvl: 750000 + (index * 250000),
    bond: index % 2 === 0 ? "CETES" : "T-BOND",
    startDate: "May 8, 2025",
    maturityDate: "May 15, 2025"
  }));
};

async function getData(): Promise<AssetProp[]> {
  const enhancedToken = enhanceTokenData(token as AssetProp[]);
  return enhancedToken;
}

async function getFiatData(): Promise<TradeWindowToken[]> {
  const enhancedFiat = (stablecoins as TradeWindowToken[]).map((coin, index) => ({
    ...coin,
    apy: 5 + (index * 0.8), 
    image: coin.icon, 
    price: 1 + (Math.random() * 0.2) 
  }));
  return enhancedFiat;
}

export default async function Dashboard() {
  const token = await getData();
  const fiat = await getFiatData();

  return (
    <div className="space-y-4">
      <UsernameBlock />

      <div className="flex flex-col xl:flex-row gap-3">
        <div className="flex-1 flex w-full flex-col gap-3">
          <AssetShowcase asset={token} />
          <StablecoinCards asset={token} />
        </div>

        <div className="w-full xl:w-80 2xl:w-96 space-y-4">
          <InvestmentCalculator 
            className="h-full"
            stablecoins={fiat} 
          />
        </div>
      </div>
    </div>
  );
}

