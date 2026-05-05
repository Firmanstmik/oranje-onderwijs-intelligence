'use client';

import { universities } from '../../data/programs';
import { cn } from '../../lib/utils';
import {useTranslations} from 'next-intl';

interface SchoolSelectorProps {
  selected: string;
  onSelect: (school: string) => void;
  counts: Record<string, number>;
  totalCount: number;
}

const SchoolSelector = ({ selected, onSelect, counts, totalCount }: SchoolSelectorProps) => {
  const t = useTranslations('school_selector');
  const schools = universities;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <button
        type="button"
        onClick={() => onSelect('All Schools')}
        className={cn(
          "relative group px-6 py-5 rounded-[2rem] text-[14px] font-bold transition-all duration-500 border overflow-hidden",
          selected === 'All Schools'
            ? "bg-[#0B1220] text-white border-[#0B1220] shadow-[0_20px_40px_rgba(15,23,42,0.25)] scale-[1.02]"
            : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#4F46E5]/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)]"
        )}
      >
        <div className="relative z-10 flex items-center justify-between">
          <span className="tracking-tight">{t('all_institutions')}</span>
          <span className={cn(
            "px-2.5 py-1 rounded-full text-[11px] font-black tracking-tighter transition-all",
            selected === 'All Schools' ? "bg-white/10 text-white ring-1 ring-white/20" : "bg-[#F1F5F9] text-[#64748B]"
          )}>
            {totalCount}
          </span>
        </div>
        {selected === 'All Schools' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1220] via-[#1E293B] to-[#0B1220] opacity-100" />
        )}
      </button>

      {schools.map((school) => (
        <button
          key={school}
          type="button"
          onClick={() => onSelect(school)}
          className={cn(
            "relative group px-6 py-5 rounded-[2rem] text-[14px] font-bold transition-all duration-500 border overflow-hidden text-left",
            selected === school
              ? "bg-[#F97316] text-white border-[#F97316] shadow-[0_20px_40px_rgba(249,115,22,0.2)] scale-[1.02]"
              : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#F97316]/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)]"
          )}
        >
          <div className="relative z-10 flex items-center justify-between gap-4">
            <span className="tracking-tight line-clamp-1">{school}</span>
            <span className={cn(
              "flex-shrink-0 px-2.5 py-1 rounded-full text-[11px] font-black tracking-tighter transition-all",
              selected === school ? "bg-white/20 text-white ring-1 ring-white/30" : "bg-[#F1F5F9] text-[#64748B]"
            )}>
              {counts[school] || 0}
            </span>
          </div>
          {selected === school && (
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F97316] via-[#FB923C] to-[#F97316] opacity-100" />
          )}
        </button>
      ))}
    </div>
  );
};

export default SchoolSelector;
