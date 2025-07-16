/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "Pathway enrollment predictions chart"

interface PathwayForecast {
  degree_program: string
  enrollment_total: number
  model: string
  pathway: string
  year: number
}

interface APIResponse {
  description: string
  filters_applied: {
    degree_program: string
    model: string
    pathway: string | null
    year: number | null
  }
  forecast_data: PathwayForecast[]
  message: string
  status: string
  total_forecast_records: number
  pathways: string[]
  years: number[]
}

interface ChartBarMultipleProps {
  degreeProgram?: string
}

const chartConfig = {
  artificial_intelligence: {
    label: "Artificial Intelligence",
    color: "hsl(var(--chart-1))",
  },
  data_science: {
    label: "Data Science",
    color: "hsl(var(--chart-2))",
  },
  cyber_security: {
    label: "Cyber Security",
    color: "hsl(var(--chart-3))",
  },
  standard_pathway: {
    label: "Standard Pathway",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function ChartBarMultiple({ degreeProgram = "cs" }: ChartBarMultipleProps) {
  const [chartData, setChartData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchPathwayData = async () => {
      setLoading(true)
      setError(null)

      console.log(`Fetching pathway data for degree program: ${degreeProgram}`);
      
      
      try {
        const response = await fetch(
          `http://localhost:5050/api/filtered-pathway-forecasts?model=xgboost&degree_program=${degreeProgram}`
        )
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: APIResponse = await response.json()
        
        if (data.status === 'success' && data.forecast_data.length > 0) {
          // Transform API data to chart format
          const transformedData = transformAPIDataToChartFormat(data.forecast_data)
          setChartData(transformedData)
        } else {
          throw new Error('No forecast data available')
        }
      } catch (err) {
        console.error('Failed to fetch pathway data:', err)
        setError('Failed to load pathway predictions')
        // Fallback to default data
        setChartData([
          {
            year: "2022",
            artificial_intelligence: 42,
            data_science: 35,
            cyber_security: 28,
            standard_pathway: 45,
          },
          {
            year: "2023",
            artificial_intelligence: 45,
            data_science: 38,
            cyber_security: 32,
            standard_pathway: 42,
          },
          {
            year: "2024",
            artificial_intelligence: 48,
            data_science: 42,
            cyber_security: 35,
            standard_pathway: 40,
          },
          {
            year: "2025",
            artificial_intelligence: 52,
            data_science: 46,
            cyber_security: 38,
            standard_pathway: 38,
          },
          {
            year: "2026",
            artificial_intelligence: 56,
            data_science: 50,
            cyber_security: 42,
            standard_pathway: 36,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPathwayData()
  }, [degreeProgram])

  const transformAPIDataToChartFormat = (forecastData: PathwayForecast[]) => {
    // Group data by year
    const groupedByYear: { [year: string]: any } = {}
    
    forecastData.forEach(item => {
      const year = item.year.toString()
      if (!groupedByYear[year]) {
        groupedByYear[year] = { year }
      }
      
      // Convert pathway name to chart key format
      const pathwayKey = item.pathway.toLowerCase().replace(/\s+/g, '_')
      groupedByYear[year][pathwayKey] = Math.round(item.enrollment_total)
    })
    
    // Convert to array and sort by year
    return Object.values(groupedByYear).sort((a: any, b: any) => 
      parseInt(a.year) - parseInt(b.year)
    )
  }

  const calculateTrendPercentage = () => {
    if (chartData.length < 2) return 0
    
    const firstYear = chartData[0]
    const lastYear = chartData[chartData.length - 1]
    
    const firstTotal = Object.keys(firstYear)
      .filter(key => key !== 'year')
      .reduce((sum, key) => sum + (firstYear[key] || 0), 0)
    
    const lastTotal = Object.keys(lastYear)
      .filter(key => key !== 'year')
      .reduce((sum, key) => sum + (lastYear[key] || 0), 0)
    
    return Math.round(((lastTotal - firstTotal) / firstTotal) * 100)
  }

  if (loading) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Pathway Enrollment Predictions</CardTitle>
          <CardDescription>Loading pathway forecasts...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading predictions...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Pathway Enrollment Predictions</CardTitle>
        <CardDescription>
          {error 
            ? "Estimated pathway forecasts (API unavailable)" 
            : `AI-powered enrollment forecasts by specialization pathway (${degreeProgram.toUpperCase()})`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="artificial_intelligence"
              fill="var(--color-artificial_intelligence)"
              radius={4}
            />
            <Bar
              dataKey="data_science"
              fill="var(--color-data_science)"
              radius={4}
            />
            <Bar
              dataKey="cyber_security"
              fill="var(--color-cyber_security)"
              radius={4}
            />
            <Bar
              dataKey="standard_pathway"
              fill="var(--color-standard_pathway)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-emerald-600">
          {error ? "Estimated trends" : `Pathway trends: ${calculateTrendPercentage() > 0 ? '+' : ''}${calculateTrendPercentage()}%`}{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {error 
            ? "Showing estimated enrollment trends (API connection failed)"
            : "Showing predicted enrollment trends across all specialization pathways"
          }
        </div>
      </CardFooter>
    </Card>
  )
}
