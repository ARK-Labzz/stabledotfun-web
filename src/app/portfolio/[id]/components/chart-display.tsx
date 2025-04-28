"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BondType, ChartTokenData, Timeframe } from "@/types";
import React, { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilteredData } from "@/hooks/use-filtered-chart";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const chartConfig = {
  price: {
    label: "Price (USD)",
    color: "#7fcdd3",
  },
  volume: {
    label: "Volume",
    color: "#BDD0D1",
  },
} satisfies ChartConfig;

export function TokenPriceChart({ token }: { token: ChartTokenData[] }) {
  const [asc, setAsc] = React.useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<Timeframe>("30D");
  const [bondType, setBondType] = useState<BondType>("ALL");

  const filteredData = useFilteredData(token, timeframe, bondType);

  // Calculate statistics
  const totalVolume = useMemo(
    () => filteredData.reduce((sum, entry) => sum + entry.volume, 0),
    [filteredData]
  );

  // Calculate statistics
  const currentPrice = filteredData[filteredData.length - 1].price;

  const sortedData = filteredData?.sort((a, b) =>
    !asc ? a.price - b.price : b.price - a.price
  );
  // HACK - Sorts data in decending order on default

  // Format X-axis labels based on timeframe
  const formatXAxis = (date: Date) => {
    if (timeframe === "24H") return format(date, "HH:mm");
    if (timeframe === "7D") return format(date, "EEE");
    return format(date, "MMM d");
  };

  return (
    <div className="rounded-xl border border-primary/30 p-4 bg-white/5 flex flex-col flex-1 gap-4">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex gap-4 flex-wrap flex-1">
          <div className="flex gap-2">
            <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
              <span className="w-3 h-3 bg-[#D9D9D9] rounded-full"></span>
            </span>
            <div className="text-primary text-xs flex flex-col">
              Total Volume
              <span className="text-white text-sm">
                {totalVolume.toLocaleString("en", {
                  compactDisplay: "long",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
              <span className="w-3 h-3 bg-primary/90 rounded-full"></span>
            </span>
            <div className="text-primary text-xs flex flex-col">
              Token Price
              <span className="text-white text-sm">
                {bondType === "CETES"
                  ? "CETES"
                  : bondType === "EUROB"
                  ? "EUROB"
                  : bondType === "EUR"
                  ? "EUR"
                  : bondType === "GBP"
                  ? "GBP"
                  : "$"}
                {currentPrice.toLocaleString("en", {
                  compactDisplay: "long",
                  currency: "USD",
                  currencySign: "standard",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Select
            value={timeframe}
            onValueChange={(value) => setTimeframe(value as Timeframe)}
          >
            <SelectTrigger className="w-[80px] bg-white/5 border border-primary/30 text-xs">
              <SelectValue placeholder="Bond Type" />
            </SelectTrigger>
            <SelectContent>
              {["24H", "7D", "30D", "90D", "1Y"].map((el, i) => (
                <SelectItem key={el + i} value={el}>
                  {el}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => setAsc((prev) => !prev)}
            className="text-xs px-3 py-1 rounded-md bg-white/5 border border-primary/30 text-gray-300 flex items-center gap-1"
          >
            {asc ? (
              <ChevronUp className="w-2 h-2" />
            ) : (
              <ChevronDown className="w-2 h-2" />
            )}
            Highest Yield
          </Button>

          <Select
            value={bondType}
            onValueChange={(value) => setBondType(value as BondType)}
          >
            <SelectTrigger className="w-[120px] bg-white/3 border border-primary/30 text-xs">
              <SelectValue placeholder="Bond Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Bonds</SelectItem>
              <SelectItem value="USD">USD Bonds</SelectItem>
              <SelectItem value="EUR">EUR Bonds</SelectItem>
              <SelectItem value="GBP">GBP Bonds</SelectItem>
              <SelectItem value="CETES">CETES</SelectItem>
              <SelectItem value="EUROB">EUROB</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ChartContainer
        config={chartConfig}
        className={cn("min-h-[200px] bg-white/1 rounded-xl p-5")}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={sortedData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7fcdd3" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#7fcdd3" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BDD0D1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#BDD0D1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280" }}
              tickFormatter={formatXAxis}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280" }}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280" }}
            />
            <Tooltip
              content={<ChartTooltipContent />}
              formatter={(value, name) => {
                if (name === "price") return [`$${value}`, " Price"];
                return [value.toLocaleString(), " Volume"];
              }}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="price"
              stroke="#7fcdd3"
              fillOpacity={1}
              fill="url(#priceGrad)"
              strokeWidth={1}
              strokeDasharray={"3 3"}
              activeDot={{ r: 6 }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="volume"
              stroke="#BDD0D1"
              fillOpacity={1}
              fill="url(#volumeGrad)"
              strokeWidth={1}
              strokeDasharray={"3 3"}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
