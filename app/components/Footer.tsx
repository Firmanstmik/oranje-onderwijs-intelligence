import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.06)] py-12 md:py-16 bg-[linear-gradient(180deg,#F8FAFC_0%,#EEF2FF_100%)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-4">
          {/* LEFT SIDE: LOGO SECTION */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="relative w-36 h-9 md:w-48 md:h-11 transition-all duration-300 hover:opacity-80">
              <Image 
                src="/logo-oranje-onderwijs-intelligence.webp" 
                alt="Oranje Onderwijs Intelligence Logo" 
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-[10px] md:text-[11px] text-[#64748B] font-bold uppercase tracking-[0.15em] opacity-70 ml-1">
              Education Data Intelligence Platform
            </p>
          </div>
          
          {/* CENTER MENU */}
          <div className="flex items-center gap-8 md:gap-12 text-[12px] md:text-[14px] text-[#475569] font-medium tracking-tight">
            {[
              { label: 'Docs', href: '#' },
              { label: 'Privacy', href: '#' },
              { label: 'Terms', href: '#' },
              { label: 'Contact', href: '#' }
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="relative group transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-[linear-gradient(135deg,#4F46E5,#7C3AED)] transition-colors duration-200">
                  {item.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[linear-gradient(135deg,#4F46E5,#7C3AED)] transition-all duration-200 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          {/* RIGHT SIDE: COPYRIGHT */}
          <div className="flex items-center h-full">
            <p className="text-[10px] md:text-[12px] text-[#64748B] font-medium opacity-60 text-center md:text-right leading-relaxed">
              © 2026 Oranje Onderwijs Intelligence.<br className="md:hidden" /> All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
