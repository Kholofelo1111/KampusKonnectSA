export type CvData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: string;
  experience: string;
  skills: string;
  references: string;
  idNumber?: string; // For Z83
};

export type TemplateKey =
  | "modern-corporate"
  | "simple-student"
  | "creative"
  | "z83-government"
  | "skills-based";

export type TemplateMeta = {
  key: TemplateKey;
  name: string;
  tagline: string;
  premium: boolean;
  gradient: string;
};

export const TEMPLATE_LIST: TemplateMeta[] = [
  {
    key: "modern-corporate",
    name: "Modern Corporate",
    tagline: "2-column with sidebar, ATS-friendly",
    premium: false,
    gradient: "from-kk-blue to-kk-accent",
  },
  {
    key: "simple-student",
    name: "Simple Student",
    tagline: "Clean single-column for graduates",
    premium: false,
    gradient: "from-kk-green to-emerald-500",
  },
  {
    key: "creative",
    name: "Creative",
    tagline: "Bold, design-focused layout",
    premium: false,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    key: "z83-government",
    name: "Z83 Government",
    tagline: "Official SA Z83-style format",
    premium: false,
    gradient: "from-kk-navy to-slate-700",
  },
  {
    key: "skills-based",
    name: "Skills-Based",
    tagline: "Skills-first for career changers",
    premium: true,
    gradient: "from-amber-500 to-orange-600",
  },
];
