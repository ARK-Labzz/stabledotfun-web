"use client";

import { TradeWindowToken } from "@/types";
import { createContext, useContext, type ReactNode } from "react";
import React from "react";

interface RedeemContextType {
  from: TradeWindowToken | null;
  to: TradeWindowToken | null;
  amount: number;
  set?: (from: TradeWindowToken, to: TradeWindowToken, amount: number) => void;
}

const RedeemContext = createContext<RedeemContextType>({
  from: null,
  to: null,
  amount: 0,
  set: () => {},
});

export const useRedeem = () => useContext(RedeemContext);

export default function RedeemProvider({ children }: { children: ReactNode }) {
  const [from, setFrom] = React.useState<TradeWindowToken | null>(null);
  const [to, setTo] = React.useState<TradeWindowToken | null>(null);
  const [amount, setAmount] = React.useState<number>(0);

  React.useEffect(() => {
    const savedRedeemAsset = localStorage.getItem("redeemAsset");

    if (savedRedeemAsset) {
      const output: RedeemContextType = JSON.parse(savedRedeemAsset);
      setFrom(output.from);
      setTo(output.to);
      setAmount(output.amount);
    }
  }, [setFrom]);

  const set = (
    from: TradeWindowToken,
    to: TradeWindowToken,
    amount: number
  ) => {
    setFrom(from);
    setTo(to);
    setAmount(amount);
    localStorage.setItem("redeemAsset", JSON.stringify({ from, to, amount }));
  };

  return (
    <RedeemContext.Provider value={{ from, to, amount, set }}>
      {children}
    </RedeemContext.Provider>
  );
}
