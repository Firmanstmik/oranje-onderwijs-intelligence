'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShieldCheck, Database, Layers, Zap, Clock, Pointer } from 'lucide-react';

interface DataQualityProps {
  totalSchools: number;
  totalPrograms: number;
}

const DataQuality = ({ totalSchools, totalPrograms }: DataQualityProps) => {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const time = new Date().toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    // Use requestAnimationFrame to avoid synchronous setState in effect warning
    requestAnimationFrame(() => {
      setLastUpdated(time);
    });
  }, []);

  return (
    <div className="space-y-8 md:space-y-12 mb-16 md:mb-24">
      {/* Live Status & POC Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#4F46E5]/5 rounded-full border border-[#4F46E5]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
            <span className="text-[10px] md:text-[11px] font-bold text-[#4F46E5] uppercase tracking-widest">System Live</span>
          </div>
          <div className="flex items-center gap-2 text-[#475569]">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[12px] md:text-[13px] font-semibold tracking-tight">
              Sync: {lastUpdated || '--:--'}
            </span>
          </div>
        </div>
        
        <div className="group relative w-full sm:w-auto">
          <button 
            type="button"
            onClick={() => setShowTooltip(!showTooltip)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#0B1220] text-white rounded-xl label-premium !text-white cursor-pointer shadow-premium transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3 relative"
          >
            POC Scope: {totalSchools} Institutions
            <Pointer className="w-4 h-4 text-[#F97316] animate-bounce" />
          </button>
          
          <div className={`absolute bottom-full right-0 mb-3 w-full sm:w-72 p-4 bg-[#0B1220] text-[#94A3B8] text-[11px] font-medium leading-relaxed rounded-2xl transition-all duration-300 z-50 shadow-2xl border border-white/10 ${showTooltip ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 sm:group-hover:opacity-100 sm:group-hover:visible sm:group-hover:translate-y-0'}`}>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-1.5 flex-shrink-0" />
              <p>System architecture is engineered for full nationwide expansion to 100+ schools.</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
              className="mt-3 text-[9px] font-black uppercase tracking-widest text-[#F97316] hover:text-white transition-colors sm:hidden"
            >
              Close Info
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        <div className="lg:col-span-2 premium-card p-6 md:p-10 flex flex-col justify-between group hover:border-[#4F46E5]/20 bg-[linear-gradient(to_bottom_right,#FFFFFF,#F8FAFC)] border border-[#E2E8F0] shadow-[0px_20px_40px_rgba(15,23,42,0.06)]">
          <div>
            <h3 className="label-premium mb-6 md:mb-10 text-[10px] md:text-[12px]">Data Coverage & Intelligence</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              <div>
                <p className="mb-1 md:mb-2 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.05em] text-[#64748B]">Institutions</p>
                <p className="text-[2rem] md:text-[2.75rem] font-extrabold text-[#0B1220] tracking-tight leading-none">{totalSchools}</p>
              </div>
              <div>
                <p className="mb-1 md:mb-2 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.05em] text-[#64748B]">Analyzed</p>
                <p className="text-[2rem] md:text-[2.75rem] font-extrabold text-[#0B1220] tracking-tight leading-none">{totalPrograms}</p>
              </div>
              <div>
                <p className="mb-1 md:mb-2 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.05em] text-[#64748B]">Sources</p>
                <p className="text-[13px] md:text-[15px] font-bold text-[#0B1220] mt-1 md:mt-2 tracking-tight">Primary Portals</p>
              </div>
              <div>
                <p className="mb-1 md:mb-2 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.05em] text-[#64748B]">Confidence</p>
                <p className="text-[13px] md:text-[15px] font-bold text-[#059669] mt-1 md:mt-2 inline-flex items-center gap-1.5 md:gap-2 tracking-tight px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-[#ECFDF5]">
                  <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#059669]" />
                  Validated
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2.5 md:gap-4 mt-8 md:mt-12 pt-6 md:pt-10 border-t border-[#F1F5F9]">
            {[
              { icon: CheckCircle2, text: "Verified Data" },
              { icon: Database, text: "Structured" },
              { icon: Layers, text: "Multi-source" },
              { icon: Zap, text: "Deduplicated" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-[#F1F5F9] rounded-full border border-transparent text-[#475569] hover:bg-[#E2E8F0] transition-all duration-300">
                <badge.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#475569]" />
                <span className="label-premium !lowercase !tracking-tight !text-[10px] md:!text-[11px] !text-[#475569]">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[linear-gradient(135deg,#0B1220,#1E293B)] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between shadow-[0px_30px_60px_rgba(15,23,42,0.4)] relative overflow-hidden group border-t border-[#F97316]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#4F46E5]/20 transition-colors duration-700" />
          
          <div>
            <h3 className="label-premium mb-4 md:mb-8 text-[#CBD5E1] font-semibold text-[10px] md:text-[12px]">Nationwide Scalability</h3>
            <p className="text-[13px] md:text-[15px] text-[#94A3B8] font-medium leading-relaxed mb-6 md:mb-8">
              Currently indexing validated data from multiple institutions. The modular scraping architecture is built to scale across 100+ schools.
            </p>
          </div>
          
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10">
            <p className="label-premium mb-2 md:mb-3 text-[#94A3B8] text-[9px] md:text-[11px]">System Status</p>
            <p className="text-[#F8FAFC] text-[14px] md:text-base font-bold flex items-center gap-2.5 md:gap-3">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#22C55E] animate-[pulse_2s_ease-in-out_infinite]" />
              Production Ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataQuality;
