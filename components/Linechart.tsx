"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
const chartData = [
  { year: "2016", enrollment: 50 },
  { year: "2017", enrollment: 55 },
  { year: "2018", enrollment: 57 },
  { year: "2019", enrollment: 56 },
  { year: "2020", enrollment: 65 },
  { year: "2021", enrollment: 69 },
  { year: "2022", enrollment: 69 },
]

const chartConfig = {
  enrollment: {
    label: "Enrollment",
    color: "hsl(var(--chart-1))",
  },
  enroll: {
    label: "Enroll",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Linechart() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl border-none">
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>2016 - 2022 Enrolls</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 6,
              right: 6,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              fontSize={12}
              tickFormatter={(value) => value.slice(2, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="enrollment"
              type="linear"
              stroke="var(--color-enrollment)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="enroll"
              type="linear"
              stroke="black"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this year <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 years
        </div>
      </CardFooter>
    </Card>
  )
}
