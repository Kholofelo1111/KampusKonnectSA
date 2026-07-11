// ============================================================
// Zod validation schemas — used in API routes + forms
// ============================================================
import { z } from "zod";

// ---- Auth ----
export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const signinSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// ---- Profile (Required fields enforced) ----
export const profileSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required (min 2 characters)").max(50),
  lastName: z.string().trim().min(2, "Last name is required (min 2 characters)").max(50),
  phone: z
    .string()
    .trim()
    .regex(/^(\+27|0)[0-9]{9}$/, "Enter a valid SA phone (e.g. 0721234567 or +27721234567)"),
  idNumber: z
    .string()
    .trim()
    .regex(/^\d{13}$/, "SA ID number must be 13 digits")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]).optional(),
  citizenship: z.string().default("South African"),
  province: z.enum([
    "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State",
    "Limpopo", "Mpumalanga", "North West", "Northern Cape",
  ], { message: "Please select your province" }),
  city: z.string().trim().min(2, "City is required").max(100),
  address: z.string().optional(),
  schoolName: z.string().trim().min(2, "School name is required"),
  matricYear: z.string().regex(/^(19|20)\d{2}$/, "Enter a valid year (e.g. 2024)"),
  matricStatus: z.enum(["passed", "writing", "redoing"], {
    message: "Select your matric status",
  }),
  apsScore: z
    .number()
    .int()
    .min(1, "APS must be at least 1")
    .max(60, "APS cannot exceed 60"),
  subjects: z
    .array(z.object({ subject: z.string(), mark: z.number().min(0).max(100) }))
    .min(4, "Please add at least 4 matric subjects"),
  interests: z.array(z.string()).optional(),
  fieldOfInterest: z.string().optional(),
  careerGoals: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;

// Calculate profile completion %
export function calculateCompletion(p: Partial<ProfileInput>): number {
  const requiredFields: (keyof ProfileInput)[] = [
    "firstName", "lastName", "phone", "province", "city",
    "schoolName", "matricYear", "matricStatus", "apsScore", "subjects",
  ];
  const optionalFields: (keyof ProfileInput)[] = [
    "idNumber", "dateOfBirth", "gender", "address", "interests",
    "fieldOfInterest", "careerGoals", "skills",
  ];

  const totalWeight = requiredFields.length * 2 + optionalFields.length;
  let score = 0;

  requiredFields.forEach((f) => {
    const v = p[f];
    if (v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)) {
      score += 2;
    }
  });
  optionalFields.forEach((f) => {
    const v = p[f];
    if (v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)) {
      score += 1;
    }
  });

  return Math.round((score / totalWeight) * 100);
}

// ---- Application ----
export const applicationSchema = z.object({
  type: z.enum(["university", "bursary", "job", "internship", "learnership"]),
  title: z.string().trim().min(2),
  organization: z.string().trim().min(2),
  status: z.enum([
    "submitted", "under-review", "accepted", "rejected",
    "waiting-list", "documents-required", "offer-received", "interview",
  ]).default("submitted"),
  deadline: z.string().optional(),
  notes: z.string().max(500).optional(),
  institutionId: z.string().optional(),
  opportunityId: z.string().optional(),
  applyUrl: z.string().url().optional(),
});

// ---- Bookmark ----
export const bookmarkSchema = z.object({
  itemType: z.enum(["institution", "opportunity", "bursary"]),
  itemId: z.string(),
  title: z.string(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// ---- Document ----
export const documentSchema = z.object({
  name: z.string().trim().min(1),
  type: z.enum(["pdf", "jpg", "jpeg", "png"]),
  category: z.string().optional(),
  url: z.string().url(),
  size: z.number().int().positive(),
  mimeType: z.string(),
});

export const MAX_DOC_SIZE = 5 * 1024 * 1024; // 5 MB
