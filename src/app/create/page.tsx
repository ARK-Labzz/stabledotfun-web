import Image from "next/image";
import CreateWindow from "./components/create-window";
import PreviewWindow from "./components/preview-window";
import { AssetProp, TradeWindowToken } from "@/types";
import { stablecoins } from "@/static-data/token";
import CreateProvider from "./components/create-context";

async function getFiatData(): Promise<AssetProp[]> {
  // Fetch data from your API
  return stablecoins as unknown as AssetProp[];
}

export default async function CreatePage() {
  const stablecoins = await getFiatData();
  return (
    <CreateProvider>
      <div className="space-y-4">
        <div className="text-sm w-full">
          <p className="pt-5 pl-5">
            Deploy your stablecoin to Solana Mainnet
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
          <CreateWindow
            stablecoins={stablecoins as unknown as TradeWindowToken[]}
          />
          <PreviewWindow />
        </div>
      </div>
    </CreateProvider>
  );
}
