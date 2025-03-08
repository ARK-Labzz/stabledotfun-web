"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  connected: boolean
  publicKey: string | null
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  connect: () => {},
  disconnect: () => {},
})

export const useWallet = () => useContext(WalletContext)

// Mock wallet provider for demonstration
export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)

  // Check if wallet was previously connected
  useEffect(() => {
    const savedWalletState = localStorage.getItem("walletConnected")
    if (savedWalletState === "true") {
      setConnected(true)
      setPublicKey("Cs1tBHsL5KcQybQqywKFQ5qWfUEdfX2copkPH7UBCNKL")
    }
  }, [])

  const connect = () => {
    // Mock connection - in a real app, this would use Solana wallet adapter
    setConnected(true)
    setPublicKey("Cs1tBHsL5KcQybQqywKFQ5qWfUEdfX2copkPH7UBCNKL")
    localStorage.setItem("walletConnected", "true")
  }

  const disconnect = () => {
    setConnected(false)
    setPublicKey(null)
    localStorage.removeItem("walletConnected")
  }

  return (
    <WalletContext.Provider value={{ connected, publicKey, connect, disconnect }}>{children}</WalletContext.Provider>
  )
}

