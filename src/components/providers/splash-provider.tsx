"use client";

import { useState, useEffect } from "react";
import SplashScreen from "@/components/splash-screen";

interface SplashProviderProps {
  children: React.ReactNode;
}

export default function SplashProvider({ children }: SplashProviderProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasShownSplash = sessionStorage.getItem('splashShown');
    
    if (!hasShownSplash) {
      setShowSplash(true);
      sessionStorage.setItem('splashShown', 'true');
    } else {
      setShowSplash(false);
    }
    
    setIsLoading(false);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {children}
    </>
  );
}