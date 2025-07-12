'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BrainCircuit, ChevronRight, Clock, GraduationCap, MapPin, Star } from 'lucide-react'
import { DegreeProgram, getCareerPrograms } from '../../../public/data/coursedata'

interface CareerPageProps {
  params: Promise<{
    path: string
  }>
}

const CareerPage = ({ params }: CareerPageProps) => {
  const { path } = React.use(params)
  const degreePrograms = getCareerPrograms(path)

  const formatCareerTitle = (path: string) => {
    if (!path) return ''
    if (path === 'it') return 'Information Technology'
    return path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const CourseCard = ({ program }: { program: DegreeProgram }) => (
    <Link href={`/career/${path}/${program.id}`} className="block h-full">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full min-h-[500px]">
        <div className="relative h-48 bg-gradient-to-br from-maroon-50 to-maroon-100">
          <div className="absolute top-4 left-4 bg-maroon-700 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Clock className="w-3 h-3 inline mr-1" />
            {program.duration}
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="h-46 w-46 bg-white rounded-full flex items-center justify-center ">
              <Image
                src={program.campusLogo}
                alt={`logo`}
                width={250}
                height={250}
                className="rounded-full object-cover object-center"
              />
            </div>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-maroon-50 text-maroon-700 px-2 py-1 rounded-md text-xs font-medium">
              {program.level}
            </div>
            <GraduationCap className="w-4 h-4 text-maroon-600" />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
            {program.title}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-maroon-100 flex items-center justify-center">
              <span className="text-xs font-bold text-maroon-700">
                <Image
                src={program.campusLogo}
                alt={`logo`}
                width={250}
                height={250}
                className="rounded-full object-cover object-center"
              />
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">{program.university}</span>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-1">
            {program.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="bg-maroon-700 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-maroon-800 transition-colors duration-200 flex items-center gap-1">
              View Details
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )

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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-maroon-100 to-maroon-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-maroon-700">{formatCareerTitle(path)}</span> Degree Programs
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover comprehensive degree programs from top universities in Sri Lanka. Find the perfect program that matches your career aspirations.
            </p>

            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-maroon-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">Quality Education</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <MapPin className="w-8 h-8 text-maroon-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">Top Universities</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Star className="w-8 h-8 text-maroon-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">Accredited Programs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {degreePrograms.map((program) => (
            <CourseCard key={program.id} program={program} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-white border-2 border-maroon-700 text-maroon-700 px-8 py-3 rounded-full font-semibold hover:bg-maroon-700 hover:text-white transition-all duration-200">
            More will updated soon!
          </button>
        </div>
      </div>
    </div>
  )
}

export default CareerPage