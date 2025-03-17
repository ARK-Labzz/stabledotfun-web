import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const MintWindow = () => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="bg-[rgba(255,255,255,0.05)] border-gray-600/10 border-[2px] space-y-6 rounded-lg p-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-zinc-600/10 rounded-xl "></div>
            <div className="">
              <p className="text-xs text-gray-400">
                Issued by <span>cre8tivebuka</span>
              </p>
              <p>MXNS (CETES)</p>
            </div>
          </div>
          <div>
            <Image
              src="info.svg"
              className="h-10 w-10"
              height={100}
              width={100}
              alt="more info"
            />
          </div>
        </div>

        <h3 className="text-xl text-gray-600 font-medium mb-4 text-center py-3 rounded-sm border-[1.5px] border-gray-600">
          Mint MXNs
        </h3>

        <div className="space-y-6">
          <div>
            <div className="text-sm mb-2 text-gray-600">Amount</div>
            <div className="flex bg-gray-600/5 border-[1px] border-gray-600/10 p-2 rounded-md justify-between items-center mb-2 gap-2">
              <Input type="nuber" placeholder="0" className="border-none" />
              <div className="text-sm text-gray-400 flex items-center gap-1">
                <Select>
                  <SelectTrigger className="p-1 px-2 border-[1px] border-gray-600/20 bg-gray-600/10">
                    <SelectValue placeholder="USDC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">USDC</SelectItem>
                    <SelectItem value="dark">USDC</SelectItem>
                    <SelectItem value="system">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-2">
              Target Fiat Currency
            </div>
            <div className="flex items-center gap-2  bg-gray-600/5 border-[1px] border-gray-600/10 p-2 rounded-md">
              <div className="text-sm">
                - Mexican Peso{" "}
                <span className="inline-block w-5 h-3 bg-green-500 relative">
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[8px]">
                    MEX
                  </span>
                </span>
              </div>
              <div className="ml-auto text-xs  bg-gray-600/5 border-[1px] border-gray-600/10 px-2 py-1 rounded">
                MXN
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-2">
              Destination Address
            </div>
            <div className="flex items-center gap-2  bg-gray-600/5 border-[1px] border-gray-600/10 p-2 rounded-md">
              <div className="truncate text-sm">- Cs1tBHsL5KcQybQqywKFQ...</div>
              <Copy size={16} className="text-gray-400 flex-shrink-0" />
            </div>
          </div>

          <Button className="w-full">Mint MXNs</Button>
        </div>
      </div>
    </div>
  );
};

export default MintWindow;
