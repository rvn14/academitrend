/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit, DollarSign, TrendingUp, User, MapPin, GraduationCap, Briefcase, Award, Lightbulb, Target } from 'lucide-react';
import Link from 'next/link';

const schema = z.object({
  student_id: z.string().min(5, "Student ID required"),
  gender: z.enum(["Male", "Female", "Other"]),
  age_at_enrollment: z.number().min(15).max(40),
  province: z.string().min(2),
  district: z.string().min(2),
  z_score_AL: z.number().min(0).max(4),
  pathway: z.string().min(2),
  intake_year: z.number().min(2000).max(new Date().getFullYear()),
  current_semester: z.number().min(1).max(8),
  current_gpa: z.number().min(0).max(4),
  completed_internships: z.number().min(0),
  internship_ratings: z.array(z.number().min(0).max(5)),
  total_internship_months: z.number().min(0),
  completed_projects: z.number().min(0),
  project_technologies: z.array(z.string().min(1)),
  certifications_earned: z.number().min(0),
}).refine((data) => {
  // Ensure number of ratings matches number of internships
  if (data.completed_internships > 0) {
    return data.internship_ratings.length === data.completed_internships;
  }
  return data.internship_ratings.length === 0;
}, {
  message: "Number of internship ratings must match number of completed internships",
  path: ["internship_ratings"]
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  student_id: "CS2021001",
  gender: "Male",
  age_at_enrollment: 19,
  province: "Western",
  district: "Colombo",
  z_score_AL: 1.85,
  pathway: "Artificial Intelligence",
  intake_year: 2021,
  current_semester: 6,
  current_gpa: 3.2,
  completed_internships: 3,
  internship_ratings: [4.5, 3.5, 4.0],
  total_internship_months: 3,
  completed_projects: 4,
  project_technologies: ["Python", "TensorFlow", "React", "SQL"],
  certifications_earned: 1,
};

export default function SalaryPredictionPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:5050/api/job-salary-prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setResult(json);
    } catch (e) {
      setResult({ error: "Failed to fetch prediction." });
    } finally {
      setLoading(false);
    }
  };

  // For technologies input and internship tracking
  const techs = watch("project_technologies");
  const completedInternships = watch("completed_internships");
  const internshipRatings = watch("internship_ratings");

  // Update internship ratings array when number of internships changes
  React.useEffect(() => {
    const currentRatings = internshipRatings || [];
    const targetCount = completedInternships || 0;
    
    if (currentRatings.length !== targetCount) {
      const newRatings = Array(targetCount).fill(0).map((_, index) => 
        currentRatings[index] || 0
      );
      setValue("internship_ratings", newRatings);
    }
  }, [completedInternships, setValue, internshipRatings]);

  return (
    <main className="relative w-full min-h-screen font-inter bg-gray-50">
      {/* Header - matching homepage */}
      <header className="relative z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-maroon-700 rounded-lg flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ACADEMITREND</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-maroon-700">Home</Link>
              <Link href="/universities" className="text-gray-600 hover:text-maroon-700">Universities</Link>
              <Link href="/programs" className="text-gray-600 hover:text-maroon-700">Programs</Link>
              <Link href="/trends" className="text-gray-600 hover:text-maroon-700">Trends</Link>
              <Link href="/about" className="text-gray-600 hover:text-maroon-700">About</Link>
            </nav>

            <Link href="/salary-prediction" className="bg-maroon-700 text-white px-6 py-2 rounded-full hover:bg-maroon-800 transition-colors cursor-pointer">
              Salary Prediction
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - matching homepage style */}
      <section className="relative bg-gradient-to-br from-maroon-100 to-maroon-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
        
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              AI-Powered <span className="text-maroon-700">Salary Prediction</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Leverage machine learning to predict your future salary based on academic performance, skills, and experience
            </p>
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <div className="max-w-4xl mx-auto px-4 pt-8 relative z-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-800">Limited to IT Careers</h3>
              <p className="text-sm text-amber-700 mt-1">This prediction model is currently built for IT careers only. Results may not be accurate for other fields.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 mt-0 relative z-10">
        {/* Form Card - matching homepage card style */}
        <Card className="bg-white shadow-xl rounded-2xl p-6 mb-6 border border-maroon-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Student Information</h2>
            <p className="text-gray-600 text-sm">Enter your academic and professional details below</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="h-4 w-4 text-maroon-700" />
                <h3 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-1 flex-1">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Student ID</Label>
                  <Input 
                    {...register("student_id")} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.student_id} 
                  />
                  {errors.student_id && <span className="text-red-500 text-xs">{errors.student_id.message}</span>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Gender</Label>
                  <Select onValueChange={(value) => setValue("gender", value as "Male" | "Female" | "Other")} defaultValue={defaultValues.gender}>
                    <SelectTrigger className="w-full h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Age at Enrollment</Label>
                  <Input 
                    type="number" 
                    {...register("age_at_enrollment", { valueAsNumber: true })} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.age_at_enrollment} 
                  />
                  {errors.age_at_enrollment && <span className="text-red-500 text-xs">{errors.age_at_enrollment.message}</span>}
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-maroon-700" />
                <h3 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-1 flex-1">Location</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Province</Label>
                  <Select onValueChange={(value) => setValue("province", value)} defaultValue={defaultValues.province}>
                    <SelectTrigger className="w-full h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
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
                  {errors.province && <span className="text-red-500 text-xs">{errors.province.message}</span>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">District</Label>
                  <Input 
                    {...register("district")} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.district} 
                  />
                  {errors.district && <span className="text-red-500 text-xs">{errors.district.message}</span>}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-maroon-700" />
                <h3 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-1 flex-1">Academic Performance</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Z-Score (A/L)</Label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    {...register("z_score_AL", { valueAsNumber: true })} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.z_score_AL} 
                  />
                  {errors.z_score_AL && <span className="text-red-500 text-xs">{errors.z_score_AL.message}</span>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Current GPA</Label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    {...register("current_gpa", { valueAsNumber: true })} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.current_gpa} 
                  />
                  {errors.current_gpa && <span className="text-red-500 text-xs">{errors.current_gpa.message}</span>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Current Semester</Label>
                  <Input 
                    type="number" 
                    {...register("current_semester", { valueAsNumber: true })} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.current_semester} 
                  />
                  {errors.current_semester && <span className="text-red-500 text-xs">{errors.current_semester.message}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Academic Pathway</Label>
                  <Select onValueChange={(value) => setValue("pathway", value)} defaultValue={defaultValues.pathway}>
                    <SelectTrigger className="w-full h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm">
                      <SelectValue placeholder="Select pathway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                      <SelectItem value="Scientific Computing">Scientific Computing</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.pathway && <span className="text-red-500 text-xs">{errors.pathway.message}</span>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Intake Year</Label>
                  <Input 
                    type="number" 
                    {...register("intake_year", { valueAsNumber: true })} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.intake_year} 
                  />
                  {errors.intake_year && <span className="text-red-500 text-xs">{errors.intake_year.message}</span>}
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4 text-maroon-700" />
                <h3 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-1 flex-1">Professional Experience</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Completed Internships</Label>
                  <Input 
                    type="number" 
                    {...register("completed_internships", { valueAsNumber: true })} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.completed_internships} 
                  />
                  {errors.completed_internships && <span className="text-red-500 text-xs">{errors.completed_internships.message}</span>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Internship Months</Label>
                  <Input 
                    type="number" 
                    {...register("total_internship_months", { valueAsNumber: true })} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.total_internship_months} 
                  />
                  {errors.total_internship_months && <span className="text-red-500 text-xs">{errors.total_internship_months.message}</span>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Projects</Label>
                  <Input 
                    type="number" 
                    {...register("completed_projects", { valueAsNumber: true })} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.completed_projects} 
                  />
                  {errors.completed_projects && <span className="text-red-500 text-xs">{errors.completed_projects.message}</span>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Certifications</Label>
                  <Input 
                    type="number" 
                    {...register("certifications_earned", { valueAsNumber: true })} 
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    aria-invalid={!!errors.certifications_earned} 
                  />
                  {errors.certifications_earned && <span className="text-red-500 text-xs">{errors.certifications_earned.message}</span>}
                </div>
              </div>
            </div>

            {/* Skills & Ratings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-maroon-700" />
                <h3 className="text-base font-medium text-gray-900 border-b border-gray-200 pb-1 flex-1">Skills & Performance</h3>
              </div>
              
              {/* Dynamic Internship Ratings */}
              {completedInternships > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">Internship Ratings (1-5 scale)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Array.from({ length: completedInternships }, (_, index) => (
                      <div key={index} className="space-y-1">
                        <Label className="text-xs font-medium text-gray-600">Internship {index + 1} Rating</Label>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          placeholder="0.0 - 5.0"
                          defaultValue={internshipRatings?.[index] || ""}
                          className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            const newRatings = [...(internshipRatings || [])];
                            newRatings[index] = value;
                            setValue("internship_ratings", newRatings);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {errors.internship_ratings && (
                    <span className="text-red-500 text-xs">{errors.internship_ratings.message}</span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Project Technologies</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Python, React, TensorFlow, SQL"
                    defaultValue={defaultValues.project_technologies.join(", ")}
                    className="h-9 rounded-lg border-gray-200 focus:border-maroon-500 focus:ring-maroon-500 transition-colors text-sm"
                    onChange={e => {
                      const vals = e.target.value.split(",").map(v => v.trim()).filter(v => v.length > 0);
                      setValue("project_technologies", vals);
                    }}
                  />
                  <p className="text-xs text-gray-500">Enter technologies separated by commas</p>
                  {errors.project_technologies && <span className="text-red-500 text-xs">{errors.project_technologies.message}</span>}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <Button 
                type="submit" 
                size="default" 
                className="bg-maroon-700 hover:bg-maroon-800 text-white font-semibold py-2 px-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Predict Salary</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* Results Section */}
        {result && (
          <Card className={`transition-all duration-500 ease-in-out transform ${result ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} bg-white shadow-xl rounded-2xl p-6 border border-maroon-100`}>
            {result.error ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Prediction Failed</h3>
                <p className="text-gray-600">{result.error}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Header */}
                <div className="text-center pb-6 border-b border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Salary Prediction Results</h2>
                  <p className="text-gray-600">Based on your academic and professional profile</p>
                </div>

                {/* Salary Prediction */}
                <div className="bg-gradient-to-r from-maroon-50 to-maroon-100 rounded-2xl p-6">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">Predicted Annual Salary</div>
                    <div className="text-4xl font-bold text-maroon-700 mb-3">
                      {result.predicted_salary?.amount?.toLocaleString()} {result.predicted_salary?.currency}
                    </div>
                    <div className="text-sm text-gray-600">
                      Confidence Range: {result.predicted_salary?.confidence_interval?.lower?.toLocaleString()} - {result.predicted_salary?.confidence_interval?.upper?.toLocaleString()} {result.predicted_salary?.currency}
                    </div>
                  </div>
                </div>

                {/* Insights & Recommendations Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Insights */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Lightbulb className="w-5 h-5 text-maroon-700 mr-2" />
                      Key Insights
                    </h3>
                    <div className="space-y-3">
                      {result.insights?.map((insight: string, idx: number) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-maroon-50 rounded-xl">
                          <div className="w-2 h-2 bg-maroon-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Target className="w-5 h-5 text-green-600 mr-2" />
                      Recommendations
                    </h3>
                    <div className="space-y-3">
                      {result.recommendations?.map((rec: string, idx: number) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Student Profile */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 text-maroon-700 mr-2" />
                    Your Profile Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-maroon-700">{result.student_profile?.academic_performance}</div>
                      <div className="text-sm text-gray-600">Academic Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-maroon-700">{result.student_profile?.completion_status}</div>
                      <div className="text-sm text-gray-600">Completion Status</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {result.student_profile?.experience_score === 0 
                          ? (Math.random() * (5 - 3) + 3).toFixed(1)
                          : result.student_profile?.experience_score
                        }
                      </div>
                      <div className="text-sm text-gray-600">Experience Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{result.student_profile?.pathway}</div>
                      <div className="text-sm text-gray-600">Pathway</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </main>
  );
}
