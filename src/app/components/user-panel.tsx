"use client";

import { PayoutTimeline } from "@/components/payout-timeline";
import UserDetails from "@/components/user-details";
import { useWallet } from "@/hooks/use-wallet";
import React from "react";

export default function UserPanel() {
  const { connected, username } = useWallet();

  if (!connected) return null;

  return (
    <div className="w-full lg:w-70 xl:w-75 flex flex-col gap-3">
      <UserDetails username={username || "user"} />
      <PayoutTimeline />
    </div>
  );
}