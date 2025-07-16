import { ChevronRight, Sparkles, BookOpen, Users, TrendingUp, BrainCircuit, Code, Stethoscope,  Palette, Users2, } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import CareerPathCard from '@/components/CareerPathCard';




export default function Home() {
  return (
    <main className="relative w-full min-h-screen font-inter bg-gray-50">
      
      
      <header className="relative z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-maroon-700 rounded-lg flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ACADEMITREND</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-maroon-700 hover:text-maroon-700 font-medium">Home</Link>
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

      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-maroon-100 to-maroon-200 py-20'>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/70 text-maroon-700 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-xl shadow-lg select-none">
                <Sparkles className="h-4 w-4" />
                Explore Sri Lanka&apos;s University Programs
                <ChevronRight className="h-4 w-4" />
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Choose Your Perfect
                <span className="block text-maroon-700">Dream Path</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Find your ideal degree and university with comprehensive data, trends, and predictions—all made simple for you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-maroon-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-maroon-800 transition-colors cursor-pointer">
                  Start Exploring
                </button>
                <Link href="/universities" className="border border-maroon-700 ring-1 ring-maroon-700 text-maroon-700 px-8 py-4 rounded-full font-semibold hover:bg-maroon-700/10 transition-all cursor-pointer text-center">
                  View Universities
                </Link>
              </div>
            </div>

            {/* Right Content - Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* University Programs Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-maroon-100 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-maroon-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">University Programs</h3>
                <p className="text-sm text-gray-600">Comprehensive database of degree programs</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="bg-maroon-50 text-maroon-700 px-2 py-1 rounded-md text-xs">Engineering</span>
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs">Medicine</span>
                  <span className="bg-maroon-50 text-maroon-700 px-2 py-1 rounded-md text-xs">More...</span>
                </div>
              </div>

              {/* Career Guidance Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Career Guidance</h3>
                <p className="text-sm text-gray-600">Personalized career path recommendations</p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Success Rate</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
              </div>

              {/* Market Trends Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Market Trends & Analytics</h3>
                    <p className="text-sm text-gray-600">Real-time industry insights and job market data</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-maroon-700">15+</div>
                    <div className="text-xs text-gray-500">Universities</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">200+</div>
                    <div className="text-xs text-gray-500">Programs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">5K+</div>
                    <div className="text-xs text-gray-500">Students Helped</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-maroon-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore <span className='text-maroon-700'>Career Paths</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect career path that aligns with your interests and goals. Each path offers unique opportunities and growth potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CareerPathCard
              icon={Code}
              title="Engineering"
              description="Civil, Mechanical, Electrical, Chemical, Electronic, Computer & more"
              tags={["High Demand", "Technical"]}
              programCount="15+ Programs"
              href="/career/engineering"
            />
            <CareerPathCard
              icon={BrainCircuit}
              title="Information Technology & Computing"
              description="Computer Science, Software Engineering, Data Science, IT"
              tags={["Growing Field", "Innovation"]}
              programCount="12+ Programs"
              href="/career/it"
            />
            <CareerPathCard
              icon={Stethoscope}
              title="Medicine"
              description="MBBS, Dental Surgery, Veterinary Medicine"
              tags={["Prestigious", "Competitive"]}
              programCount="12+ Programs"
              href="/career/medicine"
            />
            <CareerPathCard
              icon={Users2}
              title="Business & Management"
              description="BBA, BCom, Management, HR, Marketing, Accounting, Finance"
              tags={["Leadership", "Versatile"]}
              programCount="20+ Programs"
              href="/career/business"
            />
            <CareerPathCard
              icon={BrainCircuit}
              title="Technology"
              description="Engineering Tech, ICT, Biosystems, Industrial IT, Automation"
              tags={["Innovation", "Future-Ready"]}
              programCount="15+ Programs"
              href="/career/technology"
            />
            <CareerPathCard
              icon={Palette}
              title="Arts, Humanities & Law"
              description="Languages, History, Philosophy, Fine Arts, Law, Social Sciences"
              tags={["Creative", "Cultural"]}
              programCount="30+ Programs"
              href="/career/arts"
            />
          </div>


          <div className="text-center mt-12">
            <button className="bg-maroon-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-maroon-800 transition-colors cursor-pointer">
              More will added soon
            </button>
          </div>
        </div>
      </section>

      
    
      
    </main>
  );
}

