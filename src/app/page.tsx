import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TradeWindow from "@/components/trade-window";
import UserPanel from "./components/user-panel";
import AssetShowcase from "@/components/asset-showcase";

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
          <AssetShowcase />
          <div className="flex-1 bg-card rounded-lg p-4 border border-border">
            <div className="flex justify-between mb-4">
              <div className="flex gap-2">
                <button className="text-sm font-medium px-3 py-1 rounded-md bg-secondary">
                  Recommended coins
                </button>
                <button className="text-sm font-medium px-3 py-1 rounded-md text-gray-400 hover:bg-secondary">
                  5 Assets
                </button>
              </div>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1 rounded-md bg-secondary text-gray-300">
                  - Highest Yield
                </button>
                <button className="text-xs px-3 py-1 rounded-md bg-secondary text-gray-300">
                  - All Bonds
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Top Stablecoin</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {[
                {
                  name: "MXNs (CETES)",
                  yield: "4.45%",
                  change: "+23.5%",
                  color: "#00c2cb",
                  trend: "up",
                  data: [10, 15, 12, 18, 15, 20, 25],
                  href: "/mxns",
                },
                {
                  name: "BRLs (TESOURO)",
                  yield: "8.45%",
                  change: "-1.5%",
                  color: "#e74c3c",
                  trend: "down",
                  data: [20, 18, 22, 15, 12, 10, 8],
                  href: "/brls",
                },
                {
                  name: "EURs (EUROB)",
                  yield: "10.45%",
                  change: "+10.5%",
                  color: "#00c2cb",
                  trend: "up",
                  data: [15, 18, 16, 20, 18, 22, 25],
                  href: "/eurs",
                },
                {
                  name: "GBPs (GILTS)",
                  yield: "5.45%",
                  change: "-0.1%",
                  color: "#e74c3c",
                  trend: "down",
                  data: [18, 20, 18, 16, 15, 14, 13],
                  href: "/gbps",
                },
                {
                  name: "USDs (USTRY)",
                  yield: "23.67%",
                  change: "+5.5%",
                  color: "#00c2cb",
                  trend: "up",
                  data: [12, 15, 14, 18, 20, 22, 25],
                  href: "/usds",
                },
              ].map((coin, index) => (
                <Link
                  key={index}
                  href={coin.href}
                  className="bg-secondary/50 rounded-lg p-4 border border-border relative overflow-hidden transition-all duration-200 hover:bg-secondary hover:border-teal/50 hover:shadow-[0_0_15px_rgba(0,194,203,0.3)] group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs text-gray-400">
                      Issued by stable.fun
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-gray-400 group-hover:text-teal"
                    />
                  </div>
                  <div className="font-medium mb-4 group-hover:text-teal">
                    {coin.name}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">Yield Rate</div>
                  <div className="text-2xl font-bold mb-2">{coin.yield}</div>
                  <div
                    className={`text-xs ${
                      coin.trend === "up" ? "text-teal" : "text-red-500"
                    } flex items-center gap-1`}
                  >
                    {coin.change}
                  </div>

                  {/* Mini chart visualization */}
                  <div className="h-10 mt-4 relative">
                    {/* <MiniChart
                    data={coin.data}
                    height={40}
                    color={coin.color}
                    trend={coin.trend as "up" | "down"}
                  /> */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-4">
          <TradeWindow className="h-full" />
        </div>
      </div>
    </div>
  );
}
