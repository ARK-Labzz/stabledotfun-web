"use client"

import Link from "next/link";
import Image from "next/image";
import { Home, Mail, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Forbidden() {
  const [shakeIcon, setShakeIcon] = useState(false);
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setShakeIcon(true);
      setTimeout(() => setShakeIcon(false), 500);
    }, 3000);
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 4000);

    return () => {
      clearInterval(shakeInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'hsl(194, 100%, 5%)' }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-red-500/30 animate-pulse"
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 25}%`,
              width: '20%',
              height: '20%',
              animationDelay: `${i * 0.2}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 bg-red-500/50"
                style={{
                  height: '200px',
                  left: `${i * 30}px`,
                  transform: 'rotate(15deg)',
                  animation: `pulse 2s infinite ${i * 0.2}s`,
                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
                }}
              />
            ))}
          </div>
          <div className="relative z-10 flex items-center justify-center">
            <div 
              className={`relative transition-transform duration-500 ${
                shakeIcon ? 'animate-bounce' : ''
              }`}
            >
              <div className="absolute inset-0 w-32 h-32 border-4 border-red-500/30 rounded-full animate-pulse" />
              <div className="relative w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-500/40">
                <Shield size={60} className="text-red-400 animate-pulse" />
                <Lock size={30} className="absolute text-red-300" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center space-y-4">
          <div 
            className={`text-6xl md:text-8xl font-bold transition-all duration-200 ${
              glitchText 
                ? 'text-red-400 transform translate-x-1' 
                : 'text-red-500'
            }`}
            style={{
              textShadow: glitchText 
                ? '2px 0 #ff0000, -2px 0 #00ff00, 0 2px #0000ff' 
                : '0 0 20px rgba(239, 68, 68, 0.5)',
              filter: glitchText ? 'hue-rotate(180deg)' : 'none'
            }}
          >
            4<span className="inline-block animate-pulse">0</span>3
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            ACCESS <span className="text-red-400">DENIED</span>
          </h1>
        </div>
        <div className="text-center space-y-4 max-w-lg px-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-lg text-red-200 font-medium">
              🚫 RESTRICTED AREA
            </p>
            <p className="text-sm text-red-300/80 mt-2">
              You currently don't have the required permissions to access this stablecoin treasury.
            </p>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/android/android-launchericon-192-192.png"
            alt="Stable.fun"
            width={80}
            height={80}
            className="w-20 h-20 opacity-30 grayscale"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-red-500 rounded-full flex items-center justify-center">
              <div className="w-16 h-1 bg-red-500 rotate-45 absolute" />
              <div className="w-16 h-1 bg-red-500 -rotate-45 absolute" />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button 
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home size={18} />
              Return to where you belong
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            asChild
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/resources" className="flex items-center gap-2">
              <Mail size={18} />
              Find Support
            </Link>
          </Button>
        </div>

        {/* Warning indicators */}
        <div className="flex items-center gap-4 mt-4 opacity-60">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-red-500 rounded-full animate-ping"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}