"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Enrollment prediction chart"

interface EnrollmentData {
  year: string
  enrollments: number
}

interface ChartBarLabelProps {
  data?: EnrollmentData[]
  title?: string
  description?: string
  growthPercentage?: number
}

const defaultData: EnrollmentData[] = [
  { year: "2020", enrollments: 186 },
  { year: "2021", enrollments: 235 },
  { year: "2022", enrollments: 298 },
  { year: "2023", enrollments: 342 },
  { year: "2024", enrollments: 389 },
  { year: "2025", enrollments: 456 },
]

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "#8B0000",
  },
} satisfies ChartConfig

export function ChartBarLabel({
  data = defaultData,
  title = "Enrollment Trends & Predictions",
  description = "Historical data and AI-powered forecasts",
  growthPercentage = 17,
}: ChartBarLabelProps) {
  return (
    <Card className="border-maroon-100">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-maroon-700" />
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#6B7280" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="enrollments" fill="#8B0000" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-gray-700"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-gray-900">
          Projected growth of {growthPercentage}% for{" "}
          {data[data.length - 1]?.year || "2025"}{" "}
          <TrendingUp className="h-4 w-4 text-maroon-700" />
        </div>
        
      </CardFooter>
    </Card>
  )
}
