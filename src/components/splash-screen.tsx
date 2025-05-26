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
    // Start logo drop animation
    const logoTimer = setTimeout(() => {
      setLogoDropped(true);
    }, 500);

    // Start text slide after logo lands
    const textTimer = setTimeout(() => {
      setTextSlideIn(true);
    }, 1500);

    // Start typewriter effect after text slides in
    const typewriterTimer = setTimeout(() => {
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
        setTypedText(prev => prev + letters[currentLetterIndex]);
        setCurrentLetterIndex(prev => prev + 1);
      }, 150); // Typing speed

      return () => clearTimeout(timer);
    } else if (currentLetterIndex >= letters.length && onComplete) {
      // Animation complete, wait a bit then call onComplete
      const completeTimer = setTimeout(onComplete, 1000);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLetterIndex, letters, textSlideIn, onComplete]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'hsl(194, 100%, 5%)' }}
    >
      {/* Subtle background animation */}
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

      <div className="relative z-10 flex items-center justify-center">
        {/* Logo with drop animation */}
        <div className="flex items-center space-x-4">
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
            {/* Logo container with bounce effect */}
            <div className={`${logoDropped ? 'animate-bounce' : ''}`}
                 style={{ animationDuration: '0.6s', animationIterationCount: '2' }}>
              <Image
                src="/android/android-launchericon-192-192.png"
                alt="Stable.fun"
                width={80}
                height={80}
                className="w-20 h-20 drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Text with slide-in and typewriter effect */}
          <div
            className={`transition-all duration-800 ease-out ${
              textSlideIn
                ? 'transform translate-x-0 opacity-100'
                : 'transform translate-x-96 opacity-0'
            }`}
          >
            <div className="text-4xl font-bold text-white relative">
              {/* Background text for positioning */}
              <span className="invisible">{fullText}</span>
              
              {/* Typed text overlay */}
              <span className="absolute inset-0 text-primary">
                {typedText}
                {/* Blinking cursor */}
                {currentLetterIndex < letters.length && (
                  <span className="animate-pulse text-white/70">|</span>
                )}
              </span>
              
              {/* Writing effect - pen stroke simulation */}
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
            
            {/* Tagline that appears after typing is complete */}
            <div
              className={`text-sm text-primary/70 mt-2 transition-all duration-500 ${
                currentLetterIndex >= letters.length
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              Your wallet, now a yield-bearing engine.
            </div>
          </div>
        </div>

        {/* Subtle glow effect around the logo when it lands */}
        {logoDropped && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}