import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Upload } from "lucide-react"

export default function CreatePage() {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400">Deploy your stablecoin and mint an initial supply</div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 bg-card rounded-lg p-6 border border-border">
          <h2 className="text-2xl font-bold mb-6">Create Your Stablecoin</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">Ticker Symbol</div>
              <Input placeholder="MXNs" className="bg-secondary border-border" />
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-2">Name</div>
              <Input placeholder="Mexican Peso Stablecoin" className="bg-secondary border-border" />
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Target Fiat Currency</div>
            <div className="bg-secondary rounded-md p-3 border border-border">
              <div className="flex justify-between items-center">
                <div className="font-medium flex items-center gap-2">
                  - Mexican Peso{" "}
                  <span className="inline-block w-5 h-3 bg-green-500 relative">
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[8px]">MEX</span>
                  </span>
                </div>
                <div className="text-xs bg-secondary px-2 py-1 rounded">MXN</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Logo</div>
            <div className="bg-secondary rounded-md p-8 border border-border flex flex-col items-center justify-center">
              <Upload size={24} className="text-gray-400 mb-2" />
              <div className="text-sm font-medium mb-1">Click to Upload or drag and drop</div>
              <div className="text-xs text-gray-400">PNG, JPG (1MB)</div>
            </div>
          </div>

          <Button className="w-full">Create MXNs</Button>
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

            <h3 className="text-xl font-medium mb-4">Mint MXNs</h3>

            <div className="space-y-4">
              <div>
                <div className="text-sm mb-2">Amount</div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-2xl">0</div>
                  <div className="text-sm text-gray-400 flex items-center gap-1">
                    - USDC <span className="inline-block w-4 h-4 bg-blue-500 rounded-full"></span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm mb-2">Target Fiat Currency</div>
                <div className="flex items-center gap-2 bg-secondary p-2 rounded-md">
                  <div className="text-sm">
                    - Mexican Peso{" "}
                    <span className="inline-block w-5 h-3 bg-green-500 relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-[8px]">
                        MEX
                      </span>
                    </span>
                  </div>
                  <div className="ml-auto text-xs bg-secondary px-2 py-1 rounded">MXN</div>
                </div>
              </div>

              <div>
                <div className="text-sm mb-2">Destination Address</div>
                <div className="flex items-center gap-2 bg-secondary p-2 rounded-md">
                  <div className="truncate text-sm">- Cs1tBHsL5KcQybQqywKFQ...</div>
                  <Copy size={16} className="text-gray-400 flex-shrink-0" />
                </div>
              </div>

              <Button className="w-full">Mint MXNs</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

