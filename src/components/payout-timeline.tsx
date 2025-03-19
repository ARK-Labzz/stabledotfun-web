"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineProgressProps {
  startDate?: string;
  endDate?: string;
  currentAmount?: string;
  totalAmount?: string;
  daysLeft?: number;
  totalDays?: number;
  onWithdraw?: () => void;
  className?: string;
}

export function PayoutTimeline({
  endDate = "March 13, 2024",
  currentAmount = "$0.00",
  totalAmount = "$1,543.56",
  daysLeft = 2,
  totalDays = 30,
  onWithdraw,
  className,
}: TimelineProgressProps) {
  const progress = ((totalDays - daysLeft) / totalDays) * 100;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 bg-white/5 rounded-2xl p-4 border border-secondary/30",
        className
      )}
    >
      <div className="flex flex-col gap-8 mb-10 space-y-6">
        <div className="flex flex-1 flex-col gap-4 justify-end items-start mb-7">
          <div className="flex w-full">
            Payout Period
            <span className="text-primary px-2 py-1 rounded-md text-xs ml-auto bg-[#00BCD429]">
              {totalDays} days
            </span>
          </div>
          <div className="flex w-full text-white/50 text-xs font-normal">
            Next Maturity Date
            <span className="text-xs ml-auto text-primary">{endDate}</span>
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
            {Array.from({ length: 31 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-[-4px] w-[1px] h-[8px] bg-[#1E2D3D]"
                style={{ left: `${(i / 30) * 100}%` }}
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
              <div className="bg-secondary/30 border border-primary text-primary text-xs px-2 py-1 rounded-md whitespace-nowrap">
                {daysLeft} days
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
      <Button onClick={onWithdraw} className="" disabled={progress < 100}>
        <ArrowUpRight className="w-5 h-5" />
        Withdraw
      </Button>
    </div>
  );
}
