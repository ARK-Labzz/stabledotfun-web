"use client"

import { Chart } from "@/components/ui/chart"

interface DetailedChartProps {
  data?: { date: string; value: number }[]
  height?: number
  mainColor?: string
  secondaryColor?: string
  showGrid?: boolean
  showAxis?: boolean
  showTooltip?: boolean
}

const defaultData = [
  { date: "Oct", value: 0.01 },
  { date: "Nov", value: 0.025 },
  { date: "Dec", value: 0.018 },
  { date: "Jan", value: 0.022 },
  { date: "Feb", value: 0.02 },
  { date: "Mar", value: 0.05 },
]

export default function DetailedChart({
  data = defaultData,
  height = 400,
  mainColor = "#00c2cb",
  secondaryColor = "#4a6d7c",
  showGrid = true,
  showAxis = true,
  showTooltip = true,
}: DetailedChartProps) {
  // Format data for recharts
  const chartData = data.map((item) => ({
    date: item.date,
    value: item.value,
  }))

  return (
    <div className="w-full h-full">
      <Chart
        data={chartData}
        x="date"
        y="value"
        yFormatter={(value) => `$${value.toFixed(6)}`}
        strokeColor={mainColor}
        gradientFrom={mainColor}
        gradientTo="transparent"
        showXAxis={showAxis}
        showYAxis={showAxis}
        showGrid={showGrid}
        showTooltip={showTooltip}
        height={height}
      />
    </div>
  )
}

