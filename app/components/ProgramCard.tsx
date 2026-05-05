import { Program } from '../../data/programs';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

interface ProgramCardProps {
  program: Program;
  onViewDetails?: (program: Program) => void;
}

const ProgramCard = ({ program, onViewDetails }: ProgramCardProps) => {
  return (
    <div className="group p-5 md:p-7 flex flex-col h-full cursor-pointer relative overflow-hidden bg-white border border-[rgba(15,23,42,0.07)] rounded-[12px] md:rounded-[14px] shadow-[0_4px_14px_rgba(15,23,42,0.04)] transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] transform-gpu hover:-translate-y-1 md:hover:-translate-y-1.5 hover:scale-[1.005] hover:border-[rgba(79,70,229,0.18)] hover:shadow-[0_18px_34px_rgba(15,23,42,0.09)]">
      {/* Subtle Gradient Hover */}
      <div className="absolute inset-0 opacity-0 bg-[linear-gradient(180deg,rgba(79,70,229,0.035)_0%,rgba(255,255,255,1)_100%)] group-hover:opacity-100 transition-opacity duration-[250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-wrap gap-1.5 md:gap-2.5 mb-4 md:mb-7">
          <span className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-[rgba(15,23,42,0.04)] text-[#475569] text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-colors duration-200">
            {program.educationType}
          </span>
          <span className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-[rgba(15,23,42,0.04)] text-[#475569] border border-transparent text-[9px] md:text-[10px] font-bold uppercase tracking-widest group-hover:bg-[rgba(79,70,229,0.09)] group-hover:text-[#4338CA] transition-all duration-200">
            {program.level}
          </span>
          <span className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-[rgba(15,23,42,0.04)] text-[#475569] border border-transparent text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-colors duration-200">
            {program.language}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-2 md:mb-3 leading-tight tracking-tight group-hover:text-[#4338CA] transition-colors duration-200">
          {program.name}
        </h3>
        
        <p className="text-[13px] md:text-[15px] font-semibold text-[#475569] mb-4 md:mb-7 tracking-tight">
          {program.school}
        </p>

        <p className="text-[14px] md:text-[16px] leading-relaxed text-[#475569] line-clamp-2 mb-6 md:mb-8 flex-grow font-medium">
          {program.description}
        </p>

        <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-[11px] font-bold text-[#475569] mb-5 md:mb-7 border-t border-[#E2E8F0]/60 pt-5 md:pt-7 group-hover:border-[#4F46E5]/20 transition-colors duration-200">
          <div className="flex items-center gap-2 md:gap-2.5 uppercase tracking-[0.1em]">
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#475569] opacity-60 group-hover:opacity-100 group-hover:text-[#4F46E5]/70 transition-all duration-200" />
            {program.city}
          </div>
          <div className="flex items-center gap-2 md:gap-2.5 uppercase tracking-[0.1em]">
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#475569] opacity-60 group-hover:opacity-100 group-hover:text-[#4F46E5]/70 transition-all duration-200" />
            {program.duration}
          </div>
        </div>

        <button 
          type="button"
          onClick={() => onViewDetails?.(program)}
          className="w-full py-3.5 md:py-[18px] bg-[#F8FAFC] border border-[rgba(15,23,42,0.12)] text-[#1E293B] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] font-bold flex items-center justify-center gap-3 opacity-95 group-hover:opacity-100 transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] group-hover:bg-[linear-gradient(135deg,#0F172A,#334155)] group-hover:text-white group-hover:border-[rgba(15,23,42,0.2)] group-hover:shadow-[0_10px_22px_rgba(15,23,42,0.2)]"
        >
          View Details
          <ArrowRight className="w-4 h-4 transition-transform duration-[250ms] group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
