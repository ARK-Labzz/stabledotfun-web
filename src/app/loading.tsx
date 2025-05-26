"use client"

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Loading() {
  const [pulseIntensity, setPulseIntensity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'hsl(194, 100%, 5%)' }}>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 w-32 h-32 border-2 border-primary/30 rounded-full animate-spin" 
               style={{ animationDuration: '3s' }} />
          <div 
            className="absolute inset-2 w-28 h-28 border border-primary/50 rounded-full"
            style={{
              transform: `scale(${1 + Math.sin(pulseIntensity * 0.1) * 0.1})`,
              opacity: 0.3 + Math.sin(pulseIntensity * 0.15) * 0.3
            }}
          />
          <div 
            className="relative w-32 h-32 flex items-center justify-center"
            style={{
              transform: `translateY(${Math.sin(pulseIntensity * 0.08) * 4}px)`
            }}
          >
            <Image
              src="/android/android-launchericon-192-192.png"
              alt="Stable.fun"
              width={80}
              height={80}
              className="w-20 h-20 drop-shadow-lg"
              style={{
                filter: `brightness(${1 + Math.sin(pulseIntensity * 0.12) * 0.2})`
              }}
            />
          </div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `
                  translate(-50%, -50%) 
                  rotate(${(pulseIntensity * 2 + i * 120) % 360}deg) 
                  translateY(-50px)
                `,
                opacity: 0.6 + Math.sin((pulseIntensity + i * 30) * 0.1) * 0.4
              }}
            />
          ))}
        </div>
        <div className="flex items-center space-x-1">
          {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, i) => (
            <span
              key={i}
              className="text-lg font-medium text-primary"
              style={{
                transform: `translateY(${Math.sin((pulseIntensity + i * 10) * 0.15) * 3}px)`,
                opacity: 0.5 + Math.sin((pulseIntensity + i * 15) * 0.1) * 0.5
              }}
            >
              {letter}
            </span>
          ))}
          <div className="flex space-x-1 ml-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-primary rounded-full"
                style={{
                  opacity: Math.sin((pulseIntensity + i * 20) * 0.2) > 0 ? 1 : 0.3,
                  transform: `scale(${0.8 + Math.sin((pulseIntensity + i * 25) * 0.15) * 0.4})`
                }}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full transition-all duration-300"
            style={{
              width: `${(pulseIntensity * 2) % 100}%`,
              boxShadow: '0 0 10px rgba(127, 205, 211, 0.5)'
            }}
          />
        </div>
      </div>
    </div>
  );
}