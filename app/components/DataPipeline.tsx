'use client';

import React from 'react';
import { MousePointer2, GitBranch, Cpu, Database, Globe, ArrowRight } from 'lucide-react';
import {useTranslations} from 'next-intl';

const DataPipeline = () => {
  const t = useTranslations('pipeline');
  const steps = [
    { icon: MousePointer2, label: t('scraping'), sub: t('multi_source') },
    { icon: GitBranch, label: t('normalization'), sub: t('structured') },
    { icon: Cpu, label: t('deduplication'), sub: t('clean_id') },
    { icon: Database, label: t('structuring'), sub: t('valid_type') },
    { icon: Globe, label: t('ready_for_api'), sub: t('live_data') }
  ];
  return (
    <div className="premium-card p-6 md:p-12 mb-16 md:mb-24 hover:border-[#4F46E5]/25 bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FAFC_60%,#EEF2FF_100%)] border border-[#E2E8F0] shadow-[0_24px_50px_rgba(15,23,42,0.08)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-56 h-56 bg-[radial-gradient(circle,rgba(79,70,229,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Scrollable container for mobile horizontal layout */}
      <div className="overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
        <div className="flex flex-row items-center justify-between min-w-[600px] md:min-w-0 gap-4 md:gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center group cursor-default flex-shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[linear-gradient(145deg,#FFFFFF,#EEF2FF)] flex items-center justify-center border border-[#E2E8F0] group-hover:border-[#F97316]/60 group-hover:bg-white transition-all duration-500 shadow-[0_4px_12px_rgba(79,70,229,0.06)] md:shadow-[0_8px_20px_rgba(79,70,229,0.08)] group-hover:shadow-[0_12px_24px_rgba(249,115,22,0.16)] group-hover:-translate-y-0.5">
                  <step.icon className="w-5 h-5 md:w-6 md:h-6 text-[#6366F1]/70 group-hover:text-[#F97316] transition-all duration-500" />
                </div>
                <div className="mt-3 md:mt-5 text-center">
                  <p className="text-[11px] md:text-[14px] font-bold text-[#0B1220] tracking-tight group-hover:text-[#F97316] transition-colors">{step.label}</p>
                  <p className="label-premium mt-0.5 md:mt-1 opacity-70 text-[#64748B] !text-[9px] md:!text-[10px]">{step.sub}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-shrink-0">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#CBD5E1]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataPipeline;
