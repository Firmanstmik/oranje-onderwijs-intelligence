import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Navbar = ({ searchQuery = '', onSearchChange }: NavbarProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileLangVisible, setIsMobileLangVisible] = useState(true);
  const t = useTranslations('navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'), { scroll: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (e.key === 'Escape') {
        onSearchChange?.('');
        setIsSearchExpanded(false);
      }
      // Scroll to catalog section
      const catalog = document.getElementById('program-catalog');
      if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth' });
      }
      // Blur the input to hide keyboard on mobile
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleClear = () => {
    onSearchChange?.('');
    const catalog = document.getElementById('program-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Always show near top for easier first interaction.
      if (currentY < 24) {
        setIsMobileLangVisible(true);
        lastY = currentY;
        return;
      }

      if (currentY > lastY + 6) {
        setIsMobileLangVisible(false);
      } else if (currentY < lastY - 6) {
        setIsMobileLangVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-[60] w-full bg-white/70 backdrop-blur-xl border-b border-[#E2E8F0]/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20 md:h-32">
          <div className="flex items-center">
            <div className="relative w-56 h-14 md:w-[380px] md:h-22 transition-transform hover:scale-[1.02] duration-500">
              <Image 
                src="/logo-oranje-onderwijs-intelligence.webp" 
                alt="Oranje Onderwijs Intelligence Logo" 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Desktop Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden sm:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#94A3B8] group-focus-within:text-[#4F46E5] transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={handleKeyDown}
                className="block w-full pl-11 pr-4 py-2.5 md:py-3 border border-[#E2E8F0] rounded-2xl bg-[#F8FAFC]/80 placeholder-[#94A3B8] focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/5 focus:border-[#4F46E5] focus:bg-white transition-all text-sm font-medium shadow-sm"
                placeholder={t('search')}
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#94A3B8] hover:text-[#4F46E5]"
                >
                  <span className="text-xs font-bold bg-[#F1F5F9] px-1.5 py-0.5 rounded-md">{t('esc')}</span>
                </button>
              )}
            </div>
          </div>

            <div className="flex items-center gap-3 md:gap-5">
            <button 
              type="button"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className={`p-2.5 transition-all sm:hidden rounded-xl ${isSearchExpanded ? 'bg-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/20' : 'text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F1F5F9]'}`}
              aria-label={t('toggle_search')}
            >
              {isSearchExpanded ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
            
              {/* Language Switcher (desktop/tablet) */}
              <div className="hidden sm:flex items-center bg-[linear-gradient(135deg,#FFFFFF,#F8FAFC)] border border-[#E2E8F0] rounded-xl md:rounded-2xl p-0.5 md:p-1 shadow-[0_8px_18px_rgba(15,23,42,0.08)] h-9 md:h-12">
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`relative overflow-hidden px-2.5 md:px-4 py-1 md:py-1.5 text-[9px] md:text-[12px] font-black tracking-[0.18em] md:tracking-widest transition-all rounded-lg md:rounded-xl inline-flex items-center gap-1.5 md:gap-2 ${
                  locale === 'en'
                    ? 'text-white bg-[linear-gradient(135deg,#1E3A8A,#1D4ED8)] shadow-[0_8px_16px_rgba(29,78,216,0.35)]'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
                }`}
                aria-label="Switch language to English"
              >
                <span className="relative w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] overflow-hidden bg-[#012169] border border-white/40">
                  <span className="absolute left-1/2 top-0 h-full w-[22%] -translate-x-1/2 bg-white" />
                  <span className="absolute left-0 top-1/2 w-full h-[22%] -translate-y-1/2 bg-white" />
                  <span className="absolute left-1/2 top-0 h-full w-[12%] -translate-x-1/2 bg-[#C8102E]" />
                  <span className="absolute left-0 top-1/2 w-full h-[12%] -translate-y-1/2 bg-[#C8102E]" />
                </span>
                EN
              </button>
              <div className="w-px h-2.5 md:h-3 bg-[#E2E8F0] mx-0.5" />
              <button
                type="button"
                onClick={() => handleLanguageChange('nl')}
                className={`relative overflow-hidden px-2.5 md:px-4 py-1 md:py-1.5 text-[9px] md:text-[12px] font-black tracking-[0.18em] md:tracking-widest transition-all rounded-lg md:rounded-xl inline-flex items-center gap-1.5 md:gap-2 ${
                  locale === 'nl'
                    ? 'text-[#0B1220] bg-[linear-gradient(to_bottom,#AE1C28_0%,#AE1C28_33.33%,#FFFFFF_33.33%,#FFFFFF_66.66%,#21468B_66.66%,#21468B_100%)] shadow-[0_8px_16px_rgba(33,70,139,0.3)]'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
                }`}
                aria-label="Schakel taal naar Nederlands"
              >
                <span className="inline-flex flex-col w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] overflow-hidden border border-white/40">
                  <span className="h-1/3 bg-[#AE1C28]" />
                  <span className="h-1/3 bg-white" />
                  <span className="h-1/3 bg-[#21468B]" />
                </span>
                NL
              </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Expandable */}
          <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isSearchExpanded ? 'max-h-20 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#94A3B8]" />
              </div>
              <input
                type="text"
                autoFocus={isSearchExpanded}
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={handleKeyDown}
                className="block w-full pl-11 pr-12 py-3 border border-[#E2E8F0] rounded-2xl bg-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/5 focus:border-[#4F46E5] focus:bg-white transition-all text-sm font-medium shadow-sm"
                placeholder={t('search_mobile')}
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={handleClear}
                  aria-label={t('clear_search')}
                  title={t('clear_search')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#94A3B8]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Language Switcher (mobile, below navbar) */}
      <div
        className={`sm:hidden fixed top-[84px] right-3 z-[58] transition-all duration-300 ${
          isMobileLangVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex items-center bg-[linear-gradient(135deg,#FFFFFF,#F8FAFC)] border border-[#E2E8F0] rounded-xl p-0.5 shadow-[0_8px_18px_rgba(15,23,42,0.12)] h-8">
          <button
            type="button"
            onClick={() => handleLanguageChange('en')}
            className={`relative overflow-hidden px-2 py-0.5 text-[9px] font-black tracking-[0.16em] transition-all rounded-lg inline-flex items-center gap-1 ${
              locale === 'en'
                ? 'text-white bg-[linear-gradient(135deg,#1E3A8A,#1D4ED8)] shadow-[0_6px_12px_rgba(29,78,216,0.3)]'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
            }`}
            aria-label="Switch language to English"
          >
            <span className="relative w-2.5 h-2.5 rounded-[2px] overflow-hidden bg-[#012169] border border-white/40">
              <span className="absolute left-1/2 top-0 h-full w-[22%] -translate-x-1/2 bg-white" />
              <span className="absolute left-0 top-1/2 w-full h-[22%] -translate-y-1/2 bg-white" />
              <span className="absolute left-1/2 top-0 h-full w-[12%] -translate-x-1/2 bg-[#C8102E]" />
              <span className="absolute left-0 top-1/2 w-full h-[12%] -translate-y-1/2 bg-[#C8102E]" />
            </span>
            EN
          </button>
          <div className="w-px h-2 bg-[#E2E8F0] mx-0.5" />
          <button
            type="button"
            onClick={() => handleLanguageChange('nl')}
            className={`relative overflow-hidden px-2 py-0.5 text-[9px] font-black tracking-[0.16em] transition-all rounded-lg inline-flex items-center gap-1 ${
              locale === 'nl'
                ? 'text-[#0B1220] bg-[linear-gradient(to_bottom,#AE1C28_0%,#AE1C28_33.33%,#FFFFFF_33.33%,#FFFFFF_66.66%,#21468B_66.66%,#21468B_100%)] shadow-[0_6px_12px_rgba(33,70,139,0.3)]'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white'
            }`}
            aria-label="Schakel taal naar Nederlands"
          >
            <span className="inline-flex flex-col w-2.5 h-2.5 rounded-[2px] overflow-hidden border border-white/40">
              <span className="h-1/3 bg-[#AE1C28]" />
              <span className="h-1/3 bg-white" />
              <span className="h-1/3 bg-[#21468B]" />
            </span>
            NL
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
