"use client";

import { TradeWindowToken } from "@/types";
import { createContext, useContext, type ReactNode } from "react";
import React from "react";

interface CreateContextType {
  ticker: string | null;
  name: string | null;
  logo: string | null;
  fiat: TradeWindowToken | null;
  set: (
    ticker: string | null,
    name: string | null,
    logo: string | null,
    fiat: TradeWindowToken | null
  ) => void;
}

const CreateContext = createContext<CreateContextType>({
  ticker: null,
  name: null,
  fiat: null,
  logo: null,
  set: () => {},
});

export const useCreateCoin = () => useContext(CreateContext);

interface CreateProp {
  ticker: string | null;
  name: string | null;
  logo: string | null;
  fiat: TradeWindowToken | null;
}

export default function CreateProvider({ children }: { children: ReactNode }) {
  const [data, setData] = React.useState<CreateProp | null>({
    ticker: null,
    name: null,
    fiat: null,
    logo: null,
  });

  React.useEffect(() => {
    const savedCreateAsset = localStorage.getItem("createAsset");

    if (savedCreateAsset) {
      const output: CreateProp = JSON.parse(savedCreateAsset);
      setData({ ...output });
    }
  }, []);
  const set = (
    ticker: string | null,
    name: string | null,
    logo: string | null,
    fiat: TradeWindowToken | null
  ) => {
    setData((prev) => {
      const updatedData = { ticker, name, logo, fiat };
      if (JSON.stringify(prev) !== JSON.stringify(updatedData)) {
        localStorage.setItem("createAsset", JSON.stringify(updatedData));
        return updatedData;
      }
      return prev;
    });
  };

  return (
    <CreateContext.Provider
      value={{
        ticker: data?.ticker ?? null,
        name: data?.name ?? null,
        logo: data?.logo ?? null,
        fiat: data?.fiat ?? null,
        set,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
}
