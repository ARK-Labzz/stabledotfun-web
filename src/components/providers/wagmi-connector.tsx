"use client";

import React from "react";
import {
  DynamicEmbeddedWidget,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";
import Image from "next/image";

export default function WagmiConnector({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogged = useIsLoggedIn();
  return (
    <WagmiProvider config={config}>
      <DynamicWagmiConnector>
        <div className="relative">
          {!isLogged && (
            <div className="fixed z-40 w-screen h-screen bg-secondary/70 backdrop-blur-md flex items-center justify-center">
              {/* background can be none, default or with-border */}
              <div className="lg:w-1/3 bg-secondary/90 border border-white/50 rounded-2xl p-8 gap-6 flex flex-col items-center">
                <Image
                  src={"/stable-fun-logo.svg"}
                  alt="Logo"
                  width={140}
                  height={34}
                  priority
                  className="w-[200px]"
                />

                <div className="flex flex-col gap-2 items-center mb-4">
                  <div className="text-xl">
                    Welcome to{" "}
                    <span className="text-primary font-medium">Stable.fun</span>
                  </div>
                  <p className="text-xs font-light">
                    You are a step away from using our platform
                  </p>
                </div>
                <DynamicEmbeddedWidget
                  background="none"
                  className="text-white"
                  style={{ color: "white" }}
                />
              </div>
            </div>
          )}
          {children}
        </div>
      </DynamicWagmiConnector>
    </WagmiProvider>
  );
}
