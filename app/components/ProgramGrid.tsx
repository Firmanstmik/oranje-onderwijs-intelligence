import { Program } from '../../data/programs';
import ProgramCard from './ProgramCard';

interface ProgramGridProps {
  programs: Program[];
  onViewDetails?: (program: Program) => void;
}

const ProgramGrid = ({ programs, onViewDetails }: ProgramGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
      {programs.map((program: Program) => (
        <ProgramCard key={program.id} program={program} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default ProgramGrid;
