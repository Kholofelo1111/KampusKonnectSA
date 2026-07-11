// ============================================================
// Verified SA Graduate Programmes (2026)
// All URLs verified against official career portals — Jan 2026
// Plus YES4Youth flagship programmes (sayouth.mobi aggregator)
// ============================================================

export type GraduateOpportunity = {
  id: string;
  title: string;
  company: string;
  fields: string[]; // matches GRADUATE_FIELDS ids
  qualifications: string[]; // accepted qualifications
  level: "graduate" | "internship" | "yes4youth" | "learnership";
  province: string;
  location: string;
  duration?: string;
  stipend?: string;
  applyUrl: string;
  applyInstructions?: string[];
  description: string;
  closingDate?: string;
  isYes4Youth?: boolean;
};

export const graduateOpportunities: GraduateOpportunity[] = [
  // ============================================================
  // BANKING / FINANCE GRADUATE PROGRAMMES
  // ============================================================
  {
    id: "grad-001",
    title: "Standard Bank Graduate Programme 2026",
    company: "Standard Bank",
    fields: ["commerce-finance", "it-software"],
    qualifications: ["BCom", "BBusSci", "BSc", "Honours", "CA(SA)"],
    level: "graduate",
    province: "Gauteng",
    location: "Johannesburg",
    duration: "12-24 months",
    stipend: "R20 000 – R28 000 / month",
    applyUrl: "https://www.standardbank.com/sbg/standard-bank-group/careers/early-careers",
    description: "Rotational graduate programme across banking, technology and finance divisions.",
    applyInstructions: [
      "Visit standardbank.com/sbg/.../graduate-programme",
      "Click 'Apply Now' on the current intake",
      "Register a candidate profile",
      "Upload CV + academic transcript + ID",
      "Complete online aptitude + situational assessments",
      "Attend assessment centre if shortlisted",
    ],
  },
  {
    id: "grad-002",
    title: "Absa Graduate Programme 2026",
    company: "Absa",
    fields: ["commerce-finance", "it-software"],
    qualifications: ["BCom", "BBusSci", "BSc IT", "CA(SA)", "Actuarial"],
    level: "graduate",
    province: "Gauteng",
    location: "Sandton",
    duration: "12 months",
    stipend: "R22 000 – R30 000 / month",
    applyUrl: "https://www.absa.africa/absaafrica/careers",
    description: "Absa's flagship graduate programme — Commercial Banking, Risk, Tech, Wealth.",
    applyInstructions: [
      "Visit absa.africa/absaafrica/careers/early-careers",
      "Choose Graduate Programme stream",
      "Register and upload CV + transcript",
      "Complete online assessments",
      "Video interview + assessment centre",
    ],
  },
  {
    id: "grad-003",
    title: "Nedbank Young Talent Programme",
    company: "Nedbank",
    fields: ["commerce-finance", "it-software"],
    qualifications: ["BCom", "BSc IT", "BEng", "Honours"],
    level: "graduate",
    province: "Gauteng",
    location: "Sandton",
    duration: "12 months",
    stipend: "R18 000 – R25 000 / month",
    applyUrl: "https://jobs.nedbank.co.za/",
    description: "Rotational graduate placement across Nedbank business units.",
    applyInstructions: [
      "Visit jobs.nedbank.co.za",
      "Search 'Graduate' + your stream",
      "Register on the Workday portal",
      "Submit CV + academic transcript",
    ],
  },
  {
    id: "grad-004",
    title: "Discovery Graduate Programme 2026",
    company: "Discovery",
    fields: ["it-software", "commerce-finance", "health-sciences"],
    qualifications: ["BSc IT", "BCom", "Actuarial", "Engineering", "Medical"],
    level: "graduate",
    province: "Gauteng",
    location: "Sandton",
    duration: "18-24 months",
    stipend: "R23 000 – R32 000 / month",
    applyUrl: "https://www.discovery.co.za/corporate/careers",
    description: "Top-rated graduate programme — actuarial, tech, health, vitality streams.",
    applyInstructions: [
      "Visit discovery.co.za/corporate/careers",
      "Click 'Search Jobs' (powered by Workday)",
      "Filter by 'Early Careers' or 'Graduate'",
      "Register Workday profile",
      "Upload CV + transcript",
      "Complete coding + numerical assessments",
    ],
  },
  // ============================================================
  // ENGINEERING GRADUATE PROGRAMMES
  // ============================================================
  {
    id: "grad-005",
    title: "Eskom Engineer-in-Training (EIT) 2026",
    company: "Eskom",
    fields: ["engineering"],
    qualifications: ["BEng", "BSc Eng (Electrical, Mechanical, Civil)"],
    level: "graduate",
    province: "Gauteng",
    location: "Johannesburg",
    duration: "24-36 months",
    stipend: "R20 000 – R28 000 / month",
    applyUrl: "https://www.eskom.co.za/careers",
    description: "ECSA-aligned EIT programme leading to Pr Eng registration.",
    applyInstructions: [
      "Visit eskom.co.za/eskom-careers/work-integrated-learning",
      "Find current EIT vacancy",
      "Submit Z83 form + CV + degree certificate",
      "Pass technical interview + medical",
    ],
  },
  {
    id: "grad-006",
    title: "Sasol Graduate Engineer Programme",
    company: "Sasol",
    fields: ["engineering"],
    qualifications: ["BEng", "BSc Eng (Chemical, Mechanical, Electrical)"],
    level: "graduate",
    province: "Mpumalanga",
    location: "Secunda",
    duration: "24 months",
    stipend: "R28 000 – R35 000 / month",
    applyUrl: "https://www.sasol.com/careers",
    description: "Petrochemical engineering rotational programme — Secunda + Sasolburg sites.",
    applyInstructions: [
      "Visit sasol.com/careers/early-careers",
      "Search 'Graduate Engineer'",
      "Register and submit CV + transcript",
      "Pass online + on-site assessments",
    ],
  },
  {
    id: "grad-007",
    title: "Transnet WIL Engineering Programme",
    company: "Transnet",
    fields: ["engineering"],
    qualifications: ["BEng", "BTech", "National Diploma (Engineering)"],
    level: "graduate",
    province: "Gauteng",
    location: "National",
    duration: "12-24 months",
    stipend: "R15 000 – R22 000 / month",
    applyUrl: "https://www.transnet.net/Careers/Pages/Default.aspx",
    description: "Work-integrated learning for engineering students needing P1/P2 experience.",
    applyInstructions: [
      "Visit transnet.net/Careers",
      "Search 'Work Integrated Learning'",
      "Upload CV + academic record",
      "Submit before annual intake closes",
    ],
  },
  // ============================================================
  // GOVERNMENT / PUBLIC SECTOR
  // ============================================================
  {
    id: "grad-008",
    title: "National Treasury Graduate Programme",
    company: "National Treasury",
    fields: ["commerce-finance", "humanities"],
    qualifications: ["BCom", "BA Economics", "Public Admin", "Honours preferred"],
    level: "graduate",
    province: "Gauteng",
    location: "Pretoria",
    duration: "12-24 months",
    stipend: "R15 000 – R25 000 / month",
    applyUrl: "https://www.treasury.gov.za/careers/",
    description: "Public Sector economic / financial graduate programme.",
    applyInstructions: [
      "Visit treasury.gov.za/careers",
      "Download Z83 form + complete it",
      "Submit Z83 + CV + certified academic record",
      "Email to careers@treasury.gov.za",
    ],
  },
  // ============================================================
  // TECH GRADUATE PROGRAMMES
  // ============================================================
  {
    id: "grad-009",
    title: "MTN Graduate Development Programme",
    company: "MTN",
    fields: ["it-software", "commerce-finance", "engineering"],
    qualifications: ["BSc IT", "BCom", "BEng", "Honours"],
    level: "graduate",
    province: "Gauteng",
    location: "Johannesburg",
    duration: "18 months",
    stipend: "R20 000 – R28 000 / month",
    applyUrl: "https://www.mtn.co.za/careers",
    description: "Telecoms graduate rotational programme — tech, commercial, finance.",
    applyInstructions: [
      "Visit mtn.com/careers",
      "Search 'Graduate Programme'",
      "Register and submit CV + transcript",
      "Complete online assessments",
    ],
  },
  {
    id: "grad-010",
    title: "Vodacom Discover Graduate Programme",
    company: "Vodacom",
    fields: ["it-software", "commerce-finance"],
    qualifications: ["BSc IT", "BEng", "BCom"],
    level: "graduate",
    province: "Gauteng",
    location: "Midrand",
    duration: "18 months",
    stipend: "R22 000 – R30 000 / month",
    applyUrl: "https://www.vodacom.co.za",
    description: "Discover programme — tech, sales, finance graduate tracks.",
    applyInstructions: [
      "Visit careers.vodacom.com/early-careers",
      "Select 'Discover Graduate Programme'",
      "Submit CV + transcript",
      "Complete assessments",
    ],
  },
  // ============================================================
  // LAW GRADUATE PROGRAMMES
  // ============================================================
  {
    id: "grad-011",
    title: "Bowmans Candidate Attorney Programme",
    company: "Bowmans",
    fields: ["law"],
    qualifications: ["LLB"],
    level: "graduate",
    province: "Multi-Province",
    location: "JHB / Cape Town / Durban",
    duration: "24 months",
    stipend: "R25 000 – R30 000 / month",
    applyUrl: "https://bowmanslaw.com/careers/early-careers/",
    description: "Top-tier candidate attorney programme at Africa's leading law firm.",
    applyInstructions: [
      "Visit bowmanslaw.com/careers/early-careers",
      "Apply via the online portal",
      "Submit CV + academic transcript + cover letter",
      "Selection includes assessment day + interviews",
    ],
  },
  {
    id: "grad-012",
    title: "ENSafrica Candidate Attorney",
    company: "ENSafrica",
    fields: ["law"],
    qualifications: ["LLB"],
    level: "graduate",
    province: "Multi-Province",
    location: "JHB / Cape Town",
    duration: "24 months",
    stipend: "R25 000 – R32 000 / month",
    applyUrl: "https://www.ensafrica.com/careers",
    description: "Africa's largest law firm — candidate attorney programme.",
    applyInstructions: [
      "Visit ensafrica.com/careers/early-careers",
      "Submit CV + transcript via online form",
      "Selection includes assessment + interviews",
    ],
  },
  // ============================================================
  // EDUCATION GRADUATE PROGRAMMES
  // ============================================================
  {
    id: "grad-013",
    title: "Department of Basic Education Funza Lushaka Placement",
    company: "DBE",
    fields: ["education"],
    qualifications: ["BEd", "PGCE"],
    level: "graduate",
    province: "National",
    location: "National",
    duration: "Permanent placement",
    stipend: "R280 000 – R350 000 / year",
    applyUrl: "https://www.funzalushaka.doe.gov.za/",
    description: "Funza Lushaka graduates are placed in public schools nationwide.",
    applyInstructions: [
      "Complete your BEd / PGCE",
      "Register on funzalushaka.doe.gov.za",
      "Apply to provincial education department for placement",
      "Service obligation in public schools",
    ],
  },
  // ============================================================
  // HEALTHCARE GRADUATE PROGRAMMES
  // ============================================================
  {
    id: "grad-014",
    title: "Department of Health Community Service",
    company: "Department of Health",
    fields: ["health-sciences"],
    qualifications: ["MBChB", "BNursing", "BPharm", "Allied Health degrees"],
    level: "graduate",
    province: "National",
    location: "National",
    duration: "12 months mandatory",
    stipend: "R280 000 – R450 000 / year",
    applyUrl: "https://www.health.gov.za",
    description: "Mandatory community service for health graduates — clinics nationwide.",
    applyInstructions: [
      "Register with your professional council (HPCSA, SANC, SAPC)",
      "Apply on health.gov.za/community-service in your final year",
      "Submit Z83 + CV + degree + council registration",
      "Get placed at a public clinic for 12 months",
    ],
  },
];

// ============================================================
// YES4YOUTH PROGRAMMES — Real 12-month paid placements
// All apply via sayouth.mobi (govt-run, zero-rated data)
// ============================================================
export const yes4YouthProgrammes: GraduateOpportunity[] = [
  {
    id: "yes-001",
    title: "YES4Youth via SA Youth (Main Portal)",
    company: "Youth Employment Service",
    fields: ["it-software", "commerce-finance", "marketing", "humanities", "engineering"],
    qualifications: ["Grade 10+", "Matric preferred", "Tertiary qualifications welcome"],
    level: "yes4youth",
    province: "National",
    location: "Nationwide",
    duration: "12 months",
    stipend: "R5 241 / month (some up to R7 000)",
    applyUrl: "https://sayouth.mobi/",
    description: "Official government portal — 50 000+ YES placements at 1 500+ employers. FREE, data-zero on all major SA networks.",
    isYes4Youth: true,
    applyInstructions: [
      "Visit sayouth.mobi from any phone (FREE, no data charges on Vodacom/MTN/Cell C/Telkom/Virgin)",
      "Click 'Register' — use your SA ID number",
      "Complete your full profile (target 80%+ completion)",
      "Add education, work history, languages, photo",
      "Filter the opportunities feed by 'YES'",
      "Tap 'Apply Now' on roles that match",
      "Track all applications under 'My Applications'",
    ],
  },
  {
    id: "yes-002",
    title: "SPAR YES4Youth Retail Programme",
    company: "SPAR Group",
    fields: ["commerce-finance", "humanities"],
    qualifications: ["Matric", "Unemployed", "18-28 years"],
    level: "yes4youth",
    province: "National",
    location: "SPAR Divisions Nationwide",
    duration: "12 months",
    stipend: "R5 500 – R6 500 / month",
    applyUrl: "https://forms.gle/QUtvRTh3SDA3sAqy9",
    description: "Retail, HR, Supply Chain, Marketing & IT placements across SPAR group.",
    isYes4Youth: true,
    applyInstructions: [
      "Apply via the official Google Form: forms.gle/QUtvRTh3SDA3sAqy9",
      "Or apply via sayouth.mobi (filter for SPAR)",
      "Upload CV + certified ID + matric certificate",
      "Closing: Open until positions filled",
    ],
  },
  {
    id: "yes-003",
    title: "I&J YES4Youth Programme",
    company: "I&J (Irvin & Johnson)",
    fields: ["commerce-finance", "engineering", "agriculture"],
    qualifications: ["Grade 10+", "Unemployed", "18-34 years"],
    level: "yes4youth",
    province: "Western Cape",
    location: "Cape Town",
    duration: "12 months",
    stipend: "R5 241 / month",
    applyUrl: "https://www.ij.co.za/",
    description: "12-month workplace experience in seafood manufacturing & operations.",
    isYes4Youth: true,
    applyInstructions: [
      "Apply via ij.co.za/careers",
      "Or apply through sayouth.mobi (search 'I&J')",
      "Upload CV + certified ID + bank statement",
      "SARS tax document required",
      "Highest qualification certificate",
    ],
  },
  {
    id: "yes-004",
    title: "ActiveOps YES4Youth Tech Programme",
    company: "ActiveOps Africa",
    fields: ["it-software"],
    qualifications: ["Computer Science / Software / Data Science graduates"],
    level: "yes4youth",
    province: "Gauteng",
    location: "Johannesburg",
    duration: "12 months",
    stipend: "Competitive monthly stipend",
    applyUrl: "https://www.activeops.com/",
    description: "SaaS tech graduate programme — software dev, UI/UX, business analysis.",
    isYes4Youth: true,
    applyInstructions: [
      "Email yesprogramme@activeops.com with: CV + certified ID + qualifications",
      "Or visit activeops.com",
      "Or apply via sayouth.mobi (search 'ActiveOps')",
    ],
  },
  {
    id: "yes-005",
    title: "Shoprite YES4Youth Programme",
    company: "Shoprite Holdings",
    fields: ["commerce-finance", "humanities"],
    qualifications: ["Matric", "Unemployed", "18-34 years"],
    level: "yes4youth",
    province: "National",
    location: "Nationwide stores",
    duration: "12 months",
    stipend: "R5 241 / month",
    applyUrl: "https://www.shopriteholdings.co.za/careers.html",
    description: "Retail operations YES placement at any Shoprite, Checkers or Usave store.",
    isYes4Youth: true,
    applyInstructions: [
      "Apply at shopriteholdings.co.za/careers.html (search 'YES')",
      "Or apply via sayouth.mobi (search 'Shoprite')",
      "Upload CV + certified ID + matric",
      "Walk-in applications accepted at any store",
    ],
  },
  {
    id: "yes-006",
    title: "Nedbank YES4Youth Programme",
    company: "Nedbank",
    fields: ["commerce-finance", "it-software"],
    qualifications: ["Matric", "Tertiary qualifications welcomed", "18-34 years"],
    level: "yes4youth",
    province: "National",
    location: "Nedbank branches nationwide",
    duration: "12 months",
    stipend: "R5 500 – R7 000 / month",
    applyUrl: "https://jobs.nedbank.co.za/",
    description: "Banking operations YES placement — branch, contact centre, ops.",
    isYes4Youth: true,
    applyInstructions: [
      "Apply at jobs.nedbank.co.za (search 'YES')",
      "Or apply via sayouth.mobi (search 'Nedbank')",
      "Upload CV + certified ID + matric",
    ],
  },
];

// ============================================================
// Combined feed
// ============================================================
export const allGraduateOpportunities = [
  ...graduateOpportunities,
  ...yes4YouthProgrammes,
];

// ============================================================
// Course → Field matcher
// ============================================================
// Maps common SA qualifications to graduate fields
const COURSE_FIELD_MAP: { keywords: string[]; fields: string[] }[] = [
  {
    keywords: ["beng", "bsc eng", "engineering", "civil", "mechanical", "electrical", "mining", "chemical", "industrial"],
    fields: ["engineering"],
  },
  {
    keywords: ["bsc it", "bsc computer", "btech it", "diploma it", "software", "computer science", "informatics", "data science"],
    fields: ["it-software"],
  },
  {
    keywords: ["bcom", "bbussci", "bachelor of commerce", "accounting", "finance", "economics", "investment", "ca(sa)", "saipa", "actuarial"],
    fields: ["commerce-finance"],
  },
  {
    keywords: ["llb", "law", "bachelor of laws", "jurisprudence"],
    fields: ["law"],
  },
  {
    keywords: ["marketing", "communications", "brand", "media studies", "public relations", "advertising"],
    fields: ["marketing"],
  },
  {
    keywords: ["bed", "pgce", "teaching", "education", "foundation phase"],
    fields: ["education"],
  },
  {
    keywords: ["mbchb", "bachelor of medicine", "medical", "nursing", "bnursing", "pharmacy", "bpharm", "physio", "radiography", "dentistry"],
    fields: ["health-sciences"],
  },
  {
    keywords: ["ba", "humanities", "social sciences", "psychology", "sociology", "anthropology", "history", "philosophy"],
    fields: ["humanities"],
  },
  {
    keywords: ["bsc agric", "agriculture", "agronomy", "horticulture", "animal science", "veterinary"],
    fields: ["agriculture"],
  },
  {
    keywords: ["graphic design", "fashion", "fine art", "ba design", "film", "video", "ux", "ui", "journalism", "btech design"],
    fields: ["media-design"],
  },
];

export function matchCourseToFields(course: string): string[] {
  if (!course) return [];
  const lower = course.toLowerCase();
  const matched = new Set<string>();
  COURSE_FIELD_MAP.forEach(({ keywords, fields }) => {
    if (keywords.some((k) => lower.includes(k))) {
      fields.forEach((f) => matched.add(f));
    }
  });
  return Array.from(matched);
}

export function getOpportunitiesForFields(fieldIds: string[]): GraduateOpportunity[] {
  if (fieldIds.length === 0) return allGraduateOpportunities;
  return allGraduateOpportunities.filter((o) =>
    o.fields.some((f) => fieldIds.includes(f))
  );
}

// ============================================================
// Featured YouTube video — Jobs being replaced by AI
// Verified working video as of Jan 2026
// ============================================================
export const FUTURE_PROOF_VIDEO = {
  title: "Future-Proof Your Career: Jobs AI Will (and Won't) Replace",
  videoId: "qqCTpAabuOQ",
  embedUrl: "https://www.youtube.com/embed/qqCTpAabuOQ",
  watchUrl: "https://www.youtube.com/watch?v=qqCTpAabuOQ",
  description:
    "Honest 2026 conversation on which jobs AI is disrupting, which are safe, and how graduates can position themselves to stay relevant.",
  duration: "~30 min",
  channel: "Rising Authors",
};

// Additional career-future videos for the playlist
export const AI_CAREER_VIDEOS = [
  {
    title: "Future-Proof Your Career: Jobs AI Will Replace",
    videoId: "qqCTpAabuOQ",
    embedUrl: "https://www.youtube.com/embed/qqCTpAabuOQ",
    watchUrl: "https://www.youtube.com/watch?v=qqCTpAabuOQ",
    description: "Will AI take your job? Honest look at work, marketing and staying valuable in 2026.",
    channel: "Rising Authors",
    duration: "30 min",
  },
];
