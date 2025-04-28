"use client";

import { useWallet } from "@/hooks/use-wallet";
import { AssetProp } from "@/types";
import Image from "next/image";
import React from "react";

interface AssetInfoProp extends Partial<AssetProp> {
  ticker: string;
  price: number;
}

export default function AssetInfo({
  image = "/placeholder.svg",
  ticker,
  fiat,
  supply = 0,
  tvl = 0,
  interest = 0,
  liquidity = 0,
  price = 0,
}: AssetInfoProp) {
  const { username } = useWallet();

  const pricePerToken = price * supply;
  return (
    <div className="rounded-xl border border-primary/30 p-4 bg-white/5 flex flex-col flex-1 gap-8">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-zinc-600/10 rounded-xl overflow-hidden">
            <Image
              src={image}
              height={40}
              width={40}
              className="h-10 w-10"
              alt={ticker}
            />
          </div>
          <div className="">
            <p className="text-xs text-gray-400">
              Issued by{" "}
              <span className="text-primary">
                {username ? username : "cre8tivebuka"}
              </span>
            </p>
            <p>
              {ticker ? ticker + "s" : "MXNs"} ({fiat ? fiat : "CETES"})
            </p>
          </div>
        </div>
        <div>
          <Image
            src="/info.svg"
            className="h-10 w-10 "
            height={100}
            width={100}
            alt="more info"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 text-xs">
        <div className="text-white/50 flex justify-between">
          Circulating Supply{" "}
          <span className="text-primary/80">
            {ticker}{" "}
            {supply.toLocaleString("en", {
              maximumFractionDigits: 6,
              minimumFractionDigits: 0,
              compactDisplay: "long",
            })}
          </span>
        </div>
        <div className="text-white/50 flex justify-between">
          Total Value Locked{" "}
          <span className="text-primary/80">
            {ticker}{" "}
            {tvl.toLocaleString("en", {
              maximumFractionDigits: 6,
              minimumFractionDigits: 0,
              compactDisplay: "long",
            })}
          </span>
        </div>
        <div className="text-white/50 flex justify-between">
          Price Per Token{" "}
          <span className="text-primary/80">
            {ticker}{" "}
            {pricePerToken.toLocaleString("en", {
              maximumFractionDigits: 6,
              minimumFractionDigits: 0,
              compactDisplay: "long",
            })}
          </span>
        </div>
        <div className="text-white/50 flex justify-between">
          Current Buy Liquidity{" "}
          <span className="text-primary/80">
            {liquidity.toLocaleString("en", {
              maximumFractionDigits: 6,
              minimumFractionDigits: 0,
              compactDisplay: "long",
            })}
          </span>
        </div>
        <div className="text-white/50 flex justify-between">
          Interest rate{" "}
          <span className="text-white p-2 bg-secondary/80 rounded-lg">
            {interest.toLocaleString("en", {
              maximumFractionDigits: 6,
              minimumFractionDigits: 0,
              compactDisplay: "long",
            })}
            {"% "}
            APY
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/30 p-4 bg-white/5 flex flex-1 gap-3 items-center">
        <span className="text-primary border border-primary py-1 px-2 rounded-lg capitalize text-xs justify-between">
          Current Price
        </span>
        <span className="text-lg flex flex-1 justify-center truncate text-primary">
          $
          {price.toLocaleString("en", {
            maximumFractionDigits: 8,
            minimumFractionDigits: 0,
            compactDisplay: "long",
          })}
        </span>
      </div>
    </div>
  );
}
