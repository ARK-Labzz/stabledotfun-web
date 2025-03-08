import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import MiniChart from "@/components/mini-chart";
import UserDetails from "./components/user-details";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400">Welcome, cre8tivebuka</div>

      <div className="flex flex-col lg:flex-row gap-4">
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
                  <MiniChart
                    data={coin.data}
                    height={40}
                    color={coin.color}
                    trend={coin.trend as "up" | "down"}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-4">
          <UserDetails />
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="text-sm mb-2">Sell Your Stablecoin</div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-2xl">0</div>
                  <div className="text-sm text-gray-400">- MXNs</div>
                </div>
                <div className="text-xs text-gray-400 mb-4">
                  Available: MXNs 2,002,402.5116130065
                </div>

                <div className="space-y-2">
                  <div className="text-sm">Get</div>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl">0</div>
                    <div className="text-sm text-gray-400">- USDC</div>
                  </div>

                  <div className="text-sm mt-4">Destination Address</div>
                  <div className="flex items-center gap-2 bg-secondary p-2 rounded-md">
                    <div className="truncate text-sm">
                      - Cs1tBHsL5KcQybQqywKFQ...
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </Button>
                  </div>

                  <Button className="w-full mt-4">Purchase</Button>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-md p-4 border border-border">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-medium">Payout Period</div>
                  <div className="text-sm text-teal">7 days</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-400">
                      Next Maturity Date
                    </div>
                    <div className="text-sm">March 6, 2024</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-400">
                      Total Current Investment
                    </div>
                    <div className="text-sm">$0.00</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-400">
                      Total Yield Reward
                    </div>
                    <div className="text-sm">$1,543.56</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
