/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

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

interface PathwayData {
  year: string
  [key: string]: string | number
}

interface PathwayEnrollmentChartProps {
  data: PathwayData[]
  pathways: Array<{ name: string; icon: string; description: string }>
  title?: string
  description?: string
  growthPercentage?: number
}

const generateChartConfig = (pathways: Array<{ name: string; icon: string; description: string }>): ChartConfig => {
  const config: ChartConfig = {}
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))", 
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))"
  ]
  
  pathways.forEach((pathway, index) => {
    const key = pathway.name.toLowerCase().replace(/\s+/g, '_')
    config[key] = {
      label: pathway.name,
      color: colors[index % colors.length]
    }
  })
  
  return config
}

export function PathwayEnrollmentChart({ 
  data, 
  pathways, 
  title = "Pathway Enrollment Predictions",
  description = "AI-powered predictions showing enrollment trends across specialization pathways",
  growthPercentage = 25
}: PathwayEnrollmentChartProps) {
  const chartConfig = generateChartConfig(pathways)
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <ChartTooltip
                cursor={{ fill: 'rgba(139, 69, 19, 0.1)' }}
                content={<ChartTooltipContent indicator="line" />}
              />
              {pathways.map((pathway, index) => {
                const key = pathway.name.toLowerCase().replace(/\s+/g, '_')
                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={`var(--color-${key})`}
                    radius={[2, 2, 0, 0]}
                    name={pathway.name}
                  />
                )
              })}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-gray-900">
          Trending up by {growthPercentage}% overall <TrendingUp className="h-4 w-4 text-green-600" />
        </div>
        <div className="text-gray-600 leading-none">
          Showing enrollment predictions for all specialization pathways
        </div>
      </CardFooter>
    </Card>
  )
}
