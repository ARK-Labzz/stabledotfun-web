"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  LogOut,
  Wallet,
  ExternalLink,
  Copy,
  X,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import NotificationsModal from "./notifications-modal";
import { toast } from "sonner";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const { isMobile } = useSidebar();

  const toggleMobileSearch = () => {
    setIsMobileSearch(!isMobileSearch);
  };

  return (
    <header className="fixed lg:sticky top-0 z-30 bg-sidebar">
      <div className="flex items-center justify-between p-4">
        {/* Left Section: Sidebar trigger, product selector, search */}
        <div className="flex flex-1 items-center gap-2 lg:gap-6 pr-4">
          {/* Sidebar Trigger (desktop only) */}
          <SidebarTrigger className="hidden lg:flex" />
          
          {/* Product Selector (Stablecoin/Lending) */}
          <div className={cn(
            "flex items-center gap-2 p-1.5 border border-primary/20 bg-white/5 rounded-lg lg:rounded-2xl",
            isMobileSearch ? "flex-shrink-0" : "flex-shrink"
          )}>
            {/* Stablecoin Button */}
            <span className={cn(
              "font-semibold flex gap-1 p-2 border border-primary/5 lg:border-primary/80 bg-white/5 hover:border-primary rounded-md lg:rounded-lg",
              isMobileSearch ? "text-[0px]" : "text-[10px] lg:text-xs"
            )}>
              <span className={isMobileSearch ? "block" : "inline"}>Stablecoin</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0944 8.76196V11.0477C14.0944 12.0382 11.7066 13.3334 8.76107 13.3334C5.81554 13.3334 3.42773 12.0382 3.42773 11.0477V9.14292"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.65137 9.34009C4.31041 10.2148 6.34851 11.0353 8.7607 11.0353C11.7062 11.0353 14.094 9.81171 14.094 8.76028C14.094 8.1698 13.342 7.52294 12.1618 7.06885"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.8092 4.95239V7.23811C11.8092 8.22858 9.42144 9.52382 6.47591 9.52382C3.53039 9.52382 1.14258 8.22858 1.14258 7.23811V4.95239"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.47591 7.22599C9.42144 7.22599 11.8092 6.00237 11.8092 4.95094C11.8092 3.89951 9.42144 2.66675 6.47591 2.66675C3.53039 2.66675 1.14258 3.89875 1.14258 4.95094C1.14258 6.00237 3.53039 7.22599 6.47591 7.22599Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            {/* Lending Button (Coming Soon) */}
            <span className={cn(
              "text-white opacity-30 flex gap-1 px-1.5",
              isMobileSearch ? "text-[0px]" : "text-[10px] lg:text-xs"
            )}>
              <span className={isMobileSearch ? "hidden" : "inline"}>Lending</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00562 3.58626C8.03364 3.19824 8.16179 2.8241 8.37756 2.50039C8.59332 2.17667 8.88934 1.91443 9.23671 1.73926C9.58408 1.5641 9.97094 1.482 10.3595 1.50097C10.7481 1.51994 11.1251 1.63934 11.4537 1.84751C11.4913 1.8721 11.5216 1.90635 11.5414 1.94667C11.5611 1.98699 11.5697 2.03189 11.5661 2.07665C11.5625 2.12141 11.5469 2.16438 11.521 2.20104C11.4951 2.23771 11.4598 2.26671 11.4187 2.28501C10.8474 2.54206 10.3625 2.95857 10.0221 3.48453C9.68172 4.01049 9.50044 4.62353 9.5 5.25001C9.5 5.32314 9.5 5.39626 9.5075 5.46814C9.51095 5.51357 9.50191 5.55907 9.48137 5.59974C9.46084 5.64041 9.42957 5.67469 9.39097 5.69889C9.35236 5.72308 9.30788 5.73626 9.26233 5.73701C9.21677 5.73776 9.17188 5.72605 9.1325 5.70314C8.76417 5.49245 8.46292 5.18191 8.26353 4.80734C8.06414 4.43278 7.97473 4.00946 8.00562 3.58626ZM15 10.0381C15.0009 10.3238 14.9217 10.6041 14.7715 10.8471C14.6213 11.0901 14.406 11.2862 14.15 11.4131L14.1225 11.4256L11.6956 12.4594C11.6716 12.4699 11.6467 12.4783 11.6213 12.4844L7.62125 13.4844C7.58162 13.4945 7.5409 13.4998 7.5 13.5H1C0.734784 13.5 0.48043 13.3947 0.292893 13.2071C0.105357 13.0196 0 12.7652 0 12.5V10C0 9.73479 0.105357 9.48044 0.292893 9.2929C0.48043 9.10537 0.734784 9.00001 1 9.00001H2.79312L4.20687 7.58564C4.39225 7.39943 4.61269 7.2518 4.85546 7.15128C5.09822 7.05077 5.3585 6.99935 5.62125 7.00001H8.75C9.01411 6.99998 9.2748 7.05973 9.51253 7.17478C9.75026 7.28984 9.95887 7.4572 10.1227 7.66434C10.2866 7.87148 10.4014 8.11302 10.4586 8.37086C10.5158 8.62869 10.514 8.89613 10.4531 9.15314L13.0681 8.55189C13.2958 8.4916 13.5342 8.48439 13.7651 8.53082C13.996 8.57725 14.2131 8.67607 14.3998 8.81966C14.5864 8.96326 14.7376 9.1478 14.8417 9.35905C14.9457 9.57031 14.9999 9.80264 15 10.0381ZM14 10.0381C13.9999 9.95547 13.9808 9.87392 13.9441 9.79984C13.9074 9.72575 13.8542 9.66112 13.7885 9.61094C13.7227 9.56077 13.6464 9.52641 13.5652 9.51054C13.4841 9.49466 13.4004 9.49769 13.3206 9.51939L13.3013 9.52439L9.11375 10.4875C9.07702 10.4957 9.03951 10.4999 9.00187 10.5H7C6.86739 10.5 6.74021 10.4473 6.64645 10.3536C6.55268 10.2598 6.5 10.1326 6.5 10C6.5 9.8674 6.55268 9.74023 6.64645 9.64646C6.74021 9.55269 6.86739 9.50001 7 9.50001H8.75C8.94891 9.50001 9.13968 9.42099 9.28033 9.28034C9.42098 9.13969 9.5 8.94892 9.5 8.75001C9.5 8.5511 9.42098 8.36033 9.28033 8.21968C9.13968 8.07903 8.94891 8.00001 8.75 8.00001H5.62125C5.48988 7.99959 5.35974 8.02529 5.23839 8.07561C5.11703 8.12593 5.0069 8.19987 4.91437 8.29314L3.5 9.70689V12.5H7.4375L11.3394 11.5244L13.7144 10.5131C13.8008 10.4676 13.8731 10.3992 13.9235 10.3155C13.9738 10.2318 14.0003 10.1358 14 10.0381ZM10.5 5.25001C10.5 5.69502 10.632 6.13003 10.8792 6.50004C11.1264 6.87005 11.4778 7.15844 11.889 7.32874C12.3001 7.49904 12.7525 7.5436 13.189 7.45678C13.6254 7.36996 14.0263 7.15567 14.341 6.841C14.6557 6.52633 14.87 6.12542 14.9568 5.68896C15.0436 5.25251 14.999 4.80011 14.8287 4.38897C14.6584 3.97784 14.37 3.62644 14 3.3792C13.63 3.13197 13.195 3.00001 12.75 3.00001C12.1533 3.00001 11.581 3.23706 11.159 3.65902C10.7371 4.08098 10.5 4.65327 10.5 5.25001Z"
                  fill="white"
                />
              </svg>
              {/* Coming Soon tag */}
              {!isMobileSearch && (
                <span className="text-[6px] lg:text-[7px] text-white px-1 py-0.5 bg-secondary/80 flex items-center rounded-xs">
                  Coming Soon
                </span>
              )}
            </span>
          </div>

          {/* Search Bar */}
          <div className={cn(
            "relative flex-1 border border-primary/10 rounded-lg h-11 lg:h-auto p-2 bg-white/5 lg:bg-transparent lg:border-none",
            isMobileSearch ? "w-full transition-all duration-300" : "w-[80px] lg:w-[500px]"
          )}>
            {/* Search Icon */}
            <div
              className={cn(
                "absolute inset-y-0 top-1/2 flex items-center",
                isMobileSearch ? "left-3 -translate-y-1/2" : "left-1/2 -translate-x-1/2 lg:left-7 -translate-y-1/2 lg:-translate-x-0",
                isMobile ? "cursor-pointer" : "pointer-events-none"
              )}
              onClick={() => isMobile && toggleMobileSearch()}
            >
              <Search size={16} className="text-gray-500" />
            </div>
            
            {/* Search Input Field */}
            <div
              className={cn(
                isMobileSearch 
                  ? "relative flex items-center w-full"
                  : "hidden lg:flex lg:relative lg:top-0 lg:p-0 lg:backdrop-blur-none lg:bg-transparent items-center"
              )}
            >
              <input
                type="text"
                placeholder="Search for stablecoins or traders"
                className="w-full h-9 pl-10 pr-4 rounded-lg lg:rounded-full text-xs border border-white/10 bg-white/5 focus:outline-none focus:ring-1 focus:ring-teal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {/* Close Button (mobile search) */}
              {isMobileSearch && isMobile && (
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                  onClick={toggleMobileSearch}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Notifications and Wallet Connection */}
        <div className="flex items-center gap-2">
          {/* Notifications Modal Component */}
          <NotificationsModal />
          
          {/* Wallet Connect Button (desktop only) */}
          <ConnectButton className="hidden lg:flex" />
        </div>
      </div>
      
      {/* Decorative Gradient Line */}
      <div className="flex overflow-hidden">
        <svg
          height="1"
          viewBox="0 0 1751 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <line
            y1="0.5"
            x2="1751"
            y2="0.5"
            stroke="url(#paint0_linear_120_492)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_120_492"
              x1="0"
              y1="1.5"
              x2="1751"
              y2="1.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="0.129" stopColor="#00BCD4" />
              <stop offset="1" stopColor="#CCCCCC" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </header>
  );
}

/**
 * Wallet Connect Button Component
 */
function ConnectButton({ className }: { className?: string }) {
  const { connected, publicKey, connect, username } = useWallet();
  const { logout, user } = useAuth();

  // Truncate wallet address for display
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Copy wallet address to clipboard
  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast("Address copied to clipboard!");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {connected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={cn(
                "flex items-center gap-3 cursor-pointer bg-white/5 border border-white/10 hover:bg-secondary p-1 lg:px-2 lg:py-1 rounded-4xl transition-colors",
                className
              )}
            >
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 p-0.5 flex items-center justify-center">
                {user?.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt="Avatar"
                    height={32}
                    width={32}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder on error
                      (e.target as HTMLImageElement).src = "/placeholder.svg?height=32&width=32";
                    }}
                  />
                ) : (
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="Avatar"
                    height={24}
                    width={24}
                    className="w-6 h-6 rounded-full"
                  />
                )}
              </div>
              
              {/* Display Username or Truncated Address (medium screens+) */}
              <div className="hidden md:flex items-center gap-1">
                <span className="text-sm font-medium text-primary">
                  {username ? `@${username}` : (publicKey ? truncateAddress(publicKey) : "@user")}
                </span>
                <ChevronDown size={14} />
              </div>
            </div>
          </DropdownMenuTrigger>
          
          {/* Wallet Dropdown Menu */}
          <DropdownMenuContent
            align="end"
            className="w-64 border-white/10 bg-secondary"
          >
            <DropdownMenuLabel className="font-bold text-white">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/50" />
            
            {/* User Info */}
            {username && (
              <div className="px-2 py-1">
                <div className="text-xs text-white/80 mb-1">Username</div>
                <div className="text-sm text-white">@{username}</div>
              </div>
            )}
            
            {/* Wallet Address Display */}
            {publicKey && (
              <div className="px-2 py-1">
                <div className="text-xs text-white/80 mb-1">
                  Wallet Address
                </div>
                <div className="flex items-center justify-between bg-primary/30 rounded-md p-2 text-sm">
                  <span className="truncate text-gray-200">{publicKey}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-1 text-white/80 hover:text-white"
                    onClick={handleCopy}
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
            )}
            
            <DropdownMenuSeparator className="bg-white/50" />
            
            {/* Profile Link */}
            <DropdownMenuItem
              className="cursor-pointer text-white/80 hover:bg-secondary hover:text-white"
              asChild
            >
              <Link href="/profile">
                <User className="mr-2 h-4 w-4 text-white/50" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            
            {/* View on Explorer Link */}
            {publicKey && (
              <DropdownMenuItem
                className="cursor-pointer text-white/80 hover:bg-secondary hover:text-white"
                asChild
              >
                <Link
                  href={`https://solscan.io/account/${publicKey}`}
                  target="_blank"
                >
                  <ExternalLink className="mr-2 h-4 w-4 text-white/50" />
                  <span>View on Explorer</span>
                </Link>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator className="bg-white/50" />
            
            {/* Logout Button */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4 text-red-500" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={connect}
          variant="outline"
          size="sm"
          className="ml-2 bg-secondary/60 border-teal text-teal hover:bg-teal hover:text-white transition-colors flex items-center gap-2"
        >
          <Wallet size={16} />
          <span>Connect Wallet</span>
        </Button>
      )}
    </>
  );
}