"use client"

import React from "react";
import { useSwap } from "./swap-context";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import MiniChart from "@/components/mini-chart";
import { TradeWindowToken } from "@/types";

export default function TokenDetails() {
  const { fromToken, toToken, fromAmount, toAmount } = useSwap();
  
  // Bond mapping based on fiat currency
  const bondMap: Record<string, { bond: string; apy: number }> = {
    USD: { bond: "USTRY", apy: 3.62 },
    GBP: { bond: "GILTS", apy: 3.92 },
    EUR: { bond: "EUROB", apy: 1.95 },
    MXN: { bond: "CETES", apy: 7.3 },
    BRL: { bond: "TESUORO", apy: 12.95 },
  };
  
  const isStablecoin = (symbol: string) => {
    return ['USDs', 'GBPs', 'MXNs', 'EURs', 'BRLs'].includes(symbol);
  };
  
  // Get bond info for a token
  const getBondInfo = (token: TradeWindowToken | null) => {
    if (!token || !isStablecoin(token.symbol)) return null;
    return token.fiat ? bondMap[token.fiat] || null : null;
  };
  
  // Calculate new position size and value
  const calculateFromPosition = () => {
    if (!fromToken || !fromAmount) return { size: 0, value: 0 };
    
    const size = Math.max(0, fromToken.amount - parseFloat(fromAmount || "0"));
    const value = size * (fromToken.price || 0);
    
    return { size, value };
  };
  
  const calculateToPosition = () => {
    if (!toToken || !toAmount) return { size: 0, value: 0 };
    
    const size = toToken.amount + parseFloat(toAmount || "0");
    const value = size * (toToken.price || 0);
    
    return { size, value };
  };
  
  const fromPosition = calculateFromPosition();
  const toPosition = calculateToPosition();
  
  // Generate mock maturity date (next Thursday)
  const getNextMaturityDate = () => {
    const date = new Date();
    const day = date.getDay(); // 0 = Sunday, 4 = Thursday
    const daysToAdd = (11 - day) % 7; // Days until next Thursday
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="w-full lg:w-80 space-y-4">
      {/* From Token Details */}
      {fromToken && (
        <div className="rounded-lg p-4 border border-white/10 bg-white/5">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={fromToken.icon || "/placeholder.svg"}
              alt={fromToken.name}
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <h3 className="font-medium">{fromToken.name}</h3>
              <p className="text-xs text-gray-400">{fromToken.symbol}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Token details */}
            {isStablecoin(fromToken.symbol) && getBondInfo(fromToken) && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">APY</span>
                <span className="text-sm text-primary">{getBondInfo(fromToken)?.apy}%</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Current Position Size</span>
              <span className="text-sm">{fromToken.amount.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">New Position Size</span>
              <span className="text-sm">{fromPosition.size.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Current Position Value</span>
              <span className="text-sm">${(fromToken.amount * (fromToken.price || 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">New Position Value</span>
              <span className="text-sm">${fromPosition.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            
            {isStablecoin(fromToken.symbol) && getBondInfo(fromToken) && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Bond</span>
                <span className="text-sm text-primary">{getBondInfo(fromToken)?.bond}</span>
              </div>
            )}
            
            {isStablecoin(fromToken.symbol) && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Next Maturity Date</span>
                <span className="text-sm">{getNextMaturityDate()}</span>
              </div>
            )}
            
            {/* Show more details link */}
            <div className="pt-2 flex justify-end">
              {isStablecoin(fromToken.symbol) ? (
                <Link href={`/coin/${fromToken.id}`} className="text-xs text-primary flex items-center gap-1 hover:underline">
                  Show more details <ArrowRight className="h-3 w-3" />
                </Link>
              ) : (
                <a 
                  href={`https://solscan.io/token/${fromToken.id}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary flex items-center gap-1 hover:underline"
                >
                  View on Solscan <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
          
          {/* Mini chart */}
          <div className="mt-4 h-16">
            <MiniChart
              height={64}
              color="#00c2cb"
              trend="up"
            />
          </div>
        </div>
      )}
      
      {/* To Token Details */}
      {toToken && (
        <div className="rounded-lg p-4 border border-white/10 bg-white/5">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={toToken.icon || "/placeholder.svg"}
              alt={toToken.name}
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <h3 className="font-medium">{toToken.name}</h3>
              <p className="text-xs text-gray-400">{toToken.symbol}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Token details */}
            {isStablecoin(toToken.symbol) && getBondInfo(toToken) && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">APY</span>
                <span className="text-sm text-primary">{getBondInfo(toToken)?.apy}%</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Current Position Size</span>
              <span className="text-sm">{toToken.amount.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">New Position Size</span>
              <span className="text-sm">{toPosition.size.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Current Position Value</span>
              <span className="text-sm">${(toToken.amount * (toToken.price || 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">New Position Value</span>
              <span className="text-sm">${toPosition.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            
            {isStablecoin(toToken.symbol) && getBondInfo(toToken) && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Bond</span>
                <span className="text-sm text-primary">{getBondInfo(toToken)?.bond}</span>
              </div>
            )}
            
            {isStablecoin(toToken.symbol) && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Next Maturity Date</span>
                <span className="text-sm">{getNextMaturityDate()}</span>
              </div>
            )}
            
            {/* Show more details link */}
            <div className="pt-2 flex justify-end">
              {isStablecoin(toToken.symbol) ? (
                <Link href={`/coin/${toToken.id}`} className="text-xs text-primary flex items-center gap-1 hover:underline">
                  Show more details <ArrowRight className="h-3 w-3" />
                </Link>
              ) : (
                <a 
                  href={`https://solscan.io/token/${toToken.id}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary flex items-center gap-1 hover:underline"
                >
                  View on Solscan <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
          
          {/* Mini chart */}
          <div className="mt-4 h-16">
            <MiniChart
              height={64}
              color="#00c2cb"
              trend="up"
            />
          </div>
        </div>
      )}
    </div>
  );
}