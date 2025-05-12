"use client";

import React from "react";
import Image from "next/image";
import { useCreateCoin } from "@/app/create/components/create-context";

interface PreviewWindowProps {
  className?: string;
}

const PreviewWindow = ({ className }: PreviewWindowProps) => {
  const { ticker, name, fiat, logo, isCToken, bond, apy, supply } = useCreateCoin();

  return (
    <div className={`w-full lg:w-80 h-full ${className}`}>
      <div className="h-full bg-[rgba(255,255,255,0.05)] border-gray-600/10 border-[2px] space-y-6 rounded-lg p-4">
        <div className="text-sm text-gray-400 text-center font-medium mb-4">
          Preview
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* Token Logo */}
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
            {logo ? (
              <Image
                src={logo}
                alt={name || "Token Logo"}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-xs text-center">
                Logo Preview
              </div>
            )}
          </div>

          {/* Token Info */}
          <div className="w-full space-y-4 bg-[#051016] rounded-lg p-4 border border-primary/20">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Name</span>
              <span className="text-sm font-medium">{name || "Token Name"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Ticker</span>
              <span className="text-sm font-medium">{ticker ? `${ticker}s` : "XXXs"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Bond</span>
              <span className="text-sm font-medium text-primary">{bond || "Select fiat currency"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Supply</span>
              <span className="text-sm font-medium">{supply !== undefined ? supply.toLocaleString() : "0"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">APY</span>
              <span className="text-sm font-medium text-primary">{apy ? `${apy}%` : "Select fiat currency"}</span>
            </div>

            {/* cToken Badge */}
            {isCToken && (
              <div className="mt-2 text-xs text-center">
                <span className="px-2 py-1 bg-primary/10 rounded-full text-primary">
                  Compressed Token
                </span>
              </div>
            )}
          </div>

          {/* Fiat Currency/Country Info */}
          {fiat && (
            <div className="w-full p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={fiat.icon || "/placeholder.svg"}
                    alt={fiat.name}
                    width={20}
                    height={20}
                    className="rounded-full bg-white/5"
                  />
                  <span className="text-sm">{fiat.name}</span>
                </div>
                <div className="text-xs bg-white/5 border border-white/10 py-1 px-2 rounded-lg">
                  {fiat.country || fiat.fiat}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewWindow;