"use client";

import { TradeWindowToken } from "@/types";
import { createContext, useContext, type ReactNode } from "react";
import React from "react";

interface SwapContextType {
  fromToken: TradeWindowToken | null;
  toToken: TradeWindowToken | null;
  fromAmount: string;
  toAmount: string;
  rate: number | null;
  lastUpdated: Date | null;
  set: (
    fromToken: TradeWindowToken | null,
    toToken: TradeWindowToken | null,
    fromAmount: string,
    toAmount: string,
    rate?: number | null
  ) => void;
  switchTokens: () => void;
  updateRate: () => void;
}

const SwapContext = createContext<SwapContextType>({
  fromToken: null,
  toToken: null,
  fromAmount: "",
  toAmount: "",
  rate: null,
  lastUpdated: null,
  set: () => {},
  switchTokens: () => {},
  updateRate: () => {},
});

export const useSwap = () => useContext(SwapContext);

export default function SwapProvider({ children }: { children: ReactNode }) {
  const [fromToken, setFromToken] = React.useState<TradeWindowToken | null>(null);
  const [toToken, setToToken] = React.useState<TradeWindowToken | null>(null);
  const [fromAmount, setFromAmount] = React.useState<string>("");
  const [toAmount, setToAmount] = React.useState<string>("");
  const [rate, setRate] = React.useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const savedSwapState = localStorage.getItem("swapState");

    if (savedSwapState) {
      try {
        const parsedState = JSON.parse(savedSwapState);
        setFromToken(parsedState.fromToken);
        setToToken(parsedState.toToken);
        setFromAmount(parsedState.fromAmount || "");
        setToAmount(parsedState.toAmount || "");
        setRate(parsedState.rate || null);
      } catch (error) {
        console.error("Error parsing saved swap state:", error);
      }
    }
  }, []);
  
  // Generate a mock rate between 0.95 and 1.05
  const generateRate = () => {
    if (!fromToken || !toToken) return null;
    
    // Base rates for different token pairs
    const baseRates: Record<string, Record<string, number>> = {
      'USDs': { 'USDC': 1.001, 'BONK': 0.000001 },
      'GBPs': { 'USDC': 1.25, 'BONK': 0.0000012 },
      'MXNs': { 'USDC': 0.058, 'BONK': 0.0000006 },
      'EURs': { 'USDC': 1.09, 'BONK': 0.0000011 },
      'BRLs': { 'USDC': 0.18, 'BONK': 0.0000002 },
    };
    
    // Add slight randomness to the rate
    const getRate = (base: number) => {
      const variation = (Math.random() * 0.02) - 0.01; // -1% to +1%
      return base * (1 + variation);
    };
    
    // If we have a base rate for this pair
    if (baseRates[fromToken.symbol]?.[toToken.symbol]) {
      return getRate(baseRates[fromToken.symbol][toToken.symbol]);
    }
    
    // If we're swapping stablecoins
    if (['USDs', 'GBPs', 'MXNs', 'EURs', 'BRLs'].includes(fromToken.symbol) && 
        ['USDs', 'GBPs', 'MXNs', 'EURs', 'BRLs'].includes(toToken.symbol)) {
      // Use standard FX rates
      const fxRates: Record<string, number> = {
        'USDs': 1.0,
        'GBPs': 1.25,
        'EURs': 1.09,
        'MXNs': 0.058,
        'BRLs': 0.18
      };
      
      const fromValue = fxRates[fromToken.symbol];
      const toValue = fxRates[toToken.symbol];
      
      return getRate(fromValue / toValue);
    }
    
    // Fallback to a reasonable default
    return getRate(1.0);
  };

  const updateRate = () => {
    const newRate = generateRate();
    setRate(newRate);
    setLastUpdated(new Date());
    
    // If we have amounts, recalculate based on new rate
    if (fromAmount && newRate) {
      const newToAmount = (parseFloat(fromAmount) * newRate).toFixed(6);
      setToAmount(newToAmount);
      
    
      localStorage.setItem("swapState", JSON.stringify({
        fromToken,
        toToken,
        fromAmount,
        toAmount: newToAmount,
        rate: newRate
      }));
    }
  };

  // Auto-update rate every 30 seconds
  React.useEffect(() => {
    if (fromToken && toToken) {
      updateRate();
      const interval = setInterval(updateRate, 30000);
      return () => clearInterval(interval);
    }
  }, [fromToken, toToken, updateRate]);

  const set = (
    fromToken: TradeWindowToken | null,
    toToken: TradeWindowToken | null,
    fromAmount: string,
    toAmount: string,
    newRate: number | null = null
  ) => {
    setFromToken(fromToken);
    setToToken(toToken);
    setFromAmount(fromAmount);
    setToAmount(toAmount);
    
    // Only update rate if explicitly provided or tokens changed
    if (newRate !== undefined) {
      setRate(newRate);
      setLastUpdated(new Date());
    } else if (!rate || newRate === null) {
      // If no rate exists or rate is being reset
      const generatedRate = generateRate();
      setRate(generatedRate);
      setLastUpdated(new Date());
    }
    
    localStorage.setItem("swapState", JSON.stringify({
      fromToken,
      toToken,
      fromAmount,
      toAmount,
      rate: newRate || rate
    }));
  };

  const switchTokens = () => {
    if (!fromToken || !toToken) return;
    
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    
    // Swap tokens
    setFromToken(toToken);
    setToToken(tempToken);
    
    // Invert the rate
    let newRate = null;
    if (rate) {
      newRate = 1 / rate;
    }
    
    // Swap and recalculate amounts based on new rate
    if (toAmount && newRate) {
      setFromAmount(toAmount);
      setToAmount(tempAmount);
    } else {
      setFromAmount("");
      setToAmount("");
    }
    
    setRate(newRate);
    setLastUpdated(new Date());
    
 
    localStorage.setItem("swapState", JSON.stringify({
      fromToken: toToken,
      toToken: tempToken,
      fromAmount: toAmount,
      toAmount: tempAmount,
      rate: newRate
    }));
  };

  return (
    <SwapContext.Provider
      value={{
        fromToken,
        toToken,
        fromAmount,
        toAmount,
        rate,
        lastUpdated,
        set,
        switchTokens,
        updateRate
      }}
    >
      {children}
    </SwapContext.Provider>
  );
}