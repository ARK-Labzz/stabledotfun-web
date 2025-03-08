import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import DetailedChart from "@/components/detailed-chart"

export default function MXNsPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 bg-card rounded-lg p-4 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <div>
                  <div className="text-xs text-gray-400">Total Volume</div>
                  <div className="font-medium">$24,567,345.65</div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-teal"></div>
                <div>
                  <div className="text-xs text-gray-400">Token Price</div>
                  <div className="font-medium">$0.049944</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mb-4">
            <button className="text-xs px-3 py-1 rounded-md bg-secondary text-gray-300">- 24H</button>
            <button className="text-xs px-3 py-1 rounded-md bg-secondary text-gray-300">- USD Bonds</button>
            <button className="text-xs px-3 py-1 rounded-md bg-secondary text-gray-300">- Highest Yield</button>
          </div>

          <div className="h-80 mb-4">
            <DetailedChart
              height={300}
              data={[
                { date: "Oct", value: 0.01 },
                { date: "Nov", value: 0.025 },
                { date: "Dec", value: 0.018 },
                { date: "Jan", value: 0.022 },
                { date: "Feb", value: 0.02 },
                { date: "Mar", value: 0.05 },
              ]}
              showGrid={true}
              showAxis={true}
              showTooltip={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <button className="bg-teal text-white px-4 py-2 rounded-md text-sm">Trade History</button>
            <button className="bg-secondary text-gray-300 px-4 py-2 rounded-md text-sm">My Position</button>
            <button className="bg-secondary text-gray-300 px-4 py-2 rounded-md text-sm">Top Traders</button>
            <button className="bg-secondary text-gray-300 px-4 py-2 rounded-md text-sm">Holders</button>
            <button className="bg-secondary text-gray-300 px-4 py-2 rounded-md text-sm">Price Alerts</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Price in SOL</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Total SOL</th>
                  <th className="px-4 py-2 text-left">Marker</th>
                  <th className="px-4 py-2 text-left">TNX</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-teal">13 secs ago</td>
                  <td className="px-4 py-2 text-teal">Buy</td>
                  <td className="px-4 py-2">$0.049944</td>
                  <td className="px-4 py-2">$100,000</td>
                  <td className="px-4 py-2">0.0003255</td>
                  <td className="px-4 py-2">2,002,402.5116130...</td>
                  <td className="px-4 py-2">651.7293753003...</td>
                  <td className="px-4 py-2">5W4By...YoE1</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Copy size={16} className="text-gray-400" />
                      <button className="text-blue-400">
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
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-xs text-gray-400 mb-1">Issued by stable.fun</div>
            <div className="font-medium mb-4">MXNs (CETES)</div>

            <div className="flex justify-end mb-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Copy size={16} className="text-gray-400" />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">Circulating Supply</div>
                <div className="text-sm">MXN46,418,014</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">Total Value Locked</div>
                <div className="text-sm">MXN24,153,599</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">Price Per Token</div>
                <div className="text-sm">MXN1.082288</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">Current Buy Liquidity</div>
                <div className="text-sm">20,682,921</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">Interest rate</div>
                <div className="text-sm text-teal">+7.69% APY</div>
              </div>
            </div>

            <div className="bg-secondary rounded-md p-2 mb-4 flex justify-between items-center">
              <div className="text-xs">Current Price</div>
              <div className="text-xl font-bold">$0.0049944</div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Buy MXNs</h3>
              <div className="text-sm text-gray-400">Mint a supply</div>

              <div className="flex gap-2">
                <Button className="flex-1">BUY</Button>
                <Button variant="outline" className="flex-1">
                  SELL
                </Button>
              </div>

              <div>
                <div className="text-sm mb-2">Amount</div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-2xl">0</div>
                  <div className="text-sm text-gray-400 flex items-center gap-1">
                    - USDC <span className="inline-block w-4 h-4 bg-blue-500 rounded-full"></span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-gray-400">Total:</div>
                <div className="text-sm">$0</div>
              </div>

              <Button className="w-full">Buy MXNs</Button>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex justify-between items-center mb-2">
              <div className="text-lg font-medium">Payout Period (MXNs)</div>
              <div className="text-sm text-teal">7 days</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">Next Maturity Date</div>
                <div className="text-sm">March 6, 2024</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">Current Investment</div>
                <div className="text-sm">$0.00</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-400">Yield Reward</div>
                <div className="text-sm">$1,543.56</div>
              </div>
              <div className="flex justify-end">
                <div className="bg-teal text-white text-xs px-2 py-1 rounded">2 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

