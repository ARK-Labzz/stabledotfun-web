"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, AnimatePresence } from "framer-motion"; 

interface TimelineProgressProps {
  currentAmount?: string;
  totalAmount?: string;
  onWithdraw?: () => void;
  className?: string;
  ticker?: string;
}

export function PayoutTimeline({
  currentAmount = "$0.00",
  totalAmount = "$1,543.56",
  onWithdraw,
  className,
  ticker,
}: TimelineProgressProps) {
  const getNextThursday = () => {
    const date = new Date();
    const day = date.getDay(); // 0 = Sunday, 4 = Thursday
    const daysUntilThursday = (4 - day + 7) % 7; // Days until next Thursday
    
    // If today is Thursday and it's before 23:59, return today
    if (day === 4 && date.getHours() < 23 && date.getMinutes() < 59) {
      return date;
    }
    
    // Otherwise, return next Thursday
    date.setDate(date.getDate() + daysUntilThursday);
    return date;
  };
  
  // Calculate next maturity date (Thursday)
  const nextMaturityDate = getNextThursday();
  
  // Format the date as "Month Day, Year"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  // Calculate days left until maturity
  const calculateDaysLeft = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate day calculation
    
    const maturity = new Date(nextMaturityDate);
    maturity.setHours(0, 0, 0, 0);
    
    const diffTime = maturity.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const daysLeft = calculateDaysLeft();
  const totalDays = 7; // Always 7 days in a week
  const progress = ((totalDays - daysLeft) / totalDays) * 100;
  
  // Check if today is maturity day
  const isMaturityDay = daysLeft === 0;
  
  // State for celebration animation
  const [showCelebration, setShowCelebration] = React.useState(isMaturityDay);
  
  // Reset celebration on date change
  React.useEffect(() => {
    setShowCelebration(isMaturityDay);
    
    // If it's maturity day, schedule animation to hide after 5 seconds
    if (isMaturityDay) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isMaturityDay]);

  return (
    <div
      className={cn(
        "flex flex-col gap-1 bg-white/5 rounded-2xl p-4 border border-secondary/30 relative",
        className,
        isMaturityDay && "border-primary"
      )}
    >
      {/* Celebration Animation for Maturity Day */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-black/60 backdrop-blur-sm absolute inset-0 rounded-2xl"></div>
            <div className="relative z-20 flex flex-col items-center text-center p-6">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  y: [0, -5, 0, -5, 0] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <PartyPopper size={48} className="text-primary mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-primary mb-2">Maturity Day!</h3>
              <p className="text-white/80 mb-4">Your investment has reached maturity. Withdraw your returns now!</p>
              <Button 
                onClick={onWithdraw} 
                className="bg-primary text-black hover:bg-primary/90"
              >
                <ArrowUpRight className="w-5 h-5 mr-2" />
                Withdraw Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={cn(
        "flex flex-col gap-8 mb-10 space-y-6",
        isMaturityDay && showCelebration && "opacity-20"
      )}>
        <div className="flex flex-1 flex-col gap-4 justify-end items-start mb-7">
          <div className="flex w-full gap-1">
            Payout Period{" "}
            {ticker && <span className="text-white/30">({ticker}s)</span>}
            <span className="text-primary px-2 py-1 rounded-md text-xs ml-auto bg-[#00BCD429]">
              {totalDays} days
            </span>
          </div>
          <div className="flex w-full text-white/50 text-xs font-normal">
            Next Maturity Date
            <span className="text-xs ml-auto text-primary">{formatDate(nextMaturityDate)}</span>
          </div>
          <div className="flex w-full text-white/50 text-xs font-normal">
            Total Current Investment
            <span className="text-xs ml-auto text-primary">
              {currentAmount}
            </span>
          </div>
          <div className="flex w-full text-white/50 text-xs font-normal">
            Total Yield Reward
            <span className="text-xs ml-auto text-primary">{totalAmount}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pt-0">
          {/* Background line with tick marks */}
          <div className="absolute left-0 right-0 h-[1px] bg-[#1E2D3D]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-[-4px] w-[1px] h-[8px] bg-[#1E2D3D]"
                style={{ left: `${(i / 7) * 100}%` }}
              />
            ))}
          </div>

          {/* Progress line */}
          <div
            className="absolute left-0 h-[1px] bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />

          {/* Current position indicator */}
          <div
            className="absolute top-[-4px] h-3 w-3 rounded-full border-2 border-primary bg-[#051016] transition-all duration-500 ease-in-out"
            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
          >
            {/* Days left indicator */}
            <div className="absolute top-[-37px] left-1/2 -translate-x-1/2">
              <div className={cn(
                "border text-xs px-2 py-1 rounded-md whitespace-nowrap",
                isMaturityDay 
                  ? "bg-primary/20 border-primary text-white" 
                  : "bg-secondary/30 border-primary text-primary"
              )}>
                {isMaturityDay ? "Today!" : `${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
              </div>
              <span className="absolute top-6 left-1/2 -translate-x-1/2">
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_i_457_1225)">
                    <path
                      d="M8.73686 9.18067C7.96706 10.514 6.04256 10.514 5.27276 9.18066L0.509621 0.930664L13.5 0.930665L8.73686 9.18067Z"
                      fill="#7FCDD3"
                    />
                  </g>
                  <path
                    d="M8.30385 8.93067C7.7265 9.93066 6.28312 9.93066 5.70577 8.93066L1.37565 1.43066L12.634 1.43066L8.30385 8.93067Z"
                    stroke="#00BCD4"
                    strokeOpacity="0.16"
                  />
                  <defs>
                    <filter
                      id="filter0_i_457_1225"
                      x="0.509766"
                      y="0.930664"
                      width="12.9902"
                      height="13.25"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_457_1225"
                      />
                    </filter>
                  </defs>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw button */}
      <Button 
        onClick={onWithdraw} 
        className={cn(
          isMaturityDay ? "bg-primary text-black hover:bg-primary/90" : "",
          isMaturityDay && showCelebration && "opacity-0 pointer-events-none"
        )} 
        disabled={!isMaturityDay}
      >
        <ArrowUpRight className="w-5 h-5 mr-2" />
        {isMaturityDay ? "Withdraw Now" : "Withdraw"}
      </Button>
    </div>
  );
}