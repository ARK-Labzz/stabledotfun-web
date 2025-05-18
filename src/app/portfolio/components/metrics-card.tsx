import React from "react";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface MetricsProps {
  className?: string;
  metrics: {
    netWorth: number;
    invested: number;
    returnOnInvestment: number;
    roiPercentage: number;
    weeklyChange: number;
  };
}

export default function MetricsCards({ metrics, className }: MetricsProps) {
  const { netWorth, invested, returnOnInvestment, roiPercentage, weeklyChange } = metrics;
  
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 w-full max-w-full", className)}>
      {/* Net Worth Card */}
      <div className="bg-white/5 rounded-lg lg:rounded-xl border border-secondary/30 p-3 lg:p-4">
        <div className="text-[10px] lg:text-xs text-gray-400 mb-1 lg:mb-2">Net Worth</div>
        <div className="text-base lg:text-lg xl:text-xl font-bold mb-0.5 lg:mb-1">
          ${netWorth.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <div className="flex items-center gap-1 text-[10px] lg:text-xs">
          <span className={weeklyChange >= 0 ? "text-primary" : "text-red-500"}>
            {weeklyChange >= 0 ? "+" : "-"}
            {Math.abs(weeklyChange).toFixed(1)}%
          </span>
          <span className="text-gray-400">overall</span>
        </div>
      </div>
      {/* 7D % Change Card */}
      <div className="bg-white/5 rounded-lg lg:rounded-xl border border-secondary/30 p-3 lg:p-4">
        <div className="text-[10px] lg:text-xs text-gray-400 mb-1 lg:mb-2">7D %</div>
        <div className="flex items-center gap-1 lg:gap-2">
          <div className="text-base lg:text-lg xl:text-xl font-bold mb-0.5 lg:mb-1">
            {weeklyChange >= 0 ? "+" : "-"}
            {Math.abs(weeklyChange).toFixed(1)}%
          </div>
          <div className={cn(
            "p-0.5 lg:p-1 rounded-md",
            weeklyChange >= 0 ? "bg-primary/10" : "bg-red-500/10"
          )}>
            {weeklyChange >= 0 ? (
              <ArrowUpRight size={14} className="text-primary lg:w-4 lg:h-4" />
            ) : (
              <ArrowDownRight size={14} className="text-red-500 lg:w-4 lg:h-4" />
            )}
          </div>
        </div>
        <div className="text-[10px] lg:text-xs text-gray-400">This week</div>
      </div>

      {/* Invested Card */}
      <div className="bg-white/5 rounded-lg lg:rounded-xl border border-secondary/30 p-3 lg:p-4">
        <div className="text-[10px] lg:text-xs text-gray-400 mb-1 lg:mb-2">Invested</div>
        <div className="text-base lg:text-lg xl:text-xl font-bold mb-0.5 lg:mb-1">
          ${invested.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <div className="text-[10px] lg:text-xs text-gray-400">Total amount</div>
      </div>

      {/* ROI Card */}
      <div className="bg-white/5 rounded-lg lg:rounded-xl border border-secondary/30 p-3 lg:p-4">
        <div className="text-[10px] lg:text-xs text-gray-400 mb-1 lg:mb-2">ROI</div>
        <div className="flex items-center gap-1 lg:gap-2">
          <div className="text-base lg:text-lg xl:text-xl font-bold mb-0.5 lg:mb-1">
            {roiPercentage >= 0 ? "+" : ""}
            {roiPercentage.toFixed(1)}%
          </div>
          <div className={cn(
            "p-0.5 lg:p-1 rounded-md",
            roiPercentage >= 0 ? "bg-primary/10" : "bg-red-500/10"
          )}>
            {roiPercentage >= 0 ? (
              <ArrowUpRight size={14} className="text-primary lg:w-4 lg:h-4" />
            ) : (
              <ArrowDownRight size={14} className="text-red-500 lg:w-4 lg:h-4" />
            )}
          </div>
        </div>
        <div className="text-[10px] lg:text-xs text-gray-400">
          ${Math.abs(returnOnInvestment).toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
      </div>
    </div>
  );
}