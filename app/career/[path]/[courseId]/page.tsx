/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BrainCircuit, ChevronRight, Clock, GraduationCap, MapPin, Star, TrendingUp, Users, Award, BookOpen, Calendar, DollarSign, BarChart3, PieChart, LineChart, Building2, Leaf, Car, Mountain, Factory, Flame, Settings, Bot, Zap, Cpu, Gauge, Radio, Code, Shield, Globe, Eye, Microchip, Layers, Stethoscope, Scissors, Baby, Ambulance, Smile, Heart, Cat, Bird, Megaphone, Target, Lightbulb, Smartphone, Calculator, CreditCard, Scale, Briefcase, Flag, Home, Ship, Copyright, PenTool, Languages, Tv, Palette, Hammer, Monitor, Music, FileMusic, Headphones } from 'lucide-react'
import { DegreeProgram, getCareerPrograms } from '../../../../public/data/coursedata'
import { ChartBarLabel } from '@/components/BarChartPredict'
import { ChartBarMultiple } from '@/components/MultiBarChartPredict'

interface CourseDetailPageProps {
  params: Promise<{
    path: string
    courseId: string
  }>
}

interface EnrollmentPrediction {
  applications_pred: number
  course_name: string
  enrollments_pred: number
  model: string
  university: string
  year: number
}

interface EnrollmentAPIResponse {
  description: string
  filters_applied: {
    course: string
    model: string
    university: string
    year: number | null
  }
  message: string
  predictions: EnrollmentPrediction[]
  source: string
  status: string
  total_filtered_records: number
  view_type: string
}

const CourseDetailPage = ({ params }: CourseDetailPageProps) => {
  const { path, courseId } = React.use(params)
  const degreePrograms = getCareerPrograms(path)
  const course = degreePrograms.find(program => program.id === courseId)
  
  const [logoError, setLogoError] = React.useState(false)
  const [enrollmentData, setEnrollmentData] = React.useState<{ year: string; enrollments: number }[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  if (!course) {
    return <div>Course not found</div>
  }

  const formatCareerTitle = (path: string) => {
    if (!path) return ''
    if (path === 'it') return 'Information Technology'
    return path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  // Extract degree program for API calls based on course ID
  const getDegreeProgram = (courseId: string) => {
    console.log(`Extracting degree program for courseId: ${courseId}`);
    
    const programMap: { [key: string]: string } = {
      // Computer Science courses
      'cs-ucsc': 'cs',
      'cs-peradeniya': 'cs',
      'cs-moratuwa': 'cs',
      'cs-kelaniya': 'cs',
      'cs-ruhuna': 'cs',
      
      // IT courses
      'it-ucsc': 'it',
      'it-moratuwa': 'it',
      'it-seusl': 'it',
      'it-ousl': 'it',
      
      // Engineering courses
      'eng-moratuwa': 'eng',
      'eng-peradeniya': 'eng',
      'eng-ruhuna': 'eng',
      
      // Business courses
      'bus-colombo': 'bus',
      'bus-kelaniya': 'bus',
      'bus-jayewardenepura': 'bus',
      
      // Medicine courses
      'med-colombo': 'med',
      'med-peradeniya': 'med',
      'med-kelaniya': 'med',
      
      // Data Science courses
      'ds-ucsc': 'ds',
      'ds-moratuwa': 'ds'
    }
    
    // If exact match found, return it
    if (programMap[courseId]) {
      return programMap[courseId]
    }
    
    // Otherwise, try to extract from courseId prefix
    if (courseId.startsWith('cs-')) return 'cs'
    if (courseId.startsWith('it-')) return 'it'
    if (courseId.startsWith('eng-')) return 'eng'
    if (courseId.startsWith('bus-')) return 'bus'
    if (courseId.startsWith('med-')) return 'med'
    if (courseId.startsWith('ds-')) return 'ds'
    
    // Default fallback
    return 'cs'
  }

  // Extract university and course from course data
  const getUniversityName = (universityName: string) => {
    // Map display names to API names
    const universityMap: { [key: string]: string } = {
      'University of Colombo': 'colombo',
      'University of Colombo School of Computing (UCSC)': 'colombo',
      'University of Colombo School of Computing': 'colombo',
      'University of Peradeniya': 'peradeniya',
      'University of Kelaniya': 'kelaniya',
      'University of Moratuwa': 'moratuwa',
      'University of Sri Jayewardenepura': 'jayewardenepura',
      'University of Ruhuna': 'ruhuna',
      'Eastern University (Trincomalee Campus)': 'eastern',
      'South Eastern University of Sri Lanka': 'south-eastern',
      'University of Vavuniya': 'vavuniya',
      'Open University of Sri Lanka': 'open-university',
      'Sabaragamuwa University of Sri Lanka': 'sabaragamuwa'
    }
    return universityMap[universityName] || universityName.toLowerCase().replace(/university of /, '').replace(/\s+/g, '')
  }

  const getCourseParam = (courseTitle: string) => {
    // Extract main course name and clean it for API
    const cleaned = courseTitle.toLowerCase()
      .replace(/bachelor of |b\.sc\.|degree in |honors in |honours in /gi, '')
      .replace(/\s+/g, ' ')
      .trim()
    
    // Extract just the core subject name
    const coreSubjects = [
      'computer science',
      'information systems',
      'software engineering', 
      'information technology',
      'Information & Communication Technology',
      'data science',
      'engineering',
      'mechanical engineering',
      'electrical engineering',
      'chemical engineering',
      'electronic engineering',
      'medicine',
      'business administration',
      'accounting',
      'finance',
      'marketing',
      'management',
      'economics',
      'mathematics',
      'physics',
      'chemistry',
      'biology'
    ]
    
    // Find matching core subject
    for (const subject of coreSubjects) {
      if (cleaned.includes(subject)) {
        return subject
      }
    }
    
    // If no match found, return the first two words
    const words = cleaned.split(' ')
    return words.slice(0, 2).join(' ')
  }

  // Fetch enrollment predictions
  React.useEffect(() => {
    const fetchEnrollmentData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const university = getUniversityName(course.university)
        const courseParam = getCourseParam(course.title)
        
        const response = await fetch(
          `http://localhost:5050/api/simple-course-enrollment-prediction?model=xgboost&university=${university}&course=${encodeURIComponent(courseParam)}`
        )
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: EnrollmentAPIResponse = await response.json()
        console.log('Enrollment API Response:', data);
        console.log('University:', university);
        console.log('Course Param:', courseParam);
        
        
        if (data.status === 'success' && data.predictions.length > 0) {
          // Filter predictions for the exact course match and aggregate by year
          const courseMatches = data.predictions.filter(pred => 
            pred.course_name.toLowerCase().includes(courseParam.split(' ')[0]) // Match main keyword
          )
          
          // Group by year and sum enrollments if multiple courses
          const yearlyData = courseMatches.reduce((acc, pred) => {
            const existingYear = acc.find(item => item.year === pred.year.toString())
            if (existingYear) {
              existingYear.enrollments += Math.round(pred.enrollments_pred)
            } else {
              acc.push({
                year: pred.year.toString(),
                enrollments: Math.round(pred.enrollments_pred)
              })
            }
            return acc
          }, [] as { year: string; enrollments: number }[])
          
          // Sort by year
          yearlyData.sort((a, b) => parseInt(a.year) - parseInt(b.year))
          
          setEnrollmentData(yearlyData)
        } 
      } catch (err) {
        console.error('Failed to fetch enrollment data:', err)
        setError('Failed to load enrollment predictions')
        // Fallback to default data
        setEnrollmentData([
          { year: "2024", enrollments: 120 },
          { year: "2025", enrollments: 150 },
          { year: "2026", enrollments: 180 },
          { year: "2027", enrollments: 220 },
          { year: "2028", enrollments: 280 },
          { year: "2029", enrollments: 350 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollmentData()
  }, [course.university, course.title])

  // Calculate growth percentage
  const calculateGrowthPercentage = () => {
    if (enrollmentData.length < 2) return 25
    const firstYear = enrollmentData[0]?.enrollments || 0
    const lastYear = enrollmentData[enrollmentData.length - 1]?.enrollments || 0
    return Math.round(((lastYear - firstYear) / firstYear) * 100)
  }

  const jobMarketData = {
    demandScore: 8.5,
    salaryRange: '$45,000 - $85,000',
    jobGrowth: '+15%',
    employmentRate: '94%'
  }

  const skillsData = [
    { skill: 'Technical Skills', percentage: 85 },
    { skill: 'Problem Solving', percentage: 78 },
    { skill: 'Communication', percentage: 72 },
    { skill: 'Leadership', percentage: 65 }
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="relative z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-maroon-700 rounded-lg flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ACADEMITREND</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-maroon-700 font-medium transition-colors text-sm">Home</Link>
              <Link href="/universities" className="text-gray-600 hover:text-maroon-700 font-medium transition-colors text-sm">Universities</Link>
              <Link href="/programs" className="text-gray-600 hover:text-maroon-700 font-medium transition-colors text-sm">Programs</Link>
              <Link href="/trends" className="text-gray-600 hover:text-maroon-700 font-medium transition-colors text-sm">Trends</Link>
              <Link href="/about" className="text-gray-600 hover:text-maroon-700 font-medium transition-colors text-sm">About</Link>
            </nav>

            <Link href="/salary-prediction" className="bg-maroon-700 text-white px-6 py-2 rounded-full hover:bg-maroon-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm">
              Salary Prediction
            </Link>
          </div>
        </div>
      </header>

      
      {/* Course Header */}
      <section className="bg-gradient-to-br from-maroon-50 via-maroon-100 to-maroon-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 text-sm text-maroon-700">
            <Link href="/" className="hover:text-maroon-800 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/career/${path}`} className="hover:text-maroon-800 capitalize transition-colors">{formatCareerTitle(path)}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-maroon-800 font-medium">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-white/90 backdrop-blur-sm border border-maroon-200 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
                  {!logoError ? (
                    <Image
                      src={course.campusLogo}
                      alt={`${course.university} logo`}
                      width={76}
                      height={76}
                      className="object-contain p-2"
                      priority
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <GraduationCap className="w-12 h-12 text-maroon-600" />
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-maroon-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                      {course.level}
                    </span>
                    <span className="bg-white/90 text-maroon-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-maroon-200 shadow-md">
                      {course.duration}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 leading-tight">{course.title}</h1>
                    <p className="text-lg lg:text-xl text-gray-700 font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-maroon-600" />
                      {course.university}
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed max-w-2xl">{course.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-6 h-6 bg-maroon-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-maroon-700" />
                  </div>
                  Quick Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                      <Clock className="w-4 h-4 text-maroon-600" /> Duration
                    </span>
                    <span className="font-bold text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                      <GraduationCap className="w-4 h-4 text-maroon-600" /> Level
                    </span>
                    <span className="font-bold text-gray-900">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                      <Users className="w-4 h-4 text-green-600" /> Employment Rate
                    </span>
                    <span className="font-bold text-green-600">{jobMarketData.employmentRate}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                      <TrendingUp className="w-4 h-4 text-blue-600" /> Job Growth
                    </span>
                    <span className="font-bold text-green-600">{jobMarketData.jobGrowth}</span>
                  </div>
                </div>
                <Link
                  href={course.enrollLink}
                  className="w-full bg-gradient-to-r from-maroon-700 to-maroon-800 text-white px-6 py-3 rounded-xl text-center font-bold hover:from-maroon-800 hover:to-maroon-900 transition-all duration-200 mt-6 block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialization Pathways */}
      {course.pathways && course.pathways.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Specialization Pathways</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose your area of focus and specialize in cutting-edge fields that match your career aspirations.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {course.pathways.map((pathway, index) => {
                // Dynamic icon component rendering
                const getIconComponent = (iconName: string) => {
                  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                    BrainCircuit, BarChart3, Shield, LineChart, BookOpen, Code, Globe, Eye, Microchip, Layers,
                    Building2, Leaf, Car, Mountain, Factory, Flame, Settings, Bot, Zap, Cpu, Gauge, Radio,
                    Stethoscope, Scissors, Baby, Ambulance, Smile, Heart, Cat, Bird, DollarSign, Megaphone,
                    Users, Target, Lightbulb, Smartphone, Calculator, CreditCard, Scale, Briefcase, Flag,
                    Home, Ship, Copyright, GraduationCap, PenTool, Languages, Tv, Palette, Hammer, Monitor,
                    Music, FileMusic, Headphones
                  }
                  const IconComponent = iconMap[iconName] || BookOpen
                  return <IconComponent className="w-8 h-8 text-maroon-700" />
                }

                return (
                  <div 
                    key={index}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-maroon-200 cursor-pointer transform hover:-translate-y-1 flex flex-col w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-19.2px)] min-h-[280px] max-w-[240px]"
                  >
                    <div className="text-center flex flex-col h-full">
                      {/* Icon Container */}
                      <div className="w-16 h-16 bg-gradient-to-br from-maroon-100 to-maroon-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-maroon-200 group-hover:to-maroon-300 transition-all duration-300 flex-shrink-0">
                        {getIconComponent(pathway.icon)}
                      </div>
                      
                      {/* Title */}
                      <div className="mb-4 flex-shrink-0">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-maroon-700 transition-colors leading-tight min-h-[3.5rem] flex items-center justify-center text-center px-2">
                          {pathway.name}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <div className="flex-grow flex items-start justify-center">
                        <p className="text-sm text-gray-600 leading-relaxed text-center">
                          {pathway.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-maroon-600/5 to-maroon-700/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                )
              })}
            </div>

            {/* Multiple Chart Container - Enhanced styling */}
            <div className="mt-16 mb-10">
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100">
                <div className="max-w-full mx-auto">
                  <ChartBarMultiple degreeProgram={getDegreeProgram(courseId)} />
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <button className="bg-gradient-to-r from-maroon-700 to-maroon-600 text-white px-8 py-3 rounded-full font-semibold hover:from-maroon-800 hover:to-maroon-700 transition-colors duration-200 shadow-lg">
                Learn More About Pathways
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Analytics Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Course <span className="text-maroon-700">Analytics</span> & Trends
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Data-driven insights to help you make informed decisions about your educational journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {/* Enrollment Trends - Enhanced container */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 h-full min-h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <div className="w-12 h-12 border-3 border-maroon-700 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-gray-600 text-lg">Loading enrollment predictions...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <p className="text-red-600 mb-3 text-lg font-medium">Failed to load predictions</p>
                    <p className="text-gray-500">Showing estimated data</p>
                  </div>
                </div>
              ) : null}
              
              <div className="h-full">
                <ChartBarLabel 
                  data={enrollmentData}
                  title={`${course.title} - Enrollment Predictions`}
                  description={error ? "Estimated data - API unavailable" : "AI-powered predictions from historical data"}
                  growthPercentage={calculateGrowthPercentage()}
                />
              </div>
            </div>

            {/* Skills Development - Enhanced container */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 h-full min-h-[500px]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-maroon-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-maroon-700" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Skills Development</h3>
              </div>
              <div className="space-y-8">
                {skillsData.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex justify-between mb-3">
                      <span className="text-base font-semibold text-gray-700">{skill.skill}</span>
                      <span className="text-base font-bold text-maroon-700">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-maroon-600 to-maroon-700 h-4 rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-br from-maroon-50 to-maroon-100 rounded-2xl">
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  Skills assessment based on industry requirements and graduate feedback
                </p>
              </div>
            </div>
          </div>

          {/* Job Market Analysis */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-maroon-700" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Market Demand</h4>
              <p className="text-2xl font-bold text-maroon-700">{jobMarketData.demandScore}/10</p>
              <p className="text-sm text-gray-600">Very High Demand</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-maroon-700" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Salary Range</h4>
              <p className="text-lg font-bold text-maroon-700">{jobMarketData.salaryRange}</p>
              <p className="text-sm text-gray-600">Entry to Mid-level</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-maroon-700" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Employment Rate</h4>
              <p className="text-2xl font-bold text-green-600">{jobMarketData.employmentRate}</p>
              <p className="text-sm text-gray-600">Within 6 months</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="w-6 h-6 text-maroon-700" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Job Growth</h4>
              <p className="text-2xl font-bold text-green-600">{jobMarketData.jobGrowth}</p>
              <p className="text-sm text-gray-600">Next 5 years</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Predictions Section */}
      <section className="bg-gradient-to-br from-maroon-50 to-maroon-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">AI-Powered Predictions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-5 h-5 text-maroon-700" />
                <h3 className="text-lg font-bold text-gray-900">2025 Enrollment Forecast</h3>
              </div>
              <p className="text-3xl font-bold text-maroon-700 mb-2">350+ Students</p>
              <p className="text-sm text-gray-600">Based on current trends and market demand analysis</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-maroon-700" />
                <h3 className="text-lg font-bold text-gray-900">Career Success Rate</h3>
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">96%</p>
              <p className="text-sm text-gray-600">Predicted employment rate for 2025 graduates</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-maroon-700" />
                <h3 className="text-lg font-bold text-gray-900">Industry Growth</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">+22%</p>
              <p className="text-sm text-gray-600">Projected industry expansion by 2027</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CourseDetailPage
