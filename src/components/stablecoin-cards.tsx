"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import MiniChart from "./mini-chart";
import { AssetProp } from "@/types";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StablecoinCardsProps {
  className?: string;
  asset: AssetProp[];
}

export default function StablecoinCards({
  className,
  asset,
}: StablecoinCardsProps) {
  const [assets, setAssets] = React.useState<AssetProp[] | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [filterOption, setFilterOption] = React.useState<string>("trending");
  const itemsPerPage = 8;

  React.useEffect(() => {
    if (asset && asset.length > 0) {
      setAssets(asset);
    }
  }, [asset]);
  
  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterOption]);


  const filteredAssets = React.useMemo(() => {
    if (!assets) return [];
    
    const filteredAssets = [...assets];
    
    switch (filterOption) {
      case "trending":
        return filteredAssets.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
      case "recent":
        return filteredAssets.sort((a, b) => Number(b.id) - Number(a.id));
      case "price":
        return filteredAssets.sort((a, b) => b.price - a.price);
      case "mcap":
        return filteredAssets.sort((a, b) => (b.price * (b.supply || 1000000)) - (a.price * (a.supply || 1000000)));
      default:
        return filteredAssets;
    }
  }, [assets, filterOption]);

  const totalPages = filteredAssets ? Math.ceil(filteredAssets.length / itemsPerPage) : 0;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedAssets = filteredAssets?.slice(start, end);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-1 bg-white/5 rounded-2xl p-4 border border-secondary/30",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-normal text-primary">
            Stablecoins overview
          </span>
          <span className="text-xs font-normal px-2 py-1 rounded-md text-gray-400 bg-secondary/70">
            {assets?.length} Assets
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-300">Filter stablecoins by</span>
            <Select
              value={filterOption}
              onValueChange={(value) => setFilterOption(value)}
            >
              <SelectTrigger className="w-32 text-xs h-8 bg-white/5 border border-primary/30 text-gray-300">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-primary/30">
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="mcap">MCap</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={cn(
                  "p-1 rounded-md bg-white/5 border border-primary/30 text-gray-300",
                  currentPage === 1 && "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={cn(
                  "p-1 rounded-md bg-white/5 border border-primary/30 text-gray-300",
                  currentPage === totalPages && "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {paginatedAssets?.map((coin, index) => (
          <Link 
            key={coin.id || index} 
            href={`/portfolio/${coin.id}`}
            className="block"
          >
            <div
              className={cn(
                "rounded-lg p-4 border border-primary/50 relative overflow-hidden transition-all duration-200 group h-[200px]",
                "hover:bg-secondary hover:border-teal/50 hover:inset-ring inset-ring-1 inset-ring-[rgba(0,194,203,0.3)] shadow-[rgba(0,194,203,0.3)] inset-shadow-[rgba(0,194,203,0.3)] inset-shadow-xs",
                "bg-[#051016]"
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={36}
                    height={36}
                    className="rounded-md bg-white/5"
                  />
                </div>
                <div
                  className={cn(
                    "rounded-full p-1 bg-white/5 border-2",
                    coin.change > 0
                      ? "border-t-primary border-l-primary"
                      : "border-t-red-500 border-l-red-500"
                  )}
                >
                  {coin.change > 0 ? (
                    <ArrowUpRight
                      size={12}
                      className="text-primary group-hover:text-teal"
                    />
                  ) : (
                    <ArrowDownRight
                      size={12}
                      className="text-red-500 group-hover:text-teal"
                    />
                  )}
                </div>
              </div>

              <div className="mb-1 text-xs lg:text-sm">
                {coin.symbol}s ({coin.fiat})
              </div>

              <div className="flex flex-col gap-1 mb-3">
                <div className="text-xs text-gray-400">Yield Rate</div>
                <div className="text-xl font-bold">{coin.yield}</div>
                <div
                  className={`text-xs ${
                    coin.change > 0 ? "text-teal" : "text-red-500"
                  } flex items-center gap-1`}
                >
                  {coin.change}% 24hrs
                </div>
              </div>

              {/* Mini chart visualization */}
              <div className="h-8 relative">
                <MiniChart
                  height={32}
                  color={coin.change > 0 ? "#00c2cb" : "#e74c3c"}
                  trend={coin.change > 0 ? "up" : "down"}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}