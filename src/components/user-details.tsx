"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { cn } from "@/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  // Edit,
  LucideArrowDownRight,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { useSidebar } from "./ui/sidebar";

interface UserDetailsProp {
  className?: string;
  username: string;
}

export default function UserDetails({ username, className }: UserDetailsProp) {
  const { connected, publicKey, balance } = useWallet();
  const { isMobile } = useSidebar();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, isMobile ? 25 : 15)}...`;
  };

  const handleCopy = () => {
    if (publicKey) navigator.clipboard.writeText(publicKey);
    toast("Address Copied!");
  };

  const portfolioChange = 7.69;

  if (!connected) return null;
  return (
    <div
      className={cn(
        "flex flex-col gap-1 bg-white/5 rounded-2xl p-4 border border-secondary/30",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-20 h-20 rounded-full bg-secondary/30 border-2 border-secondary flex items-center justify-center">
          <Image
            src="/profile.png"
            alt="Avatar"
            width={87}
            height={87}
            className="w-16 h-16 rounded-full border-2 border-primary"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="p-2 border bg-white/5 items-center justify-center text-xs text-white/30 border-secondary/50 flex flex-1 gap-2 rounded-full truncate">
            {truncateAddress(publicKey || "")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleCopy}
            >
              <path
                d="M3.54379 0H8.7639C9.25949 0 9.6681 -6.1133e-09 10.0012 0.0270769C10.3467 0.0557949 10.665 0.116513 10.9637 0.268308C11.4268 0.5043 11.8034 0.880852 12.0394 1.344C12.192 1.64267 12.2527 1.96103 12.2806 2.30646C12.3077 2.63959 12.3077 3.0482 12.3077 3.54379V3.69231H12.6359C13.0486 3.69231 13.3891 3.69231 13.6673 3.71118C13.9561 3.73087 14.2236 3.77354 14.4804 3.87938C14.7792 4.00309 15.0506 4.18444 15.2792 4.41308C15.5079 4.64171 15.6892 4.91316 15.8129 5.2119C15.9196 5.46872 15.9606 5.73621 15.9811 6.02421C16 6.30318 16 6.64369 16 7.05559V7.09826C16 7.51015 16 7.85067 15.9811 8.12882C15.9693 8.39501 15.917 8.65785 15.8261 8.90831C15.3528 10.5213 14.4883 11.9923 13.3093 13.1905C12.1303 14.3886 10.6734 15.2768 9.06831 15.776L8.91323 15.8244C8.66162 15.9174 8.39687 15.97 8.12882 15.9803C7.84985 16 7.51015 16 7.09826 16H7.05559C6.64369 16 6.30318 16 6.02503 15.9811C5.73621 15.9614 5.46872 15.9188 5.2119 15.8129C4.91316 15.6892 4.64171 15.5079 4.41308 15.2792C4.18444 15.0506 4.00309 14.7792 3.87938 14.4804C3.77272 14.2236 3.73169 13.9561 3.71118 13.6681C3.69231 13.3891 3.69231 13.0486 3.69231 12.6367V12.3077H3.54462C3.04903 12.3077 2.63959 12.3077 2.30646 12.2806C1.96103 12.2519 1.64267 12.192 1.344 12.0394C0.880852 11.8034 0.5043 11.4268 0.268308 10.9637C0.116513 10.665 0.0549744 10.3467 0.0270769 10.0012C-6.1133e-09 9.6681 0 9.25949 0 8.7639V3.54379C0 3.0482 -6.1133e-09 2.63959 0.0270769 2.30646C0.0557949 1.96103 0.116513 1.64267 0.268308 1.344C0.5043 0.880852 0.880852 0.5043 1.344 0.268308C1.64267 0.116513 1.96103 0.0549744 2.30646 0.0270769C2.63959 -6.1133e-09 3.0482 0 3.54379 0ZM4.92308 12.6154C4.92308 13.0535 4.92308 13.3522 4.93949 13.5836C4.95426 13.8101 4.98297 13.9274 5.01662 14.0094C5.07847 14.1588 5.16914 14.2945 5.28346 14.4088C5.39778 14.5232 5.5335 14.6138 5.68287 14.6757C5.76492 14.7093 5.88226 14.7381 6.10872 14.7528C6.3401 14.7692 6.63877 14.7692 7.07692 14.7692C7.51508 14.7692 7.81374 14.7692 8.04513 14.7528C8.27159 14.7381 8.38892 14.7093 8.47097 14.6757C8.62035 14.6138 8.75607 14.5232 8.87038 14.4088C8.9847 14.2945 9.07538 14.1588 9.13723 14.0094C9.17087 13.9274 9.19877 13.8101 9.21436 13.5836C9.23077 13.3522 9.23077 13.0535 9.23077 12.6154V12.5941C9.23077 12.1822 9.23077 11.8416 9.24964 11.5635C9.26933 11.2747 9.312 11.0072 9.41785 10.7504C9.54155 10.4516 9.7229 10.1802 9.95154 9.95154C10.1802 9.7229 10.4516 9.54155 10.7504 9.41785C11.0072 9.31118 11.2747 9.27015 11.5627 9.24964C11.8416 9.23077 12.1822 9.23077 12.5941 9.23077H12.6154C13.0535 9.23077 13.3522 9.23077 13.5836 9.21436C13.8101 9.19877 13.9274 9.17087 14.0094 9.13723C14.1588 9.07538 14.2945 8.9847 14.4088 8.87038C14.5232 8.75607 14.6138 8.62035 14.6757 8.47097C14.7093 8.38892 14.7381 8.27159 14.7528 8.04513C14.7692 7.81374 14.7692 7.51508 14.7692 7.07692C14.7692 6.63877 14.7692 6.3401 14.7528 6.10872C14.7381 5.88226 14.7093 5.76492 14.6757 5.68287C14.6138 5.5335 14.5232 5.39778 14.4088 5.28346C14.2945 5.16914 14.1588 5.07847 14.0094 5.01662C13.9274 4.98297 13.8101 4.95426 13.5836 4.93949C13.3522 4.92308 13.0535 4.92308 12.6154 4.92308H7.26154C6.73477 4.92308 6.37538 4.92308 6.09887 4.94605C5.82892 4.96821 5.69108 5.00841 5.59508 5.05682C5.36329 5.17485 5.17485 5.36329 5.05682 5.59508C5.00759 5.69108 4.96821 5.82892 4.94605 6.09887C4.9239 6.37621 4.92308 6.73477 4.92308 7.26154V12.6154Z"
                fill="#7FCDD3"
              />
            </svg>
          </div>
          <div className="text-xs flex flex-1 items-center justify-between">
            <div className="text-white/30">Username</div>
            <div className="flex gap-2 text-primary/40 font-medium">
              {username}
              {/* <Button variant={"link"} className="w-0 h-0 p-0 text-xs">
                <Edit className="w-1 h-1 text-primary" />
              </Button> */}
            </div>
          </div>
          <div className="text-xs flex flex-1 items-center justify-between">
            <div className="text-white/30">Portfolio</div>
            <div
              className={cn(
                "text-white flex gap-1 items-center font-medium text-sm py-1 px-2 rounded-md",
                portfolioChange > 0 ? "bg-secondary" : "bg-red-600/30"
              )}
            >
              {portfolioChange > 0
                ? "+" + Math.abs(portfolioChange)
                : "-" + Math.abs(portfolioChange)}
              %
              <span
                className={cn(
                  "p-1 rounded-md",
                  portfolioChange > 0 ? "bg-secondary/50" : "bg-red-600/30"
                )}
              >
                {portfolioChange > 0 ? (
                  <ArrowUpRight className="w-3 h-3 text-primary" />
                ) : (
                  <LucideArrowDownRight className="w-3 h-3 text-red-400" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-primary items-center p-3 border rounded-lg gap-3 mb-4 bg-white/5 text-xs border-primary/50 flex flex-1 justify-between">
        <Badge
          variant={"outline"}
          className="border-primary text-primary py-1 pointer-events-none select-none"
        >
          Balance
        </Badge>
        <div className="text-xl font-bold truncate">
          $
          {Number(balance || 0).toLocaleString("en", {
            maximumFractionDigits: 3,
          })}
        </div>
      </div>

      <div className="flex flex-1 justify-between items-center gap-3">
        <Button
          variant={"outline"}
          className="cursor-pointer flex-1 border-primary border"
        >
          <ArrowUpRight className="w-4 h-4" /> Withdraw
        </Button>

        <Button variant={"secondary"} className="cursor-pointer flex-1">
          <ArrowDownLeft className="w-4 h-4" /> Deposit
        </Button>
      </div>
    </div>
  );
}
