export type SchoolCategory =
  | 'all'
  | 'computing'
  | 'sciences'
  | 'commerce'
  | 'media';

export interface Programme {
  id: string;
  title: string;
  level: 'Undergraduate' | 'Postgraduate';
  school: Exclude<SchoolCategory, 'all'>;
  schoolLabel: string;
  duration: string;
  intake: number;
  eligibility: string;
  summary: string;
  coreModules: string[];
  certifications: string[];
  careerPathways: string[];
}

export interface ResearchCentre {
  id: string;
  code: string;
  title: string;
  leadDepartment: string;
  description: string;
  courseworkDetail?: string;
  highlights: string[];
  partnerOrGrant: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
}

export interface PlacementCohort {
  year: string;
  placementRate: string;
  offersExtended: string;
  medianPackage: string;
  highestPackage: string;
  participatingCompanies: string;
  sectorBreakdown: { sector: string; share: number }[];
}

export interface StudentOutcome {
  id: string;
  name: string;
  programme: string;
  batch: string;
  role: string;
  company: string;
  outcomeQuote: string;
}

export interface CampusFacility {
  id: string;
  title: string;
  subtitle: string;
  hours: string;
  description: string;
  keyFacts: string[];
  image: string;
  imageAlt: string;
  caption: string;
}

export interface HeritageEra {
  id: string;
  year: string;
  eraTitle: string;
  headline: string;
  summary: string;
  milestoneStat: string;
  statLabel: string;
  image: string;
  imageAlt: string;
  plateCaption: string;
}

export type GalleryCategory = 'All Plates' | 'Heritage & Architecture' | 'Laboratories' | 'Campus & Athletics';

export interface GalleryPlate {
  id: string;
  plateNumber: string;
  category: Exclude<GalleryCategory, 'All Plates'>;
  title: string;
  yearOrContext: string;
  description: string;
  image: string;
  alt: string;
}

export type FacultyDepartmentCategory =
  | 'All Departments'
  | 'Leadership'
  | 'Computing & AI'
  | 'Life Sciences'
  | 'Commerce & Management'
  | 'Arts & Media';

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  departmentCategory: Exclude<FacultyDepartmentCategory, 'All Departments'>;
  qualification: string;
  tenure: string;
  specialization: string;
  email: string;
  photo: string;
  photoAlt: string;
}

export const IMAGES = {
  campusHero: '/src/assets/images/skcas_campus_hero_1794810232675.jpg',
  heritage1997: '/src/assets/images/skcas_heritage_1997_1794811363389.jpg',
  computingLab: '/src/assets/images/skcas_ai_computing_lab_1794810233453.jpg',
  centralLibrary: '/src/assets/images/skcas_central_library_1794810232937.jpg',
  biotechLab: '/src/assets/images/skcas_biotech_lab_1794810234601.jpg',
  auditorium: '/src/assets/images/skcas_auditorium_convocation_1794811363362.jpg',
  mediaStudio: '/src/assets/images/skcas_media_studio_1794811363416.jpg',
  sportsGrounds: '/src/assets/images/skcas_sports_grounds_1794811364500.jpg',
  facultyPrincipal: '/src/assets/images/skcas_faculty_principal_1794811715260.jpg',
  facultyCs: '/src/assets/images/skcas_faculty_cs_1794811715481.jpg',
  facultyBiotech: '/src/assets/images/skcas_faculty_biotech_1794811715663.jpg',
  facultyCommerce: '/src/assets/images/skcas_faculty_commerce_1794811716201.jpg',
  facultyMedia: '/src/assets/images/skcas_faculty_media_1794811716994.jpg',
  facultyHumanities: '/src/assets/images/skcas_faculty_humanities_1794811717565.jpg',
} as const;

export const INSTITUTIONAL_METRICS = [
  {
    value: '54+',
    label: 'UG, PG & Research Programmes',
    detail: 'Outcome-based curriculum under Autonomy',
  },
  {
    value: '96.4%',
    label: 'Placement Rate (2025 Cohort)',
    detail: '2,180+ offers across 195 recruiters',
  },
  {
    value: 'NAAC A',
    label: 'Accreditation & NIRF Ranked',
    detail: 'Affiliated to Bharathiar University',
  },
  {
    value: '32 Acres',
    label: 'Kuniamuthur Green Campus',
    detail: '24/7 digital library & innovation labs',
  },
];

export const SCHOOL_FILTERS: { id: SchoolCategory; label: string }[] = [
  { id: 'all', label: 'All Schools' },
  { id: 'computing', label: 'Computing & AI' },
  { id: 'sciences', label: 'Life Sciences' },
  { id: 'commerce', label: 'Commerce & Management' },
  { id: 'media', label: 'Arts & Media' },
];

export const PROGRAMMES: Programme[] = [
  {
    id: 'bsc-cs',
    title: 'B.Sc. Computer Science',
    level: 'Undergraduate',
    school: 'computing',
    schoolLabel: 'School of Computing',
    duration: '3 Years',
    intake: 180,
    eligibility: '10+2 with Mathematics or Computer Science',
    summary:
      'Foundational computer science combining systems architecture, full-stack engineering, and cloud-native application deployment.',
    coreModules: [
      'Data Structures & Algorithmic Design',
      'Operating Systems & Linux Internals',
      'Full-Stack TypeScript & Distributed Systems',
      'Database Engineering & Cloud Architecture',
    ],
    certifications: ['AWS Academy Cloud Foundations', 'Oracle Java Associate', 'Red Hat Linux Fundamentals'],
    careerPathways: ['Software Engineer', 'Cloud Solutions Associate', 'Systems Analyst', 'DevOps Engineer'],
  },
  {
    id: 'bsc-aiml',
    title: 'B.Sc. Artificial Intelligence & Machine Learning',
    level: 'Undergraduate',
    school: 'computing',
    schoolLabel: 'School of Computing',
    duration: '3 Years',
    intake: 120,
    eligibility: '10+2 with Mathematics / Statistics',
    summary:
      'Applied machine learning, neural architectures, computer vision, and ethical AI engineering taught in GPU-equipped laboratories.',
    coreModules: [
      'Linear Algebra & Statistical Learning',
      'Deep Neural Networks & Computer Vision',
      'Natural Language Processing & Transformers',
      'MLOps & Model Deployment Pipelines',
    ],
    certifications: ['NVIDIA Deep Learning Institute', 'IBM Data Science Practitioner', 'Google Cloud ML Track'],
    careerPathways: ['Machine Learning Engineer', 'Data Scientist', 'Computer Vision Developer', 'AI Research Associate'],
  },
  {
    id: 'bca',
    title: 'Bachelor of Computer Applications (BCA)',
    level: 'Undergraduate',
    school: 'computing',
    schoolLabel: 'School of Computing',
    duration: '3 Years',
    intake: 180,
    eligibility: '10+2 in any stream with Mathematics / Business Maths / CS',
    summary:
      'Industry-aligned software development programme emphasizing enterprise applications, mobile computing, and agile product engineering.',
    coreModules: [
      'Object-Oriented Programming with Java & Python',
      'Mobile Application Development (Android & Cross-Platform)',
      'Enterprise Web Services & Cybersecurity Basics',
      'Capstone Industry Software Project',
    ],
    certifications: ['TCS iON Industry Honours', 'Microsoft Azure Fundamentals', 'Cisco Networking Essentials'],
    careerPathways: ['Application Developer', 'Product Support Engineer', 'QA Automation Specialist', 'UI Engineer'],
  },
  {
    id: 'msc-cs',
    title: 'M.Sc. Computer Science',
    level: 'Postgraduate',
    school: 'computing',
    schoolLabel: 'School of Computing',
    duration: '2 Years',
    intake: 60,
    eligibility: 'B.Sc. Computer Science / BCA / B.Sc. IT with >= 55%',
    summary:
      'Advanced postgraduate research and engineering degree focusing on distributed computing, network security, and intelligent systems.',
    coreModules: [
      'Advanced Algorithms & Graph Theory',
      'Cryptography & Enterprise Security',
      'Big Data Analytics & Stream Processing',
      '6-Month Embedded Industry Internship & Thesis',
    ],
    certifications: ['CompTIA Security+ Prep', 'Kubernetes Application Developer', 'IEEE Research Publication Track'],
    careerPathways: ['Senior Software Architect', 'Security Analyst', 'Data Platform Engineer', 'Doctoral Research'],
  },
  {
    id: 'bsc-biotech',
    title: 'B.Sc. Biotechnology',
    level: 'Undergraduate',
    school: 'sciences',
    schoolLabel: 'School of Life Sciences',
    duration: '3 Years',
    intake: 60,
    eligibility: '10+2 with Biology / Biotechnology / Chemistry',
    summary:
      'Hands-on molecular biology, genetic engineering, bioprocess technology, and bioinformatics trained in DBT-grade wet laboratories.',
    coreModules: [
      'Cell Biology & Molecular Genetics',
      'Recombinant DNA Technology & PCR Diagnostics',
      'Bioprocess Engineering & Fermentation',
      'Computational Bioinformatics & Proteomics',
    ],
    certifications: ['Good Laboratory Practice (GLP)', 'Clinical Data Management Basics', 'Bioinformatics Sequence Analysis'],
    careerPathways: ['Bioprocess Associate', 'Clinical Research Coordinator', 'QC Microbiologist', 'M.Sc. / Ph.D. Track'],
  },
  {
    id: 'bsc-microbiology',
    title: 'B.Sc. Microbiology',
    level: 'Undergraduate',
    school: 'sciences',
    schoolLabel: 'School of Life Sciences',
    duration: '3 Years',
    intake: 60,
    eligibility: '10+2 with Biology / Botany / Zoology',
    summary:
      'Diagnostic, industrial, and environmental microbiology equipping graduates for pharmaceutical QA, food safety, and clinical pathology.',
    coreModules: [
      'Medical Bacteriology & Virology',
      'Immunology & Diagnostic Serology',
      'Industrial & Food Microbiology',
      'Environmental Bioremediation Techniques',
    ],
    certifications: ['FSSAI Food Safety Hygiene', 'NABL Lab Quality Systems', 'Medical Coding Orientation'],
    careerPathways: ['Pharmaceutical QA Analyst', 'Clinical Lab Technologist', 'Food Safety Officer', 'Research Assistant'],
  },
  {
    id: 'msc-biotech',
    title: 'M.Sc. Biotechnology',
    level: 'Postgraduate',
    school: 'sciences',
    schoolLabel: 'School of Life Sciences',
    duration: '2 Years',
    intake: 40,
    eligibility: 'B.Sc. Biotechnology / Microbiology / Biochemistry / Life Sciences',
    summary:
      'Research-intensive postgraduate curriculum spanning nanobiotechnology, genomics, pharmaceutical biomanufacturing, and patent law.',
    coreModules: [
      'Genomics, Transcriptomics & Gene Editing',
      'Downstream Biopharmaceutical Processing',
      'Nanobiotechnology & Biosensors',
      'Peer-Reviewed Dissertation Project',
    ],
    certifications: ['Intellectual Property & Bio-Patents', 'HPLC & Spectrophotometry Mastery', 'Biocon Industry Readiness'],
    careerPathways: ['R&D Bioprocess Scientist', 'Regulatory Affairs Specialist', 'Clinical Trials Lead', 'Doctoral Fellowship'],
  },
  {
    id: 'bcom-pa',
    title: 'B.Com. Professional Accounting',
    level: 'Undergraduate',
    school: 'commerce',
    schoolLabel: 'School of Commerce',
    duration: '3 Years',
    intake: 120,
    eligibility: '10+2 with Commerce / Accountancy / Mathematics',
    summary:
      'Structured around CA, CMA, and ACCA syllabi, uniting corporate accounting, Indian taxation, auditing, and ERP financial workflows.',
    coreModules: [
      'Corporate Accounting & Ind AS Standards',
      'Direct & Indirect Taxation (GST Law)',
      'Statutory Auditing & Forensic Accounting',
      'SAP FICO & Financial Modelling Lab',
    ],
    certifications: ['TallyPrime with GST Mastery', 'ACCA Foundation Exemptions', 'NSE Capital Markets Module'],
    careerPathways: ['Audit Associate', 'Tax Consultant', 'Corporate Financial Analyst', 'Chartered Accountancy'],
  },
  {
    id: 'bba-ca',
    title: 'BBA (Computer Applications)',
    level: 'Undergraduate',
    school: 'commerce',
    schoolLabel: 'School of Management',
    duration: '3 Years',
    intake: 120,
    eligibility: '10+2 in any discipline from a recognized board',
    summary:
      'Blends modern business strategy, supply chain analytics, and digital marketing with enterprise database and analytics tools.',
    coreModules: [
      'Organizational Behaviour & Strategic Management',
      'Business Analytics with Power BI & SQL',
      'Digital Brand Strategy & Consumer Insights',
      'Operations & Supply Chain Modelling',
    ],
    certifications: ['Google Digital Garage & Analytics', 'Six Sigma Yellow Belt', 'Zoho CRM & Books Certification'],
    careerPathways: ['Business Analyst', 'Operations Executive', 'Growth Marketing Associate', 'MBA Pathway'],
  },
  {
    id: 'mcom',
    title: 'M.Com. (International Business & Finance)',
    level: 'Postgraduate',
    school: 'commerce',
    schoolLabel: 'School of Commerce',
    duration: '2 Years',
    intake: 50,
    eligibility: 'B.Com. / BBA / BBM from a recognized university',
    summary:
      'Executive-oriented postgraduate commerce programme covering global trade finance, derivatives, quantitative research, and fintech.',
    coreModules: [
      'International Trade Finance & EXIM Policy',
      'Security Analysis & Portfolio Management',
      'Quantitative Research & Econometrics',
      'Corporate Governance & ESG Reporting',
    ],
    certifications: ['NISM Mutual Fund & Derivatives', 'Bloomberg Market Concepts', 'SPSS Quantitative Analysis'],
    careerPathways: ['Investment Operations Analyst', 'Trade Finance Specialist', 'Wealth Advisor', 'Academic Research'],
  },
  {
    id: 'bsc-viscom',
    title: 'B.Sc. Visual Communication',
    level: 'Undergraduate',
    school: 'media',
    schoolLabel: 'School of Media & Arts',
    duration: '3 Years',
    intake: 60,
    eligibility: '10+2 in any stream; portfolio review optional',
    summary:
      'Studio-driven curriculum in cinematography, editorial photography, graphic design, 3D motion, and broadcast journalism.',
    coreModules: [
      'Typography, Editorial Layout & Brand Identity',
      'Digital Cinematography & Lighting Studio',
      'Sound Design & Post-Production Editing',
      'UX Prototyping & Interactive Storytelling',
    ],
    certifications: ['Adobe Creative Cloud Specialist', 'DaVinci Resolve Colour Grading', 'Broadcast Production Lab'],
    careerPathways: ['Art Director', 'Cinematographer & Editor', 'UI/UX Designer', 'Brand Strategist'],
  },
  {
    id: 'ba-english',
    title: 'B.A. English Literature',
    level: 'Undergraduate',
    school: 'media',
    schoolLabel: 'School of Humanities',
    duration: '3 Years',
    intake: 60,
    eligibility: '10+2 in any stream with strong English proficiency',
    summary:
      'Critical literary inquiry paired with contemporary technical writing, translation studies, editorial publishing, and communication design.',
    coreModules: [
      'Indian Writing in English & Postcolonial Theory',
      'World Literature & Comparative Criticism',
      'Journalism, Copyediting & Content Strategy',
      'Applied Linguistics & Phonetics Lab',
    ],
    certifications: ['Cambridge Business English (BEC)', 'Technical Documentation Workshop', 'Editorial Publishing Practicum'],
    careerPathways: ['Editorial & Publishing Specialist', 'Corporate Communications', 'UX Writer', 'Civil Services / Academia'],
  },
];

export const RESEARCH_CENTRES: ResearchCentre[] = [
  {
    id: 'ai-lab',
    code: '01. Computing & Applied AI',
    title: 'Centre for Artificial Intelligence & Cloud Systems',
    leadDepartment: 'School of Computing · Block C',
    description:
      'Equipped with 180+ dual-display developer workstations and dedicated GPU compute nodes, students build production models in computer vision, Tamil NLP, and cloud cybersecurity alongside industry mentors.',
    highlights: [
      'Active MoUs with Zoho, IBM SkillsBuild, and AWS Academy',
      '42 student-authored IEEE & Scopus conference papers in 2024–25',
      'Annual 36-hour Krishna Innovation Hackathon with seed grants',
    ],
    partnerOrGrant: 'Industry Partner Lab · TCS, IBM & AWS',
    image: IMAGES.computingLab,
    imageAlt: 'Students collaborating inside the modern SKCAS AI and computing laboratory',
    caption: 'Fig. 2 — Advanced Computing & Machine Learning Studio, Academic Block C.',
  },
  {
    id: 'biotech-centre',
    code: '02. Life Sciences & Genomics',
    title: 'Biotechnology, Diagnostics & Bio-Innovation Lab',
    leadDepartment: 'School of Life Sciences · Block B',
    description:
      'A sterile, instrumentation-rich research facility supporting undergraduate and M.Sc. investigations in phytomedicine, microbial enzyme kinetics, water quality remediation, and clinical PCR workflows.',
    courseworkDetail:
      'Anchored by B.Sc. Biotechnology, B.Sc. Microbiology, and M.Sc. Biotechnology, the curriculum integrates recombinant DNA technology, bioprocess fermentation, clinical immunology, and computational bioinformatics with hands-on Good Laboratory Practice (GLP) and NABL quality protocols.',
    highlights: [
      'Core lab modules in molecular cloning, ELISA serology & HPLC analysis',
      'Real-time thermal cyclers, UV-Vis spectrophotometers & laminar hoods',
      'Funded student minor projects supported by TNSCST & DBT-STAR',
      '14 patent disclosures filed through the Institutional Innovation Council',
    ],
    partnerOrGrant: 'DBT-STAR & TNSCST Research Support',
    image: IMAGES.biotechLab,
    imageAlt: 'Researchers examining samples with optical microscopes in the SKCAS Biotechnology lab',
    caption: 'Fig. 3 — Molecular Biology & Analytical Wet Lab, Life Sciences Wing.',
  },
];

export const RESEARCH_PILLARS = [
  {
    index: '03.',
    title: 'Outcome-Based Autonomy',
    detail:
      'Syllabi are revised every academic cycle by Boards of Studies comprising Bharathiar University nominees and senior engineering/finance directors from Bengaluru and Coimbatore.',
  },
  {
    index: '04.',
    title: 'Institution’s Innovation Council',
    detail:
      'Recognised by the Ministry of Education (MoE), nurturing student founders from prototype validation to IP filing and regional startup incubation.',
  },
  {
    index: '05.',
    title: 'FinTech & Analytics Terminal',
    detail:
      'Dedicated Commerce & Management lab running TallyPrime, SAP workflows, Power BI dashboards, and live capital-market simulation modules.',
  },
];

export const PLACEMENT_COHORTS: Record<'2025' | '2024', PlacementCohort> = {
  '2025': {
    year: '2024–25 Graduating Batch',
    placementRate: '96.4%',
    offersExtended: '2,184',
    medianPackage: '₹ 4.85 LPA',
    highestPackage: '₹ 12.60 LPA',
    participatingCompanies: '195',
    sectorBreakdown: [
      { sector: 'IT Services & Software Product', share: 48 },
      { sector: 'Banking, Audit & FinTech', share: 26 },
      { sector: 'Biotech, Pharma & Healthcare', share: 14 },
      { sector: 'Media, Design & Consulting', share: 12 },
    ],
  },
  '2024': {
    year: '2023–24 Graduating Batch',
    placementRate: '95.1%',
    offersExtended: '2,040',
    medianPackage: '₹ 4.50 LPA',
    highestPackage: '₹ 11.40 LPA',
    participatingCompanies: '182',
    sectorBreakdown: [
      { sector: 'IT Services & Software Product', share: 46 },
      { sector: 'Banking, Audit & FinTech', share: 28 },
      { sector: 'Biotech, Pharma & Healthcare', share: 15 },
      { sector: 'Media, Design & Consulting', share: 11 },
    ],
  },
};

export const TOP_RECRUITERS = [
  'Tata Consultancy Services',
  'Zoho Corporation',
  'Deloitte India',
  'Infosys',
  'Cognizant',
  'EY Global Delivery',
  'Wipro',
  'Accenture',
  'Biocon',
  'KPMG',
  'Bosch Global Software',
  'HDFC Bank',
];

export const STUDENT_OUTCOMES: StudentOutcome[] = [
  {
    id: 'harini-s',
    name: 'Harini Subramanian',
    programme: 'B.Sc. AI & Machine Learning',
    batch: 'Class of 2025',
    role: 'Member Technical Staff',
    company: 'Zoho Corporation',
    outcomeQuote:
      'Three semesters of guided capstone work in the Block C AI lab took me from foundational Python to deploying production NLP classifiers before final campus interviews.',
  },
  {
    id: 'karthik-r',
    name: 'Karthik Rajendran',
    programme: 'B.Com. Professional Accounting',
    batch: 'Class of 2025',
    role: 'Audit & Assurance Associate',
    company: 'Deloitte India',
    outcomeQuote:
      'Practising Ind AS case studies and statutory audit simulations alongside regular coursework made the transition into Big Four assurance interviews effortless.',
  },
  {
    id: 'nivedha-m',
    name: 'Nivedha Murugesan',
    programme: 'M.Sc. Biotechnology',
    batch: 'Class of 2024',
    role: 'Associate Research Scientist',
    company: 'Biocon Biologics',
    outcomeQuote:
      'My postgraduate dissertation on downstream protein purification gave me direct hands-on command over HPLC and bioreactor instrumentation.',
  },
];

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: 'library',
    title: 'Knowledge Resource Centre',
    subtitle: 'Central Digital & Print Library',
    hours: 'Mon–Sat · 08:00 to 20:00 IST',
    description:
      'A sunlit, double-height scholarly hub housing 68,000+ print volumes, IEEE/Springer/DELNET e-journal subscriptions, quiet individual study carrels, and collaborative project pods.',
    keyFacts: [
      '68,400+ curated academic volumes & reference texts',
      'Remote off-campus access to 14,000+ peer-reviewed e-journals',
      'Automated RFID circulation & dedicated competitive exam wing',
    ],
    image: IMAGES.centralLibrary,
    imageAlt: 'Students reading at oak study tables inside the SKCAS Central Library under a natural skylight',
    caption: 'Fig. 4 — Central Knowledge Resource Centre, Main Quadrangle.',
  },
  {
    id: 'convocation',
    title: 'Convention Auditorium & Guilds',
    subtitle: '1,200-Seat Acoustic Hall & 28 Societies',
    hours: 'Club Hours · Wed & Fri 15:30 to 17:30 IST',
    description:
      'From national academic convocations and keynote symposia in our timber-panelled convention auditorium to 28 active cultural, NSS, and NCC student societies, campus life thrives beyond lectures.',
    keyFacts: [
      '1,200-seat acoustically engineered convention auditorium',
      'Annual inter-collegiate cultural & tech festival “Krishotsav”',
      '2 active NSS units & NCC Army/Air Wing detachments',
    ],
    image: IMAGES.auditorium,
    imageAlt: 'Graduating students seated inside the timber-panelled SKCAS convention auditorium during convocation',
    caption: 'Fig. 5 — Main Convention Auditorium during Annual Academic Convocation.',
  },
  {
    id: 'media-studio',
    title: 'Media Production & Design Studio',
    subtitle: 'Visual Communication & Broadcast Wing',
    hours: 'Mon–Sat · 09:00 to 18:30 IST',
    description:
      'A dedicated creative production house featuring cinema dolly rigs, acoustic sound stages, calibrated DaVinci colour-grading suites, and editorial photography bays.',
    keyFacts: [
      'Full-frame cinema rigs, overhead softbox grids & green-screen stage',
      'Calibrated Mac & workstation suites for film editing and 3D motion',
      'Student-run campus documentary unit and design publication desk',
    ],
    image: IMAGES.mediaStudio,
    imageAlt: 'Visual communication students working with cinema camera dolly and colour grading monitors in the media studio',
    caption: 'Fig. 6 — School of Media & Arts Production Studio, Block D.',
  },
  {
    id: 'sports',
    title: 'Athletics & 32-Acre Sports Complex',
    subtitle: '400m Track, Turf & Floodlit Courts',
    hours: 'Daily · 06:00 to 08:30 & 16:00 to 19:00 IST',
    description:
      'Spanning lush neem-lined grounds in Kuniamuthur, the complex supports university athletes and daily fitness with a 400m terracotta track, football and cricket turf, and floodlit basketball courts.',
    keyFacts: [
      'Dedicated sports scholarships for state & national medalists',
      '400m athletic track, football pitch, and outdoor basketball courts',
      'Certified physical education directors & strength conditioning hall',
    ],
    image: IMAGES.sportsGrounds,
    imageAlt: '400m red clay running track, green turf pitch, and basketball courts at the 32-acre SKCAS athletic complex',
    caption: 'Fig. 7 — 32-Acre Kuniamuthur Athletic Grounds & Sports Pavilion.',
  },
];

export const HERITAGE_ERAS: HeritageEra[] = [
  {
    id: 'era-1997',
    year: '1997',
    eraTitle: 'Foundation in Kuniamuthur',
    headline: 'A Vision Rooted in Access & Academic Rigour',
    summary:
      'Established in 1997 by the VLB Trust / Sri Krishna Institutions in Kuniamuthur, Coimbatore, the college opened its sandstone portico to its inaugural cohort of undergraduate scholars across Commerce and Computer Science.',
    milestoneStat: '1997',
    statLabel: 'Inaugural Academic Year · Sugunapuram',
    image: IMAGES.heritage1997,
    imageAlt: 'The 1997 heritage founding academic block shaded by mature banyan trees at SKCAS',
    plateCaption: 'Archive Plate 01 — The original 1997 Academic Portico and colonnade walkway.',
  },
  {
    id: 'era-2004',
    year: '2004',
    eraTitle: 'Expansion of Sciences & PG',
    headline: 'Building Wet Laboratories & Postgraduate Schools',
    summary:
      'Between 2002 and 2006, the college expanded into Life Sciences, Biotechnology, Microbiology, and Visual Communication—establishing dedicated wet labs and welcoming postgraduate research cohorts.',
    milestoneStat: '18+',
    statLabel: 'Departments & Research Wings Established',
    image: IMAGES.biotechLab,
    imageAlt: 'Life Sciences and Biotechnology analytical laboratories at Sri Krishna College',
    plateCaption: 'Archive Plate 02 — Life Sciences & Molecular Diagnostics Laboratory wing.',
  },
  {
    id: 'era-2011',
    year: '2011',
    eraTitle: 'UGC Autonomous Status',
    headline: 'Curriculum Freedom & Outcome-Based Education',
    summary:
      'Conferred Autonomous status by the University Grants Commission (UGC) and Bharathiar University in 2011, SKCAS redesigned every syllabus around Choice-Based Credit Systems and industry co-authored modules.',
    milestoneStat: '2011',
    statLabel: 'UGC Autonomous Charter Granted',
    image: IMAGES.auditorium,
    imageAlt: 'Annual convocation ceremony inside the Sri Krishna College convention auditorium',
    plateCaption: 'Archive Plate 03 — Autonomous Academic Convocation in the Main Auditorium.',
  },
  {
    id: 'era-2018',
    year: '2018',
    eraTitle: 'NAAC ‘A’ & Innovation Council',
    headline: 'National Accreditation & Applied AI Research',
    summary:
      'Re-accredited by NAAC with ‘A’ Grade and recognised under the Ministry of Education’s Institution’s Innovation Council, the campus launched specialized GPU AI labs and DBT-STAR funded research programmes.',
    milestoneStat: 'NAAC A',
    statLabel: 'Accredited Excellence & NIRF Ranked',
    image: IMAGES.computingLab,
    imageAlt: 'Students working inside the AI and Cloud Systems Innovation Lab at SKCAS',
    plateCaption: 'Archive Plate 04 — Advanced Computing & Applied AI Research Studio.',
  },
  {
    id: 'era-2026',
    year: '2026',
    eraTitle: '32-Acre Digital & Green Campus',
    headline: 'Over 8,000 Scholars & 12,000+ Global Alumni',
    summary:
      'Today, the 32-acre Kuniamuthur campus integrates a sunlit Knowledge Resource Centre, broadcast media studios, athletic complexes, and 54+ degree programmes preparing graduates for global careers.',
    milestoneStat: '32 Acres',
    statLabel: 'Scholarly Campus · 54+ Programmes',
    image: IMAGES.campusHero,
    imageAlt: 'Modern sandstone and glass quadrangle of Sri Krishna College of Arts and Science',
    plateCaption: 'Archive Plate 05 — Contemporary Academic Quadrangle at Golden Hour.',
  },
];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All Plates',
  'Heritage & Architecture',
  'Laboratories',
  'Campus & Athletics',
];

export const CAMPUS_GALLERY: GalleryPlate[] = [
  {
    id: 'plate-quadrangle',
    plateNumber: 'PLATE 01',
    category: 'Heritage & Architecture',
    title: 'Main Academic Quadrangle',
    yearOrContext: 'Contemporary Campus · Block A',
    description:
      'Sandstone colonnades and glass skylights frame the central quadrangle where students gather between lectures.',
    image: IMAGES.campusHero,
    alt: 'Main Academic Quadrangle at Sri Krishna College of Arts and Science in Coimbatore',
  },
  {
    id: 'plate-1997',
    plateNumber: 'PLATE 02',
    category: 'Heritage & Architecture',
    title: '1997 Founding Academic Wing',
    yearOrContext: 'Est. 1997 · Heritage Portico',
    description:
      'The historic founding block shaded by mature rain and banyan trees, preserving the architectural roots of the institution.',
    image: IMAGES.heritage1997,
    alt: '1997 heritage founding building and entrance portico at SKCAS',
  },
  {
    id: 'plate-library',
    plateNumber: 'PLATE 03',
    category: 'Heritage & Architecture',
    title: 'Central Knowledge Resource Centre',
    yearOrContext: '68,400+ Volumes · 14,000+ E-Journals',
    description:
      'Double-height oak bookshelves and natural skylights anchor the quiet scholarly reading hall.',
    image: IMAGES.centralLibrary,
    alt: 'Central Knowledge Resource Centre library at Sri Krishna College',
  },
  {
    id: 'plate-ai-lab',
    plateNumber: 'PLATE 04',
    category: 'Laboratories',
    title: 'AI & Cloud Computing Studio',
    yearOrContext: 'School of Computing · Block C',
    description:
      'Industry-partnered developer workstations supporting machine learning, cybersecurity, and full-stack capstones.',
    image: IMAGES.computingLab,
    alt: 'AI and Cloud Computing Studio inside Block C at SKCAS',
  },
  {
    id: 'plate-biotech',
    plateNumber: 'PLATE 05',
    category: 'Laboratories',
    title: 'Biotechnology & Genomics Wet Lab',
    yearOrContext: 'DBT-STAR Supported · Block B',
    description:
      'Sterile analytical benches equipped with thermal cyclers, optical microscopes, and HPLC workflows.',
    image: IMAGES.biotechLab,
    alt: 'Biotechnology and Genomics Wet Lab at Sri Krishna College',
  },
  {
    id: 'plate-media',
    plateNumber: 'PLATE 06',
    category: 'Laboratories',
    title: 'Visual Communication & Film Studio',
    yearOrContext: 'School of Media & Arts · Block D',
    description:
      'Cinema dolly track, softbox lighting truss, and calibrated colour-grading desks for broadcast and film students.',
    image: IMAGES.mediaStudio,
    alt: 'Visual Communication and Digital Media Studio at SKCAS',
  },
  {
    id: 'plate-auditorium',
    plateNumber: 'PLATE 07',
    category: 'Campus & Athletics',
    title: 'Main Convention Auditorium',
    yearOrContext: '1,200-Seat Acoustic Hall',
    description:
      'Venue for annual autonomous convocations, international research conferences, and cultural festivals.',
    image: IMAGES.auditorium,
    alt: 'Main Convention Auditorium during convocation at SKCAS',
  },
  {
    id: 'plate-sports',
    plateNumber: 'PLATE 08',
    category: 'Campus & Athletics',
    title: '32-Acre Athletics & Sports Complex',
    yearOrContext: '400m Track & Floodlit Courts',
    description:
      'Surrounded by neem and palm avenues, supporting track athletes, football, cricket, and inter-university basketball.',
    image: IMAGES.sportsGrounds,
    alt: '32-Acre Athletics and Sports Complex at Sri Krishna College',
  },
];

export const FACULTY_DEPARTMENTS: FacultyDepartmentCategory[] = [
  'All Departments',
  'Leadership',
  'Computing & AI',
  'Life Sciences',
  'Commerce & Management',
  'Arts & Media',
];

export const FACULTY_DIRECTORY: StaffMember[] = [
  {
    id: 'dr-meenakshi-sundaram',
    name: 'Dr. Meenakshi Sundaram',
    role: 'Principal & Professor of Computer Science',
    department: 'Office of the Principal · Institutional Leadership',
    departmentCategory: 'Leadership',
    qualification: 'Ph.D., M.Phil., M.Sc.',
    tenure: '26 Years',
    specialization:
      'Outcome-Based Autonomous Governance, Distributed Systems, and Academic Quality Assurance.',
    email: 'principal@skcas.ac.in',
    photo: IMAGES.facultyPrincipal,
    photoAlt: 'Portrait of Dr. Meenakshi Sundaram, Principal of Sri Krishna College of Arts and Science',
  },
  {
    id: 'dr-aravindhan-natarajan',
    name: 'Dr. Aravindhan Natarajan',
    role: 'Professor & Head of Department',
    department: 'Department of Computer Science & AI',
    departmentCategory: 'Computing & AI',
    qualification: 'Ph.D. (Computer Science), M.Tech.',
    tenure: '16 Years',
    specialization:
      'Applied Machine Learning, Tamil Natural Language Processing, and Cloud-Native Architectures.',
    email: 'hod.cs@skcas.ac.in',
    photo: IMAGES.facultyCs,
    photoAlt: 'Portrait of Dr. Aravindhan Natarajan, Head of Computer Science and AI',
  },
  {
    id: 'dr-priyadharshini-sridhar',
    name: 'Dr. Priyadharshini Sridhar',
    role: 'Associate Professor & Head of Department',
    department: 'Department of Biotechnology & Microbiology',
    departmentCategory: 'Life Sciences',
    qualification: 'Ph.D. (Biotechnology), CSIR-NET',
    tenure: '14 Years',
    specialization:
      'Molecular Diagnostics, Phytomedicine, Bioprocess Kinetics, and DBT-STAR Research Projects.',
    email: 'hod.biotech@skcas.ac.in',
    photo: IMAGES.facultyBiotech,
    photoAlt: 'Portrait of Dr. Priyadharshini Sridhar in the SKCAS Biotechnology laboratory',
  },
  {
    id: 'dr-raghavan-subramani',
    name: 'Dr. Raghavan Subramani',
    role: 'Dean & Professor of Commerce',
    department: 'Department of Commerce & Professional Accounting',
    departmentCategory: 'Commerce & Management',
    qualification: 'Ph.D. (Commerce), FCA, M.Com.',
    tenure: '22 Years',
    specialization:
      'Corporate Financial Reporting (Ind AS), Direct & Indirect Taxation, and Capital Market Analytics.',
    email: 'dean.commerce@skcas.ac.in',
    photo: IMAGES.facultyCommerce,
    photoAlt: 'Portrait of Dr. Raghavan Subramani, Dean of Commerce and Professional Accounting',
  },
  {
    id: 'prof-kavitha-balakrishnan',
    name: 'Prof. Kavitha Balakrishnan',
    role: 'Assistant Professor & Studio Head',
    department: 'Department of Visual Communication',
    departmentCategory: 'Arts & Media',
    qualification: 'M.Sc. (Electronic Media), UGC-NET',
    tenure: '11 Years',
    specialization:
      'Documentary Cinematography, Colour Grading Workflows, Editorial Design, and Broadcast Production.',
    email: 'hod.viscom@skcas.ac.in',
    photo: IMAGES.facultyMedia,
    photoAlt: 'Portrait of Prof. Kavitha Balakrishnan in the Visual Communication Media Studio',
  },
  {
    id: 'dr-senthil-venkatachalam',
    name: 'Dr. Senthil Kumar Venkatachalam',
    role: 'Professor & Head of Humanities',
    department: 'Department of English Literature',
    departmentCategory: 'Arts & Media',
    qualification: 'Ph.D. (English), M.A., CELTA',
    tenure: '18 Years',
    specialization:
      'Indian Writing in English, Postcolonial Literary Studies, Technical Communication, and Editorial Publishing.',
    email: 'hod.english@skcas.ac.in',
    photo: IMAGES.facultyHumanities,
    photoAlt: 'Portrait of Dr. Senthil Kumar Venkatachalam along the college colonnade',
  },
];

export const ADMISSIONS_STEPS = [
  {
    step: '01.',
    title: 'Online Registration',
    detail: 'Submit your academic preferences and Class XII / Undergraduate marks via the 2026–27 portal.',
  },
  {
    step: '02.',
    title: 'Merit Evaluation & Counselling',
    detail: 'Shortlisted applicants receive a counselling slot within 48 hours for seat confirmation.',
  },
  {
    step: '03.',
    title: 'Document Verification',
    detail: 'Verify original mark sheets, transfer certificate, and scholarship eligibility at Kuniamuthur campus.',
  },
  {
    step: '04.',
    title: 'Enrolment & Orientation',
    detail: 'Complete fee remittance and attend the First-Year Academic Bridge Programme in June 2026.',
  },
];
