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
  Line,
  LineChart,
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
  showDots?: boolean;
  multiLine?: boolean;
  lines?: { key: string; color: string }[];
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
  showDots = false,
  multiLine = false,
  lines = [],
}: ChartProps) {
  // Generate a unique ID for the gradient
  const gradientId = `gradient-${Math.random().toString(36).substring(2, 9)}`;

  if (multiLine && lines.length > 0) {
    return (
      <div className={cn("w-full h-full", className)}>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
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
                          {payload.map((entry, index) => (
                            <span
                              key={index}
                              className="font-bold"
                              style={{ color: entry.color }}
                            >
                              {yFormatter(entry.value as number)}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            )}
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={2}
                dot={
                  showDots
                    ? {
                        r: 4,
                        fill: line.color,
                        strokeWidth: 2,
                        stroke: "white",
                      }
                    : false
                }
                activeDot={{
                  r: 6,
                  fill: line.color,
                  strokeWidth: 2,
                  stroke: "white",
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
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
            fill={`url(#${gradientId})`}
            dot={
              showDots
                ? { r: 4, fill: strokeColor, strokeWidth: 2, stroke: "white" }
                : false
            }
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
  showDots?: boolean;
}

export function MiniChart({
  data,
  // x,
  y,
  strokeColor = "#00C2CB",
  gradientFrom = "#00C2CB",
  gradientTo = "transparent",
  height = 40,
  className,
  showDots = true,
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
              <stop offset="0%" stopColor={gradientFrom} stopOpacity={0.2} />
              <stop offset="100%" stopColor={gradientTo} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={y}
            stroke={strokeColor}
            strokeWidth={1}
            strokeDasharray="3 3"
            fill={`url(#${gradientId})`}
            dot={
              showDots
                ? {
                    r: 4,
                    fill: strokeColor,
                    strokeWidth: 2,
                    stroke: "#051016",
                  }
                : false
            }
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
