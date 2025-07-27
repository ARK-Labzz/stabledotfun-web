"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, type AuthUser } from '@/lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; message?: string; user?: AuthUser }>;
  completeProfile: (profileData: {
    username: string;
    displayName: string;
    bio?: string;
    referralCode?: string;
    walletPassword?: string;
  }) => Promise<{ success: boolean; message?: string; user?: AuthUser }>;
  uploadAvatar: (file: File) => Promise<{ success: boolean; message?: string; avatarUrl?: string }>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const refreshUser = async () => {
    try {
      const userData = await auth.getUser();
      setUser(userData);
      
      // Debug logging
      if (process.env.NODE_ENV === 'development') {
        console.log('Auth refreshUser result:', { 
          hasUser: !!userData, 
          email: userData?.email,
          username: userData?.username 
        });
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const result = await auth.verifyOTP(email, otp);
      
      if (result.success && result.user) {
        setUser(result.user);
      }
      
      return result;
    } catch (error) {
      console.error('OTP verification failed:', error);
      return {
        success: false,
        message: 'Verification failed. Please try again.',
      };
    }
  };

  const completeProfile = async (profileData: {
    username: string;
    displayName: string;
    bio?: string;
    referralCode?: string;
    walletPassword?: string;
  }) => {
    try {
      const result = await auth.completeProfile(profileData);
      
      if (result.success && result.user) {
        setUser(result.user);
      }
      
      return result;
    } catch (error) {
      console.error('Profile completion failed:', error);
      return {
        success: false,
        message: 'Profile completion failed. Please try again.',
      };
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const result = await auth.uploadAvatar(file);
      
      if (result.success) {
        // Refresh user data to get updated avatar URL
        await refreshUser();
      }
      
      return result;
    } catch (error) {
      console.error('Avatar upload failed:', error);
      return {
        success: false,
        message: 'Avatar upload failed. Please try again.',
      };
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      setUser(null);
      
      // Redirect to home page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const logoutAll = async () => {
    try {
      await auth.logoutAll();
      setUser(null);
      
      // Redirect to home page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout all failed:', error);
    }
  };

  // Initialize auth on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        await refreshUser();
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
        
        // Debug logging
        if (process.env.NODE_ENV === 'development') {
          console.log('Auth initialization complete');
        }
      }
    };

    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user && !isLoading,
    verifyOTP,
    completeProfile,
    uploadAvatar,
    logout,
    logoutAll,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Hook for protected pages
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // This will be handled by middleware, but keep as fallback
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        window.location.href = `/auth/signup?from=${encodeURIComponent(currentPath)}`;
      }
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}