import { getAllPrograms } from '../lib/data';
import { Program } from '../lib/normalize';

/**
 * Production-ready unified dataset for the SaaS dashboard.
 * All programs are normalized and deduplicated.
 */
export const programs: Program[] = getAllPrograms();

/**
 * Re-exporting the Program type for UI consumption.
 */
export type { Program };

/**
 * List of unique schools for filters.
 */
export const universities = Array.from(new Set(programs.map(p => p.school))).sort();
