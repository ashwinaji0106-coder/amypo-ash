import { useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Expand,
  MapPin,
  Search,
  X,
} from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  ADMISSIONS_STEPS,
  CAMPUS_FACILITIES,
  CAMPUS_GALLERY,
  FACULTY_DEPARTMENTS,
  FACULTY_DIRECTORY,
  GALLERY_CATEGORIES,
  HERITAGE_ERAS,
  IMAGES,
  INSTITUTIONAL_METRICS,
  PLACEMENT_COHORTS,
  PROGRAMMES,
  RESEARCH_CENTRES,
  RESEARCH_PILLARS,
  SCHOOL_FILTERS,
  STUDENT_OUTCOMES,
  TOP_RECRUITERS,
  type FacultyDepartmentCategory,
  type GalleryCategory,
  type Programme,
  type SchoolCategory,
} from './data/collegeData';
import { Navbar } from './components/Navbar';
import { SafeImage } from './components/SafeImage';
import { ProgrammeDrawer } from './components/ProgrammeDrawer';
import { GalleryLightbox } from './components/GalleryLightbox';

type DegreeFilter = 'all' | 'Undergraduate' | 'Postgraduate';
type InquiryType = 'Admission Application' | 'Campus Tour' | 'Scholarship Desk';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

export default function App() {
  // Heritage Era & Gallery state
  const [activeEraId, setActiveEraId] = useState<string>(HERITAGE_ERAS[0].id);
  const [galleryFilter, setGalleryFilter] =
    useState<GalleryCategory>('All Plates');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Academic Explorer state
  const [selectedSchool, setSelectedSchool] = useState<SchoolCategory>('all');
  const [selectedLevel, setSelectedLevel] = useState<DegreeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProgramme, setActiveProgramme] = useState<Programme | null>(null);

  // Faculty & Staff filter state
  const [selectedDepartment, setSelectedDepartment] =
    useState<FacultyDepartmentCategory>('All Departments');

  // Placements Cohort switcher
  const [selectedCohort, setSelectedCohort] = useState<'2025' | '2024'>('2025');

  // Campus Life facility switcher
  const [activeFacilityId, setActiveFacilityId] = useState<string>(
    CAMPUS_FACILITIES[0].id
  );

  // Admissions Form state
  const admissionsSectionRef = useRef<HTMLElement | null>(null);
  const [inquiryType, setInquiryType] = useState<InquiryType>(
    'Admission Application'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredProgramme, setPreferredProgramme] = useState(
    PROGRAMMES[0].title
  );
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefCode, setSubmittedRefCode] = useState<string | null>(null);

  const activeEra =
    HERITAGE_ERAS.find((era) => era.id === activeEraId) ?? HERITAGE_ERAS[0];

  const filteredGalleryPlates = useMemo(() => {
    if (galleryFilter === 'All Plates') return CAMPUS_GALLERY;
    return CAMPUS_GALLERY.filter((plate) => plate.category === galleryFilter);
  }, [galleryFilter]);

  const filteredProgrammes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROGRAMMES.filter((item) => {
      const matchesSchool =
        selectedSchool === 'all' || item.school === selectedSchool;
      const matchesLevel =
        selectedLevel === 'all' || item.level === selectedLevel;
      const matchesQuery =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.schoolLabel.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);
      return matchesSchool && matchesLevel && matchesQuery;
    });
  }, [selectedSchool, selectedLevel, searchQuery]);

  const filteredFaculty = useMemo(() => {
    if (selectedDepartment === 'All Departments') return FACULTY_DIRECTORY;
    return FACULTY_DIRECTORY.filter(
      (member) => member.departmentCategory === selectedDepartment
    );
  }, [selectedDepartment]);

  const activeCohortData = PLACEMENT_COHORTS[selectedCohort];
  const activeFacility =
    CAMPUS_FACILITIES.find((f) => f.id === activeFacilityId) ??
    CAMPUS_FACILITIES[0];

  const scrollToAdmissions = (
    type?: InquiryType,
    programmeTitle?: string
  ) => {
    if (type) setInquiryType(type);
    if (programmeTitle) setPreferredProgramme(programmeTitle);
    setSubmittedRefCode(null);
    admissionsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDrawerInquire = (programmeTitle: string) => {
    setActiveProgramme(null);
    scrollToAdmissions('Admission Application', programmeTitle);
  };

  const openPlateInLightbox = (plateId: string) => {
    const idx = CAMPUS_GALLERY.findIndex((p) => p.id === plateId);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (fullName.trim().length < 2) {
      errors.fullName = 'Please enter the applicant’s full name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      errors.email = 'Enter a valid email address for counselling updates.';
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 12) {
      errors.phone = 'Enter a valid 10-digit mobile number.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      const randomSuffix = Math.floor(10000 + Math.random() * 89999);
      setSubmittedRefCode(`SKCAS-2026-${randomSuffix}`);
      setIsSubmitting(false);
    }, 350);
  };

  const resetInquiryForm = () => {
    setSubmittedRefCode(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setFormErrors({});
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="top"
        className="min-h-screen flex flex-col bg-[#FAF9F6] text-zinc-900"
      >
        <Navbar
          onApplyClick={() => scrollToAdmissions('Admission Application')}
        />

        <main className="flex-1">
          {/* HERO SECTION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Editorial Column */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  <p className="text-xs font-medium tracking-wide text-zinc-500">
                    Coimbatore, Tamil Nadu
                    <span aria-hidden="true" className="mx-2">·</span>
                    Autonomous Institution
                    <span aria-hidden="true" className="mx-2">·</span>
                    NAAC A Grade
                  </p>

                  <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] font-semibold tracking-tight text-zinc-950 mt-5 text-balance">
                    Sri Krishna College of Arts and Science
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
                    An autonomous institution affiliated to Bharathiar University
                    since 1997, uniting rigorous scholarship in computing, life
                    sciences, commerce, and media with three decades of campus
                    heritage.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href="#academics"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#86604c] hover:bg-[#73513f] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1B365D]"
                    >
                      <span>Explore Programmes</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => scrollToAdmissions('Campus Tour')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-zinc-800 bg-white border border-zinc-300 hover:border-zinc-400 hover:bg-[#F2EFE9]/60 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D]"
                    >
                      <span>Schedule Campus Visit</span>
                    </button>
                  </div>
                </div>

                {/* Operational Academic Utility Line */}
                <div className="mt-10 pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-600">
                  <span>
                    2026–27 Academic Cycle: Merit counselling open for UG & PG
                    cohorts
                  </span>
                  <a
                    href="#heritage"
                    className="font-mono text-[#1B365D] hover:underline underline-offset-4 tabular-nums whitespace-nowrap shrink-0"
                  >
                    Est. 1997 · Read Chronicle
                  </a>
                </div>
              </div>

              {/* Right Architectural Dual-Plate Composition */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="relative flex-1 min-h-[320px] sm:min-h-[400px] lg:min-h-[450px] rounded-lg overflow-hidden border border-zinc-200 bg-[#F2EFE9] group">
                  <SafeImage
                    src={IMAGES.campusHero}
                    alt="Sri Krishna College of Arts and Science sandstone academic building and green quadrangle in Coimbatore"
                    className="w-full h-full lg:h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
                    fallbackLabel="Kuniamuthur Campus Quadrangle"
                  />

                  {/* Subtle Contrast Scrim & Inset Heritage Plate Trigger */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />

                  <button
                    type="button"
                    onClick={() => openPlateInLightbox('plate-1997')}
                    className="hidden sm:flex items-center gap-3.5 absolute bottom-4 left-4 p-2.5 pr-4 bg-[#FAF9F6]/95 backdrop-blur-sm border border-zinc-200 rounded-md text-left hover:bg-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D]"
                  >
                    <div className="w-16 h-12 rounded-sm overflow-hidden shrink-0 border border-zinc-200">
                      <SafeImage
                        src={IMAGES.heritage1997}
                        alt="1997 founding academic block"
                        className="w-full h-full object-cover"
                        fallbackLabel="1997 Wing"
                      />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] text-zinc-500 tabular-nums">
                        1997 — 2026
                      </p>
                      <p className="text-xs font-semibold text-zinc-900">
                        View Heritage Wing & 8 Campus Plates
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => openPlateInLightbox('plate-quadrangle')}
                    aria-label="Expand campus quadrangle photograph"
                    className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center rounded-md bg-zinc-950/65 text-white hover:bg-zinc-950 transition-colors cursor-pointer"
                  >
                    <Expand className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-4">
                  <p className="text-xs font-display italic text-zinc-500">
                    Fig. 1 — Main Academic Quadrangle, Sugunapuram Campus,
                    Coimbatore.
                  </p>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(0)}
                    className="text-xs font-medium text-[#1B365D] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Open Photo Archive (8)
                  </button>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Institutional Metrics Strip */}
            <div className="mt-12 pt-10 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {INSTITUTIONAL_METRICS.map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <p className="font-display text-3xl sm:text-4xl font-semibold text-zinc-950 tabular-nums tracking-tight">
                    {metric.value}
                  </p>
                  <p className="text-sm font-semibold text-zinc-800">
                    {metric.label}
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* HERITAGE CHRONICLE & CAMPUS PHOTO ARCHIVE */}
          <section
            id="heritage"
            className="bg-[#161B26] text-zinc-100 py-16 lg:py-24 border-t border-zinc-800"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-800">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-wider uppercase text-amber-400/90">
                    Institutional Chronicle · Since 1997
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mt-2 text-balance">
                    Three Decades of Scholarship & Architecture
                  </h2>
                  <p className="mt-3 text-base text-zinc-300 leading-relaxed">
                    From a single sandstone portico in Kuniamuthur to a
                    32-acre autonomous university-grade campus, trace the
                    milestones and spaces that shaped Sri Krishna College.
                  </p>
                </div>

                {/* Era Year Selector */}
                <div
                  role="tablist"
                  aria-label="Select college history era"
                  className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900/90 border border-zinc-800 rounded-lg w-fit"
                >
                  {HERITAGE_ERAS.map((era) => {
                    const active = era.id === activeEra.id;
                    return (
                      <button
                        key={era.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setActiveEraId(era.id)}
                        className={`px-3.5 py-2 font-mono text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                          active
                            ? 'bg-white text-zinc-950'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {era.year}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Era Chronicle Stage */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
                >
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
                      <SafeImage
                        src={activeEra.image}
                        alt={activeEra.imageAlt}
                        className="w-full h-full object-cover"
                        fallbackLabel={activeEra.eraTitle}
                      />
                    </div>
                    <p className="mt-2.5 text-xs font-display italic text-zinc-400">
                      {activeEra.plateCaption}
                    </p>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between py-2">
                    <div>
                      <p className="font-mono text-xs text-amber-400/90 tabular-nums">
                        CHAPTER {activeEra.year}
                        <span aria-hidden="true" className="mx-2 text-zinc-600">
                          ·
                        </span>
                        <span className="text-zinc-300 font-sans">
                          {activeEra.eraTitle}
                        </span>
                      </p>

                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-3 text-balance">
                        {activeEra.headline}
                      </h3>

                      <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {activeEra.summary}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-800 flex items-end justify-between gap-4">
                      <div>
                        <p className="font-display text-3xl sm:text-4xl font-semibold text-white tabular-nums">
                          {activeEra.milestoneStat}
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                          {activeEra.statLabel}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const idx = HERITAGE_ERAS.findIndex(
                            (e) => e.id === activeEra.id
                          );
                          const next =
                            HERITAGE_ERAS[(idx + 1) % HERITAGE_ERAS.length];
                          setActiveEraId(next.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Next Era</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Campus Photographic Archive (8-Plate Interactive Bento Grid) */}
              <div className="mt-16 pt-12 border-t border-zinc-800">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-zinc-400">
                      Campus Photographic Archive
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-1.5">
                      Inside Kuniamuthur Campus
                    </h3>
                  </div>

                  {/* Gallery Filter Tabs */}
                  <div
                    role="tablist"
                    aria-label="Filter campus photographs"
                    className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900/90 border border-zinc-800 rounded-lg w-fit"
                  >
                    {GALLERY_CATEGORIES.map((category) => {
                      const active = galleryFilter === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setGalleryFilter(category)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                            active
                              ? 'bg-white text-zinc-950'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Asymmetric Editorial Photo Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredGalleryPlates.map((plate, idx) => {
                    const isFeatured =
                      galleryFilter === 'All Plates' &&
                      (idx === 0 || idx === 6);
                    return (
                      <button
                        key={plate.id}
                        type="button"
                        onClick={() => openPlateInLightbox(plate.id)}
                        className={`group text-left bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 rounded-lg overflow-hidden transition-colors cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                          isFeatured ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <div
                          className={`w-full overflow-hidden bg-zinc-950 relative ${
                            isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'
                          }`}
                        >
                          <SafeImage
                            src={plate.image}
                            alt={plate.alt}
                            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                            fallbackLabel={plate.title}
                          />
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-md bg-zinc-950/65 text-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Expand className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <p className="font-mono text-[11px] text-zinc-400 tabular-nums">
                              {plate.plateNumber}
                              <span aria-hidden="true" className="mx-1.5">
                                ·
                              </span>
                              <span className="font-sans">
                                {plate.yearOrContext}
                              </span>
                            </p>
                            <h4 className="font-display text-base sm:text-lg font-semibold text-white mt-1.5">
                              {plate.title}
                            </h4>
                            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                              {plate.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 1: ACADEMICS & PROGRAMME EXPLORER */}
          <section
            id="academics"
            className="border-t border-zinc-200 bg-white py-16 lg:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#1B365D]">
                    Academic Catalogue
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-zinc-950 mt-2 text-balance">
                    Schools & Degree Programmes
                  </h2>
                  <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                    Explore Choice-Based Credit System (CBCS) degrees designed
                    with industry practitioners. Select any programme to inspect
                    core modules, certifications, and graduate outcomes.
                  </p>
                </div>

                {/* Search Input */}
                <div className="w-full lg:w-80">
                  <label htmlFor="programme-search" className="sr-only">
                    Search academic programmes
                  </label>
                  <div className="relative">
                    <Search
                      className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="programme-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search B.Sc., AI, B.Com., Biotech..."
                      className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#FAF9F6] border border-zinc-300 rounded-md text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search query"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Filter Controls */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div
                  role="tablist"
                  aria-label="Filter programmes by school"
                  className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2EFE9] rounded-lg w-fit"
                >
                  {SCHOOL_FILTERS.map((tab) => {
                    const active = selectedSchool === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={active}
                        type="button"
                        onClick={() => setSelectedSchool(tab.id)}
                        className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] ${
                          active
                            ? 'bg-white text-zinc-950 shadow-xs'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 mr-1">Level:</span>
                  {(
                    ['all', 'Undergraduate', 'Postgraduate'] as DegreeFilter[]
                  ).map((lvl) => {
                    const active = selectedLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] ${
                          active
                            ? 'bg-[#1B365D] text-white border-[#1B365D]'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        {lvl === 'all' ? 'All Levels' : lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Programme Grid */}
              {filteredProgrammes.length === 0 ? (
                <div className="mt-10 py-14 px-6 text-center border border-zinc-200 rounded-lg bg-[#FAF9F6]">
                  <p className="font-display text-xl text-zinc-900">
                    No matching programmes found
                  </p>
                  <p className="mt-2 text-sm text-zinc-600">
                    Try clearing your search keyword or switching the school
                    filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSchool('all');
                      setSelectedLevel('all');
                      setSearchQuery('');
                    }}
                    className="mt-5 px-4 py-2 text-sm font-medium text-white bg-[#1B365D] rounded-md hover:bg-[#142847] transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProgrammes.map((programme) => (
                    <article
                      key={programme.id}
                      className="group flex flex-col justify-between p-6 bg-[#FAF9F6] border border-zinc-200 rounded-lg hover:border-zinc-400 transition-colors duration-150"
                    >
                      <div>
                        <p className="text-xs text-zinc-500 font-medium">
                          {programme.schoolLabel}
                          <span aria-hidden="true" className="mx-1.5">·</span>
                          {programme.level}
                        </p>

                        <h3 className="font-display text-xl font-semibold text-zinc-950 mt-2.5 leading-snug">
                          {programme.title}
                        </h3>

                        <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                          {programme.summary}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between gap-4">
                        <span className="font-mono text-xs text-zinc-500 tabular-nums">
                          {programme.duration} · {programme.intake} Seats
                        </span>

                        <button
                          type="button"
                          onClick={() => setActiveProgramme(programme)}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B365D] hover:text-[#142847] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] rounded-sm"
                        >
                          <span>View Curriculum</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* SECTION 2: RESEARCH & CENTRES OF EXCELLENCE */}
          <section
            id="research"
            className="border-t border-zinc-200 bg-[#FAF9F6] py-16 lg:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#1B365D]">
                  Innovation & Laboratories
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-zinc-950 mt-2 text-balance">
                  Research Centres & Industry Laboratories
                </h2>
                <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                  Undergraduate and postgraduate cohorts work directly inside
                  industry-co-designed labs backed by DBT-STAR, TNSCST, and
                  leading enterprise technology partners.
                </p>
              </div>

              {/* Asymmetric 2-Card Photography Feature */}
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {RESEARCH_CENTRES.map((centre, idx) => (
                  <article
                    key={centre.id}
                    className={`${
                      idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                    } flex flex-col bg-white border border-zinc-200 rounded-lg overflow-hidden`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2EFE9] border-b border-zinc-200">
                      <SafeImage
                        src={centre.image ?? IMAGES.computingLab}
                        alt={centre.imageAlt ?? centre.title}
                        className="w-full h-full object-cover"
                        fallbackLabel={centre.title}
                      />
                    </div>
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-zinc-500 font-medium">
                          {centre.code}
                          <span aria-hidden="true" className="mx-2">·</span>
                          {centre.leadDepartment}
                        </p>
                        <h3 className="font-display text-2xl font-semibold text-zinc-950 mt-2">
                          {centre.title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                          {centre.description}
                        </p>
                        {centre.courseworkDetail && (
                          <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                            {centre.courseworkDetail}
                          </p>
                        )}

                        <ul className="mt-5 space-y-2 border-t border-zinc-100 pt-4">
                          {centre.highlights.map((item) => (
                            <li
                              key={item}
                              className="text-sm text-zinc-700 flex items-baseline gap-2.5"
                            >
                              <span className="text-[#1B365D] font-mono text-xs">
                                —
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="mt-6 pt-4 border-t border-zinc-100 text-xs font-medium text-zinc-500">
                        {centre.partnerOrGrant}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Numbered Editorial Pillars */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-zinc-200">
                {RESEARCH_PILLARS.map((pillar) => (
                  <div key={pillar.index}>
                    <span className="font-mono text-xs text-zinc-400 tabular-nums">
                      {pillar.index}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-zinc-950 mt-1.5">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed">
                      {pillar.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2.5: FACULTY & ACADEMIC LEADERSHIP */}
          <section
            id="faculty"
            className="border-t border-zinc-200 bg-[#F2EFE9]/70 py-16 lg:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-300/70">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#1B365D]">
                    Academic Leadership & Faculty
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-zinc-950 mt-2 text-balance">
                    Heads of Department & Research Mentors
                  </h2>
                  <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                    Meet the academic leaders and department chairs guiding
                    autonomous curriculum design, funded research, and student
                    mentorship across our Kuniamuthur schools.
                  </p>
                </div>

                {/* Department Filter Tabs */}
                <div
                  role="tablist"
                  aria-label="Filter faculty by department"
                  className="flex flex-wrap items-center gap-1.5 p-1 bg-white/80 border border-zinc-200 rounded-lg w-fit"
                >
                  {FACULTY_DEPARTMENTS.map((dept) => {
                    const active = selectedDepartment === dept;
                    return (
                      <button
                        key={dept}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedDepartment(dept)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] ${
                          active
                            ? 'bg-[#1B365D] text-white'
                            : 'text-zinc-600 hover:text-zinc-950'
                        }`}
                      >
                        {dept}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Faculty Grid */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredFaculty.map((member) => (
                  <article
                    key={member.id}
                    className="bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[3/4] w-full overflow-hidden bg-[#FAF9F6] border-b border-zinc-200">
                        <SafeImage
                          src={member.photo}
                          alt={member.photoAlt}
                          className="w-full h-full object-cover object-top"
                          fallbackLabel={member.name}
                        />
                      </div>

                      <div className="p-6">
                        <p className="text-xs font-medium text-zinc-500">
                          {member.department}
                        </p>

                        <h3 className="font-display text-xl font-semibold text-zinc-950 mt-2">
                          {member.name}
                        </h3>

                        <p className="text-sm font-medium text-[#1B365D] mt-1">
                          {member.role}
                        </p>

                        <p className="text-xs font-mono text-zinc-500 mt-1.5">
                          {member.qualification}
                        </p>

                        <p className="mt-3.5 text-sm text-zinc-600 leading-relaxed">
                          {member.specialization}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between gap-4 text-xs">
                      <span className="font-mono text-zinc-500 tabular-nums">
                        Tenure: {member.tenure}
                      </span>
                      <a
                        href={`mailto:${member.email}`}
                        className="font-medium text-zinc-800 hover:text-[#1B365D] hover:underline underline-offset-4 truncate"
                      >
                        {member.email}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: PLACEMENTS & CAREER OUTCOMES */}
          <section
            id="placements"
            className="border-t border-zinc-200 bg-white py-16 lg:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#1B365D]">
                    Career Development & Placement Cell
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-zinc-950 mt-2 text-balance">
                    Verified Graduate Outcomes
                  </h2>
                  <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                    Structured aptitude mentoring, coding bootcamps, and domain
                    mock interviews prepare graduates for global technology,
                    audit, biopharma, and media roles.
                  </p>
                </div>

                {/* Cohort Switcher */}
                <div
                  role="tablist"
                  aria-label="Select graduating cohort"
                  className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg w-fit shrink-0"
                >
                  {(['2025', '2024'] as const).map((yr) => {
                    const active = selectedCohort === yr;
                    return (
                      <button
                        key={yr}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedCohort(yr)}
                        className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] ${
                          active
                            ? 'bg-white text-zinc-950 shadow-xs'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {yr} Cohort
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Audited Cohort Metrics + Sector Breakdown */}
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 bg-[#FAF9F6] border border-zinc-200 rounded-lg">
                    <p className="text-xs text-zinc-500">Placement Rate</p>
                    <p className="font-display text-3xl font-semibold text-zinc-950 mt-2 tabular-nums">
                      {activeCohortData.placementRate}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {activeCohortData.year}
                    </p>
                  </div>

                  <div className="p-5 bg-[#FAF9F6] border border-zinc-200 rounded-lg">
                    <p className="text-xs text-zinc-500">Recruiting Partners</p>
                    <p className="font-display text-3xl font-semibold text-zinc-950 mt-2 tabular-nums">
                      {activeCohortData.participatingCompanies}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      On-campus & pooled drives
                    </p>
                  </div>

                  <div className="p-5 bg-[#FAF9F6] border border-zinc-200 rounded-lg">
                    <p className="text-xs text-zinc-500">Median CTC</p>
                    <p className="font-mono text-2xl font-semibold text-zinc-950 mt-2 tabular-nums">
                      {activeCohortData.medianPackage}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">Per annum</p>
                  </div>

                  <div className="p-5 bg-[#FAF9F6] border border-zinc-200 rounded-lg">
                    <p className="text-xs text-zinc-500">
                      Highest Package Offered
                    </p>
                    <p className="font-mono text-2xl font-semibold text-[#1B365D] mt-2 tabular-nums">
                      {activeCohortData.highestPackage}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Product Engineering & Analytics tracks
                    </p>
                  </div>
                </div>

                {/* Sector Distribution */}
                <div className="lg:col-span-5 p-6 bg-[#FAF9F6] border border-zinc-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-zinc-950">
                    Offer Distribution by Industry Sector
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Share of total offers in {activeCohortData.year}
                  </p>

                  <div className="mt-5 space-y-4">
                    {activeCohortData.sectorBreakdown.map((row) => (
                      <div key={row.sector}>
                        <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5">
                          <span className="text-zinc-800 font-medium">
                            {row.sector}
                          </span>
                          <span className="font-mono text-zinc-700 tabular-nums">
                            {row.share}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1B365D] rounded-full transition-all duration-300"
                            style={{ width: `${row.share}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Recruiters Roster */}
              <div className="mt-10 pt-8 border-t border-zinc-200">
                <p className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
                  Principal Campus Recruiters
                </p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {TOP_RECRUITERS.map((company) => (
                    <div
                      key={company}
                      className="px-3.5 py-3 bg-[#FAF9F6] border border-zinc-200 rounded-md text-xs sm:text-sm font-medium text-zinc-800 text-center"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              </div>

              {/* Attributable Alumni Outcome Statements */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {STUDENT_OUTCOMES.map((story) => (
                  <blockquote
                    key={story.id}
                    className="p-6 bg-[#FAF9F6] border border-zinc-200 rounded-lg flex flex-col justify-between"
                  >
                    <p className="text-sm text-zinc-700 leading-relaxed">
                      “{story.outcomeQuote}”
                    </p>
                    <footer className="mt-6 pt-4 border-t border-zinc-200">
                      <p className="text-sm font-semibold text-zinc-950">
                        {story.name}
                      </p>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        {story.role}, {story.company}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {story.programme}
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        {story.batch}
                      </p>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4: CAMPUS LIFE & STUDENT EXPERIENCE */}
          <section
            id="campus"
            className="border-t border-zinc-200 bg-[#FAF9F6] py-16 lg:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#1B365D]">
                  Life at Kuniamuthur Campus
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-zinc-950 mt-2 text-balance">
                  A 32-Acre Scholarly Community
                </h2>
                <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                  Designed for focused study and vibrant co-curricular
                  discovery, the campus integrates digital library
                  infrastructure, a 1,200-seat convention auditorium, media
                  studios, and athletic grounds.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Facility Selector List */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                  <div
                    className="space-y-3"
                    role="tablist"
                    aria-label="Campus facilities"
                  >
                    {CAMPUS_FACILITIES.map((facility) => {
                      const active = facility.id === activeFacility.id;
                      return (
                        <button
                          key={facility.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveFacilityId(facility.id)}
                          className={`w-full text-left p-5 rounded-lg border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] ${
                            active
                              ? 'bg-white border-[#1B365D]'
                              : 'bg-[#FAF9F6] border-zinc-200 hover:bg-white hover:border-zinc-300'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="font-display text-lg font-semibold text-zinc-950">
                              {facility.title}
                            </h3>
                            <span className="text-xs font-medium text-[#1B365D] whitespace-nowrap shrink-0">
                              {active ? 'Selected' : 'Inspect'}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">
                            {facility.subtitle}
                            <span aria-hidden="true" className="mx-1.5">·</span>
                            {facility.hours}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Facility Showcase */}
                <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFacility.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.16 }}
                      className="flex flex-col flex-1"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#F2EFE9] border-b border-zinc-200">
                        <SafeImage
                          src={activeFacility.image}
                          alt={activeFacility.imageAlt}
                          className="w-full h-full object-cover"
                          fallbackLabel={activeFacility.title}
                        />
                      </div>
                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-display italic text-zinc-500">
                            {activeFacility.caption}
                          </p>
                          <h3 className="font-display text-2xl font-semibold text-zinc-950 mt-2">
                            {activeFacility.title}
                          </h3>
                          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                            {activeFacility.description}
                          </p>

                          <ul className="mt-5 pt-4 border-t border-zinc-100 space-y-2">
                            {activeFacility.keyFacts.map((fact) => (
                              <li
                                key={fact}
                                className="text-sm text-zinc-700 flex items-baseline gap-2.5"
                              >
                                <span className="text-[#1B365D] font-mono text-xs">
                                  —
                                </span>
                                <span>{fact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: ADMISSIONS 2026-27 & INQUIRY DESK */}
          <section
            id="admissions"
            ref={admissionsSectionRef}
            className="border-t border-zinc-200 bg-white py-16 lg:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Process & Campus Visit Details */}
                <div className="lg:col-span-5">
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#1B365D]">
                    Admissions 2026–27
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-zinc-950 mt-2 text-balance">
                    Begin Your Application at SKCAS
                  </h2>
                  <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                    Admissions are conducted strictly on academic merit and
                    personal counselling. Merit, sports, and first-graduate
                    scholarships are evaluated during counselling.
                  </p>

                  <div className="mt-8 space-y-6 border-t border-zinc-200 pt-6">
                    {ADMISSIONS_STEPS.map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <span className="font-mono text-xs text-[#1B365D] font-medium pt-1 tabular-nums">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-zinc-950">
                            {item.title}
                          </h3>
                          <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-5 bg-[#FAF9F6] border border-zinc-200 rounded-lg space-y-2 text-xs text-zinc-600">
                    <div className="flex items-center gap-2 font-semibold text-zinc-900 text-sm">
                      <MapPin
                        className="w-4 h-4 text-[#1B365D]"
                        aria-hidden="true"
                      />
                      <span>Admissions & Counselling Office</span>
                    </div>
                    <p>
                      Sugunapuram, Kuniamuthur, Coimbatore — 641008, Tamil Nadu
                    </p>
                    <p className="font-mono tabular-nums">
                      Mon–Sat · 09:00 to 17:00 IST · +91 422 267 8400
                    </p>
                  </div>
                </div>

                {/* Right Column: Validated Application / Campus Visit Form */}
                <div className="lg:col-span-7 bg-[#FAF9F6] border border-zinc-200 rounded-lg p-6 sm:p-10">
                  {submittedRefCode ? (
                    <div className="py-8 space-y-5">
                      <div className="flex items-center gap-3 text-[#1B365D]">
                        <CheckCircle2 className="w-6 h-6 shrink-0" />
                        <h3 className="font-display text-2xl font-semibold text-zinc-950">
                          Inquiry Registered Successfully
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                        Thank you,{' '}
                        <span className="font-semibold">{fullName}</span>. Your{' '}
                        <span className="font-medium">{inquiryType}</span>{' '}
                        request for{' '}
                        <span className="font-medium">
                          {preferredProgramme}
                        </span>{' '}
                        has been recorded by the SKCAS Admissions Desk. A
                        counsellor will reach out within one working day.
                      </p>

                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white border border-zinc-200 rounded-md text-sm">
                        <div>
                          <dt className="text-xs text-zinc-500">
                            Reference Number
                          </dt>
                          <dd className="font-mono font-semibold text-zinc-950 mt-1 tabular-nums">
                            {submittedRefCode}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-zinc-500">
                            Confirmation Sent To
                          </dt>
                          <dd className="font-medium text-zinc-900 mt-1 truncate">
                            {email}
                          </dd>
                        </div>
                      </dl>

                      <button
                        type="button"
                        onClick={resetInquiryForm}
                        className="px-5 py-2.5 text-sm font-medium text-zinc-800 bg-white border border-zinc-300 hover:border-zinc-400 rounded-md transition-colors cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={validateAndSubmit}
                      noValidate
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-zinc-950">
                          Admissions & Campus Visit Desk
                        </h3>
                        <p className="text-sm text-zinc-600 mt-1">
                          Complete the form below to receive fee structure
                          details, counselling dates, or to book a guided campus
                          visit.
                        </p>
                      </div>

                      {/* Inquiry Type Segmented Selector */}
                      <div>
                        <span className="block text-xs font-semibold text-zinc-700 mb-2">
                          Request Category
                        </span>
                        <div className="flex flex-wrap gap-1.5 p-1 bg-[#F2EFE9] rounded-lg w-fit">
                          {(
                            [
                              'Admission Application',
                              'Campus Tour',
                              'Scholarship Desk',
                            ] as InquiryType[]
                          ).map((type) => {
                            const active = inquiryType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setInquiryType(type)}
                                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] ${
                                  active
                                    ? 'bg-white text-zinc-950 shadow-xs'
                                    : 'text-zinc-600 hover:text-zinc-900'
                                }`}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="applicant-name"
                            className="block text-xs font-semibold text-zinc-700 mb-1.5"
                          >
                            Applicant Full Name
                          </label>
                          <input
                            id="applicant-name"
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              if (formErrors.fullName) {
                                setFormErrors((prev) => ({
                                  ...prev,
                                  fullName: undefined,
                                }));
                              }
                            }}
                            placeholder="e.g., Ananya Krishnan"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                          />
                          {formErrors.fullName && (
                            <p
                              className="mt-1.5 text-xs text-red-700"
                              role="alert"
                            >
                              {formErrors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="applicant-phone"
                            className="block text-xs font-semibold text-zinc-700 mb-1.5"
                          >
                            Mobile Number
                          </label>
                          <input
                            id="applicant-phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (formErrors.phone) {
                                setFormErrors((prev) => ({
                                  ...prev,
                                  phone: undefined,
                                }));
                              }
                            }}
                            placeholder="+91 98422 00000"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                          />
                          {formErrors.phone && (
                            <p
                              className="mt-1.5 text-xs text-red-700"
                              role="alert"
                            >
                              {formErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="applicant-email"
                            className="block text-xs font-semibold text-zinc-700 mb-1.5"
                          >
                            Email Address
                          </label>
                          <input
                            id="applicant-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (formErrors.email) {
                                setFormErrors((prev) => ({
                                  ...prev,
                                  email: undefined,
                                }));
                              }
                            }}
                            placeholder="ananya@example.com"
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                          />
                          {formErrors.email && (
                            <p
                              className="mt-1.5 text-xs text-red-700"
                              role="alert"
                            >
                              {formErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="preferred-programme"
                            className="block text-xs font-semibold text-zinc-700 mb-1.5"
                          >
                            Programme of Interest
                          </label>
                          <select
                            id="preferred-programme"
                            value={preferredProgramme}
                            onChange={(e) =>
                              setPreferredProgramme(e.target.value)
                            }
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md text-zinc-900 focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                          >
                            {PROGRAMMES.map((prog) => (
                              <option key={prog.id} value={prog.title}>
                                {prog.title} ({prog.level})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="applicant-notes"
                          className="block text-xs font-semibold text-zinc-700 mb-1.5"
                        >
                          Academic Background or Questions (Optional)
                        </label>
                        <textarea
                          id="applicant-notes"
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Mention Class XII stream, hostel requirement, or preferred campus tour date."
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded-md text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                        <span className="text-xs text-zinc-500">
                          Direct helpline: admissions@skcas.ac.in
                        </span>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1B365D] hover:bg-[#142847] disabled:opacity-60 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1B365D]"
                        >
                          <span>
                            {isSubmitting
                              ? 'Submitting Request...'
                              : 'Submit Inquiry'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* QUIET INSTITUTIONAL FOOTER */}
        <footer className="border-t border-zinc-200 bg-[#FAF9F6] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-200">
              <div className="md:col-span-5">
                <p className="font-display text-xl font-semibold text-zinc-950">
                  Sri Krishna College of Arts and Science
                </p>
                <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed max-w-md">
                  Sugunapuram, Kuniamuthur, Coimbatore — 641008, Tamil Nadu,
                  India. An Autonomous Institution affiliated to Bharathiar
                  University, accredited by NAAC with ‘A’ Grade.
                </p>
              </div>

              <div className="md:col-span-3 space-y-2 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Academics & Heritage
                </p>
                <ul className="space-y-1.5 text-zinc-700">
                  <li>
                    <a
                      href="#heritage"
                      className="hover:text-zinc-950 hover:underline underline-offset-4"
                    >
                      History & Photo Archive
                    </a>
                  </li>
                  <li>
                    <a
                      href="#academics"
                      className="hover:text-zinc-950 hover:underline underline-offset-4"
                    >
                      Schools & Programmes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#research"
                      className="hover:text-zinc-950 hover:underline underline-offset-4"
                    >
                      Research Centres
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faculty"
                      className="hover:text-zinc-950 hover:underline underline-offset-4"
                    >
                      Faculty & Leadership
                    </a>
                  </li>
                  <li>
                    <a
                      href="#placements"
                      className="hover:text-zinc-950 hover:underline underline-offset-4"
                    >
                      Placements & Outcomes
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-4 space-y-2 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Institutional Disclosures
                </p>
                <ul className="space-y-1.5 text-zinc-600 text-xs leading-relaxed">
                  <li>UGC Autonomous Status · NIRF Participating Institution</li>
                  <li>
                    ISO 9001:2015 Certified Academic & Administrative Systems
                  </li>
                  <li>
                    Admissions Desk: +91 422 267 8400 · admissions@skcas.ac.in
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
              <p>
                © 2026 Sri Krishna College of Arts and Science, Coimbatore. All
                rights reserved.
              </p>
              <p>Sri Krishna Institutions · Kuniamuthur Campus</p>
            </div>
          </div>
        </footer>

        {/* Slide-Over Programme Curriculum Drawer */}
        <ProgrammeDrawer
          programme={activeProgramme}
          onClose={() => setActiveProgramme(null)}
          onInquire={handleDrawerInquire}
        />

        {/* Full-Screen Campus Plate Lightbox */}
        <GalleryLightbox
          plates={CAMPUS_GALLERY}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onSelectIndex={setLightboxIndex}
        />
      </div>
    </MotionConfig>
  );
}
