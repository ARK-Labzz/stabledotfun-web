"use client"

import React from "react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";

export default function WagmiConnector({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <DynamicWagmiConnector>
        <DynamicWidget />
        {children}
      </DynamicWagmiConnector>
    </WagmiProvider>
  );
}
