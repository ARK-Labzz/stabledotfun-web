"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useAuth } from "@/contexts/auth-context";
import { auth } from "@/lib/auth";

// Extended WalletStatus interface to include balance and publicKey
interface ExtendedWalletStatus {
  hasWallet: boolean;
  walletAddress?: string;
  publicKey?: string;
  balance?: number;
  securityMethod?: string;
  exportCount?: number;
  lastExport?: string;
  createdAt?: string;
}

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  balance: string | null;
  username: string | null;
  walletStatus: ExtendedWalletStatus | null;
  isLoading: boolean;
  connect: () => void;
  disconnect: () => void;
  createWallet: (password: string, confirmPassword: string) => Promise<{ success: boolean; message?: string; publicKey?: string }>;
  refreshWalletStatus: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  balance: null,
  username: null,
  walletStatus: null,
  isLoading: false,
  connect: () => {},
  disconnect: () => {},
  createWallet: async () => ({ success: false }),
  refreshWalletStatus: async () => {},
});

export const useWallet = () => useContext(WalletContext);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [walletStatus, setWalletStatus] = useState<ExtendedWalletStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch wallet status from backend
  const refreshWalletStatus = async () => {
    if (!isAuthenticated || !user) return;
    
    setIsLoading(true);
    try {
      const status = await auth.getWalletStatus();
      
      if (status && status.hasWallet) {
        // Create extended wallet status with additional fields
        const extendedStatus: ExtendedWalletStatus = {
          ...status,
          publicKey: status.walletAddress, // Use walletAddress as publicKey
          balance: 0, // Default balance, will be updated below
        };

        setWalletStatus(extendedStatus);
        setConnected(true);
        setPublicKey(status.walletAddress || null);
        
        // Fetch balance from portfolio API
        try {
          const portfolioResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://stabledotfun-backend-js.onrender.com'}/api/portfolio/networth`, {
            credentials: 'include',
          });
          
          if (portfolioResponse.ok) {
            const portfolioData = await portfolioResponse.json();
            const balanceValue = portfolioData.netWorth || 0;
            setBalance(balanceValue.toString());
            
            // Update wallet status with balance
            setWalletStatus(prev => prev ? { ...prev, balance: balanceValue } : null);
          }
        } catch (error) {
          console.error('Failed to fetch portfolio balance:', error);
          setBalance("0");
        }
      } else {
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
        setWalletStatus(status);
      }
    } catch (error) {
      console.error('Failed to fetch wallet status:', error);
      setConnected(false);
      setPublicKey(null);
      setBalance(null);
      setWalletStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Update wallet state when user changes
  useEffect(() => {
    if (user && isAuthenticated) {
      // Set username from user data
      setUsername(user.username || user.displayName || null);
      
      // If user has a wallet address, set it immediately
      if (user.walletAddress) {
        setPublicKey(user.walletAddress);
        setConnected(true);
      }
      
      // Fetch detailed wallet status
      refreshWalletStatus();
    } else {
      // Clear wallet state when user logs out
      setUsername(null);
      setPublicKey(null);
      setConnected(false);
      setBalance(null);
      setWalletStatus(null);
    }
  }, [user, isAuthenticated]);

  // Fetch balance periodically if wallet is connected
  useEffect(() => {
    if (!connected || !publicKey || !isAuthenticated) return;

    const fetchBalance = async () => {
      try {
        const portfolioResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://stabledotfun-backend-js.onrender.com'}/api/portfolio/networth`, {
          credentials: 'include',
        });
        
        if (portfolioResponse.ok) {
          const portfolioData = await portfolioResponse.json();
          const balanceValue = portfolioData.netWorth || 0;
          setBalance(balanceValue.toString());
          
          // Update wallet status with balance
          setWalletStatus(prev => prev ? { ...prev, balance: balanceValue } : null);
        }
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    };

    // Fetch balance immediately
    fetchBalance();

    // Set up interval to fetch balance every 5 minutes
    const interval = setInterval(fetchBalance, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [connected, publicKey, isAuthenticated]);

  const connect = () => {
    // For your system, "connecting" means the user needs to create a wallet
    // or the wallet is already connected through user authentication
    if (user && !user.walletAddress) {
      // User is authenticated but doesn't have a wallet
      // This could trigger a modal or redirect to wallet creation
      console.log('User needs to create a wallet');
      // You could emit an event here or show a modal
    } else if (user && user.walletAddress) {
      // User has a wallet, just refresh the status
      refreshWalletStatus();
    } else {
      // User is not authenticated, redirect to login
      console.log('User needs to login first');
    }
  };

  const disconnect = () => {
    // In your system, wallets are tied to user accounts
    // So "disconnecting" might mean logging out or just clearing local state
    setConnected(false);
    setPublicKey(null);
    setBalance(null);
    setWalletStatus(null);
    
    // Note: This doesn't log out the user, just clears wallet state
    // If you want to log out the user, you would call auth.logout() here
  };

  const createWallet = async (password: string, confirmPassword: string) => {
    setIsLoading(true);
    try {
      const result = await auth.createWallet(password, confirmPassword);
      
      if (result.success) {
        // Refresh wallet status after creation
        await refreshWalletStatus();
        setConnected(true);
        setPublicKey(result.publicKey || null);
      }
      
      return result;
    } catch (error) {
      console.error('Wallet creation failed:', error);
      return {
        success: false,
        message: 'Failed to create wallet. Please try again.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{ 
        connected, 
        publicKey, 
        balance, 
        username, 
        walletStatus,
        isLoading,
        connect, 
        disconnect,
        createWallet,
        refreshWalletStatus,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}