import { Button } from "@/components/ui/button"
import { Copy, Info } from "lucide-react"
import RedeemWindow from "./components/redeem-window"

export default function RedeemPage() {
  return (
    <div className="space-y-4">
      <div className="text-xs text-white/50">Exchange your <span className="text-primary">stablecoin</span> and get your initial supply</div>

      <div className="flex flex-col lg:flex-row gap-4">
        <RedeemWindow />

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

