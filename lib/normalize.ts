export type Program = {
  id: string;
  name: string;
  school: string;
  level: "MBO" | "Bachelor" | "Master";
  educationType: "MBO" | "HBO" | "WO";
  language: "English" | "Dutch";
  duration: string;
  city: string;
  description: string;
};

export interface RawProgram {
  name?: string;
  level?: string;
  education_type?: string;
  language?: string;
  url?: string;
  description?: string;
  [key: string]: unknown;
}

/**
 * Normalizes raw program data into a standardized Program type.
 * Returns null ONLY if the program is fundamentally broken (e.g. missing name).
 */
export function normalizeProgram(raw: RawProgram, schoolName: string): Program | null {
  // 1. Clean and normalize the name
  const name = (raw.name || "").trim();

  // TASK 2 — ADD DEBUG VISIBILITY (VERY IMPORTANT)
  // Only reject if name is fundamentally missing or too short
  if (!name || name.length < 3) {
    console.log("❌ INVALID NAME:", JSON.stringify(raw));
    return null;
  }

  // 2. Map level and education type correctly
  let level: "MBO" | "Bachelor" | "Master" = "Bachelor";
  let educationType: "MBO" | "HBO" | "WO" = "WO";
  
  const rawLevel = String(raw.level || "").toLowerCase();
  const rawType = String(raw.education_type || "").toLowerCase();
  const schoolLower = schoolName.toLowerCase();

  // Determine Education Type first
  if (schoolLower.includes("roc") || rawType.includes("mbo") || rawLevel.includes("mbo")) {
    educationType = "MBO";
  } else if (schoolLower.includes("hanze") || rawType.includes("hbo")) {
    educationType = "HBO";
  } else {
    educationType = "WO";
  }

  // Determine Degree Level
  if (educationType === "MBO") {
    level = "MBO";
  } else if (rawLevel.includes("master") || rawLevel.includes("msc") || rawLevel.includes("ma")) {
    level = "Master";
  } else {
    level = "Bachelor";
  }

  // 3. Normalize language (Strictly English or Dutch)
  let language: "English" | "Dutch" = "English";
  const rawLang = String(raw.language || "").toLowerCase();
  if (rawLang.includes("dutch") || rawLang.includes("nederlands")) {
    language = "Dutch";
  } else {
    language = "English";
  }

  // 4. City defaults based on school
  let city = "Netherlands";
  if (schoolLower.includes("delft")) city = "Delft";
  else if (schoolLower.includes("hanze") || schoolLower.includes("groningen")) city = "Groningen";
  else if (schoolLower.includes("amsterdam")) city = "Amsterdam";

  // 5. Duration defaults based on level and school
  let duration = "Variable";
  if (level === "Bachelor") {
    duration = schoolLower.includes("hanze") ? "4 years" : "3 years";
  } else if (level === "Master") {
    duration = "2 years";
  } else if (level === "MBO") {
    duration = "3 years";
  }

  // 6. Generate unique slugified ID (Level included to prevent collisions)
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  // Use URL parts to ensure uniqueness for programs with same name (common in MBO data)
  const urlPart = raw.url 
    ? raw.url.split('/').filter(Boolean).slice(-2).join('-').toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : "";

  const schoolSlug = schoolName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  
  const id = `${schoolSlug}-${level.toLowerCase()}-${slug}${urlPart ? '-' + urlPart : ''}`;

  // 7. Clean description
  let description = (raw.description || "").trim();

  // TRANSFORM: Handle placeholder or Dutch-only warnings instead of dropping
  if (
    description.includes("taught in Dutch") || 
    description.includes("only available in Dutch")
  ) {
    description = `This program is primarily taught in Dutch and provides strong academic and practical foundations in ${name}.`;
  }

  // Handle other UI garbage or common placeholders
  if (description.includes("Deze website gebruikt cookies")) {
    description = `A comprehensive ${level} program in ${name} offered by ${schoolName}, focusing on professional development and academic excellence.`;
  }

  // Fallback for empty or very short descriptions
  if (description.length < 10) {
    description = `A comprehensive ${level} program in ${name} offered by ${schoolName}, focusing on professional development and academic excellence.`;
  }

  // Truncate for UI consistency while preserving meaning
  if (description.length > 250) {
    description = description.substring(0, 247) + "...";
  }

  return {
    id,
    name,
    school: schoolName,
    level,
    educationType,
    language,
    duration,
    city,
    description,
  };
}
