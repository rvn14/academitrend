import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BrainCircuit, MapPin, Users2 } from 'lucide-react'

// Expanded university data
const universities = [
	{
		name: 'University of Colombo',
		location: 'Colombo',
		students: '10,000+',
		programs: '50+',
		logoSrc: '/images/universities/uoc-logo.png',
		shortUrl: 'colombo'
	},
	{
		name: 'University of Peradeniya',
		location: 'Kandy',
		students: '12,000+',
		programs: '60+',
		logoSrc: '/images/universities/pera-logo.png',
		shortUrl: 'peradeniya'
	},
	{
		name: 'University of Moratuwa',
		location: 'Moratuwa',
		students: '8,000+',
		programs: '40+',
		logoSrc: '/images/universities/uom-logo.png',
		shortUrl: 'moratuwa'
	},
	{
		name: 'University of Sri Jayewardenepura',
		location: 'Nugegoda',
		students: '14,000+',
		programs: '55+',
		logoSrc: '/images/universities/sjp-logo.png',
		shortUrl: 'sri-jayewardenepura'
	},
	{
		name: 'University of Kelaniya',
		location: 'Kelaniya',
		students: '11,000+',
		programs: '45+',
		logoSrc: '/images/universities/uok-logo.png',
		shortUrl: 'kelaniya'
	},
	{
		name: 'Rajarata University of Sri Lanka',
		location: 'Mihintale',
		students: '7,000+',
		programs: '30+',
		logoSrc: '/images/universities/rajarata.png',
		shortUrl: 'rajarata'
	},
	{
		name: 'Eastern University of Sri Lanka',
		location: 'Batticaloa',
		students: '6,000+',
		programs: '25+',
		logoSrc: '/images/universities/eastern.png',
		shortUrl: 'eastern'
	},
	{
		name: 'Wayamba University of Sri Lanka',
		location: 'Kuliyapitiya',
		students: '5,000+',
		programs: '20+',
		logoSrc: '/images/universities/wayamba.png',
		shortUrl: 'wayamba'
	},
	{
		name: 'Sabaragamuwa University of Sri Lanka',
		location: 'Belihuloya',
		students: '4,500+',
		programs: '18+',
		logoSrc: '/images/universities/sabaragamuwa.png',
		shortUrl: 'sabaragamuwa'
	},
	{
		name: 'South Eastern University of Sri Lanka',
		location: 'Oluvil',
		students: '3,500+',
		programs: '15+',
		logoSrc: '/images/universities/southeastern.png',
		shortUrl: 'southeastern'
	},
	{
		name: 'Uva Wellassa University',
		location: 'Badulla',
		students: '3,000+',
		programs: '12+',
		logoSrc: '/images/universities/uva.jpg',
		shortUrl: 'uva-wellassa'
	},
	{
		name: 'Open University of Sri Lanka',
		location: 'Nawala',
		students: '20,000+',
		programs: '70+',
		logoSrc: '/images/universities/open.png',
		shortUrl: 'open'
	},
	// ...add more as needed
]

const UniversitiesPage = () => {
	return (
		<main className="relative w-full min-h-screen font-inter bg-gray-50">
			{/* Header */}
			<header className="relative z-50 bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-maroon-700 rounded-lg flex items-center justify-center">
								<BrainCircuit className="h-5 w-5 text-white" />
							</div>
							<span className="text-xl font-bold text-gray-900">
								ACADEMITREND
							</span>
						</div>
						<nav className="hidden md:flex items-center space-x-8">
							<Link
								href="/"
								className="text-gray-600 hover:text-maroon-700"
							>
								Home
							</Link>
							<Link
								href="/univerties"
								className="text-maroon-700 font-medium"
							>
								Universities
							</Link>
							<Link
								href="/programs"
								className="text-gray-600 hover:text-maroon-700"
							>
								Programs
							</Link>
							<Link
								href="/trends"
								className="text-gray-600 hover:text-maroon-700"
							>
								Trends
							</Link>
							<Link
								href="/about"
								className="text-gray-600 hover:text-maroon-700"
							>
								About
							</Link>
						</nav>
						<Link href="/salary-prediction" className="bg-maroon-700 text-white px-6 py-2 rounded-full hover:bg-maroon-800 transition-colors cursor-pointer">
              Salary Prediction
            </Link>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-maroon-100 to-maroon-200 py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-5xl font-bold text-gray-900 mb-4">
						Explore{' '}
						<span className="text-maroon-700">Sri Lankan Universities</span>
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Discover top universities, their programs, locations, and student
						communities. Find the perfect place to start your academic journey.
					</p>
				</div>
			</section>

			
			<section className="py-16 bg-maroon-50/60">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Featured Universities
						</h2>
						<p className="text-lg text-gray-600">
							Browse leading institutions across Sri Lanka
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{universities.map((uni, idx) => (
							<div
								key={idx}
								className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center"
							>
								<div className="mb-4">
									<Image
										src={uni.logoSrc}
										alt={`${uni.name} logo`}
										width={64}
										height={64}
										className="object-contain h-16 w-16"
									/>
								</div>
								<h3 className="font-semibold text-gray-900 text-xl mb-2">
									{uni.name}
								</h3>
								<div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
									<MapPin className="h-4 w-4" />
									{uni.location}
								</div>
								<div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
									<span className="flex items-center gap-1">
										<Users2 className="h-4 w-4" /> {uni.students}
									</span>
									<span className="bg-maroon-100 text-maroon-700 px-2 py-1 rounded-md">
										{uni.programs} Programs
									</span>
								</div>
								<Link
									href={`/universities/${uni.shortUrl}`}
									className="mt-auto bg-maroon-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-maroon-800 transition-colors"
								>
									View Details
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}

export default UniversitiesPage