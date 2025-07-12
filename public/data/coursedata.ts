export interface DegreeProgram {
  id: string
  title: string
  university: string
  duration: string
  level: string
  campusLogo: string
  tuitionFee: string
  description: string
  enrollLink: string
}

export const careerPrograms: Record<string, DegreeProgram[]> = {
  'engineering': [
    {
      id: '1',
      title: 'Bachelor of Civil Engineering',
      university: 'University of Moratuwa',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/uom-logo.png',
      tuitionFee: 'Rs. 250,000',
      description: 'Comprehensive civil engineering program covering structural, environmental, and transportation engineering.',
      enrollLink: '/enroll/civil-eng-uom'
    },
    {
      id: '2',
      title: 'Bachelor of Mechanical Engineering',
      university: 'University of Peradeniya',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/pera-logo.png',
      tuitionFee: 'Rs. 275,000',
      description: 'Advanced mechanical engineering program with focus on automation and manufacturing.',
      enrollLink: '/enroll/mech-eng-pera'
    },
    {
      id: '3',
      title: 'Bachelor of Electrical Engineering',
      university: 'University of Moratuwa',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/uom-logo.jpg',
      tuitionFee: 'Rs. 300,000',
      description: 'Electrical engineering with specializations in power systems and electronics.',
      enrollLink: '/enroll/elect-eng-ucsc'
    }
  ],
  'it': [
    {
      id: '1',
      title: 'Bachelor of Computer Science (Hons.)',
      university: 'University of Colombo School of Computing',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/ucsc-logo.jpg',
      tuitionFee: 'Rs. 180,000',
      description: 'Comprehensive computer science program covering algorithms, software engineering, and AI.',
      enrollLink: '/enroll/cs-ucsc'
    },
    {
      id: '2',
      title: 'Bachelor of Compurter Science (Hons.)',
      university: 'University of Kelaniya',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/uok-logo.png',
      tuitionFee: 'Rs. 320,000',
      description: 'Industry-focused software engineering with hands-on project experience.',
      enrollLink: '/enroll/se-sliit'
    },
    {
      id: '3',
      title: 'Master of Data Science',
      university: 'University of Moratuwa',
      duration: '2 years',
      level: 'Postgraduate',
      campusLogo: '/images/universities/uom-logo.png',
      tuitionFee: 'Rs. 400,000',
      description: 'Advanced data science program focusing on machine learning and big data analytics.',
      enrollLink: '/enroll/ds-uom'
    }
  ],
  'medicine': [
    {
      id: '1',
      title: 'Bachelor of Medicine & Surgery (MBBS)',
      university: 'University of Colombo',
      duration: '5 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/medical-colombo.png',
      tuitionFee: 'Rs. 150,000',
      description: 'Premier medical degree program with clinical training at National Hospital.',
      enrollLink: '/enroll/mbbs-colombo'
    },
    {
      id: '2',
      title: 'Bachelor of Dental Surgery (BDS)',
      university: 'University of Peradeniya',
      duration: '5 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/dental-pera.png',
      tuitionFee: 'Rs. 200,000',
      description: 'Comprehensive dental surgery program with modern clinical facilities.',
      enrollLink: '/enroll/bds-pera'
    },
    {
      id: '3',
      title: 'Bachelor of Veterinary Medicine',
      university: 'University of Peradeniya',
      duration: '5 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/vet-pera.png',
      tuitionFee: 'Rs. 180,000',
      description: 'Veterinary medicine program with animal hospital training.',
      enrollLink: '/enroll/vet-pera'
    }
  ],
  'business': [
    {
      id: '1',
      title: 'Bachelor of Business Administration',
      university: 'University of Colombo',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/cms-logo.png',
      tuitionFee: 'Rs. 220,000',
      description: 'Comprehensive BBA program with specializations in finance, marketing, and management.',
      enrollLink: '/enroll/bba-cms'
    },
    {
      id: '2',
      title: 'Master of Business Administration (MBA)',
      university: 'University of Sri Jayewardenepura',
      duration: '2 years',
      level: 'Postgraduate',
      campusLogo: '/images/universities/sjp-mba.png',
      tuitionFee: 'Rs. 500,000',
      description: 'Premier MBA program with industry partnerships and case study methodology.',
      enrollLink: '/enroll/mba-sjp'
    },
    {
      id: '3',
      title: 'Bachelor of Commerce',
      university: 'University of Kelaniya',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/kelaniya-logo.png',
      tuitionFee: 'Rs. 180,000',
      description: 'Commerce degree with focus on accounting, finance, and business law.',
      enrollLink: '/enroll/bcom-kelaniya'
    }
  ],
  'law': [
    {
      id: '1',
      title: 'Bachelor of Laws (LLB)',
      university: 'University of Colombo',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/law-colombo.png',
      tuitionFee: 'Rs. 160,000',
      description: 'Premier law degree with constitutional, criminal, and commercial law specializations.',
      enrollLink: '/enroll/llb-colombo'
    },
    {
      id: '2',
      title: 'Bachelor of Laws (LLB)',
      university: 'University of Peradeniya',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/law-pera.png',
      tuitionFee: 'Rs. 150,000',
      description: 'Comprehensive law program with moot court and legal clinic experience.',
      enrollLink: '/enroll/llb-pera'
    },
    {
      id: '3',
      title: 'Master of Laws (LLM)',
      university: 'University of Colombo',
      duration: '1 year',
      level: 'Postgraduate',
      campusLogo: '/images/universities/law-colombo.png',
      tuitionFee: 'Rs. 300,000',
      description: 'Advanced law degree with research focus on international and comparative law.',
      enrollLink: '/enroll/llm-colombo'
    }
  ],
  'arts': [
    {
      id: '1',
      title: 'Bachelor of Arts in English',
      university: 'University of Peradeniya',
      duration: '3 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/arts-pera.png',
      tuitionFee: 'Rs. 120,000',
      description: 'English literature and language program with creative writing specialization.',
      enrollLink: '/enroll/ba-english-pera'
    },
    {
      id: '2',
      title: 'Bachelor of Fine Arts',
      university: 'University of the Visual & Performing Arts',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/vpa-logo.png',
      tuitionFee: 'Rs. 200,000',
      description: 'Comprehensive fine arts program covering painting, sculpture, and digital arts.',
      enrollLink: '/enroll/bfa-vpa'
    },
    {
      id: '3',
      title: 'Bachelor of Music',
      university: 'University of the Visual & Performing Arts',
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/music-vpa.png',
      tuitionFee: 'Rs. 180,000',
      description: 'Music degree with classical, contemporary, and traditional Sri Lankan music.',
      enrollLink: '/enroll/bmus-vpa'
    }
  ]
}

export const getCareerPrograms = (careerPath: string): DegreeProgram[] => {
  return careerPrograms[careerPath] || []
}
