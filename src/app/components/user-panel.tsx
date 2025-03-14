"use client";

import { PayoutTimeline } from "@/components/payout-timeline";
import UserDetails from "@/components/user-details";
import { useWallet } from "@/hooks/use-wallet";
import React from "react";

export default function UserPanel({ username }: { username: string }) {
  const { connected } = useWallet();

  if (!connected) return null;

  return (
    <div className="w-full lg:w-80 space-y-4 flex flex-col gap-3">
      <UserDetails username={username} />
      <PayoutTimeline />
    </div>
  );
}
