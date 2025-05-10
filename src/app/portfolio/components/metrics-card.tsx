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
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-3", className)}>
      {/* Net Worth Card */}
      <div className="bg-white/5 rounded-xl border border-secondary/30 p-4">
        <div className="text-xs text-gray-400 mb-2">Net Worth</div>
        <div className="text-xl font-bold mb-1">
          ${netWorth.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span className={weeklyChange >= 0 ? "text-primary" : "text-red-500"}>
            {weeklyChange >= 0 ? "+" : "-"}
            {Math.abs(weeklyChange).toFixed(2)}%
          </span>
          <span className="text-gray-400">overall</span>
        </div>
      </div>

      {/* 7D % Change Card */}
      <div className="bg-white/5 rounded-xl border border-secondary/30 p-4">
        <div className="text-xs text-gray-400 mb-2">7D %</div>
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold mb-1">
            {weeklyChange >= 0 ? "+" : "-"}
            {Math.abs(weeklyChange).toFixed(2)}%
          </div>
          <div className={cn(
            "p-1 rounded-md",
            weeklyChange >= 0 ? "bg-primary/10" : "bg-red-500/10"
          )}>
            {weeklyChange >= 0 ? (
              <ArrowUpRight size={16} className="text-primary" />
            ) : (
              <ArrowDownRight size={16} className="text-red-500" />
            )}
          </div>
        </div>
        <div className="text-xs text-gray-400">This week</div>
      </div>

      {/* Invested Card */}
      <div className="bg-white/5 rounded-xl border border-secondary/30 p-4">
        <div className="text-xs text-gray-400 mb-2">Invested</div>
        <div className="text-xl font-bold mb-1">
          ${invested.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-400">Total amount</div>
      </div>

      {/* ROI Card */}
      <div className="bg-white/5 rounded-xl border border-secondary/30 p-4">
        <div className="text-xs text-gray-400 mb-2">Return On Investment</div>
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold mb-1">
            {roiPercentage >= 0 ? "+" : ""}
            {roiPercentage.toFixed(2)}%
          </div>
          <div className={cn(
            "p-1 rounded-md",
            roiPercentage >= 0 ? "bg-primary/10" : "bg-red-500/10"
          )}>
            {roiPercentage >= 0 ? (
              <ArrowUpRight size={16} className="text-primary" />
            ) : (
              <ArrowDownRight size={16} className="text-red-500" />
            )}
          </div>
        </div>
        <div className="text-xs text-gray-400">
          ${returnOnInvestment.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
}