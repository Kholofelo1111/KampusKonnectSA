// ============================================================
// Rule-based Qualification Engine
// Matches user's APS, subjects, and field of interest against
// real institution requirements.
// ============================================================

import {
  allInstitutions,
  Institution,
} from "./institutions";

export type MatricSubject =
  | "Mathematics"
  | "Maths Literacy"
  | "Physical Science"
  | "Life Sciences"
  | "Accounting"
  | "English"
  | "Geography"
  | "History"
  | "Business Studies"
  | "Economics"
  | "Computer Applications";

export type FieldOfStudy =
  | "Engineering"
  | "IT"
  | "Medicine"
  | "Health Sciences"
  | "Law"
  | "Commerce"
  | "Education"
  | "Humanities"
  | "Science"
  | "Agriculture"
  | "Tourism"
  | "Hospitality"
  | "Mining"
  | "Design"
  | "Media";

export type QualifyInput = {
  aps: number;
  subjects: MatricSubject[];
  subjectMarks?: Record<string, number>;
  field?: FieldOfStudy;
  province?: string;
  institutionType?: "all" | "university" | "tvet";
};

export type ProgrammeMatch = {
  institution: Institution;
  matchedField: string;
  apsGap: number; // positive = qualified by this many points, negative = short by this many
  qualified: boolean;
  reasoning: string[];
};

export type QualifyResult = {
  totalQualified: number;
  totalNearMiss: number;
  matches: ProgrammeMatch[];
  nearMisses: ProgrammeMatch[];
  recommendations: string[];
  summary: string;
};

// Subject requirements by field (real SA admission requirements)
const FIELD_SUBJECT_REQUIREMENTS: Record<string, MatricSubject[]> = {
  Engineering: ["Mathematics", "Physical Science"],
  IT: ["Mathematics"],
  Medicine: ["Mathematics", "Physical Science", "Life Sciences"],
  "Health Sciences": ["Mathematics", "Life Sciences"],
  Law: ["English"],
  Commerce: ["Mathematics"],
  Education: [],
  Humanities: [],
  Science: ["Mathematics", "Physical Science"],
  Agriculture: ["Life Sciences"],
  Tourism: [],
  Hospitality: [],
  Mining: ["Mathematics", "Physical Science"],
  Design: [],
  Media: [],
};

export function checkQualification(input: QualifyInput): QualifyResult {
  const { aps, subjects, subjectMarks = {}, field, province, institutionType = "all" } = input;
  const matches: ProgrammeMatch[] = [];
  const nearMisses: ProgrammeMatch[] = [];
  const seenInstitutions = new Set<string>();

  for (const inst of allInstitutions) {
    // Skip if already processed (no repeats)
    if (seenInstitutions.has(inst.id)) continue;
    seenInstitutions.add(inst.id);

    // Filter by institution type
    if (institutionType === "university") {
      if (inst.category !== "public-university" && inst.category !== "private-university") continue;
    } else if (institutionType === "tvet") {
      if (inst.category !== "public-tvet" && inst.category !== "private-college") continue;
    }

    const isUniversity = inst.category === "public-university" || inst.category === "private-university";
    const isTVET = inst.category === "public-tvet";
    const apsMin = inst.apsMin ?? (isTVET ? 15 : 20);

    // Check APS
    const apsGap = aps - apsMin;
    const qualifiedByAps = apsGap >= 0;

    // Find matching fields
    const fieldMatches = field
      ? inst.fields.filter((f) =>
          f.toLowerCase().includes(field.toLowerCase()) ||
          field.toLowerCase().includes(f.toLowerCase())
        )
      : inst.fields;

    if (fieldMatches.length === 0) continue;

    const reasoning: string[] = [];

    // Province match
    if (
      province &&
      inst.province !== "Multi-Province" &&
      inst.province !== "National"
    ) {
      if (inst.province.toLowerCase() === province.toLowerCase()) {
        reasoning.push(`✓ Located in your province (${province})`);
      } else {
        reasoning.push(`📍 Located in ${inst.province} (you're in ${province})`);
      }
    }

    // APS check
    if (apsMin > 0) {
      if (apsGap >= 0) {
        reasoning.push(`✓ APS ${aps} meets minimum of ${apsMin}`);
      } else {
        reasoning.push(`✗ APS ${aps} below minimum of ${apsMin} (need ${Math.abs(apsGap)} more)`);
      }
    } else {
      reasoning.push(`✓ TVET / open enrolment — no minimum APS`);
    }

    // Subject check (using marks if provided)
    const requiredSubjects = field ? FIELD_SUBJECT_REQUIREMENTS[field] || [] : [];
    const missingSubjects = requiredSubjects.filter((req) => {
      if (subjects.includes(req)) {
        // If mark is provided, check if it's passing (>= 40%)
        if (subjectMarks[req] !== undefined && subjectMarks[req] < 40) {
          return true; // Missing because mark is too low
        }
        return false;
      }
      return true; // Subject not selected at all
    });

    let subjectsOk = true;
    if (requiredSubjects.length > 0) {
      if (missingSubjects.length === 0) {
        reasoning.push(`✓ You have all required subjects for ${field}`);
      } else {
        subjectsOk = false;
        // Check why they are missing
        const lowMarks = requiredSubjects.filter(req => subjectMarks[req] !== undefined && subjectMarks[req] < 40);
        const notSelected = requiredSubjects.filter(req => !subjects.includes(req));
        
        if (lowMarks.length > 0) {
          reasoning.push(`✗ Marks too low (<40%) for: ${lowMarks.join(", ")}`);
        }
        if (notSelected.length > 0) {
          reasoning.push(`✗ Missing required subject(s): ${notSelected.join(", ")}`);
        }
      }
    }

    // Maths Literacy warning
    if (
      subjects.includes("Maths Literacy") &&
      !subjects.includes("Mathematics") &&
      field &&
      ["Engineering", "Medicine", "Science", "IT", "Commerce", "Mining"].includes(field)
    ) {
      subjectsOk = false;
      reasoning.push(
        `⚠ Most ${field} programmes require Pure Mathematics (not Maths Literacy)`
      );
    }

    reasoning.push(`📚 Available fields: ${fieldMatches.slice(0, 3).join(", ")}`);

    const qualified = apsGap >= 0 && subjectsOk;
    const match: ProgrammeMatch = {
      institution: inst,
      matchedField: fieldMatches[0],
      apsGap,
      qualified,
      reasoning,
    };

    if (qualified) {
      matches.push(match);
    } else if (apsGap >= -4 && subjectsOk) {
      // Near miss: within 4 APS points and subjects are OK
      nearMisses.push(match);
    } else if (apsGap >= -2) {
      // Very close miss even with subject issues
      nearMisses.push(match);
    }
  }

  // Sort matches: highest APS gap first (most safe choices), then by institution name
  matches.sort((a, b) => b.apsGap - a.apsGap);
  nearMisses.sort((a, b) => b.apsGap - a.apsGap);

  // Generate summary + recommendations
  const summary = generateSummary(matches.length, nearMisses.length, field, aps);
  const recommendations = generateRecommendations(
    matches,
    nearMisses,
    subjects,
    field,
    aps
  );

  return {
    totalQualified: matches.length,
    totalNearMiss: nearMisses.length,
    matches: matches.slice(0, 20),
    nearMisses: nearMisses.slice(0, 8),
    recommendations,
    summary,
  };
}

function generateSummary(
  qualified: number,
  nearMiss: number,
  field?: FieldOfStudy,
  aps?: number
): string {
  if (qualified === 0 && nearMiss === 0) {
    return `Based on your profile, we couldn't find direct matches. Consider improving your APS or exploring TVET pathways.`;
  }
  if (qualified === 0 && nearMiss > 0) {
    return `You're close! With small improvements, you'd qualify for ${nearMiss} ${field || "programme"}${nearMiss === 1 ? "" : "s"}.`;
  }
  if (field) {
    return `You qualify for ${qualified} ${field} programme${qualified === 1 ? "" : "s"}${nearMiss > 0 ? ` (and ${nearMiss} more if you improve your APS slightly)` : ""}.`;
  }
  return `You qualify for ${qualified} programme${qualified === 1 ? "" : "s"} across South African institutions.`;
}

function generateRecommendations(
  matches: ProgrammeMatch[],
  nearMisses: ProgrammeMatch[],
  subjects: MatricSubject[],
  field?: FieldOfStudy,
  aps?: number
): string[] {
  const recs: string[] = [];

  if (matches.length > 5) {
    recs.push(
      `🎯 You have strong options — apply to your top 3 choices plus 1-2 safety choices.`
    );
  }

  if (
    field &&
    ["Engineering", "Medicine", "Science", "IT", "Mining"].includes(field) &&
    subjects.includes("Maths Literacy") &&
    !subjects.includes("Mathematics")
  ) {
    recs.push(
      `📐 ${field} programmes typically need Pure Mathematics. Consider TVET pathways or maths upgrades.`
    );
  }

  if (matches.length === 0 && nearMisses.length > 0) {
    const avgGap = nearMisses.reduce((s, m) => s + Math.abs(m.apsGap), 0) / nearMisses.length;
    recs.push(
      `📈 You're ~${Math.round(avgGap)} APS points away from qualifying. Consider rewriting key subjects or doing a bridging course.`
    );
  }

  if (aps && aps < 24) {
    recs.push(
      `🛠️ TVET colleges offer practical NATED and NCV courses with no minimum APS — great career paths in plumbing, electrical, hospitality, IT.`
    );
  }

  if (aps && aps >= 30 && matches.length > 0) {
    recs.push(
      `💰 With APS ${aps}, you also qualify for major bursaries: NSFAS, Sasol, Eskom, Funza Lushaka.`
    );
  }

  if (matches.length > 0) {
    const provinces = [...new Set(matches.map((m) => m.institution.province))];
    if (provinces.length >= 3) {
      recs.push(
        `🗺️ Options across ${provinces.length} provinces — consider accommodation costs and travel.`
      );
    }
  }

  return recs;
}
