"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { TradeWindowToken } from "@/types";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";

interface InvestmentCalculatorProps {
  className?: string;
  stablecoins: TradeWindowToken[];
}

export default function InvestmentCalculator({
  className,
  stablecoins,
}: InvestmentCalculatorProps) {
  const [selectedCoin, setSelectedCoin] = React.useState<string>("MXNs");
  const [investment, setInvestment] = React.useState<number>(1000);
  const [returnPeriod, setReturnPeriod] = React.useState<string>("weekly");
  const [goalAmount, setGoalAmount] = React.useState<number>(5000);
  const [goalPeriod, setGoalPeriod] = React.useState<string>("yearly");

  const selectedStablecoin = React.useMemo(() => {
    const found = stablecoins.find(coin => coin.symbol === selectedCoin);
    if (found) {
      return {
        ...found,
        image: found.image || found.icon || "/images/mxn.png",
        apy: found.apy || 7.3,
      };
    }
    
    // Default fallback
    return {
      symbol: "MXNs",
      name: "Mexican Peso Stablecoin",
      image: "/images/mxn.png", 
      apy: 7.3,
      fiat: "MXN",
      price: 1.096341,
      id: "mxn",
      amount: 1000,
      ratio: 1,
    };
  }, [stablecoins, selectedCoin]);

  const calculateReturns = () => {
    const apy = selectedStablecoin.apy || 7.3;
    const weeklyReturn = (investment * (apy / 100)) / 52;
    const monthlyReturn = (investment * (apy / 100)) / 12;
    const yearlyReturn = investment * (apy / 100);

    return {
      weekly: weeklyReturn.toFixed(2),
      monthly: monthlyReturn.toFixed(2),
      yearly: yearlyReturn.toFixed(2),
    };
  };

  // Calculate time to reach goal
  const calculateGoalProgress = () => {
    const apy = selectedStablecoin.apy || 7.3;
    const weeklyReturn = (investment * (apy / 100)) / 52;
    const monthlyReturn = (investment * (apy / 100)) / 12;
    const yearlyReturn = investment * (apy / 100);

    let progress;
    switch (goalPeriod) {
      case "weekly":
        progress = (weeklyReturn / goalAmount) * 100;
        break;
      case "monthly":
        progress = (monthlyReturn / goalAmount) * 100;
        break;
      case "yearly":
        progress = (yearlyReturn / goalAmount) * 100;
        break;
      default:
        progress = 0;
    }

    const timeToReachGoal = goalAmount / (goalPeriod === "weekly" ? weeklyReturn : 
                             goalPeriod === "monthly" ? monthlyReturn : yearlyReturn);
    
    return {
      progress: Math.min(progress, 100),
      remaining: Math.max(0, goalAmount - (goalPeriod === "weekly" ? weeklyReturn : 
                         goalPeriod === "monthly" ? monthlyReturn : yearlyReturn)),
      timeToReach: timeToReachGoal.toFixed(1)
    };
  };

  const returns = calculateReturns();
  const goalProgress = calculateGoalProgress();

  // Get recommended stablecoins to reach goal faster
  const getRecommendedStablecoins = () => {
    const selectedApy = selectedStablecoin.apy || 7.3;
    return stablecoins
      .filter(coin => (coin.apy || 5) > selectedApy)
      .slice(0, 3);
  };

  const recommendedCoins = getRecommendedStablecoins();

  return (
    <div
      className={cn(
        "flex flex-col gap-1 bg-white/5 rounded-2xl p-4 border border-secondary/30",
        className
      )}
    >
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
          <TabsTrigger value="goal">Goal Setter</TabsTrigger>
        </TabsList>
        
        {/* Calculator Tab */}
        <TabsContent value="calculator" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Select Stablecoin</label>
              <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                <SelectTrigger className="w-full bg-white/5 border border-primary/30">
                  <div className="flex items-center gap-2">
                    <Image
                      src={selectedStablecoin.image || selectedStablecoin.icon || "/images/mxn.png"}
                      alt={selectedStablecoin.name || "Stablecoin"}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span>{selectedCoin} - {selectedStablecoin.apy || 7.3}% APY</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-background border border-primary/30 max-h-60">
                  {stablecoins.map((coin) => (
                    <SelectItem key={coin.symbol} value={coin.symbol}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={coin.image || coin.icon || "/images/mxn.png"}
                          alt={coin.name || "Stablecoin"}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span>
                          {coin.symbol} - {coin.apy || 5}% APY
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Investment Amount (USD)</label>
              <Input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="bg-white/5 border border-primary/30"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Return Period</label>
              <Select value={returnPeriod} onValueChange={setReturnPeriod}>
                <SelectTrigger className="w-full bg-white/5 border border-primary/30">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-primary/30">
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-[#051016] rounded-lg p-4 border border-primary/20">
              <h3 className="text-sm font-medium mb-3">Estimated Returns</h3>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Weekly Returns:</span>
                  <span className="text-sm font-medium text-primary">${returns.weekly}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Monthly Returns:</span>
                  <span className="text-sm font-medium text-primary">${returns.monthly}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Yearly Returns:</span>
                  <span className="text-sm font-medium text-primary">${returns.yearly}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span>Next maturity:</span>
                    <span className="text-primary">May 15, 2025</span>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                    Bond: CETES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Goal Setter Tab */}
        <TabsContent value="goal" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Select Stablecoin</label>
              <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                <SelectTrigger className="w-full bg-white/5 border border-primary/30">
                  <div className="flex items-center gap-2">
                    <Image
                      src={selectedStablecoin.image || "/images/mxn.png"}
                      alt={selectedStablecoin.name || "Stablecoin"}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span>{selectedCoin} - {selectedStablecoin.apy || 7.3}% APY</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-background border border-primary/30 max-h-60">
                  {stablecoins.map((coin) => (
                    <SelectItem key={coin.symbol} value={coin.symbol}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={coin.image || coin.icon || "/images/mxn.png"}
                          alt={coin.name || "Stablecoin"}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span>
                          {coin.symbol} - {coin.apy || 5}% APY
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Investment Amount (USD)</label>
              <Input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="bg-white/5 border border-primary/30"
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <label className="text-xs text-gray-400 mb-1 block">Goal Amount (USD)</label>
                <span className="text-xs text-primary">${goalAmount}</span>
              </div>
              <Slider
                value={[goalAmount]}
                min={100}
                max={10000}
                step={100}
                onValueChange={(value) => setGoalAmount(value[0])}
                className="my-4"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Goal Period</label>
              <Select value={goalPeriod} onValueChange={setGoalPeriod}>
                <SelectTrigger className="w-full bg-white/5 border border-primary/30">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-primary/30">
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-[#051016] rounded-lg p-4 border border-primary/20">
              <h3 className="text-sm font-medium mb-3">Goal Progress</h3>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Progress towards {goalPeriod} goal</span>
                  <span className="text-primary">{goalProgress.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${goalProgress.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Current {goalPeriod} return:</span>
                  <span className="text-sm font-medium text-primary">
                    ${returnPeriod === "weekly" ? returns.weekly : returnPeriod === "monthly" ? returns.monthly : returns.yearly}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Remaining to goal:</span>
                  <span className="text-sm font-medium text-red-400">
                    ${goalProgress.remaining.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Time to reach goal:</span>
                  <span className="text-sm font-medium">
                    {goalProgress.timeToReach} {goalPeriod === "weekly" ? "weeks" : goalPeriod === "monthly" ? "months" : "years"}
                  </span>
                </div>
              </div>
              
              {recommendedCoins.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <h4 className="text-xs font-medium mb-2">Recommended stablecoins to reach your goal faster:</h4>
                  <div className="flex flex-col gap-2">
                    {recommendedCoins.map((coin, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={coin.image || coin.icon || "/images/mxn.png"}
                            alt={coin.name || "Stablecoin"}
                            width={16}
                            height={16}
                            className="rounded-full"
                          />
                          <span className="text-xs">{coin.symbol} - {coin.apy || (8 + index)}% APY</span>
                        </div>
                        <CheckCircle className="w-3 h-3 text-primary" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}