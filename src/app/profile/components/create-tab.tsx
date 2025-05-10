"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CreatedTabProps {
  coinsCreated: Array<{
    id: string;
    name: string;
    symbol: string;
    price: number;
    apy: number;
    bond: string;
    createdAt: string;
    icon: string;
  }>;
}

export default function CreatedTab({ coinsCreated }: CreatedTabProps) {
  const router = useRouter();

  if (coinsCreated.length === 0) {
    return (
      <div className="text-center py-16 bg-white/5 rounded-2xl border border-secondary/30">
        <p className="text-gray-400 mb-4">You haven't created any stablecoins yet.</p>
        <Button onClick={() => router.push("/create")}>
          Create Your First Stablecoin
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
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">Price (USD)</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">APY</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">Bond</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">Created</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody>
            {coinsCreated.map((coin) => (
              <tr key={coin.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 overflow-hidden">
                      <Image
                        src={coin.icon}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{coin.symbol}</div>
                      <div className="text-xs text-gray-400">{coin.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  ${coin.price.toFixed(6)}
                </td>
                <td className="px-4 py-4 text-right text-primary">
                  {coin.apy}%
                </td>
                <td className="px-4 py-4 text-right">
                  {coin.bond}
                </td>
                <td className="px-4 py-4 text-right text-gray-400">
                  {new Date(coin.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-primary"
                    asChild
                  >
                    <Link href={`/coin/${coin.id}`}>
                      View <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => router.push("/create")}
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Stablecoin
        </Button>
      </div>
    </div>
  );
}