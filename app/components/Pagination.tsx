'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import {useTranslations} from 'next-intl';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const t = useTranslations('pagination');
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - maxVisiblePages + 1));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          onClick={() => onPageChange(i)}
          className={cn(
            "w-9 h-9 md:w-12 md:h-12 rounded-[0.8rem] md:rounded-[1.1rem] text-[12px] md:text-[13px] font-black transition-all duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] transform-gpu",
            currentPage === i
              ? "text-white bg-[linear-gradient(135deg,#4F46E5,#6366F1_55%,#7C3AED)] border border-transparent shadow-[0_10px_20px_rgba(79,70,229,0.22)] md:shadow-[0_14px_30px_rgba(79,70,229,0.28)] -translate-y-0.5 ring-1 ring-white/40"
              : "text-[#334155] bg-white/70 border border-[#E2E8F0] hover:text-[#4F46E5] hover:border-[#C7D2FE] hover:bg-[linear-gradient(180deg,#FFFFFF,#EEF2FF)] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(15,23,42,0.08)]"
          )}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mt-12 md:mt-24 px-4">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-9 h-9 md:w-12 md:h-12 rounded-[0.8rem] md:rounded-[1.1rem] border border-[#E2E8F0] text-[#475569]/40 flex items-center justify-center transition-all duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] bg-white/70 backdrop-blur-sm",
          currentPage === 1 
            ? "opacity-30 cursor-not-allowed" 
            : "hover:border-[#C7D2FE] hover:text-[#4F46E5] hover:bg-[linear-gradient(180deg,#FFFFFF,#EEF2FF)] hover:shadow-[0_10px_22px_rgba(79,70,229,0.12)] hover:-translate-x-0.5"
        )}
        aria-label={t('previous')}
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <div className="flex items-center gap-1.5 md:gap-2 rounded-[1rem] md:rounded-[1.25rem] p-1 md:p-1.5 bg-white/45 backdrop-blur-sm border border-white/70 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
        {renderPageNumbers()}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-9 h-9 md:w-12 md:h-12 rounded-[0.8rem] md:rounded-[1.1rem] border border-[#E2E8F0] text-[#475569]/40 flex items-center justify-center transition-all duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] bg-white/70 backdrop-blur-sm",
          currentPage === totalPages 
            ? "opacity-30 cursor-not-allowed" 
            : "hover:border-[#C7D2FE] hover:text-[#4F46E5] hover:bg-[linear-gradient(180deg,#FFFFFF,#EEF2FF)] hover:shadow-[0_10px_22px_rgba(79,70,229,0.12)] hover:translate-x-0.5"
        )}
        aria-label={t('next')}
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default Pagination;
