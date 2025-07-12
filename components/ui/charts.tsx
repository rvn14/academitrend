/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { 
  Line, 
  LineChart as RechartsLineChart, 
  Bar, 
  BarChart as RechartsBarChart,
  Area,
  AreaChart as RechartsAreaChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  TooltipProps
} from "recharts"
import { cn } from "@/lib/utils"

const CustomTooltip = ({
  active,
  payload,
  label,
  formatter,
}: TooltipProps<number, string> & { formatter?: (value: number) => string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="font-medium">{label}</div>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center text-xs"
          >
            <div
              className="mr-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <div>{entry.name}: </div>
            <div className="ml-1 font-medium">
              {formatter ? formatter(entry.value as number) : entry.value}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return null
}

interface ChartProps {
  data: any[]
  categories: string[]
  colors?: string[]
  showLegend?: boolean
  height?: number
  className?: string
  index?: string
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
}

interface BarChartProps extends ChartProps {
  layout?: "vertical" | "horizontal"
}

export function LineChart({
  data,
  categories,
  colors = ["blue", "green", "red", "purple"],
  showLegend = true,
  height = 300,
  className,
  index = "name",
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 50,
}: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            width={yAxisWidth}
            tickFormatter={valueFormatter}
            tickMargin={10}
          />
          <Tooltip content={<CustomTooltip formatter={valueFormatter} />} />
          {showLegend && (
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ fontSize: "12px" }}
            />
          )}
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function AreaChart({
  data,
  categories,
  colors = ["blue", "green", "red", "purple"],
  showLegend = true,
  height = 300,
  className,
  index = "name",
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 50,
}: ChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            width={yAxisWidth}
            tickFormatter={valueFormatter}
            tickMargin={10}
          />
          <Tooltip content={<CustomTooltip formatter={valueFormatter} />} />
          {showLegend && (
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ fontSize: "12px" }}
            />
          )}
          {categories.map((category, i) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              fill={`${colors[i % colors.length]}22`}
              stroke={colors[i % colors.length]}
              stackId={showLegend ? undefined : "1"}
              fillOpacity={0.7}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function BarChart({
  data,
  categories,
  colors = ["blue", "green", "red", "purple"],
  showLegend = true,
  height = 300,
  className,
  index = "name",
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 50,
  layout = "horizontal",
}: BarChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={layout === "vertical"} vertical={layout === "horizontal"} />
          <XAxis
            type={layout === "horizontal" ? "category" : "number"}
            dataKey={layout === "horizontal" ? index : undefined}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            tickFormatter={layout === "horizontal" ? undefined : valueFormatter}
          />
          <YAxis
            type={layout === "horizontal" ? "number" : "category"}
            dataKey={layout === "vertical" ? index : undefined}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            width={yAxisWidth}
            tickFormatter={layout === "horizontal" ? valueFormatter : undefined}
            tickMargin={10}
          />
          <Tooltip content={<CustomTooltip formatter={valueFormatter} />} />
          {showLegend && (
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ fontSize: "12px" }}
            />
          )}
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
