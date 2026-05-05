'use client';

import React from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';
import {useTranslations} from 'next-intl';

interface FilterButtonProps {
  label: string;
  value: string;
  options: {value: string; label: string}[];
  onSelect: (val: string) => void;
}

const FilterButton = ({ label, value, options, onSelect }: FilterButtonProps) => {
  return (
    <div className="relative group flex-shrink-0">
      <button 
        type="button"
        className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2.5 md:py-3.5 bg-[linear-gradient(135deg,#FFFFFF,#F8FAFC)] border border-[#E2E8F0] rounded-xl md:rounded-2xl text-[12px] md:text-[13px] font-bold text-[#0B1220] hover:border-[#F97316]/60 hover:bg-white transition-all duration-500 shadow-[0_4px_12px_rgba(15,23,42,0.04)] md:shadow-[0_8px_18px_rgba(15,23,42,0.05)] group-hover:shadow-[0_12px_24px_rgba(79,70,229,0.12)]"
      >
        <span className="text-[#64748B] font-black uppercase tracking-[0.16em] text-[9px] md:text-[10px]">{label}</span>
        <span className="tracking-tight">{value}</span>
        <ChevronDown className="w-3 md:w-3.5 h-3 md:h-3.5 text-[#6366F1]/60 group-hover:text-[#F97316] transition-colors" />
      </button>
      
      {/* Premium dropdown on hover/focus */}
      <div className="absolute top-full left-0 mt-2 md:mt-3 w-56 md:w-64 bg-[linear-gradient(180deg,#FFFFFF,#F8FAFC)] border border-[#E2E8F0] rounded-xl md:rounded-2xl shadow-[0_24px_40px_rgba(15,23,42,0.14)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 py-2 md:py-3 overflow-hidden">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
              "w-full text-left px-5 md:px-6 py-2.5 md:py-3 text-[12px] md:text-[13px] transition-all duration-300 flex items-center justify-between",
              value === option.label 
                ? "text-[#F97316] font-black bg-[#FFF7ED]" 
                : "text-[#475569] font-bold hover:bg-[#EEF2FF] hover:text-[#0B1220]"
            )}
          >
            <span>{option.label}</span>
            {value === option.label && <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />}
          </button>
        ))}
      </div>
    </div>
  );
};

interface FiltersProps {
  type: string;
  setType: (type: string) => void;
  level: string;
  setLevel: (level: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  onReset: () => void;
}

const Filters = ({ type, setType, level, setLevel, language, setLanguage, onReset }: FiltersProps) => {
  const t = useTranslations('filters_panel');
  const typeOptions = ['All Types', 'MBO', 'HBO', 'WO'];
  const levelOptions = ['All Levels', 'Bachelor', 'Master'];
  const languageOptions = ['Any Language', 'English', 'Dutch'];
  const optionLabel = (option: string) => t(`option.${option.replace(/\s+/g, '_').toLowerCase()}`);

  return (
    <div className="relative z-20 py-8 md:py-12 border border-[#E2E8F0] bg-white rounded-[2.5rem] px-8 md:px-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group/filters">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(79,70,229,0.03)_0%,transparent_70%)] pointer-events-none rounded-[2.5rem]" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center border border-[#DDE4FF]">
            <Filter className="w-5 h-5 text-[#4F46E5]" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#0B1220]">{t('title')}</h3>
            <p className="text-xs font-medium text-[#64748B] mt-0.5">{t('subtitle')}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 md:gap-6 flex-1 lg:justify-end">
          <FilterButton 
            label={t('education')} 
            value={optionLabel(type)} 
            options={typeOptions.map((value) => ({value, label: optionLabel(value)}))}
            onSelect={setType}
          />

          <FilterButton 
            label={t('degree')} 
            value={optionLabel(level)} 
            options={levelOptions.map((value) => ({value, label: optionLabel(value)}))}
            onSelect={setLevel}
          />
          
          <FilterButton 
            label={t('language')} 
            value={optionLabel(language)} 
            options={languageOptions.map((value) => ({value, label: optionLabel(value)}))}
            onSelect={setLanguage}
          />

          <div className="h-8 w-px bg-[#E2E8F0] mx-2 hidden xl:block" />

          <button 
            type="button"
            onClick={onReset}
            className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-[#F8FAFC] text-[11px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-all border border-transparent hover:border-[#FECACA]"
          >
            <span className="w-5 h-5 rounded-lg bg-white border border-[#E2E8F0] group-hover:border-[#FECACA] flex items-center justify-center transition-all text-xs">×</span>
            {t('reset')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
