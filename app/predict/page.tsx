"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, BarChart, LineChart } from "@/components/ui/charts"
import { CalendarIcon, GraduationCapIcon, BarChartIcon, TrendingUpIcon, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Dummy data for enrollment trends
const enrollmentData = [
  { month: "Jan", enrolled: 230, predicted: 240, target: 250 },
  { month: "Feb", enrolled: 280, predicted: 290, target: 300 },
  { month: "Mar", enrolled: 320, predicted: 340, target: 350 },
  { month: "Apr", enrolled: 350, predicted: 360, target: 370 },
  { month: "May", enrolled: 410, predicted: 420, target: 430 },
  { month: "Jun", enrolled: 450, predicted: 470, target: 480 },
  { month: "Jul", enrolled: null, predicted: 520, target: 530 },
  { month: "Aug", enrolled: null, predicted: 550, target: 560 },
  { month: "Sep", enrolled: null, predicted: 580, target: 600 },
];

// Dummy data for department comparison
const departmentData = [
  { name: "Computer Science", students: 420, growth: 12 },
  { name: "Business", students: 380, growth: 8 },
  { name: "Engineering", students: 350, growth: 15 },
  { name: "Arts", students: 280, growth: 5 },
  { name: "Medicine", students: 320, growth: 10 },
];

const coursePopularity = [
  { course: "Machine Learning", students: 180 },
  { course: "Data Structures", students: 165 },
  { course: "Web Development", students: 150 },
  { course: "AI Fundamentals", students: 135 },
  { course: "Mobile App Dev", students: 120 },
];

const PredictionDashboard = () => {
  return (
    <div className='w-full min-h-screen bg-white font-poppins'>
      <div className='container mx-auto py-8 px-4'>
        <div className='flex flex-col gap-6'>
          {/* Header */}
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
            <div>
              <h1 className='text-3xl font-bold mb-2'>Enrollment Prediction</h1>
              <p className='text-muted-foreground'>Monitor and forecast course enrollment trends</p>
            </div>
            <div className='flex gap-4 mt-4 md:mt-0'>
              <Select defaultValue="2023">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
              <Button>Export Report</Button>
            </div>
          </div>
          
          {/* Overview Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-2 text-primary" />
                  <div className="text-2xl font-bold">2,840</div>
                </div>
                <Badge className="mt-2" variant="outline">
                  <TrendingUpIcon className="h-3 w-3 mr-1" /> +14.5%
                </Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Predicted Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BarChartIcon className="h-4 w-4 mr-2 text-primary" />
                  <div className="text-2xl font-bold">18.2%</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Compared to previous term
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <GraduationCapIcon className="h-4 w-4 mr-2 text-primary" />
                  <div className="text-2xl font-bold">92.4%</div>
                </div>
                <Badge className="mt-2" variant="outline">
                  <TrendingUpIcon className="h-3 w-3 mr-1" /> +3.1%
                </Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Enrollment Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                  <div className="text-2xl font-bold">3.2 days</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  From application to enrollment
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Bento Grid Layout */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Main Enrollment Chart - Spans 2 columns */}
            <Card className="col-span-1 md:col-span-2 row-span-2">
              <CardHeader>
                <CardTitle>Enrollment Trends & Predictions</CardTitle>
                <CardDescription>Actual vs predicted enrollment numbers</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="line">
                  <TabsList className="mb-4">
                    <TabsTrigger value="line">Line</TabsTrigger>
                    <TabsTrigger value="area">Area</TabsTrigger>
                  </TabsList>
                  <TabsContent value="line">
                    <LineChart
                      data={enrollmentData}
                      categories={["enrolled", "predicted", "target"]}
                      index="month"
                      colors={["blue", "orange", "gray"]}
                      yAxisWidth={40}
                      showLegend={true}
                      height={350}
                    />
                  </TabsContent>
                  <TabsContent value="area">
                    <AreaChart
                      data={enrollmentData}
                      categories={["enrolled", "predicted"]}
                      index="month"
                      colors={["blue", "orange"]}
                      yAxisWidth={40}
                      showLegend={true}
                      height={350}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Department Comparison */}
            <Card className="col-span-1 row-span-1">
              <CardHeader>
                <CardTitle>Department Growth</CardTitle>
                <CardDescription>Enrollment by department</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={departmentData}
                  categories={["students"]}
                  index="name"
                  colors={["blue"]}
                  layout="vertical"
                  height={280}
                  valueFormatter={(value) => `${value} students`}
                />
              </CardContent>
            </Card>
            
            {/* Course Popularity */}
            <Card className="col-span-1 row-span-1">
              <CardHeader>
                <CardTitle>Most Popular Courses</CardTitle>
                <CardDescription>By enrollment numbers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coursePopularity.map((course, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 text-muted-foreground">{index + 1}</span>
                        <span className="font-medium truncate max-w-[140px]">{course.course}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {course.students} students
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Predictive Insights */}
            <Card className="col-span-1 md:col-span-3">
              <CardHeader>
                <CardTitle>Enrollment Prediction Insights</CardTitle>
                <CardDescription>AI-generated recommendations based on trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <TrendingUpIcon className="h-4 w-4 mr-2 text-green-500" />
                      Growth Opportunity
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Computer Science department shows 12% growth potential in the next term. Consider adding 2-3 more sections.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium mb-2">Resource Allocation</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on enrollment predictions, additional instructors will be needed for the Machine Learning and AI courses.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-medium mb-2">Revenue Forecast</h3>
                    <p className="text-sm text-muted-foreground">
                      Projected 18% increase in tuition revenue based on current enrollment trends and prediction models.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionDashboard