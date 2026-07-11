// ============================================================
// Institution-scoped Qualification Engine v2
// Matches user against institution's ACTUAL programmes
// Filters by institution category (uni=degrees, TVET=diplomas)
// ============================================================

import type { Institution } from "./institutions";
import type { MatricSubject } from "./qualify";

type ProgrammeTemplate = {
  name: string;
  field: string;
  apsBoost: number;
  level: "Bachelor" | "Diploma" | "Higher Certificate" | "Honours" | "Masters" | "PhD";
  requiredSubjects: MatricSubject[];
  duration: string;
  category: "university" | "tvet" | "both"; // which institution types offer this
};

// Realistic programme templates based on actual SA institution offerings
const PROGRAMME_TEMPLATES: ProgrammeTemplate[] = [
  // UNIVERSITY DEGREES (Bachelor, Honours, Masters, PhD)
  { name: "BEng Civil Engineering", field: "Engineering", apsBoost: 5, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "4 years", category: "university" },
  { name: "BEng Mechanical Engineering", field: "Engineering", apsBoost: 5, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "4 years", category: "university" },
  { name: "BEng Electrical Engineering", field: "Engineering", apsBoost: 5, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "4 years", category: "university" },
  { name: "BEng Chemical Engineering", field: "Engineering", apsBoost: 6, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "4 years", category: "university" },
  { name: "BSc Computer Science", field: "IT", apsBoost: 4, level: "Bachelor", requiredSubjects: ["Mathematics"], duration: "3 years", category: "university" },
  { name: "BSc Information Technology", field: "IT", apsBoost: 3, level: "Bachelor", requiredSubjects: ["Mathematics"], duration: "3 years", category: "university" },
  { name: "BSc Data Science", field: "IT", apsBoost: 7, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "3 years", category: "university" },
  { name: "BCom Accounting (CA Stream)", field: "Commerce", apsBoost: 8, level: "Bachelor", requiredSubjects: ["Mathematics"], duration: "3 years", category: "university" },
  { name: "BCom Finance", field: "Commerce", apsBoost: 5, level: "Bachelor", requiredSubjects: ["Mathematics"], duration: "3 years", category: "university" },
  { name: "BCom General", field: "Commerce", apsBoost: 3, level: "Bachelor", requiredSubjects: ["Mathematics"], duration: "3 years", category: "university" },
  { name: "BCom Marketing", field: "Commerce", apsBoost: 2, level: "Bachelor", requiredSubjects: [], duration: "3 years", category: "university" },
  { name: "BCom Economics", field: "Commerce", apsBoost: 4, level: "Bachelor", requiredSubjects: ["Mathematics"], duration: "3 years", category: "university" },
  { name: "LLB (4-year)", field: "Law", apsBoost: 5, level: "Bachelor", requiredSubjects: ["English"], duration: "4 years", category: "university" },
  { name: "BA Law", field: "Law", apsBoost: 2, level: "Bachelor", requiredSubjects: ["English"], duration: "3 years", category: "university" },
  { name: "MBChB (Medicine)", field: "Medicine", apsBoost: 12, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science", "Life Sciences"], duration: "6 years", category: "university" },
  { name: "BPharm (Pharmacy)", field: "Medicine", apsBoost: 8, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "4 years", category: "university" },
  { name: "BDS (Dentistry)", field: "Medicine", apsBoost: 10, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science", "Life Sciences"], duration: "5 years", category: "university" },
  { name: "BNursing", field: "Health Sciences", apsBoost: 4, level: "Bachelor", requiredSubjects: ["Mathematics", "Life Sciences"], duration: "4 years", category: "university" },
  { name: "BSc Physiotherapy", field: "Health Sciences", apsBoost: 8, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science", "Life Sciences"], duration: "4 years", category: "university" },
  { name: "BSc Radiography", field: "Health Sciences", apsBoost: 6, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "4 years", category: "university" },
  { name: "BEd Foundation Phase", field: "Education", apsBoost: 1, level: "Bachelor", requiredSubjects: [], duration: "4 years", category: "university" },
  { name: "BEd Senior Phase / FET", field: "Education", apsBoost: 2, level: "Bachelor", requiredSubjects: [], duration: "4 years", category: "university" },
  { name: "PGCE", field: "Education", apsBoost: 0, level: "Honours", requiredSubjects: [], duration: "1 year", category: "university" },
  { name: "BSc General", field: "Science", apsBoost: 3, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "3 years", category: "university" },
  { name: "BSc Biological Sciences", field: "Science", apsBoost: 3, level: "Bachelor", requiredSubjects: ["Mathematics", "Life Sciences"], duration: "3 years", category: "university" },
  { name: "BSc Chemistry", field: "Science", apsBoost: 4, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "3 years", category: "university" },
  { name: "BA General", field: "Humanities", apsBoost: 0, level: "Bachelor", requiredSubjects: [], duration: "3 years", category: "university" },
  { name: "BA Communications", field: "Humanities", apsBoost: 2, level: "Bachelor", requiredSubjects: ["English"], duration: "3 years", category: "university" },
  { name: "BA Psychology", field: "Humanities", apsBoost: 3, level: "Bachelor", requiredSubjects: [], duration: "3 years", category: "university" },
  { name: "BA History", field: "Humanities", apsBoost: 1, level: "Bachelor", requiredSubjects: [], duration: "3 years", category: "university" },
  { name: "BEng Mining Engineering", field: "Mining", apsBoost: 5, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "4 years", category: "university" },
  { name: "BSc Mining Geology", field: "Mining", apsBoost: 3, level: "Bachelor", requiredSubjects: ["Mathematics", "Physical Science"], duration: "3 years", category: "university" },
  { name: "BSc Agriculture", field: "Agriculture", apsBoost: 2, level: "Bachelor", requiredSubjects: ["Mathematics", "Life Sciences"], duration: "4 years", category: "university" },
  { name: "BA Design", field: "Design", apsBoost: 0, level: "Bachelor", requiredSubjects: [], duration: "3 years", category: "university" },
  { name: "BA Journalism", field: "Media", apsBoost: 3, level: "Bachelor", requiredSubjects: ["English"], duration: "3 years", category: "university" },

  // TVET DIPLOMAS & HIGHER CERTIFICATES
  { name: "N6 Engineering Studies (Mechanical)", field: "Engineering", apsBoost: -2, level: "Diploma", requiredSubjects: ["Mathematics", "Physical Science"], duration: "18 months", category: "tvet" },
  { name: "N6 Engineering Studies (Electrical)", field: "Engineering", apsBoost: -2, level: "Diploma", requiredSubjects: ["Mathematics", "Physical Science"], duration: "18 months", category: "tvet" },
  { name: "N6 Engineering Studies (Civil)", field: "Engineering", apsBoost: -2, level: "Diploma", requiredSubjects: ["Mathematics", "Physical Science"], duration: "18 months", category: "tvet" },
  { name: "N4-N6 Business Management", field: "Commerce", apsBoost: -3, level: "Diploma", requiredSubjects: [], duration: "18 months", category: "tvet" },
  { name: "N4-N6 Financial Management", field: "Commerce", apsBoost: -3, level: "Diploma", requiredSubjects: ["Mathematics"], duration: "18 months", category: "tvet" },
  { name: "N4-N6 Marketing Management", field: "Commerce", apsBoost: -3, level: "Diploma", requiredSubjects: [], duration: "18 months", category: "tvet" },
  { name: "N4-N6 Human Resource Management", field: "Commerce", apsBoost: -3, level: "Diploma", requiredSubjects: [], duration: "18 months", category: "tvet" },
  { name: "NCV Level 2-4: IT & Computer Science", field: "IT", apsBoost: -4, level: "Diploma", requiredSubjects: [], duration: "3 years", category: "tvet" },
  { name: "NCV Level 2-4: Electrical Engineering", field: "Engineering", apsBoost: -3, level: "Diploma", requiredSubjects: ["Mathematics"], duration: "3 years", category: "tvet" },
  { name: "NCV Level 2-4: Civil Engineering", field: "Engineering", apsBoost: -3, level: "Diploma", requiredSubjects: ["Mathematics"], duration: "3 years", category: "tvet" },
  { name: "NCV Level 2-4: Hospitality", field: "Hospitality", apsBoost: -4, level: "Diploma", requiredSubjects: [], duration: "3 years", category: "tvet" },
  { name: "NCV Level 2-4: Tourism", field: "Tourism", apsBoost: -4, level: "Diploma", requiredSubjects: [], duration: "3 years", category: "tvet" },
  { name: "Higher Certificate: Business Management", field: "Commerce", apsBoost: -5, level: "Higher Certificate", requiredSubjects: [], duration: "1 year", category: "tvet" },
  { name: "Higher Certificate: IT", field: "IT", apsBoost: -5, level: "Higher Certificate", requiredSubjects: [], duration: "1 year", category: "tvet" },
  { name: "Higher Certificate: Engineering Studies", field: "Engineering", apsBoost: -5, level: "Higher Certificate", requiredSubjects: ["Mathematics"], duration: "1 year", category: "tvet" },
  { name: "Educare N4-N6", field: "Education", apsBoost: -3, level: "Diploma", requiredSubjects: [], duration: "18 months", category: "tvet" },
];

export type ProgrammeMatch = {
  name: string;
  field: string;
  level: string;
  duration: string;
  apsRequired: number;
  apsGap: number;
  matchPercentage: number;
  qualified: boolean;
  reasons: string[];
};

export type InstitutionQualifyResult = {
  institution: { id: string; name: string; category: string; apsMin: number };
  totalProgrammes: number;
  qualifiedCount: number;
  nearMissCount: number;
  matches: ProgrammeMatch[];
};

export function checkInstitutionQualification(
  institution: Institution,
  userAps: number,
  userSubjects: MatricSubject[],
  userSubjectMarks?: Record<string, number>
): InstitutionQualifyResult {
  const baseAps = institution.apsMin ?? 22;
  const matches: ProgrammeMatch[] = [];

  // Determine which programme levels to show based on institution category
  const isUniversity = institution.category === "public-university" || institution.category === "private-university";
  const isTVET = institution.category === "public-tvet";
  const isPrivateCollege = institution.category === "private-college";

  // Filter templates by:
  // 1. Institution's fields
  // 2. Institution category (uni=degrees, TVET=diplomas/HC)
  const relevantTemplates = PROGRAMME_TEMPLATES.filter((t) => {
    // Must match institution's field
    if (!institution.fields.includes(t.field)) return false;

    // Filter by institution type
    if (isUniversity) {
      // Universities: only Bachelor, Honours, Masters, PhD
      return t.category === "university" && ["Bachelor", "Honours", "Masters", "PhD"].includes(t.level);
    } else if (isTVET) {
      // TVETs: only Diploma and Higher Certificate
      return t.category === "tvet" && ["Diploma", "Higher Certificate"].includes(t.level);
    } else if (isPrivateCollege) {
      // Private colleges: mix of degrees and diplomas
      return t.category === "both" || t.category === "university" || t.category === "tvet";
    }
    return false;
  });

  // Remove duplicates (same name)
  const seen = new Set<string>();
  const uniqueTemplates = relevantTemplates.filter((t) => {
    if (seen.has(t.name)) return false;
    seen.add(t.name);
    return true;
  });

  for (const t of uniqueTemplates) {
    const apsRequired = Math.max(15, baseAps + t.apsBoost);
    const apsGap = userAps - apsRequired;
    const reasons: string[] = [];

    // Calculate match %: 50% from APS, 50% from subjects
    let apsScore = 0;
    if (apsGap >= 0) {
      apsScore = 50;
      reasons.push(`✓ APS ${userAps} meets required ${apsRequired}`);
    } else if (apsGap >= -3) {
      apsScore = 35;
      reasons.push(`⚠ APS ${userAps} is ${-apsGap} points short (within reach)`);
    } else if (apsGap >= -6) {
      apsScore = 20;
      reasons.push(`⚠ APS ${userAps} is ${-apsGap} points short`);
    } else {
      apsScore = 5;
      reasons.push(`✗ APS ${userAps} is ${-apsGap} points below required ${apsRequired}`);
    }

    // Subjects check (using marks if provided)
    let subjectScore = 0;
    if (t.requiredSubjects.length === 0) {
      subjectScore = 50;
      reasons.push(`✓ No specific subjects required`);
    } else {
      // Check if user has all required subjects with passing marks (>= 40%)
      const haveAll = t.requiredSubjects.every((s) => {
        if (userSubjects.includes(s)) {
          if (userSubjectMarks && userSubjectMarks[s] !== undefined) {
            return userSubjectMarks[s] >= 40;
          }
          return true; // Selected but no mark provided, assume pass
        }
        return false;
      });
      
      const missing = t.requiredSubjects.filter((s) => {
        if (userSubjects.includes(s)) {
          if (userSubjectMarks && userSubjectMarks[s] !== undefined) {
            return userSubjectMarks[s] < 40;
          }
          return false;
        }
        return true;
      });

      if (haveAll) {
        subjectScore = 50;
        reasons.push(`✓ Has all required subjects: ${t.requiredSubjects.join(", ")}`);
      } else {
        const hadCount = t.requiredSubjects.length - missing.length;
        subjectScore = Math.round((hadCount / t.requiredSubjects.length) * 50);
        
        const lowMarks = t.requiredSubjects.filter(s => userSubjectMarks && userSubjectMarks[s] !== undefined && userSubjectMarks[s] < 40);
        const notSelected = t.requiredSubjects.filter(s => !userSubjects.includes(s));
        
        if (lowMarks.length > 0) {
          reasons.push(`✗ Marks too low (<40%) for: ${lowMarks.join(", ")}`);
        }
        if (notSelected.length > 0) {
          reasons.push(`✗ Missing subjects: ${notSelected.join(", ")}`);
        }
      }

      // Critical: Engineering/Medicine/Science require Pure Mathematics, not Maths Literacy
      const needsPureMaths = t.requiredSubjects.includes("Mathematics");
      if (needsPureMaths && userSubjects.includes("Maths Literacy") && !userSubjects.includes("Mathematics")) {
        subjectScore = Math.min(subjectScore, 10);
        reasons.push(`⚠ ${t.level} requires Pure Mathematics — Maths Literacy is not accepted`);
      }
    }

    const matchPercentage = apsScore + subjectScore;
    const qualified = apsGap >= 0 && (t.requiredSubjects.length === 0 || t.requiredSubjects.every((s) => {
      if (userSubjects.includes(s)) {
        if (userSubjectMarks && userSubjectMarks[s] !== undefined) {
          return userSubjectMarks[s] >= 40;
        }
        return true;
      }
      return false;
    }));

    matches.push({
      name: t.name,
      field: t.field,
      level: t.level,
      duration: t.duration,
      apsRequired,
      apsGap,
      matchPercentage,
      qualified,
      reasons,
    });
  }

  // Sort by match % descending
  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    institution: {
      id: institution.id,
      name: institution.name,
      category: institution.category,
      apsMin: baseAps,
    },
    totalProgrammes: matches.length,
    qualifiedCount: matches.filter((m) => m.qualified).length,
    nearMissCount: matches.filter((m) => !m.qualified && m.apsGap >= -3).length,
    matches,
  };
}
