"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { token } from "@/static-data/token";
import AssetWindow from "./components/asset-window";
import { AssetProp } from "@/types";
import { PayoutTimeline } from "@/components/payout-timeline";
import UserDetails from "@/components/user-details";
import MetricsCards from "./components/metrics-card";
import { useEffect, useState } from "react";

async function getData(): Promise<AssetProp[]> {
  // Fetch data from your API here.
  return token as AssetProp[];
}

// Calculate overall portfolio metrics
function calculateMetrics(data: AssetProp[]) {
  const netWorth = data.reduce((sum, asset) => sum + asset.currentInvestment, 0);
  const initialInvestment = data.reduce((sum, asset) => sum + asset.initialInvestment, 0);
  const returnOnInvestment = netWorth - initialInvestment;
  const roiPercentage = initialInvestment > 0 ? (returnOnInvestment / initialInvestment) * 100 : 0;
  const weeklyChange = 7.69; // Mock data, this would be calculated from historical data

  return {
    netWorth,
    invested: initialInvestment,
    returnOnInvestment,
    roiPercentage,
    weeklyChange
  };
}

export default function AssetsPage() {
  
const [data, setData] = useState<AssetProp[] | null>(null);

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  
  // TODO - Implement token fetch api to replace the static `token` import
  // TODO - Separate the !data from the data.length<1 the !data would be used for a loading state. I don't know what you want the loading state to look like.  
  if (!data || data.length < 1) return <NoAssetFound />;

  const metrics = calculateMetrics(data);
  return (
    <div className="max-w-full w-full space-y-2 flex flex-col gap-2">
      <div className="text-xs text-white/50 mb-2 lg:mb-3">
        Explore your <span className="text-primary">coins</span> collections and
        earnings
      </div>

      <div className="flex flex-1 overflow-hidden justify-center w-full mb-2 lg:mb-4">
        <svg
          width="100%"
          height="1"
          viewBox="0 0 1751 1"
          preserveAspectRatio="xMidYMid meet"
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

      {/* Mobile layout: UserDetails -> Metrics -> Table -> Timeline */}
		<div className="grid grid-cols-1 gap-3 lg:gap-4 w-full max-w-full overflow-hidden px-2 sm:px-4 lg:hidden">
		  <UserDetails username="stable.user" className="w-full" />
		  <MetricsCards metrics={metrics} />
		  <AssetWindow data={data} />
		  <PayoutTimeline />
		</div>


      {/* Desktop layout: Split into columns */}
      <div className="hidden lg:grid lg:grid-cols-[3fr_1fr] gap-3 lg:gap-4 w-full px-0">
        <div className="flex-1 flex flex-col gap-3 lg:gap-4 min-w-0">
          <MetricsCards metrics={metrics} />
          <AssetWindow data={data} />
        </div>
        <div className="flex flex-col gap-3 lg:gap-4 w-72 xl:w-80 flex-shrink-0">
          <UserDetails username="stable.user" />
          <PayoutTimeline />
        </div>
      </div>
    </div>
  );
}

function NoAssetFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] px-4">
      <div className="text-center max-w-md">
        <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Holdings</h2>
        <p className="text-sm lg:text-base text-white/50 mb-4 lg:mb-6">
          {
            "You don't have any assets yet. Create a stablecoin or buy one to get started."
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
          <Button variant={"secondary"} size="sm" asChild>
            <Link href="/create">Create Stablecoin</Link>
          </Button>
          <Button className="border-primary" variant="outline" size="sm">
            <Link href="/">Buy Stablecoin</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
