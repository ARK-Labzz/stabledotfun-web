"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [logoDropped, setLogoDropped] = useState(false);
  const [textSlideIn, setTextSlideIn] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  
  const fullText = "Stable.fun";
  const letters = fullText.split("");

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLogoDropped(true);
    }, 500);
    const textTimer = setTimeout(() => {
      setTextSlideIn(true);
    }, 1500);
    const typewriterTimer = setTimeout(() => {
      setTypedText(""); 
      setCurrentLetterIndex(0);
    }, 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(typewriterTimer);
    };
  }, []);

  useEffect(() => {
    if (currentLetterIndex < letters.length && textSlideIn) {
      const timer = setTimeout(() => {
        setTypedText(letters.slice(0, currentLetterIndex + 1).join(""));
        setCurrentLetterIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else if (currentLetterIndex >= letters.length && onComplete) {
      const completeTimer = setTimeout(onComplete, 3000);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLetterIndex, letters, textSlideIn, onComplete]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'hsl(194, 100%, 5%)' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-4">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-6 space-y-6 lg:space-y-0">
          <div
            className={`transition-all duration-1000 ease-out ${
              logoDropped
                ? 'transform translate-y-0 opacity-100'
                : 'transform -translate-y-96 opacity-0'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            <div className={`${logoDropped ? 'animate-bounce' : ''}`}
                 style={{ animationDuration: '0.6s', animationIterationCount: '2' }}>
              <Image
                src="/android/android-launchericon-192-192.png"
                alt="Stable.fun"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 drop-shadow-2xl mx-auto"
              />
            </div>
          </div>
          <div
            className={`transition-all duration-800 ease-out text-center lg:text-left ${
              textSlideIn
                ? 'transform translate-x-0 opacity-100'
                : 'transform translate-x-96 opacity-0'
            }`}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white relative">
              <span className="text-primary">
                {typedText}
                {currentLetterIndex < letters.length && (
                  <span className="animate-pulse text-white/70">|</span>
                )}
              </span>
              {typedText && (
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-transparent"
                  style={{
                    width: `${(typedText.length / fullText.length) * 100}%`,
                    transition: 'width 0.15s ease-out'
                  }}
                />
              )}
            </div>
            <div
              className={`text-xs sm:text-sm lg:text-base text-white/90 mt-2 transition-all duration-500 ${
                currentLetterIndex >= letters.length
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              Your wallet, now a yield-bearing engine.
            </div>
          </div>
        </div>
        {logoDropped && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-primary/5 rounded-full blur-xl animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}