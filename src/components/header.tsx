"use client"

import { useState } from "react"
import { Search, Settings, Bell, ChevronDown, LogOut, User, Wallet, ExternalLink, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const { connected, publicKey, connect, disconnect } = useWallet()

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border/20 bg-sidebar p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span className="font-semibold">Stablecoin</span>
            <span className="text-xs px-2 py-1 rounded-md bg-secondary text-gray-400">
              Landing
              <span className="ml-1 text-[10px] text-gray-500">Coming Soon</span>
            </span>
          </div>

          <div className="relative flex-1 md:w-[500px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search for stablecoins or traders"
              className="w-full h-9 pl-10 pr-4 rounded-full bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-teal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-secondary">
            <Settings size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-secondary">
            <Bell size={18} />
          </Button>

          {connected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 ml-2 cursor-pointer bg-secondary/60 hover:bg-secondary px-2 py-1 rounded-md transition-colors">
                  <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center">
                    <Image src="/placeholder.svg?height=32&width=32" alt="Avatar" height={24} width={24} className="w-6 h-6 rounded-full" />
                  </div>
                  <div className="hidden md:flex items-center gap-1">
                    <span className="text-sm font-medium">
                      {publicKey ? truncateAddress(publicKey) : "@cre8tivebuka"}
                    </span>
                    <ChevronDown size={14} />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-card border-border">
                <DropdownMenuLabel className="font-bold text-white">My Wallet</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1">
                  <div className="text-xs text-gray-100 mb-1">Connected Address</div>
                  <div className="flex items-center justify-between bg-secondary/60 rounded-md p-2 text-sm">
                    <span className="truncate text-gray-200">{publicKey}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 text-gray-100 hover:text-white">
                      <Copy size={14} />
                    </Button>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-gray-100 hover:bg-secondary hover:text-white">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-100 hover:bg-secondary hover:text-white">
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Wallet</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-gray-100 hover:bg-secondary hover:text-white">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>View on Explorer</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={disconnect}
                  className="cursor-pointer text-red-500 hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Disconnect</span>
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
        </div>
      </div>
    </header>
  )
}

