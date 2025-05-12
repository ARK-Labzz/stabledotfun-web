"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HoldingsTabProps {
  holdings: Array<{
    id: string;
    name: string;
    symbol: string;
    amount: number;
    value: number;
    apy?: number;
    bond?: string;
    icon: string;
  }>;
}

export default function HoldingsTab({ holdings }: HoldingsTabProps) {
  const router = useRouter();

  if (holdings.length === 0) {
    return (
      <div className="text-center py-10 sm:py-16 bg-white/5 rounded-xl sm:rounded-2xl border border-secondary/30">
        <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">You don&apos;t have any holdings yet.</p>
        <Button 
          onClick={() => router.push("/")}
          size="sm"
          className="text-xs sm:text-sm"
        >
          Browse Stablecoins
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
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400">Amount</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400 hidden sm:table-cell">Value</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400 hidden md:table-cell">APY</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400 hidden md:table-cell">Bond</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((token) => (
              <tr key={token.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-2 sm:px-4 py-2 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Square token image with rounded corners */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/5 overflow-hidden">
                      <Image
                        src={token.icon}
                        alt={token.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-xs sm:text-sm">{token.symbol}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">{token.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm">
                  {token.amount.toLocaleString()}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm hidden sm:table-cell">
                  ${token.value.toLocaleString()}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm hidden md:table-cell">
                  {token.apy ? `${token.apy}%` : "-"}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm hidden md:table-cell">
                  {token.bond || "-"}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 sm:h-8 text-xs sm:text-sm text-primary"
                    asChild
                  >
                    <Link href={`/coin/${token.id}`}>
                      <span className="hidden sm:inline">View</span> <ExternalLink className="ml-0 sm:ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}