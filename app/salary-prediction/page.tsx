"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Loader2, TrendingUp, DollarSign, Users, Calendar, MapPin, Award, Code } from 'lucide-react'
import { toast } from 'sonner'

// Form validation schema
const formSchema = z.object({
  student_id: z.string().min(1, "Student ID is required"),
  gender: z.string().min(1, "Gender is required"),
  age_at_enrollment: z.number().min(18, "Age must be at least 18").max(65, "Age must be less than 65"),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  z_score_al: z.number().min(0, "Z-score must be at least 0").max(3, "Z-score must be at most 3"),
  pathway: z.string().min(1, "Pathway is required"),
  intake_year: z.number().min(2015, "Intake year must be at least 2015").max(2025, "Intake year cannot be in the future"),
  current_semester: z.number().min(1, "Current semester must be at least 1").max(8, "Current semester cannot exceed 8"),
  current_gpa: z.number().min(0, "GPA must be at least 0").max(4, "GPA cannot exceed 4"),
  completed_internships: z.number().min(0, "Completed internships cannot be negative").max(10, "Completed internships seems too high"),
  internship_ratings: z.array(z.number()).optional(),
  total_internship_months: z.number().min(0, "Total internship months cannot be negative").max(60, "Total internship months seems too high"),
  completed_projects: z.number().min(0, "Completed projects cannot be negative").max(50, "Completed projects seems too high"),
  project_technologies: z.array(z.string()).min(1, "At least one technology is required"),
  certifications_earned: z.number().min(0, "Certifications cannot be negative").max(20, "Certifications seems too high")
})

type FormData = z.infer<typeof formSchema>

interface PredictionResult {
  insights: string[]
  predicted_salary: {
    amount: number
    confidence_interval: {
      lower: number
      upper: number
    }
    currency: string
  }
  recommendations: string[]
}

const SalaryPredictionPage = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [technologies, setTechnologies] = useState<string[]>([])
  const [currentTech, setCurrentTech] = useState("")
  const [ratings, setRatings] = useState<number[]>([])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: "",
      gender: "",
      age_at_enrollment: 20,
      province: "",
      district: "",
      z_score_al: 1.5,
      pathway: "",
      intake_year: 2023,
      current_semester: 6,
      current_gpa: 3.0,
      completed_internships: 1,
      internship_ratings: [],
      total_internship_months: 3,
      completed_projects: 4,
      project_technologies: [],
      certifications_earned: 1
    }
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5050/api/job-salary-prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          project_technologies: technologies,
          internship_ratings: ratings
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get prediction')
      }

      const result: PredictionResult = await response.json()
      setPrediction(result)
      toast.success("Salary prediction generated successfully!")
    } catch (error) {
      console.error('Error:', error)
      toast.error("Failed to get salary prediction. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const addTechnology = () => {
    if (currentTech.trim() && !technologies.includes(currentTech.trim())) {
      const newTech = currentTech.trim()
      setTechnologies([...technologies, newTech])
      form.setValue('project_technologies', [...technologies, newTech])
      setCurrentTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    const newTechs = technologies.filter(t => t !== tech)
    setTechnologies(newTechs)
    form.setValue('project_technologies', newTechs)
  }

  const addRating = (rating: number) => {
    const newRatings = [...ratings, rating]
    setRatings(newRatings)
    form.setValue('internship_ratings', newRatings)
  }

  const removeRating = (index: number) => {
    const newRatings = ratings.filter((_, i) => i !== index)
    setRatings(newRatings)
    form.setValue('internship_ratings', newRatings)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Salary Prediction Tool
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get personalized salary predictions based on your academic performance, skills, and experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Student Information
              </CardTitle>
              <CardDescription>
                Fill in your details to get a personalized salary prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="student_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student ID</FormLabel>
                          <FormControl>
                            <Input placeholder="CS2021001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="age_at_enrollment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Age at Enrollment
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="20" 
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="intake_year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Intake Year</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="2023" 
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Province
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select province" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Western">Western</SelectItem>
                              <SelectItem value="Central">Central</SelectItem>
                              <SelectItem value="Southern">Southern</SelectItem>
                              <SelectItem value="Northern">Northern</SelectItem>
                              <SelectItem value="Eastern">Eastern</SelectItem>
                              <SelectItem value="North Western">North Western</SelectItem>
                              <SelectItem value="North Central">North Central</SelectItem>
                              <SelectItem value="Uva">Uva</SelectItem>
                              <SelectItem value="Sabaragamuwa">Sabaragamuwa</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select district" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Colombo">Colombo</SelectItem>
                              <SelectItem value="Gampaha">Gampaha</SelectItem>
                              <SelectItem value="Kalutara">Kalutara</SelectItem>
                              <SelectItem value="Kandy">Kandy</SelectItem>
                              <SelectItem value="Matale">Matale</SelectItem>
                              <SelectItem value="Nuwara Eliya">Nuwara Eliya</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Academic Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="z_score_al"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>A/L Z-Score</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01"
                              placeholder="1.85" 
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="current_semester"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Semester</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="6" 
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="current_gpa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current GPA</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01"
                              placeholder="3.20" 
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="pathway"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Pathway</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pathway" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                            <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                            <SelectItem value="Data Science">Data Science</SelectItem>
                            <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                            <SelectItem value="Computer Networks">Computer Networks</SelectItem>
                            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="completed_internships"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Completed Internships</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="1" 
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="total_internship_months"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Internship Months</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="3" 
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="completed_projects"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Completed Projects</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="4" 
                              {...field}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="certifications_earned"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Certifications Earned
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="1" 
                            {...field}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Technologies */}
                  <div className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Project Technologies
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology (e.g., Python, React)"
                        value={currentTech}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentTech(e.target.value)}
                        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      />
                      <Button type="button" onClick={addTechnology} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="cursor-pointer" onClick={() => removeTechnology(tech)}>
                          {tech} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Internship Ratings */}
                  <div className="space-y-3">
                    <FormLabel>Internship Ratings (1-5)</FormLabel>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button 
                          key={rating} 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => addRating(rating)}
                        >
                          {rating}★
                        </Button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ratings.map((rating, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeRating(index)}>
                          {rating}★ ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Prediction...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Get Salary Prediction
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Prediction Results */}
          <div className="space-y-6">
            {prediction && (
              <>
                {/* Salary Prediction Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-6 w-6" />
                      Predicted Salary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {prediction.predicted_salary.currency} {prediction.predicted_salary.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Range: {prediction.predicted_salary.currency} {Math.round(prediction.predicted_salary.confidence_interval.lower).toLocaleString()} - {prediction.predicted_salary.currency} {Math.round(prediction.predicted_salary.confidence_interval.upper).toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {prediction.insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {prediction.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}

            {!prediction && (
              <Card>
                <CardContent className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill out the form to get your personalized salary prediction
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryPredictionPage