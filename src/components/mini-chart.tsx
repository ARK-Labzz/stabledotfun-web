"use client";

import { MiniChart as Chart } from "@/components/chart";

interface MiniChartProps {
  data?: number[];
  height?: number;
  color?: string;
  trend?: "up" | "down";
  showDots?: boolean;
}

export default function MiniChart({
  data = [10, 25, 15, 30, 18, 12, 22, 30, 35],
  height = 40,
  color = "#00c2cb",
  trend = "up",
  showDots = true,
}: MiniChartProps) {
  // Format data for recharts - add more points for smoother curves
  const chartData = data.map((value, index) => ({
    x: index.toString(),
    value: value,
  }));

  return (
    <Chart
      data={chartData}
      x="x"
      y="value"
      strokeColor={trend === "up" ? color : "#e74c3c"}
      gradientFrom={trend === "up" ? color : "#e74c3c"}
      gradientTo="transparent"
      height={height}
      showDots={showDots}
    />
  );
}
