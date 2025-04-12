import { BondType, ChartTokenData, Timeframe } from "@/types";
import { subDays, subMonths, subWeeks } from "date-fns";
import { useMemo } from "react";

// Custom hook to filter and aggregate data based on timeframe
export const useFilteredData = (tokenData: ChartTokenData[], timeframe: Timeframe, bondType: BondType) => {
  return useMemo(() => {
    let cutoffDate = new Date();

    switch (timeframe) {
      case "24H":
        cutoffDate = subDays(cutoffDate, 1);
        break;
      case "7D":
        cutoffDate = subWeeks(cutoffDate, 1);
        break;
      case "30D":
        cutoffDate = subMonths(cutoffDate, 1);
        break;
      case "90D":
        cutoffDate = subMonths(cutoffDate, 3);
        break;
      case "1Y":
        cutoffDate = subMonths(cutoffDate, 12);
        break;
    }

    // Filter by date and bond type
    let filtered = tokenData.filter(
      (entry) =>
        entry.date >= cutoffDate &&
        (bondType === "ALL" || entry.bondType === bondType)
    );

    // For longer timeframes, aggregate data to reduce points
    if (timeframe === "30D" || timeframe === "90D" || timeframe === "1Y") {
      const aggregated: ChartTokenData[] = [];
      const days = timeframe === "30D" ? 30 : timeframe === "90D" ? 90 : 365;
      const interval = Math.max(1, Math.floor(days / 30)); // Aggregate to ~30 points

      for (let i = 0; i < days; i += interval) {
        const sliceStart = new Date(cutoffDate);
        sliceStart.setDate(sliceStart.getDate() + i);
        const sliceEnd = new Date(sliceStart);
        sliceEnd.setDate(sliceEnd.getDate() + interval);

        const slice = filtered.filter(
          (entry) => entry.date >= sliceStart && entry.date < sliceEnd
        );

        if (slice.length > 0) {
          const avgPrice =
            slice.reduce((sum, entry) => sum + entry.price, 0) / slice.length;
          const totalVolume = slice.reduce(
            (sum, entry) => sum + entry.volume,
            0
          );
          const avgYield =
            slice.reduce((sum, entry) => sum + (entry.yield || 0), 0) /
            slice.length;

          aggregated.push({
            date: new Date(sliceStart),
            month: sliceStart.toLocaleString("default", { month: "long" }),
            price: parseFloat(avgPrice.toFixed(4)),
            volume: Math.round(totalVolume),
            yield: parseFloat(avgYield.toFixed(4)),
            bondType: slice[0].bondType,
          });
        }
      }

      filtered = aggregated;
    }

    return filtered;
  }, [timeframe, tokenData, bondType]);
};
