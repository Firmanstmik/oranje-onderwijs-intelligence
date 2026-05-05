import { normalizeProgram, Program, RawProgram } from './normalize';
import tuDelftData from '../scrapers/tu_delft_premium.json';
import hanzeData from '../scrapers/hanze_premium_final.json';
import rocData from '../scrapers/roc_amsterdam_FINAL.json';

interface RawSource {
  school?: { name?: string };
  programs?: RawProgram[];
}

/**
 * Aggregates all program data from various sources into a single normalized array.
 */
export function getAllPrograms(): Program[] {
  const allPrograms: Program[] = [];
  const seenIds = new Set<string>();

  // Helper to process a data source
  const processSource = (source: RawSource) => {
    const schoolName = source.school?.name || "Unknown School";
    const programs = source.programs || [];

    programs.forEach((rawProgram: RawProgram) => {
      const normalized = normalizeProgram(rawProgram, schoolName);
      
      // Skip invalid or filtered programs (should be rare now)
      if (!normalized) return;

      // Remove duplicates by ID
      if (!seenIds.has(normalized.id)) {
        console.log("✅ INCLUDED:", normalized.name);
        allPrograms.push(normalized);
        seenIds.add(normalized.id);
      }
    });
  };

  // Process each dataset
  processSource(tuDelftData);
  processSource(hanzeData);
  processSource(rocData);

  return allPrograms;
}
