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
      <div className="text-center py-16 bg-white/5 rounded-2xl border border-secondary/30">
        <p className="text-gray-400 mb-4">You don&apos;t have any holdings yet.</p>
        <Button onClick={() => router.push("/")}>
          Browse Stablecoins
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-2xl border border-secondary/30 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Token</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">Amount</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">Value (USD)</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">APY</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">Bond</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((token) => (
              <tr key={token.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 overflow-hidden">
                      <Image
                        src={token.icon}
                        alt={token.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-xs text-gray-400">{token.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  {token.amount.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-right">
                  ${token.value.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-right">
                  {token.apy ? `${token.apy}%` : "-"}
                </td>
                <td className="px-4 py-4 text-right">
                  {token.bond || "-"}
                </td>
                <td className="px-4 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-primary"
                    asChild
                  >
                    <Link href={`/coin/${token.id}`}>
                      View <ExternalLink className="ml-1 h-3 w-3" />
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