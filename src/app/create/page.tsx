import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import MintWindow from "@/components/mint-window";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePage() {
  return (
    <div className="space-y-4  bg-sidebar">
      <div className="text-sm w-full">
        <p className="pt-5 pl-5">
          Deploy your stablecoin and mint an initial supply
        </p>
        <Image
          src="Line.svg"
          className="w-full mt-5"
          height={10}
          width={100}
          alt="line"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 p-5">
        <div className="flex-1 bg-[rgba(255,255,255,0.05)] border-gray-600/10 border-[2px] rounded-2xl p-6 ">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Create Your Stablecoin
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">Ticker Symbol</div>
              <Input
                placeholder="MXNs"
                className="bg-gray-600/5 border-gray-600/10 border-[1px]"
              />
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-2">Name</div>
              <Input
                placeholder="Mexican Peso Stablecoin"
                className="bg-gray-600/5 border-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">
              Target Fiat Currency
            </div>
            <div className="bg-gray-600/5 rounded-lg border-[1px] border-gray-600/10 p-2">
              <div className="flex justify-between items-center">
                <Select>
                  <SelectTrigger className="flex-1 border-none shadow-none">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="text-xs mx-5 p-3 px-4 rounded-xl bg-gray-600/10 border-[1px] border-gray-600/20">
                  MXN
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Logo</div>
            <div className="bg-gray-600/5 rounded-lg border-[1px] border-gray-600/10 p-8 flex flex-col items-center justify-center">
              <Upload size={24} className="text-gray-400 mb-2" />
              <div className="text-sm font-medium mb-1">
                Click to Upload or drag and drop
              </div>
              <div className="text-xs text-gray-400">PNG, JPG (1MB)</div>
            </div>
          </div>

          <Button className="w-full">Create MXNs</Button>
        </div>
        <MintWindow />
      </div>
    </div>
  );
}
