export interface PathwayInfo {
  name: string
  icon: string
  description: string
}

export interface DegreeProgram {
  id: string
  title: string
  university: string
  duration: string
  level: string
  campusLogo: string
  description: string
  enrollLink: string
  streams?: string[]
  pathways?: PathwayInfo[]
}

export const careerPrograms: Record<string, DegreeProgram[]> = {
  'engineering': [
  // University of Moratuwa — Core BSc Eng (Hons) Specializations
  {
    id: '1',
    title: 'BSc Engineering (Hons)',
    university: 'University of Moratuwa',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uom-logo.png',
    description: 'Premier engineering degree with specializations in Civil, Mechanical, Electrical, Electronic & Telecommunication, Computer Science & Engineering, and Chemical & Process. Strong industry links and research.',
    enrollLink: '/enroll/eng-uom'
  },
  // University of Moratuwa — Standalone Engineering Degrees
  {
    id: '2',
    title: 'BSc Engineering (Hons) in Materials Science & Engineering',
    university: 'University of Moratuwa',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uom-logo.png',
    description: 'Specialized program in materials science, nanotechnology, polymers, ceramics, and metallurgy.',
    enrollLink: '/enroll/materials-uom'
  },
  {
    id: '3',
    title: 'BSc Engineering (Hons) in Earth Resources Engineering',
    university: 'University of Moratuwa',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uom-logo.png',
    description: 'Dedicated to mining, minerals, geology, and management of earth resources.',
    enrollLink: '/enroll/earth-uom'
  },
  {
    id: '4',
    title: 'BSc Engineering (Hons) in Textile & Apparel Engineering',
    university: 'University of Moratuwa',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uom-logo.png',
    description: 'Specialized degree in textile materials, apparel manufacturing, and fashion technology.',
    enrollLink: '/enroll/textile-uom'
  },
  {
    id: '5',
    title: 'BSc Engineering (Hons) in Transport & Logistics Engineering',
    university: 'University of Moratuwa',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uom-logo.png',
    description: 'Focuses on transport systems, supply chain, and logistics management.',
    enrollLink: '/enroll/transport-uom'
  },

  // University of Peradeniya
  {
    id: '6',
    title: 'BSc Engineering (Hons)',
    university: 'University of Peradeniya',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/pera-logo.png',
    description: 'Sri Lanka\'s oldest engineering faculty. Select specialization after the first year.',
    enrollLink: '/enroll/eng-pera'
  },

  // University of Ruhuna
  {
    id: '7',
    title: 'BSc Engineering (Hons)',
    university: 'University of Ruhuna',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/ruhuna-logo.jpeg',
    description: 'Modern curriculum with project-based learning in major engineering branches.',
    enrollLink: '/enroll/eng-ruhuna'
  },

  // University of Jaffna
  {
    id: '8',
    title: 'BSc Engineering (Hons)',
    university: 'University of Jaffna',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/jaffna-logo.png',
    description: 'Comprehensive engineering education with focus on practical applications.',
    enrollLink: '/enroll/eng-jaffna'
  },

  // Sabaragamuwa University
  {
    id: '9',
    title: 'BSc Engineering (Hons)',
    university: 'Sabaragamuwa University of Sri Lanka',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sabaragamuwa.png',
    description: 'Newest faculty offering core engineering programs with strong industry ties.',
    enrollLink: '/enroll/eng-sab'
  },

  // Eastern University (Trincomalee Campus)
  {
    id: '10',
    title: 'BSc Engineering (Hons)',
    university: 'Eastern University (Trincomalee Campus)',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/eastern.png',
    description: 'Engineering education focused on practical applications for the Eastern Province.',
    enrollLink: '/enroll/eng-eastern'
  },

  // University of Vavuniya
  {
    id: '11',
    title: 'BSc Engineering (Hons)',
    university: 'University of Vavuniya',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/vavuniya.png',
    description: 'Industry-focused engineering education with emphasis on practical skills.',
    enrollLink: '/enroll/eng-vavuniya'
  }
]

,
  'it': [
    {
      id: '1',
      title: 'BSc (Hons) in Computer Science',
      university: 'University of Colombo School of Computing (UCSC)',
      streams: ['Maths'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/ucsc-logo.jpg',
      description: 'Sri Lanka’s flagship Computer Science degree. Focuses on core CS theory, software engineering, algorithms, systems, and AI. Strong research and industry links.',
      enrollLink: '/enroll/cs-ucsc'
    },
    {
  id: '2',
  title: 'BSc (Hons) in Computer Science',
  university: 'University of Kelaniya',
  streams: ['Maths'],
  duration: '4 years',
  level: 'Undergraduate',
  campusLogo: '/images/universities/uok-logo.png',
  description: 'Industry-focused Computer Science degree with research, project-based learning, and the option to specialize in AI, Data Science, Cyber Security, Scientific Computing, or follow a Standard Pathway.',
  enrollLink: '/enroll/cs-uok',
  pathways: [
    { name: 'Artificial Intelligence', icon: 'BrainCircuit', description: 'Machine learning, neural networks, and intelligent systems.' },
    { name: 'Data Science', icon: 'BarChart3', description: 'Data analytics, big data, and predictive modeling.' },
    { name: 'Cyber Security', icon: 'Shield', description: 'Network security, cryptography, and ethical hacking.' },
    { name: 'Scientific Computing', icon: 'LineChart', description: 'High-performance and computational science.' },
    { name: 'Standard Pathway', icon: 'BookOpen', description: 'Comprehensive computer science foundation covering all core areas.' }
  ]
},
    {
      id: '3',
      title: 'BSc (Hons) in Computer Science',
      university: 'University of Jaffna',
      streams: ['Maths'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/jaffna-logo.png',
      description: 'Comprehensive CS program with a focus on modern computing, research, and industry readiness.',
      enrollLink: '/enroll/cs-jaffna'
    },
    {
      id: '4',
      title: 'BSc (Hons) in Computer Science',
      university: 'University of Ruhuna',
      streams: ['Maths'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/ruhuna-logo.jpeg',
      description: 'Solid Computer Science education with focus on programming, networking, and software systems.',
      enrollLink: '/enroll/cs-ruhuna'
    },
    {
      id: '5',
      title: 'BSc in Computer Science',
      university: 'Eastern University (Trincomalee Campus)',
      streams: ['Maths'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/eastern.png',
      description: 'CS degree at Trinco campus; strong foundation in algorithms, programming, and applied computing.',
      enrollLink: '/enroll/cs-trinco'
    },
    {
      id: '6',
      title: 'BSc (Hons) in Software Engineering',
      university: 'University of Kelaniya',
      streams: ['Maths'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/uok-logo.png',
      description: 'Professional SE degree with modern SDLC, testing, and full-stack project work.',
      enrollLink: '/enroll/se-uok'
    },
    {
      id: '7',
      title: 'BSc (Hons) in Software Engineering',
      university: 'Sabaragamuwa University of Sri Lanka',
      streams: ['Maths'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/sabaragamuwa.png',
      description: 'Modern SE curriculum with deep dives into software architecture, cloud, and testing.',
      enrollLink: '/enroll/se-sab'
    },
    {
      id: '8',
      title: 'BSc (Hons) in Software Engineering',
      university: 'University of Sri Jayewardenepura',
      streams: ['Maths'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/sjp-logo.png',
      description: 'SE degree focusing on enterprise applications, web, mobile, and devops.',
      enrollLink: '/enroll/se-sjp'
    },
    {
      id: '9',
      title: 'BSc (Hons) in Information Technology',
      university: 'University of Moratuwa',
      streams: ['Maths', 'Bio', 'Commerce'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/uom-logo.png',
      description: 'IT degree with strong emphasis on software, systems, and digital business.',
      enrollLink: '/enroll/it-uom'
    },
    {
      id: '10',
      title: 'BSc (Hons) in Information Systems',
      university: 'University of Colombo School of Computing',
      streams: ['Maths', 'Commerce'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/ucsc-logo.jpg',
      description: 'IS program combining IT, business, and digital transformation skills.',
      enrollLink: '/enroll/is-ucsc'
    },
    {
      id: '11',
      title: 'BSc (Hons) in Data Science',
      university: 'Sabaragamuwa University of Sri Lanka',
      streams: ['Maths'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/sabaragamuwa.png',
      description: 'First specialized Data Science degree: ML, AI, big data, and applied analytics.',
      enrollLink: '/enroll/ds-sab'
    },
    {
      id: '12',
      title: 'BSc (Hons) in Artificial Intelligence',
      university: 'University of Moratuwa',
      streams: ['Maths'],
      duration: '4 years',
      level: 'Undergraduate',
      campusLogo: '/images/universities/uom-logo.png',
      description: 'Sri Lanka’s first AI-focused degree: covers ML, deep learning, robotics, and ethics.',
      enrollLink: '/enroll/ai-uom'
    }
  ],
  'medicine': [
  {
    id: '1',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    university: 'University of Colombo',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uoc-logo.png',
    description: 'Premier MBBS program with clinical training at National Hospital. Strong research, clinical, and community medicine.',
    enrollLink: '/enroll/mbbs-colombo'
  },
  {
    id: '2',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    university: 'University of Peradeniya',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/pera-logo.png',
    description: 'MBBS with hands-on experience at Peradeniya Teaching Hospital. Strong focus on all core medical specialties.',
    enrollLink: '/enroll/mbbs-peradeniya'
  },
  {
    id: '3',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    university: 'University of Sri Jayewardenepura',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'MBBS degree offering extensive clinical training and community health exposure.',
    enrollLink: '/enroll/mbbs-sjp'
  },
  {
    id: '4',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    university: 'University of Kelaniya',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uok-logo.png',
    description: 'Medical program with focus on research, modern diagnostics, and clinical skills.',
    enrollLink: '/enroll/mbbs-kelaniya'
  },
  {
    id: '5',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    university: 'University of Jaffna',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/jaffna-logo.png',
    description: 'Comprehensive medical degree with early clinical exposure and rural healthcare focus.',
    enrollLink: '/enroll/mbbs-jaffna'
  },
  {
    id: '6',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    university: 'University of Ruhuna',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/ruhuna-logo.jpeg',
    description: 'MBBS with emphasis on tropical medicine, clinical training, and outreach.',
    enrollLink: '/enroll/mbbs-ruhuna'
  },
  {
    id: '7',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    university: 'Eastern University, Sri Lanka',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/eastern.png',
    description: 'Well-rounded MBBS with modern curriculum and clinical placements.',
    enrollLink: '/enroll/mbbs-eastern'
  },
  {
    id: '8',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    university: 'Rajarata University of Sri Lanka',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/rajarata.png',
    description: 'Medical training with focus on rural, family, and preventive medicine.',
    enrollLink: '/enroll/mbbs-rajarata'
  },
  {
    id: '9',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    university: 'Wayamba University of Sri Lanka',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/wayamba.png',
    description: 'Newest state MBBS with modern facilities, clinical, and community training.',
    enrollLink: '/enroll/mbbs-wayamba'
  },
  {
    id: '10',
    title: 'Bachelor of Dental Surgery (BDS)',
    university: 'University of Peradeniya',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/pera-logo.png',
    description: 'Sri Lanka’s leading dental surgery degree with clinical skills, orthodontics, and oral surgery.',
    enrollLink: '/enroll/bds-pera'
  },
  {
    id: '11',
    title: 'Bachelor of Dental Surgery (BDS)',
    university: 'University of Sri Jayewardenepura',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'Modern dental curriculum with practical skills and community dental care.',
    enrollLink: '/enroll/bds-sjp'
  },
  {
    id: '12',
    title: 'Bachelor of Veterinary Science (BVSc)',
    university: 'University of Peradeniya',
    streams: ['Bio'],
    duration: '5 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/pera-logo.png',
    description: 'Veterinary medicine program with animal hospital and fieldwork experience.',
    enrollLink: '/enroll/vet-pera'
  }
],
  'business': [
  // BBA - Colombo
  {
    id: '1',
    title: 'Bachelor of Business Administration (BBA)',
    university: 'University of Colombo',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uoc-logo.png',
    description: 'Flagship BBA program focused on management, finance, marketing, HR, and entrepreneurship.',
    enrollLink: '/enroll/bba-colombo'
  },
  // BBA - SJP
  {
    id: '2',
    title: 'Bachelor of Business Administration (BBA)',
    university: 'University of Sri Jayewardenepura',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'Top BBA program with specializations in operations, entrepreneurship, and international business.',
    enrollLink: '/enroll/bba-sjp'
  },
  // BBA - Kelaniya
  {
    id: '3',
    title: 'Bachelor of Business Administration (BBA)',
    university: 'University of Kelaniya',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uok-logo.png',
    description: 'Modern business degree with electives in marketing, HR, finance, and business IT.',
    enrollLink: '/enroll/bba-kelaniya'
  },
  // BMS - OUSL
  {
    id: '4',
    title: 'Bachelor of Management Studies (BMS)',
    university: 'Open University of Sri Lanka',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/open.png',
    description: 'Flexible management program for working students, covering business, law, and entrepreneurship.',
    enrollLink: '/enroll/bms-ousl'
  },
  // MBA - SJP (postgrad)
  {
    id: '5',
    title: 'Master of Business Administration (MBA)',
    university: 'University of Sri Jayewardenepura',
    duration: '2 years',
    level: 'Postgraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'Top MBA with strong links to industry, research, and case-study learning.',
    enrollLink: '/enroll/mba-sjp'
  },
  // BCom - Kelaniya
  {
    id: '6',
    title: 'Bachelor of Commerce (BCom)',
    university: 'University of Kelaniya',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uok-logo.png',
    description: 'Sri Lanka’s most established BCom. Focus on accounting, business law, finance, and economics.',
    enrollLink: '/enroll/bcom-kelaniya'
  },
  // BCom - SJP
  {
    id: '7',
    title: 'Bachelor of Commerce (BCom)',
    university: 'University of Sri Jayewardenepura',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'Comprehensive commerce degree with electives in business analytics, accounting, and tax.',
    enrollLink: '/enroll/bcom-sjp'
  },
  // Business Finance - Colombo
  {
    id: '8',
    title: 'Bachelor of Business Finance',
    university: 'University of Colombo',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uoc-logo.png',
    description: 'Industry-focused finance degree with strong quantitative skills, risk management, and capital markets.',
    enrollLink: '/enroll/finance-colombo'
  },
  // Accountancy - SJP
  {
    id: '9',
    title: 'Bachelor of Accountancy',
    university: 'University of Sri Jayewardenepura',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'Specialized degree for professional accountants, with training in audit, taxation, and corporate reporting.',
    enrollLink: '/enroll/accountancy-sjp'
  }
],
  'technology': [
  // Kelaniya – Engineering Technology added
  {
    id: '6',
    title: 'Bachelor of Engineering Technology (Honours)',
    university: 'University of Kelaniya',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uok-logo.png',
    description: 'Applied engineering degree for Tech‑stream students—hands‑on, industry focused, with majors in Materials, Robotics & Automation, and Environmental/Energy technologies.',
    enrollLink: '/enroll/engtech-uok'
  },
  // Other Kelaniya stream degrees (ICT and Biosystems)
  {
    id: '5',
    title: 'BSc (Hons) in Information & Communication Technology (ICT)',
    university: 'University of Kelaniya',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uok-logo.png',
    description: 'ICT program with a focus on software, network, systems, and digital business.',
    enrollLink: '/enroll/ict-uok'
  },
  {
    id: '6b',
    title: 'BSc Honours in Biosystems Technology',
    university: 'University of Kelaniya',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uok-logo.png',
    description: 'Integrates biology, technology, and engineering for agriculture and biotech careers.',
    enrollLink: '/enroll/biosys-uok'
  },
  // Moratuwa
  {
    id: '1',
    title: 'Bachelor of Technology (BTech) in Engineering',
    university: 'University of Moratuwa',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uom-logo.png',
    description: 'Technology-focused engineering degree with pathways in civil, mechanical, and electrical technology.',
    enrollLink: '/enroll/btech-eng-uom'
  },
  // Jayewardenepura
  {
    id: '2',
    title: 'BSc Honours in Engineering Technology',
    university: 'University of Sri Jayewardenepura',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'Engineering Technology degree focused on applied engineering, design, and practical skills.',
    enrollLink: '/enroll/engtech-sjp'
  },
  {
    id: '3',
    title: 'BSc Honours in Information & Communication Technology (ICT)',
    university: 'University of Sri Jayewardenepura',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'Modern ICT degree with software, hardware, networking, and cloud.',
    enrollLink: '/enroll/ict-sjp'
  },
  {
    id: '4',
    title: 'BSc Honours in Biosystems Technology',
    university: 'University of Sri Jayewardenepura',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'Tech meets biology: food, agriculture, environment, and applied biosciences.',
    enrollLink: '/enroll/biosys-sjp'
  },
  // Ruhuna
  {
    id: '7',
    title: 'BSc Honours in Information & Communication Technology (ICT)',
    university: 'University of Ruhuna',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/ruhuna-logo.jpeg',
    description: 'ICT program with a focus on coding, networking, and applied computing.',
    enrollLink: '/enroll/ict-ruhuna'
  },
  {
    id: '8',
    title: 'BSc Honours in Biosystems Technology',
    university: 'University of Ruhuna',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/ruhuna-logo.jpeg',
    description: 'Combines agriculture, biotechnology, and technology for next-gen bioscience careers.',
    enrollLink: '/enroll/biosys-ruhuna'
  },
  // Eastern (Trincomalee)
  {
    id: '9',
    title: 'BTech (Hons) in Engineering',
    university: 'Eastern University (Trincomalee Campus)',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/eastern.png',
    description: 'Practice-driven engineering technology: civil, mechanical, electrical.',
    enrollLink: '/enroll/btech-eng-eastern'
  },
  {
    id: '10',
    title: 'BSc Honours in Information & Communication Technology (ICT)',
    university: 'Eastern University (Trincomalee Campus)',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/eastern.png',
    description: 'ICT degree in Eastern Province: software, networks, and digital systems.',
    enrollLink: '/enroll/ict-eastern'
  },
  {
    id: '11',
    title: 'BSc Honours in Biosystems Technology',
    university: 'Eastern University (Trincomalee Campus)',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/eastern.png',
    description: 'Agro-tech, biotech, and bioresource-focused technology degree.',
    enrollLink: '/enroll/biosys-eastern'
  },
  // Sabaragamuwa
  {
    id: '12',
    title: 'BSc Honours in Information & Communication Technology (ICT)',
    university: 'Sabaragamuwa University of Sri Lanka',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sabaragamuwa.png',
    description: 'Prepares students for the digital future with ICT, coding, and applied systems.',
    enrollLink: '/enroll/ict-sab'
  },
  {
    id: '13',
    title: 'BSc Honours in Biosystems Technology',
    university: 'Sabaragamuwa University of Sri Lanka',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sabaragamuwa.png',
    description: 'Technology for biosciences, sustainable agriculture, and bioprocessing.',
    enrollLink: '/enroll/biosys-sab'
  },
  // Uva Wellassa
  {
    id: '14',
    title: 'Bachelor of Industrial Information Technology',
    university: 'Uva Wellassa University',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uva.jpg',
    description: 'Applied IT for industry: automation, data, industrial informatics.',
    enrollLink: '/enroll/ind-it-uwu'
  },
  {
    id: '15',
    title: 'Bachelor of Science in Technology',
    university: 'Uva Wellassa University',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uva.jpg',
    description: 'Multidisciplinary degree covering applied science, IT, and biosystems.',
    enrollLink: '/enroll/tech-uwu'
  },
  // Vavuniya
  {
    id: '16',
    title: 'BSc Honours in Information & Communication Technology (ICT)',
    university: 'University of Vavuniya',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/vavuniya.png',
    description: 'Comprehensive ICT program for the Northern Province—software, networks, and info systems.',
    enrollLink: '/enroll/ict-vavuniya'
  },
  {
    id: '17',
    title: 'BSc Honours in Biosystems Technology',
    university: 'University of Vavuniya',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/vavuniya.png',
    description: 'Tech for biosciences, food systems, and green innovation.',
    enrollLink: '/enroll/biosys-vavuniya'
  }
],
  'arts': [
  {
    id: '1',
    title: 'Bachelor of Arts (BA) in English',
    university: 'University of Peradeniya',
    duration: '3 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/pera-logo.png',
    description: 'Degree in English literature and language with specializations in creative writing, linguistics, and teaching.',
    enrollLink: '/enroll/ba-english-pera'
  },
  {
    id: '2',
    title: 'Bachelor of Arts (BA) in Sinhala',
    university: 'University of Colombo',
    duration: '3 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uoc-logo.png',
    description: 'Sinhala language and literature, including criticism, creative writing, and linguistics.',
    enrollLink: '/enroll/ba-sinhala-colombo'
  },
  {
    id: '3',
    title: 'Bachelor of Arts (BA) in History',
    university: 'University of Kelaniya',
    duration: '3 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uok-logo.png',
    description: 'Explore Sri Lankan, Asian, and world history with research and teaching pathways.',
    enrollLink: '/enroll/ba-history-kelaniya'
  },
  {
    id: '4',
    title: 'Bachelor of Arts (BA) in Philosophy',
    university: 'University of Peradeniya',
    duration: '3 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/pera-logo.png',
    description: 'Critical thinking, logic, and Eastern/Western philosophy traditions.',
    enrollLink: '/enroll/ba-philosophy-pera'
  },
  {
    id: '5',
    title: 'Bachelor of Arts (BA) in Mass Communication',
    university: 'University of Kelaniya',
    duration: '3 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/uok-logo.png',
    description: 'Covers journalism, media production, and communications theory for the digital era.',
    enrollLink: '/enroll/ba-masscomm-kelaniya'
  },
  {
    id: '6',
    title: 'Bachelor of Fine Arts (BFA)',
    university: 'University of the Visual & Performing Arts',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/vpa-logo.png',
    description: 'Covers painting, sculpture, multimedia, and design, with strong studio practice.',
    enrollLink: '/enroll/bfa-vpa'
  },
  {
    id: '7',
    title: 'Bachelor of Music (BMus)',
    university: 'University of the Visual & Performing Arts',
    duration: '4 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/vpa-logo.png',
    description: 'Degree in classical, contemporary, and Sri Lankan music performance, composition, and teaching.',
    enrollLink: '/enroll/bmus-vpa'
  },
  {
    id: '8',
    title: 'Bachelor of Arts (BA) in Buddhist Studies',
    university: 'University of Sri Jayewardenepura',
    duration: '3 years',
    level: 'Undergraduate',
    campusLogo: '/images/universities/sjp-logo.png',
    description: 'Buddhist doctrine, history, and philosophy, with a focus on ancient texts and comparative religion.',
    enrollLink: '/enroll/ba-buddhist-sjp'
  }
]
}

export const getCareerPrograms = (careerPath: string): DegreeProgram[] => {
  return careerPrograms[careerPath] || []
}
    
    