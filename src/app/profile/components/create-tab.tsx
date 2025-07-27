"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreatedCoinForUI } from "@/lib/profile";

interface CreatedTabProps {
  coinsCreated: CreatedCoinForUI[];
  isLoading?: boolean;
}

export default function CreatedTab({ coinsCreated, isLoading = false }: CreatedTabProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="text-center py-10 sm:py-16 bg-white/5 rounded-xl sm:rounded-2xl border border-secondary/30">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-sm sm:text-base text-gray-400">Loading your created stablecoins...</p>
      </div>
    );
  }

  if (coinsCreated.length === 0) {
    return (
      <div className="text-center py-10 sm:py-16 bg-white/5 rounded-xl sm:rounded-2xl border border-secondary/30">
        <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">You haven&apos;t created any stablecoins yet.</p>
        <Button 
          onClick={() => router.push("/create")}
          size="sm"
          className="text-xs sm:text-sm"
        >
          Create Your First Stablecoin
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-secondary/30 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-400">Token</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400">Price</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400 hidden sm:table-cell">APY</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400 hidden md:table-cell">Bond</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400 hidden md:table-cell">Created</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody>
            {coinsCreated.map((coin) => (
              <tr key={coin.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-2 sm:px-4 py-2 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Square token image with rounded corners */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/5 overflow-hidden">
                      <Image
                        src={coin.icon}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to default token icon
                          (e.target as HTMLImageElement).src = '/tokens/default.png';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-xs sm:text-sm">{coin.symbol}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">{coin.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm">
                  ${parseFloat(coin.price.toFixed(6)).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6
                  })}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm text-primary hidden sm:table-cell">
                  {coin.apy}%
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm hidden md:table-cell">
                  {coin.bond}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm text-gray-400 hidden md:table-cell">
                  {new Date(coin.createdAt).toLocaleDateString()}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 sm:h-8 text-xs sm:text-sm text-primary"
                    asChild
                  >
                    <Link href={`/coin/${coin.id}`}>
                      <span className="hidden sm:inline">View</span> <ExternalLink className="ml-0 sm:ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 sm:p-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto text-xs sm:text-sm"
          onClick={() => router.push("/create")}
        >
          <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Create New Stablecoin
        </Button>
      </div>
    </div>
  );
}