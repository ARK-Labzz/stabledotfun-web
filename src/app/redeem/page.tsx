import { Button } from "@/components/ui/button"
import { Copy, Info } from "lucide-react"

export default function RedeemPage() {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400">Exchange your stablecoin and get your initial supply</div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 bg-card rounded-lg p-6 border border-border">
          <h2 className="text-2xl font-bold mb-6">Redeem Your Stablecoin</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">From</div>
              <div className="bg-secondary rounded-md p-3 border border-border">
                <div className="text-xs text-gray-400 mb-1">Issued by cre8tivebuka</div>
                <div className="flex justify-between items-center">
                  <div className="font-medium">- MXNs (CETES)</div>
                  <div className="w-6 h-6 bg-secondary rounded-md"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-2">To</div>
              <div className="bg-secondary rounded-md p-3 border border-border">
                <div className="flex justify-between items-center">
                  <div className="font-medium flex items-center gap-1">
                    - USDC <Info size={14} className="text-blue-400" />
                  </div>
                  <div className="text-xs bg-secondary px-2 py-1 rounded">USD</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Amount</div>
            <div className="bg-secondary rounded-md p-4 border border-border">
              <div className="flex justify-between items-center mb-2">
                <div className="text-2xl">0</div>
                <button className="bg-teal text-white px-3 py-1 rounded text-xs">MAX</button>
              </div>
              <div className="text-xs text-gray-400">Available: MXNs 2,002,402.5116130065</div>
            </div>
          </div>

          <div className="flex items-center justify-center text-xs text-gray-400 mb-6">
            <Info size={14} className="mr-2" />
            To redeem your stablecoins, transfer them to the wallet address of your choice. Below is your unique
            redemption account.
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-2">Destination Address</div>
            <div className="flex items-center gap-2 bg-secondary p-3 rounded-md border border-border">
              <div className="truncate text-sm flex-1">- Cs1tBHsL5KcQybQqywKFQ5qWfUEdfX2copkPH7UBCNKL</div>
              <Copy size={16} className="text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-xs text-gray-400 mb-1">Issued by cre8tivebuka</div>
            <div className="font-medium mb-4">MXNs (CETES)</div>

            <div className="flex justify-end mb-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Copy size={16} className="text-gray-400" />
              </div>
            </div>

            <h3 className="text-xl font-medium mb-4">Redeem Your MXNs</h3>

            <div className="space-y-4">
              <div>
                <div className="text-sm mb-2">Sell Your MXNs</div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-2xl">0</div>
                  <button className="bg-teal text-white px-3 py-1 rounded text-xs">MAX</button>
                </div>
                <div className="text-xs text-gray-400 mb-4">Available: MXNs 2,002,402.5116130065</div>
              </div>

              <div>
                <div className="text-sm mb-2">Get</div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl">0</div>
                  <div className="text-sm text-gray-400 flex items-center gap-1">
                    - USDC <Info size={14} className="text-blue-400" />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm mb-2">Destination Address</div>
                <div className="flex items-center gap-2 bg-secondary p-2 rounded-md">
                  <div className="truncate text-sm">Cs1tBHsL5KcQybQqywKFQ...</div>
                  <Copy size={16} className="text-gray-400 flex-shrink-0" />
                </div>
              </div>

              <Button className="w-full">Redeem MXNs</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

