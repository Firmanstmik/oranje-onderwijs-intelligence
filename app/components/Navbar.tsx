import React, { useState } from 'react';
import Image from 'next/image';
import { Search, User, Bell, X } from 'lucide-react';

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Navbar = ({ searchQuery = '', onSearchChange }: NavbarProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

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

  return (
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
                placeholder="Search programs, institutions, or keywords..."
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#94A3B8] hover:text-[#4F46E5]"
                >
                  <span className="text-xs font-bold bg-[#F1F5F9] px-1.5 py-0.5 rounded-md">ESC</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button 
              type="button"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className={`p-2.5 transition-all sm:hidden rounded-xl ${isSearchExpanded ? 'bg-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/20' : 'text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F1F5F9]'}`}
              aria-label="Toggle Search"
            >
              {isSearchExpanded ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
            
            <button 
              type="button"
              aria-label="Notifications"
              title="Notifications"
              className="hidden md:flex p-2.5 text-[#64748B] hover:text-[#4F46E5] hover:bg-[#F1F5F9] rounded-xl transition-all relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#F97316] rounded-full border-2 border-white"></span>
            </button>

            <div className="h-9 w-9 md:h-11 md:w-11 rounded-2xl bg-[linear-gradient(135deg,#F8FAFC,#EEF2FF)] border border-[#E2E8F0] flex items-center justify-center overflow-hidden cursor-pointer hover:ring-4 hover:ring-[#4F46E5]/10 hover:border-[#4F46E5]/30 transition-all shadow-sm">
              <User className="w-5 h-5 md:w-6 md:h-6 text-[#64748B]" />
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
              placeholder="Search programs..."
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#94A3B8]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
