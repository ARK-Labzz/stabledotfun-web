"use client";

import React from 'react'
import { useWallet } from "@/hooks/use-wallet";

export default function UsernameBlock() {
  const { username } = useWallet();

  return (
    <div className="text-xs text-gray-400">
      Welcome,{" "}
      <span className="text-primary">{username ? username : "user"}</span>
    </div>
  );
}
