import TradeWindow from "@/components/trade-window";
import UserPanel from "./components/user-panel";
import AssetShowcase from "@/components/asset-showcase";
import { AssetProp } from "@/types";
// import AssetHolding from "@/components/asset-holding";

const assetMock: AssetProp[] = [
  {
    id: "1",
    fiat: "CETES",
    name: "Mexican Token",
    symbol: "MXN",
    price: 1.3243,
    change: 23.5,
    yield: 4.45,
    image: "/placeholder.svg",
    amount: 30000,
    initialInvestment: 10000,
    currentInvestment: 12000,
    nextYield: 5.0,
    tnx: "#",
  },
  {
    id: "2",
    fiat: "EUROB",
    name: "Euro Bob",
    symbol: "EUR",
    price: 1.243,
    change: -3.5,
    yield: 0.45,
    image: "/placeholder.svg",
    amount: 4020,
    initialInvestment: 5000,
    currentInvestment: 4500,
    nextYield: 0.5,
    tnx: "#",
  },

  {
    id: "3",
    fiat: "GBP",
    name: "Gilean Tokens",
    symbol: "GILTS",
    price: 0.443,
    change: -1.5,
    yield: 0.145,
    image: "/placeholder.svg",
    amount: 600,
    initialInvestment: 2000,
    currentInvestment: 1800,
    nextYield: 0.2,
    tnx: "#",
  },

  {
    id: "4",
    fiat: "BRL",
    name: "Tesour",
    symbol: "TESOURO",
    price: 1.008,
    change: 0.5,
    yield: 0.5,
    image: "/placeholder.svg",
    amount: 3000,
    initialInvestment: 2500,
    currentInvestment: 2600,
    nextYield: 0.6,
    tnx: "#",
  },

  {
    id: "5",
    fiat: "USD",
    name: "US Troy",
    symbol: "USTRY",
    price: 1.3243,
    change: -3.5,
    yield: 0.45,
    image: "/placeholder.svg",
    amount: 550,
    initialInvestment: 3000,
    currentInvestment: 2800,
    nextYield: 0.5,
    tnx: "#",
  },
];
export default function Dashboard() {
  const username = "cre8tivebuka";
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400">
        Welcome,{" "}
        <span className="text-primary">{username ? username : "user"}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <UserPanel username={username} />

        <div className="flex-1 flex flex-col gap-3">
          <AssetShowcase asset={assetMock} />
          {/* <AssetHolding asset={assetMock} /> */}
          {/* TODO - Fix the Asset Holding component responsiveness */}
        </div>

        <div className="w-full lg:w-75 xl:w-80 space-y-4">
          <TradeWindow className="h-full" />
        </div>
      </div>
    </div>
  );
}
