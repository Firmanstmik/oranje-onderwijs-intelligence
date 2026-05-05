'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import DataQuality from '../components/DataQuality';
import DataPipeline from '../components/DataPipeline';
import SchoolSelector from '../components/SchoolSelector';
import Filters from '../components/Filters';
import ProgramGrid from '../components/ProgramGrid';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import { programs as allPrograms, universities, Program } from '../../data/programs';
import { Filter, X, ExternalLink, MapPin, Clock, GraduationCap, Languages, ShieldCheck } from 'lucide-react';

const Insights = dynamic(() => import('../components/Insights'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-[#F8FAFC] rounded-3xl animate-pulse" />
});

export default function DashboardPage() {
  const [selectedSchool, setSelectedSchool] = useState('All Schools');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedLanguage, setSelectedLanguage] = useState('Any Language');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const isPanelOpen = selectedProgram !== null;
  const itemsPerPage = 9;

  // School Counts Logic
  const schoolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allPrograms.forEach(p => {
      counts[p.school] = (counts[p.school] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtering Logic
  const filteredPrograms = useMemo(() => {
    return allPrograms.filter((program) => {
      const schoolMatch = selectedSchool === 'All Schools' || program.school === selectedSchool;
      const typeMatch = selectedType === 'All Types' || program.educationType === selectedType;
      const levelMatch = selectedLevel === 'All Levels' || program.level === selectedLevel;
      const langMatch = selectedLanguage === 'Any Language' || program.language === selectedLanguage;
      
      const searchMatch = searchQuery === '' || 
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.city.toLowerCase().includes(searchQuery.toLowerCase());

      return schoolMatch && typeMatch && levelMatch && langMatch && searchMatch;
    });
  }, [selectedSchool, selectedType, selectedLevel, selectedLanguage, searchQuery]);

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const displayedPrograms = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPrograms.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPrograms, currentPage]);

  const handleReset = () => {
    setSelectedSchool('All Schools');
    setSelectedType('All Types');
    setSelectedLevel('All Levels');
    setSelectedLanguage('Any Language');
    setSearchQuery('');
    setCurrentPage(1);
  };

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPanelOpen]);

  const getOfficialSource = (school: string): string => {
    const schoolName = school.toLowerCase();
    if (schoolName.includes('delft')) return 'https://www.tudelft.nl/en/education';
    if (schoolName.includes('hanze')) return 'https://www.hanze.nl/en/programmes';
    if (schoolName.includes('roc')) return 'https://www.rocva.nl/';
    return 'https://www.studyinnl.org/';
  };

  const relatedPrograms = useMemo(() => {
    if (!selectedProgram) return [];
    return allPrograms
      .filter((program) => program.school === selectedProgram.school && program.id !== selectedProgram.id)
      .slice(0, 4);
  }, [selectedProgram]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0B1220] selection:bg-[#4F46E5] selection:text-white relative">
      <Navbar searchQuery={searchQuery} onSearchChange={(val) => { setSearchQuery(val); setCurrentPage(1); }} />

      {/* Subtle Radial Glow for Depth */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-100 bg-radial-glow" 
      />

      {/* Premium Full-Width Background Wrapper */}
      <div className="absolute top-16 left-0 w-full h-[800px] pointer-events-none z-0 overflow-hidden">
        <div 
          className="w-full h-full bg-no-repeat bg-center bg-cover animate-float-slow mix-blend-multiply bg-[url('/hero%20section%20eduintel.webp')] opacity-50 transition-all duration-1000"
        />
        {/* Subtle Fade Overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/10 to-transparent" />
      </div>
      
      <main className="max-w-7xl mx-auto px-5 md:px-6 lg:px-12 py-12 md:py-24 lg:py-32 relative z-10">
        {/* Hero Section */}
        <div className="mb-16 md:mb-24 lg:mb-32 relative">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4F46E5]/5 text-[#4F46E5] rounded-lg label-premium mb-6 md:mb-8 border border-[#4F46E5]/10 shadow-sm text-[10px] md:text-[12px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
              Live Intelligence
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0B1220] mb-6 md:mb-10 max-w-5xl leading-[1.1] md:leading-[1.2]">
              <span className="block text-[#0B1220]">Netherlands Education</span>
              <span className="block bg-gradient-to-r from-[#0B1220] via-[#4F46E5] to-[#F97316] bg-clip-text text-transparent pb-2 md:pb-4 -mb-2 md:-mb-4">Data Intelligence</span>
            </h1>

            <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-16">
              <p className="text-lg md:text-xl lg:text-2xl text-[#334155] max-w-2xl leading-relaxed font-medium">
                Enterprise-grade program mapping and ecosystem analytics across the Dutch educational landscape.
              </p>
              <div className="flex-1 border-l border-[#E2E8F0] pl-6 md:pl-12 hidden md:block">
                <p className="label-premium mb-2 md:mb-4 text-[#475569] text-[10px] md:text-[12px]">Core Value</p>
                <p className="text-sm md:text-base text-[#475569] font-medium leading-relaxed max-w-md">
                  Automating manual research with structured institutional intelligence, designed for nationwide scalability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality & Infrastructure */}
        <section className="mb-16 md:mb-20">
          <DataQuality 
            totalSchools={universities.length} 
            totalPrograms={allPrograms.length} 
          />
          <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-[#0B1220] mb-4 md:mb-6 mt-8 md:mt-12">
            <span className="bg-gradient-to-r from-[#0B1220] via-[#4F46E5] to-[#F97316] bg-clip-text text-transparent">Data Processing Pipeline</span>
          </h3>
          <DataPipeline />
        </section>

        {/* Intelligence Controls */}
        <section className="space-y-8 md:space-y-10 mb-16 md:mb-20">
          <div>
            <h3 className="label-premium mb-4 md:mb-6 text-[#0B1220] text-[10px] md:text-[12px]">Institution Breakdown</h3>
            <SchoolSelector 
              selected={selectedSchool} 
              onSelect={(val) => { setSelectedSchool(val); setCurrentPage(1); }}
              counts={schoolCounts}
              totalCount={allPrograms.length}
            />
          </div>
          
          <Filters 
            type={selectedType}
            setType={(val) => { setSelectedType(val); setCurrentPage(1); }}
            level={selectedLevel}
            setLevel={(val) => { setSelectedLevel(val); setCurrentPage(1); }}
            language={selectedLanguage}
            setLanguage={(val) => { setSelectedLanguage(val); setCurrentPage(1); }}
            onReset={handleReset}
          />
        </section>

        {/* Program Grid */}
        <section id="program-catalog" className="mb-20 md:mb-32 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1220] tracking-tight mb-1 md:mb-2">Program Catalog</h2>
              <p className="text-sm md:text-base text-[#475569] font-medium">Verified academic and vocational offerings</p>
            </div>
            <div className="sm:text-right">
              <p className="label-premium mb-1 text-[9px] md:text-[11px]">Ecosystem Status</p>
              <p className="text-xs md:text-sm font-bold text-[#0B1220]">
                Showing {displayedPrograms.length} of {filteredPrograms.length} programs
              </p>
            </div>
          </div>
          
          {displayedPrograms.length > 0 ? (
            <>
              <ProgramGrid programs={displayedPrograms} onViewDetails={setSelectedProgram} />
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </>
          ) : (
            <div className="text-center py-40 bg-white rounded-[3rem] border border-[#E2E8F0] shadow-sm">
              <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#E2E8F0]">
                <Filter className="w-6 h-6 text-[#475569]/30" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1220] mb-2">No programs match your filters</h3>
              <p className="text-[#475569] max-w-xs mx-auto mb-10 font-medium leading-relaxed text-[15px]">
                Try adjusting your dimensions or selecting a different institution to see available results.
              </p>
              <button 
                type="button"
                onClick={handleReset}
                className="px-10 py-4 bg-[#0B1220] text-white rounded-2xl text-[13px] font-bold hover:bg-[#F97316] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#0B1220]/10"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Insights Section */}
        <section className="mb-32 md:mb-48 relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-1 sticky top-32">
              <h2 className="text-4xl md:text-5xl font-black text-[#0B1220] tracking-tighter mb-6 leading-none">
                Ecosystem <br />
                <span className="bg-gradient-to-r from-[#0B1220] to-[#4F46E5] bg-clip-text text-transparent">Insights</span>
              </h2>
              <p className="text-base md:text-lg text-[#475569] font-medium leading-relaxed mb-10 opacity-80">
                Proprietary structural analysis across language, qualification levels, and institutional density.
              </p>
              
              <div className="space-y-4">
                <div className="p-6 bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300">
                  <p className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-2">Data Integrity</p>
                  <p className="text-sm text-[#0B1220] font-bold leading-relaxed">
                    Charts are generated from real-time normalized data from <span className="text-[#4F46E5]">{universities.length}</span> validated sources.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <Insights />
            </div>
          </div>
        </section>
      </main>

      {/* Program Intelligence Panel */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${isPanelOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div
          className="absolute inset-0 bg-[#0B1220]/22 backdrop-blur-[2px]"
          onClick={() => setSelectedProgram(null)}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Program details"
          className={`absolute right-0 bottom-0 top-auto md:top-0 h-[92dvh] md:h-full w-full md:w-[80vw] lg:w-[46vw] bg-white border-l border-[#E2E8F0] shadow-[0_24px_64px_rgba(15,23,42,0.14)] rounded-t-xl md:rounded-none transition-all duration-300 ${
            isPanelOpen
              ? 'translate-y-0 md:translate-y-0 md:translate-x-0 opacity-100'
              : 'translate-y-full md:translate-y-0 md:translate-x-full opacity-0'
          }`}
        >
          {selectedProgram && (
            <div className="h-full flex flex-col">
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-5 md:px-8 py-5 md:py-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0B1220] leading-tight">{selectedProgram.name}</h2>
                  <p className="text-sm md:text-base text-[#64748B] mt-1 font-medium">{selectedProgram.school}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#EEF2FF] text-[#4F46E5] border border-[#DDE4FF]">{selectedProgram.educationType}</span>
                    <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0]">{selectedProgram.level}</span>
                    <span className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">{selectedProgram.language}</span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close details panel"
                  onClick={() => setSelectedProgram(null)}
                  className="w-10 h-10 rounded-md border border-[#E2E8F0] text-[#64748B] hover:text-[#0B1220] hover:border-[#CBD5E1] transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto px-5 md:px-8 py-6 md:py-8 space-y-8">
                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#64748B]">Overview</h3>
                  <p className="text-[15px] md:text-base text-[#334155] leading-relaxed line-clamp-5">
                    {selectedProgram.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Location</p>
                      <p className="text-sm font-semibold text-[#0B1220] flex items-center gap-2"><MapPin className="w-4 h-4 text-[#6366F1]" />{selectedProgram.city}</p>
                    </div>
                    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Duration</p>
                      <p className="text-sm font-semibold text-[#0B1220] flex items-center gap-2"><Clock className="w-4 h-4 text-[#6366F1]" />{selectedProgram.duration}</p>
                    </div>
                    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Language</p>
                      <p className="text-sm font-semibold text-[#0B1220] flex items-center gap-2"><Languages className="w-4 h-4 text-[#6366F1]" />{selectedProgram.language}</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#64748B]">Structured Data</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[#E2E8F0] p-4 bg-white">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Education Level</p>
                      <p className="text-sm font-semibold text-[#0B1220]">{selectedProgram.educationType}</p>
                    </div>
                    <div className="rounded-lg border border-[#E2E8F0] p-4 bg-white">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Degree Type</p>
                      <p className="text-sm font-semibold text-[#0B1220]">{selectedProgram.level}</p>
                    </div>
                    <div className="rounded-lg border border-[#E2E8F0] p-4 bg-white">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Language</p>
                      <p className="text-sm font-semibold text-[#0B1220]">{selectedProgram.language}</p>
                    </div>
                    <div className="rounded-lg border border-[#E2E8F0] p-4 bg-white">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">Institution Name</p>
                      <p className="text-sm font-semibold text-[#0B1220]">{selectedProgram.school}</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#64748B]">Data Quality</h3>
                  <div className="rounded-lg border border-[#E2E8F0] p-4 bg-[#F8FAFC] flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#0B1220] flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#10B981]" />Confidence: High</p>
                    <p className="text-sm font-semibold text-[#0B1220] flex items-center gap-2"><GraduationCap className="w-4 h-4 text-[#6366F1]" />Source Type: Official Website</p>
                  </div>
                </section>

                <section>
                  <a
                    href={getOfficialSource(selectedProgram.school)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full min-h-12 inline-flex items-center justify-center gap-2 rounded-md bg-[#0F172A] text-white text-sm font-bold px-4 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.18)] hover:bg-[#1E293B] transition-colors"
                  >
                    View Official Source
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </section>

                <section className="space-y-4 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#64748B]">Related Programs</h3>
                  <div className="space-y-3">
                    {relatedPrograms.length > 0 ? relatedPrograms.map((program) => (
                      <button
                        key={program.id}
                        type="button"
                        onClick={() => setSelectedProgram(program)}
                        className="w-full text-left rounded-lg border border-[#E2E8F0] px-4 py-3.5 hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-all"
                      >
                        <p className="text-sm font-bold text-[#0B1220]">{program.name}</p>
                        <p className="text-xs font-semibold text-[#64748B] mt-1">{program.level} • {program.language}</p>
                      </button>
                    )) : (
                      <p className="text-sm text-[#64748B]">No additional programs from this institution in the current dataset.</p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          )}
        </aside>
      </div>

      <Footer />
    </div>
  );
}
