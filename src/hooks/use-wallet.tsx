"use client";

import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  balance: string | null;
  username: string | null;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  balance: null,
  username: null,
  connect: () => {},
  disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

// Mock wallet provider for demonstration
export function WalletProvider({ children }: { children: ReactNode }) {
  const { primaryWallet, handleLogOut, user, setShowAuthFlow } =
    useDynamicContext();
  const isConnected = useIsLoggedIn();
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const wallet = primaryWallet;

  // Check if wallet was previously connected
  useEffect(() => {
    if (isConnected && wallet) {
      setConnected(true);
      setPublicKey(wallet?.address);
    }
  }, [isConnected, wallet]);

  // Fetch the user balance
  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await wallet?.getBalance();
      if (balance) setBalance(balance);
    };

    if (wallet) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 300000); // 300000ms = 5 minutes
      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [wallet]);

  useEffect(() => {
    if (user) {
      const name = user.username as string | null;
      setUsername(name);
    }
  }, [user]);

  const connect = () => {
    setShowAuthFlow(true);
  };

  const disconnect = () => {
    handleLogOut();
    setConnected(false);
    setPublicKey(null);
  };

  return (
    <WalletContext.Provider
      value={{ connected, publicKey, balance, username, connect, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
}
