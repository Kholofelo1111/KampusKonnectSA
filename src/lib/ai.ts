// ============================================================
// Rule-based AI engine for Kampus KonnectSA
// Analyses user intent + profile and returns rich, structured
// responses drawn from the SA opportunity dataset.
// ============================================================

import {
  universities,
  tvets,
  bursaries,
  jobs,
  internships,
  learnerships,
} from "./data";
import { getApplyLink } from "./apply-links";

export type Profile = {
  name?: string;
  aps?: number;
  province?: string;
  interests?: string[];
  matric?: boolean;
};

export type AiResponse = {
  text: string;
  sections: {
    heading: string;
    items: { title: string; meta?: string; link?: string }[];
  }[];
  followUps: string[];
};

const FIELD_KEYWORDS: Record<string, string[]> = {
  engineering: ["engineering", "engineer", "civil", "mechanical", "electrical", "mining"],
  medicine: ["medicine", "doctor", "medical", "health", "nurse", "pharmacy"],
  law: ["law", "legal", "attorney", "lawyer"],
  commerce: ["commerce", "accounting", "business", "finance", "banking", "actuarial"],
  it: ["it", "computer", "software", "programming", "data", "developer", "tech"],
  education: ["education", "teaching", "teacher", "bed"],
  science: ["science", "biology", "chemistry", "physics"],
};

function detectFields(query: string): string[] {
  const q = query.toLowerCase();
  const found: string[] = [];
  for (const [field, kws] of Object.entries(FIELD_KEYWORDS)) {
    if (kws.some((k) => q.includes(k))) found.push(field);
  }
  return found;
}

function detectIntent(query: string): {
  intent: string;
  location?: string;
} {
  const q = query.toLowerCase();
  if (/nsfas|eligib/i.test(q)) return { intent: "nsfas" };
  if (/cv|resume|curriculum/i.test(q)) return { intent: "cv" };
  if (/cover letter|motivation/i.test(q)) return { intent: "cover" };
  if (/bursary|funding|scholar/i.test(q)) return { intent: "bursary" };
  if (/intern/i.test(q)) return { intent: "internship" };
  if (/learnership/i.test(q)) return { intent: "learnership" };
  if (/tvet/i.test(q)) return { intent: "tvet" };
  if (/job|work|hiring|employment/i.test(q)) return { intent: "job" };
  if (/accommodation|res\b|housing/i.test(q)) return { intent: "accommodation" };
  if (/career|what should i study|path/i.test(q)) return { intent: "career" };
  if (/universit|study|course|degree|aps/i.test(q)) return { intent: "university" };

  // detect location
  const locMatch = q.match(/\b(pretoria|johannesburg|cape town|durban|bloemfontein|polokwane|mbombela|port elizabeth|east london|rustenburg| Kimberley|kimberley)\b/i);
  return { intent: "general", location: locMatch?.[1] };
}

function extractAps(query: string, profile?: Profile): number | null {
  const match = query.match(/aps\s*[:=]?\s*(\d{1,2})/i) || query.match(/(\d{2})\s*aps/i);
  if (match) return parseInt(match[1], 10);
  return profile?.aps ?? null;
}

function extractProvince(query: string, profile?: Profile): string | null {
  const provinces = [
    "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State",
    "Limpopo", "Mpumalanga", "North West", "Northern Cape",
  ];
  for (const p of provinces) {
    if (query.toLowerCase().includes(p.toLowerCase())) return p;
  }
  return profile?.province ?? null;
}

function filterByProvince<T extends { province?: string; location?: string }>(
  items: T[],
  province: string | null
): T[] {
  if (!province) return items;
  const filtered = items.filter((i) => {
    const loc = (i.province || i.location || "").toLowerCase();
    return loc.includes(province.toLowerCase()) || loc.includes("national");
  });
  return filtered.length ? filtered : items;
}

function matchUniversities(aps: number | null, fields: string[], province: string | null) {
  let list = universities.filter((u) => {
    if (!aps) return true;
    return aps >= u.apsRange[0];
  });
  if (fields.length) {
    list = list.filter((u) =>
      u.programs.some((p) => fields.some((f) => p.toLowerCase().includes(f)))
    );
  }
  if (province) list = filterByProvince(list as any, province) as any;
  return list.slice(0, 5);
}

function matchBursaries(fields: string[], province: string | null) {
  let list = bursaries;
  if (fields.length) {
    list = list.filter((b) => {
      const f = b.field.toLowerCase();
      return fields.some((fd) => f.includes(fd)) || f.includes("all");
    });
  }
  if (province) list = filterByProvince(list as any, province) as any;
  return list.slice(0, 5);
}

export function runAi(query: string, profile?: Profile): AiResponse {
  const { intent } = detectIntent(query);
  const aps = extractAps(query, profile);
  const province = extractProvince(query, profile);
  const fields = detectFields(query);

  switch (intent) {
    case "nsfas":
      return {
        text: aps !== null && aps <= 35
          ? `Based on your APS of ${aps}, you likely qualify for NSFAS if your combined household income is below R350 000 per year. Here's what you need to know:`
          : "NSFAS funds South African students from households earning under R350 000/year. Here's your checklist:",
        sections: [
          {
            heading: "📋 NSFAS Eligibility Checklist",
            items: [
              { title: "South African citizen or permanent resident" },
              { title: "Combined household income under R350 000/year" },
              { title: "First time entering university or TVET" },
              { title: "APS score meets minimum requirements (usually 20+)" },
              { title: "Pass at least 50% of modules each year to keep funding" },
            ],
          },
          {
            heading: "💰 What NSFAS Covers",
            items: [
              { title: "Full tuition & registration" },
              { title: "Accommodation (R45 000 cap)" },
              { title: "Transport allowance up to R7 500" },
              { title: "Living allowance R15 000/year" },
              { title: "Learning materials R5 200/year" },
            ],
          },
          {
            heading: "📅 Key Dates",
            items: [
              { title: "Applications open", meta: "1 September" },
              { title: "Closing date", meta: "31 January" },
              { title: "Appeals window", meta: "30 days after outcome" },
            ],
          },
        ],
        followUps: [
          "How do I apply for NSFAS online?",
          "What documents do I need for NSFAS?",
          "My NSFAS was rejected – can I appeal?",
        ],
      };

    case "bursary": {
      const matches = matchBursaries(fields, province);
      return {
        text: `I found ${matches.length} bursaries matching your profile. Apply early – most close by mid-year:`,
        sections: [
          {
            heading: "💼 Recommended Bursaries",
            items: matches.map((b) => ({
              title: b.name,
              meta: `${b.sponsor} • ${b.field} • Deadline: ${b.deadline}`,
              link: `/opportunities/bursaries/${b.id}`,
            })),
          },
        ],
        followUps: [
          "Show me engineering bursaries",
          "Which bursaries don't need an APS over 30?",
          "Any bursaries for female students?",
        ],
      };
    }

    case "university":
    case "career": {
      const unis = matchUniversities(aps, fields, province);
      const burs = matchBursaries(fields, province);
      return {
        text: aps
          ? `Great! With an APS of ${aps}${fields.length ? ` interested in ${fields.join(", ")}` : ""}${province ? ` in ${province}` : ""}, here are your options:`
          : "Tell me your APS score and field of interest for a more tailored plan. Meanwhile, here are top choices:",
        sections: [
          {
            heading: "🎓 Universities You Qualify For",
            items: unis.map((u) => ({
              title: u.name,
              meta: `${u.city} • APS ${u.apsRange[0]}+ • ${u.fees}`,
              link: `/opportunities/universities/${u.id}`,
            })),
          },
          {
            heading: "💰 Bursaries to Apply For",
            items: burs.slice(0, 3).map((b) => {
              const link = getApplyLink("bursaries", b.id);
              return {
                title: b.name,
                meta: `${b.sponsor} • Closes ${b.deadline}${link?.applyUrl ? " • Apply at " + new URL(link.applyUrl).hostname : ""}`,
                link: `/opportunities/bursaries/${b.id}`,
              };
            }),
          },
          {
            heading: "💡 Suggested Career Paths",
            items: fields.length
              ? [
                  { title: `${fields[0]} graduate → Junior role → Senior specialist` },
                  { title: `${fields[0]} + bursary → Bonded work experience` },
                  { title: `Learnership → NQF qualification → Permanent role` },
                ]
              : [{ title: "Tell me your interests and I'll map out a plan" }],
          },
        ],
        followUps: [
          "Show me engineering options",
          "Match me with bursaries",
          "What careers pay the most in SA?",
        ],
      };
    }

    case "job": {
      let list = jobs;
      if (!/matric/i.test(query)) {
        // If user mentions "without matric", show matricRequired:false
        if (/without matric|no matric|grade (9|10|11)/i.test(query)) {
          list = jobs.filter((j) => !j.matricRequired);
        }
      }
      if (province) list = filterByProvince(list, province);
      return {
        text: `Here are ${list.length} jobs near you right now:`,
        sections: [
          {
            heading: "💼 Open Jobs",
            items: list.slice(0, 6).map((j) => ({
              title: `${j.title} – ${j.company}`,
              meta: `${j.location} • ${j.salary} • Closes ${j.deadline}`,
              link: `/opportunities/jobs/${j.id}`,
            })),
          },
        ],
        followUps: [
          "Show me remote jobs",
          "Any jobs without matric?",
          "Graduate opportunities in IT",
        ],
      };
    }

    case "internship": {
      let list = internships;
      if (province) list = filterByProvince(list, province);
      return {
        text: `${list.length} internships are currently open:` ,
        sections: [
          {
            heading: "🧑‍💼 Available Internships",
            items: list.map((i) => ({
              title: `${i.title} – ${i.organization}`,
              meta: `${i.location} • ${i.stipend} • ${i.duration}`,
              link: `/internships?id=${i.id}`,
            })),
          },
        ],
        followUps: [
          "Show me government internships",
          "IT internships in Gauteng",
          "Legal internships",
        ],
      };
    }

    case "learnership": {
      let list = learnerships;
      if (fields.length) {
        list = list.filter((l) =>
          fields.some((f) => l.sector.toLowerCase().includes(f))
        );
      }
      if (province) list = filterByProvince(list, province);
      return {
        text: `${list.length} learnerships are open – earn while you learn with a stipend:`,
        sections: [
          {
            heading: "🛠️ Open Learnerships",
            items: list.map((l) => ({
              title: `${l.title} – ${l.provider}`,
              meta: `${l.level} • ${l.stipend} • ${l.location}`,
              link: `/learnerships?id=${l.id}`,
            })),
          },
        ],
        followUps: [
          "Show me IT learnerships",
          "Learnerships without matric",
          "SETA learnerships near me",
        ],
      };
    }

    case "tvet": {
      let list = tvets;
      if (province) list = filterByProvince(list, province);
      return {
        text: `Here are ${list.length} TVET colleges – practical, affordable, and employer-aligned:`,
        sections: [
          {
            heading: "🏫 TVET Colleges",
            items: list.slice(0, 8).map((t) => ({
              title: t.name,
              meta: `${t.province} • Campuses: ${t.campuses.slice(0, 2).join(", ")}`,
              link: `/tvets`,
            })),
          },
        ],
        followUps: [
          "TVET courses in engineering",
          "TVET colleges in Gauteng",
          "How to apply to a TVET",
        ],
      };
    }

    case "cv":
      return {
        text: "I'll help you build a professional, ATS-optimised CV. Here's a winning structure:",
        sections: [
          {
            heading: "📝 Perfect CV Structure",
            items: [
              { title: "1. Personal details (name, phone, email, location)" },
              { title: "2. Professional summary (3–4 lines)" },
              { title: "3. Key skills (bullet list, 6–10)" },
              { title: "4. Education (most recent first)" },
              { title: "5. Work experience (reverse chronological)" },
              { title: "6. Certifications & achievements" },
              { title: "7. References (available on request)" },
            ],
          },
        ],
        followUps: [
          "Generate a CV for a retail job",
          "Build a graduate developer CV",
          "How do I make my CV ATS-friendly?",
        ],
      };

    case "cover":
      return {
        text: "Here's a template you can customise for any application:",
        sections: [
          {
            heading: "✉️ Cover Letter Template",
            items: [
              { title: "[Your Name] • [Phone] • [Email]" },
              { title: "[Date]" },
              { title: "[Hiring Manager] • [Company] • [Address]" },
              { title: "Dear [Name/Hiring Team]," },
              { title: "Para 1 – Which role, where you found it, quick hook" },
              { title: "Para 2 – 2–3 achievements that match the job spec" },
              { title: "Para 3 – Why this company specifically" },
              { title: "Para 4 – Call to action + thank you" },
              { title: "Yours faithfully, [Name]" },
            ],
          },
        ],
        followUps: [
          "Write a cover letter for a cashier role",
          "Generate a motivation letter for NSFAS",
          "Internship cover letter for IT",
        ],
      };

    case "accommodation":
      return {
        text: "I can help you find student accommodation. Here's what to look for:",
        sections: [
          {
            heading: "🏠 Accommodation Search Tips",
            items: [
              { title: "University-accredited res (safest, NSFAS-eligible)" },
              { title: "Private student housing (R4 000 – R9 000/month)" },
              { title: "Shared apartments (R2 500 – R5 000/month)" },
              { title: "Always verify the landlord & lease agreement" },
              { title: "Check distance to campus + public transport" },
            ],
          },
        ],
        followUps: [
          "Accommodation near UP",
          "Cheap student housing in Cape Town",
          "NSFAS-funded residences",
        ],
      };

    default:
      return {
        text: `Hi${profile?.name ? ` ${profile.name}` : ""}! I'm your Kampus KonnectSA AI guide. I can help you with:`,
        sections: [
          {
            heading: "🎯 What I can do",
            items: [
              { title: "🎓 Recommend universities & courses based on your APS" },
              { title: "💰 Match you with bursaries, NSFAS, scholarships" },
              { title: "💼 Find jobs, internships, learnerships" },
              { title: "📝 Build your CV & cover letters" },
              { title: "🏫 Suggest TVET colleges & courses" },
              { title: "🧭 Plan your career path step-by-step" },
            ],
          },
        ],
        followUps: [
          "I got APS 28 and want to study engineering",
          "I need a bursary for commerce",
          "Show me jobs in Pretoria without matric",
          "Check my NSFAS eligibility",
        ],
      };
  }
}
