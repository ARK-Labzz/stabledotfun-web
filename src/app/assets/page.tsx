import { Button } from "@/components/ui/button";
import Link from "next/link";
import { token } from "@/static-data/token";
import AssetWindow from "./components/asset-window";
import { AssetProp } from "@/types";

async function getData(): Promise<AssetProp[]> {
  // Fetch data from your API here.
  return token as AssetProp[];
}

export default async function AssetsPage() {
  const data = await getData();
  // TODO - Implement token fetch api to replace the static `token` import
  if (!data || data.length < 1) return <NoAssetFound />;

  return (
    <div className="space-y-2 flex flex-col gap-2">
      <div className="text-xs text-white/50 mb-3">
        Explore your <span className="text-primary">coins</span> collections and
        earnings
      </div>

      <div className="flex flex-1 overflow-hidden justify-center w-30 lg:w-[90vw]">
        <svg
          width="1751"
          height="1"
          viewBox="0 0 1751 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            y1="0.5"
            x2="1751"
            y2="0.5"
            stroke="url(#paint0_linear_308_2275)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_308_2275"
              x1="0"
              y1="1.5"
              x2="1751"
              y2="1.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="0.129" stopColor="#00BCD4" />
              <stop offset="1" stopColor="#CCCCCC" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <AssetWindow data={data} />
      </div>
    </div>
  );
}

function NoAssetFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Your Assets</h2>
        <p className="text-white/50 mb-6">
          {
            "You don't have any assets yet. Create a stablecoin or buy one to get started."
          }
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant={"secondary"} asChild>
            <Link href="/create">Create Stablecoin</Link>
          </Button>
          <Button className="border-primary" variant="outline">
            <Link href="/">Buy Stablecoin</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
