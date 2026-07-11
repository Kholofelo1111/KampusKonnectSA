// ============================================================
// Shared constants — single source of truth
// Previously duplicated across qualify, profile, modals, feed
// ============================================================
import type { MatricSubject, FieldOfStudy } from "./qualify";

export const SA_PROVINCES = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
] as const;

export const SA_PROVINCES_WITH_ALL = ["All Provinces", ...SA_PROVINCES] as const;

export const MATRIC_SUBJECTS: MatricSubject[] = [
  "Mathematics",
  "Maths Literacy",
  "Physical Science",
  "Life Sciences",
  "Accounting",
  "English",
  "Geography",
  "History",
  "Business Studies",
  "Economics",
  "Computer Applications",
];

export const STUDY_FIELDS: FieldOfStudy[] = [
  "Engineering",
  "IT",
  "Medicine",
  "Health Sciences",
  "Law",
  "Commerce",
  "Education",
  "Humanities",
  "Science",
  "Agriculture",
  "Tourism",
  "Hospitality",
  "Mining",
  "Design",
  "Media",
];

// APS conversion table (SA standard)
export function markToApsPoints(mark: number): number {
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1;
}

// Calculate APS from a marks record (top 6)
export function calculateApsFromMarks(marks: Record<string, number>): number {
  const values = Object.values(marks).filter((m) => m > 0);
  if (values.length === 0) return 0;
  return values
    .sort((a, b) => b - a)
    .slice(0, 6)
    .reduce((sum, m) => sum + markToApsPoints(m), 0);
}

// Job categories
export const JOB_CATEGORIES = [
  "Retail",
  "Driver",
  "Administration",
  "Finance",
  "IT",
  "Hospitality",
  "Security",
  "General Worker",
  "Engineering",
  "Marketing",
  "Logistics",
  "Customer Service",
] as const;

// App-wide metadata
export const APP_NAME = "Kampus KonnectSA";
export const APP_TAGLINE = "Your AI Guide to Education, Careers and Opportunities";
export const CONTACT = {
  phone: "067 349 3612",
  whatsapp: "27646130213",
  whatsappDisplay: "064 613 0213",
  email: "Solocoder836@gmail.com",
  website: "https://kandktechsolutions.co.za",
} as const;
