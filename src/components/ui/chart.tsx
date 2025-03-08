/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type * as React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

import { cn } from "@/lib/utils";

interface ChartProps {
  data: any[];
  x: string;
  y: string;
  yFormatter?: (value: number) => string;
  strokeColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  height?: number;
  className?: string;
}

export function Chart({
  data,
  x,
  y,
  yFormatter = (value: number) => `${value}`,
  strokeColor = "#00c2cb",
  gradientFrom = "#00c2cb",
  gradientTo = "transparent",
  showXAxis = false,
  showYAxis = false,
  showGrid = false,
  showTooltip = true,
  height = 200,
  className,
}: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientFrom} stopOpacity={0.4} />
              <stop offset="50%" stopColor={gradientFrom} stopOpacity={0.1} />
              <stop offset="100%" stopColor={gradientTo} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255, 255, 255, 0.1)"
            />
          )}
          {showXAxis && (
            <XAxis
              dataKey={x}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
          )}
          {showYAxis && (
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={yFormatter}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-card p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">
                          {payload[0].payload[x]}
                        </span>
                        <span className="font-bold text-teal">
                          {yFormatter(payload[0].value as number)}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey={y}
            stroke={strokeColor}
            strokeWidth={2}
            fill="url(#gradient)"
            dot={{ r: 0 }}
            activeDot={{
              r: 6,
              fill: strokeColor,
              strokeWidth: 2,
              stroke: "white",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface MiniChartProps {
  data: any[];
  x: string;
  y: string;
  strokeColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  height?: number;
  className?: string;
}

export function MiniChart({
  data,
  // x,
  y,
  strokeColor = "#00c2cb",
  gradientFrom = "#00c2cb",
  gradientTo = "transparent",
  height = 40,
  className,
}: MiniChartProps) {
  const gradientId = `miniGradient-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientFrom} stopOpacity={0.4} />
              <stop offset="50%" stopColor={gradientFrom} stopOpacity={0.1} />
              <stop offset="100%" stopColor={gradientTo} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={y}
            stroke={strokeColor}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            dot={(props: any) => {
              // Only show dots at the first, last, and middle points
              const { cx, cy, index } = props;
              if (
                index === 0 ||
                index === data.length - 1 ||
                index === Math.floor(data.length / 2)
              ) {
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={2}
                    fill={strokeColor}
                    stroke="white"
                    strokeWidth={1}
                  />
                );
              }
              return <></>;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("w-full h-full", className)}>{children}</div>;
};

export const ChartTooltip = () => {
  return null;
};

export const ChartTooltipContent = () => {
  return null;
};

export const ChartLegend = () => {
  return null;
};

export const ChartLegendContent = () => {
  return null;
};

export const ChartStyle = () => {
  return null;
};
