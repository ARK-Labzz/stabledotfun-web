import { BondType, ChartTokenData } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate realistic dummy token price data
export const generateTokenData = async (): Promise<ChartTokenData[]> => {
  const bondTypes: BondType[] = ["USD", "EUR", "GBP", "CETES", "EUROB"];
  const data: ChartTokenData[] = [];
  let currentPrice = 1.2;
  let currentVolume = 100000;

  // Generate hourly data for last 90 days
  const hours = 24 * 90;
  const startDate = subDays(new Date(), 90);

  for (let i = 0; i < hours; i++) {
    const date = new Date(startDate);
    date.setHours(date.getHours() + i);

    // More realistic price movement with some volatility
    const randomFactor = Math.random() * 0.1 - 0.05;
    const timeFactor = Math.sin(i / (24 * Math.PI)) * 0.02; // Daily pattern
    currentPrice = Math.max(
      0.5,
      currentPrice * (1 + randomFactor + timeFactor)
    );

    // Volume follows price movements with some randomness
    currentVolume = Math.min(
      1_000_000_000,
      Math.max(
        500000,
        currentVolume *
          (1 + randomFactor * 2 + timeFactor * 3 + Math.random() * 0.1)
      )
    );

    // Assign random bond type with some weighting
    const bondType = bondTypes[Math.floor(Math.random() * bondTypes.length)];
    const baseYield =
      {
        ALL: 0,
        USD: 0.05,
        EUR: 0.04,
        GBP: 0.045,
        CETES: 0.07,
        EUROB: 0.065,
      }[bondType] ?? 0; // Default to 0 if bondType is not found

    // Yield fluctuates slightly
    const yieldValue = baseYield * (1 + (Math.random() - 0.5) * 0.2);

    data.push({
      date,
      price: parseFloat(currentPrice.toFixed(4)),
      volume: Math.round(currentVolume),
      yield: parseFloat(yieldValue.toFixed(4)),
      bondType,
    });
  }

  return data;
};
