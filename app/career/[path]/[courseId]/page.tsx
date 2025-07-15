/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BrainCircuit, ChevronRight, Clock, GraduationCap, MapPin, Star, TrendingUp, Users, Award, BookOpen, Calendar, DollarSign, BarChart3, PieChart, LineChart, Building2, Leaf, Car, Mountain, Factory, Flame, Settings, Bot, Zap, Cpu, Gauge, Radio, Code, Shield, Globe, Eye, Microchip, Layers, Stethoscope, Scissors, Baby, Ambulance, Smile, Heart, Cat, Bird, Megaphone, Target, Lightbulb, Smartphone, Calculator, CreditCard, Scale, Briefcase, Flag, Home, Ship, Copyright, PenTool, Languages, Tv, Palette, Hammer, Monitor, Music, FileMusic, Headphones } from 'lucide-react'
import { DegreeProgram, getCareerPrograms } from '../../../../public/data/coursedata'

interface CourseDetailPageProps {
  params: Promise<{
    path: string
    courseId: string
  }>
}

const CourseDetailPage = ({ params }: CourseDetailPageProps) => {
  const { path, courseId } = React.use(params)
  const degreePrograms = getCareerPrograms(path)
  const course = degreePrograms.find(program => program.id === courseId)
  
  const [logoError, setLogoError] = React.useState(false)

  if (!course) {
    return <div>Course not found</div>
  }

  const formatCareerTitle = (path: string) => {
    if (!path) return ''
    if (path === 'it') return 'Information Technology'
    return path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  
  const enrollmentTrends = [
    { year: 2020, students: 120 },
    { year: 2021, students: 150 },
    { year: 2022, students: 180 },
    { year: 2023, students: 220 },
    { year: 2024, students: 280 }
  ]

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

            <button className="bg-maroon-700 text-white px-6 py-2 rounded-full hover:bg-maroon-800 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      
      {/* Course Header */}
      <section className="bg-gradient-to-br from-maroon-50 to-maroon-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-28 aspect-square  backdrop-blur-lg border border-maroon-100 rounded-full flex items-center justify-center shadow-xl overflow-clip relative">
                  {!logoError ? (
                    <Image
                      src={course.campusLogo}
                      alt={`${course.university} logo`}
                      width={100}
                      height={100}
                      className="object-contain object-center"
                      priority
                      onError={() => {
                        console.error('Logo failed to load:', course.campusLogo);
                        setLogoError(true);
                      }}
                    />
                  ) : (
                    <GraduationCap className="w-12 h-12 text-maroon-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-gradient-to-r from-maroon-700 to-maroon-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
                      {course.level}
                    </span>
                    <span className="bg-white text-maroon-700 px-4 py-1 rounded-full text-sm font-semibold border border-maroon-100 shadow">
                      {course.duration}
                    </span>
                  </div>
                  <h1 className="text-4xl font-extrabold text-gray-900 mb-1 leading-tight">{course.title}</h1>
                  <p className="text-lg text-gray-500 font-medium">{course.university}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Quick Stats
              </h3>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-maroon-600" /> Duration
                  </span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4 text-maroon-600" /> Level
                  </span>
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-green-600" /> Employment Rate
                  </span>
                  <span className="font-semibold text-green-600">{jobMarketData.employmentRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <TrendingUp className="w-4 h-4 text-blue-600" /> Job Growth
                  </span>
                  <span className="font-semibold text-green-600">{jobMarketData.jobGrowth}</span>
                </div>
              </div>
              <Link
                href={course.enrollLink}
                className="w-full bg-gradient-to-r from-maroon-700 to-maroon-600 text-white px-6 py-3 rounded-full text-center font-semibold hover:from-maroon-800 hover:to-maroon-700 transition-colors duration-200 mt-8 block shadow"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      
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
            
            <div className="mt-10 text-center">
            
              <button className="bg-gradient-to-r from-maroon-700 to-maroon-600 text-white px-8 py-3 rounded-full font-semibold hover:from-maroon-800 hover:to-maroon-700 transition-colors duration-200 shadow-lg">
                Learn More About Pathways
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Analytics Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Course Analytics & Trends</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Enrollment Trends */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-maroon-700" />
                <h3 className="text-xl font-bold text-gray-900">Enrollment Trends</h3>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {enrollmentTrends.map((data, index) => (
                  <div key={data.year} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-maroon-600 rounded-t-lg w-full transition-all duration-1000 ease-out"
                      style={{ height: `${(data.students / 300) * 200}px` }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 mt-2">{data.year}</span>
                    <span className="text-xs text-gray-500">{data.students}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Enrollment has grown by 133% over the past 5 years, indicating strong demand.
              </p>
            </div>

            {/* Skills Development */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-maroon-700" />
                <h3 className="text-xl font-bold text-gray-900">Skills Development</h3>
              </div>
              <div className="space-y-4">
                {skillsData.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                      <span className="text-sm text-gray-500">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-maroon-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
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

      {/* Predictions Section */}
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
