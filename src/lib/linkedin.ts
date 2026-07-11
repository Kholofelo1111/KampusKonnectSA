// ============================================================
// LinkedIn job-search URL builder
// All search URLs verified Jan 2026 — go directly to LinkedIn
// public job search (requires login to apply).
// ============================================================

const LINKEDIN_BASE = "https://www.linkedin.com/jobs/search/";

export type LinkedInFilters = {
  keywords: string;
  location?: string;
  workType?: "remote" | "hybrid" | "on-site";
  experienceLevel?: "internship" | "entry" | "associate" | "mid-senior";
  datePosted?: "any" | "month" | "week" | "day";
};

const EXPERIENCE_CODES = {
  internship: "1",
  entry: "2",
  associate: "3",
  "mid-senior": "4",
};

const WORK_TYPE_CODES = {
  "on-site": "1",
  remote: "2",
  hybrid: "3",
};

const DATE_POSTED_CODES = {
  any: "",
  month: "r2592000",
  week: "r604800",
  day: "r86400",
};

export function buildLinkedInUrl(filters: LinkedInFilters): string {
  const params = new URLSearchParams();
  params.set("keywords", filters.keywords);
  params.set("location", filters.location || "South Africa");

  if (filters.experienceLevel) {
    params.set("f_E", EXPERIENCE_CODES[filters.experienceLevel]);
  }
  if (filters.workType) {
    params.set("f_WT", WORK_TYPE_CODES[filters.workType]);
  }
  if (filters.datePosted && filters.datePosted !== "any") {
    params.set("f_TPR", DATE_POSTED_CODES[filters.datePosted]);
  }
  // Sort by date
  params.set("sortBy", "DD");

  return `${LINKEDIN_BASE}?${params.toString()}`;
}

// LinkedIn registration / sign-up URL
export const LINKEDIN_SIGNUP_URL = "https://www.linkedin.com/signup";
export const LINKEDIN_HOME_URL = "https://www.linkedin.com/";

// Step-by-step guide on creating a professional LinkedIn profile
export const LINKEDIN_PROFILE_GUIDE = [
  {
    step: 1,
    title: "Sign up at linkedin.com",
    detail:
      "Visit linkedin.com/signup. Use your real name + a professional email (avoid nicknames like 'partybabe98@gmail.com'). LinkedIn will ask for your country, city, and current status — pick 'Student' or 'Looking for work' if you're a graduate.",
  },
  {
    step: 2,
    title: "Add a professional photo & banner",
    detail:
      "Plain background, dressed how you'd dress for an interview, clear face, smile. No selfies, no group photos, no sunglasses. Profiles with a photo get 14× more views. For the banner behind your photo, use an industry-related image (free options at Canva).",
  },
  {
    step: 3,
    title: "Write a strong headline",
    detail:
      "Not just your job title. Format: '[Role/Course] | [Skill 1] · [Skill 2] · [Career goal]'. Example: 'BCom Accounting Graduate | SAICA SAIPA-bound | Looking for SAIPA Article Clerkship'.",
  },
  {
    step: 4,
    title: "Complete the 'About' section (200+ words)",
    detail:
      "First-person paragraph: who you are, what you studied, key skills, what you're looking for. Use industry keywords (e.g. 'Python, SQL, data analysis') so recruiters' search filters find you.",
  },
  {
    step: 5,
    title: "Add your education + work experience",
    detail:
      "Include your university, qualification, and graduation year. For every job/internship, write 2-3 bullet points using the X-Y-Z formula: 'Accomplished X by doing Y, measured by Z.'",
  },
  {
    step: 6,
    title: "Add skills + ask for endorsements",
    detail:
      "Add at least 10 relevant skills (Excel, Python, Project Management, etc.). Message 5 ex-colleagues / classmates and ask them to endorse you. Return the favour for them.",
  },
  {
    step: 7,
    title: "Get 3-5 recommendations",
    detail:
      "Ask a lecturer, supervisor or manager for a written recommendation. These are gold — they appear directly on your profile and build trust.",
  },
  {
    step: 8,
    title: "Set 'Open to Work'",
    detail:
      "Click 'Open to' on your profile → 'Finding a new job'. Choose roles, location, work type (remote/hybrid/on-site). Recruiters can then see you in their searches. Tick 'All LinkedIn members' so everyone sees the #OPENTOWORK green ring on your photo.",
  },
  {
    step: 9,
    title: "Follow companies + influencers in your field",
    detail:
      "Follow your dream employers (Discovery, Standard Bank, etc.) so their job posts appear in your feed. Follow 5 industry thought leaders + comment thoughtfully on their posts. This grows your network organically.",
  },
  {
    step: 10,
    title: "Connect with 50+ people in week 1",
    detail:
      "Send personalised connection requests (always add a note): classmates, lecturers, past colleagues, professionals in your field. Aim for 500+ connections — LinkedIn shows '500+' instead of an exact number after that, which signals credibility.",
  },
];

// Pre-built popular search URLs by field
export type GraduateField = {
  id: string;
  name: string;
  emoji: string;
  linkedinKeywords: string;
  exampleRoles: string[];
};

export const GRADUATE_FIELDS: GraduateField[] = [
  {
    id: "engineering",
    name: "Engineering",
    emoji: "⚙️",
    linkedinKeywords: "graduate engineer",
    exampleRoles: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Mining Engineer"],
  },
  {
    id: "it-software",
    name: "IT & Software",
    emoji: "💻",
    linkedinKeywords: "graduate software developer",
    exampleRoles: ["Junior Developer", "Data Analyst", "DevOps Engineer", "QA Tester"],
  },
  {
    id: "commerce-finance",
    name: "Commerce & Finance",
    emoji: "📊",
    linkedinKeywords: "graduate accountant finance",
    exampleRoles: ["Article Clerk", "Financial Analyst", "Auditor", "Investment Analyst"],
  },
  {
    id: "law",
    name: "Law",
    emoji: "⚖️",
    linkedinKeywords: "candidate attorney articles",
    exampleRoles: ["Candidate Attorney", "Legal Intern", "Paralegal", "Compliance Officer"],
  },
  {
    id: "marketing",
    name: "Marketing & Comms",
    emoji: "📢",
    linkedinKeywords: "graduate marketing communications",
    exampleRoles: ["Marketing Coordinator", "Social Media Intern", "Content Writer", "Brand Assistant"],
  },
  {
    id: "education",
    name: "Education & Teaching",
    emoji: "📚",
    linkedinKeywords: "teacher educator graduate",
    exampleRoles: ["Foundation Phase Teacher", "FET Teacher", "Tutor", "Education Coordinator"],
  },
  {
    id: "health-sciences",
    name: "Health Sciences",
    emoji: "⚕️",
    linkedinKeywords: "graduate nurse pharmacist medical",
    exampleRoles: ["Community Service Nurse", "Pharmacist Intern", "Medical Intern", "Radiographer"],
  },
  {
    id: "humanities",
    name: "Humanities & Social Sciences",
    emoji: "📖",
    linkedinKeywords: "graduate humanities social sciences",
    exampleRoles: ["Research Assistant", "Policy Analyst", "Social Worker", "Communications Officer"],
  },
  {
    id: "agriculture",
    name: "Agriculture",
    emoji: "🌾",
    linkedinKeywords: "graduate agriculture agronomist",
    exampleRoles: ["Farm Manager Trainee", "Agronomist", "Food Scientist", "Veterinary Technician"],
  },
  {
    id: "media-design",
    name: "Media & Design",
    emoji: "🎨",
    linkedinKeywords: "graduate designer journalist media",
    exampleRoles: ["Junior Designer", "Video Editor", "Journalist", "UX Designer"],
  },
];

export function getFieldById(id: string): GraduateField | undefined {
  return GRADUATE_FIELDS.find((f) => f.id === id);
}
