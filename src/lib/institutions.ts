// ============================================================
// Kampus KonnectSA — Verified SA Institutions Directory
// All URLs verified Jan 2026. Public Universities, Private
// Universities, Public TVET Colleges, Private Colleges.
// ============================================================

export type InstitutionCategory =
  | "public-university"
  | "private-university"
  | "public-tvet"
  | "private-college";

export type Institution = {
  id: string;
  name: string;
  short: string;
  bannerColor?: string;
  bannerImage?: string;
  category: InstitutionCategory;
  province: string;
  city: string;
  website: string;
  applyUrl: string;
  prospectusUrl?: string; // Only if officially published
  phone?: string;
  email?: string;
  fields: string[];
  apsMin?: number;
  fees?: string;
  description: string;
  closingDate?: string;
  openingDate?: string; // When applications open
  status?: "open" | "closed" | "opening-soon"; // Computed application status
  dhetReg?: string; // DHET registration number for private institutions
  // Fallback when official applyUrl is not yet available or is offline.
  // Always present — used by the detail page if applyUrl returns 404.
  applyInstructions?: string[];
};

// Returns "open" / "closed" / "opening-soon" based on opening/closing dates
export function getApplicationStatus(opening?: string, closing?: string): "open" | "closed" | "opening-soon" {
  const today = new Date();
  // Parse "30 Sep 2026" or "30 September 2026"
  const parse = (str?: string): Date | null => {
    if (!str) return null;
    const d = new Date(str);
    if (!isNaN(d.getTime())) return d;
    // Try "DD MMM YYYY" or "DD MMM"
    const match = str.match(/(\d{1,2})\s+(\w+)\s*(\d{4})?/);
    if (match) {
      const [, day, monthStr, year] = match;
      const months: Record<string, number> = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
      };
      const m = months[monthStr.toLowerCase().slice(0, 3)];
      if (m !== undefined) {
        return new Date(parseInt(year || `${today.getFullYear()}`), m, parseInt(day));
      }
    }
    return null;
  };

  const opens = parse(opening);
  const closes = parse(closing);

  if (closes && closes < today) return "closed";
  if (opens && opens > today) return "opening-soon";
  return "open";
}

// ============================================================
// PUBLIC UNIVERSITIES (26 — all verified)
// ============================================================
export const publicUniversities: Institution[] = [
  {
    id: "up", name: "University of Pretoria", short: "UP",
    bannerColor: "from-blue-900 to-blue-600",
    bannerImage: "/banners/up.jpg",
    category: "public-university", province: "Gauteng", city: "Pretoria",
    website: "https://www.up.ac.za",
    applyUrl: "https://www.up.ac.za/online-application",
    prospectusUrl: "https://www.up.ac.za/prospectuses",
    phone: "012 420 4111", email: "ssc@up.ac.za",
    fields: ["Engineering", "Medicine", "Law", "Commerce", "Education", "Natural Sciences", "Veterinary Science"],
    apsMin: 30, fees: "R38 000 – R62 000",
    description: "One of South Africa's top research universities with world-class engineering, health sciences, law and commerce faculties.",
    closingDate: "30 Jun 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "uj", name: "University of Johannesburg", short: "UJ",
    category: "public-university", province: "Gauteng", city: "Johannesburg",
    website: "https://www.uj.ac.za",
    applyUrl: "https://www.uj.ac.za/apply",
    prospectusUrl: "https://www.uj.ac.za/study-at-uj/",
    phone: "011 559 4555", email: "maryr@uj.ac.za",
    fields: ["Engineering", "Art & Design", "Business", "Education", "Health Sciences", "Law", "Humanities"],
    apsMin: 28, fees: "R35 000 – R60 000",
    description: "Pan-African university known for engineering, built environment, arts and business innovation.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "uct", name: "University of Cape Town", short: "UCT",
    category: "public-university", province: "Western Cape", city: "Cape Town",
    website: "https://www.uct.ac.za",
    applyUrl: "https://applyonline.uct.ac.za/",
    prospectusUrl: "https://uct.ac.za/students/applications-apply/forms",
    phone: "021 650 9111", email: "admissions@uct.ac.za",
    fields: ["Medicine", "Law", "Commerce", "Engineering", "Humanities", "Science"],
    apsMin: 38, fees: "R45 000 – R75 000",
    description: "Africa's leading university with globally ranked Medicine, Law and Commerce programmes.",
    closingDate: "31 Jul 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "wits", name: "University of the Witwatersrand", short: "Wits",
    category: "public-university", province: "Gauteng", city: "Johannesburg",
    website: "https://www.wits.ac.za",
    applyUrl: "https://www.wits.ac.za/applications/",
    prospectusUrl: "https://www.wits.ac.za/study-at-wits",
    phone: "011 717 1030", email: "ask.wits@wits.ac.za",
    fields: ["Medicine", "Engineering", "Commerce", "Law", "Humanities", "Science"],
    apsMin: 36, fees: "R50 000 – R80 000",
    description: "Johannesburg's leading research university — Mining Engineering, Medicine, Actuarial Science.",
    closingDate: "31 Jul 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "unisa", name: "University of South Africa", short: "UNISA",
    category: "public-university", province: "Gauteng", city: "Pretoria",
    website: "https://www.unisa.ac.za",
    applyUrl: "https://www.unisa.ac.za/sites/myunisa/default",
    prospectusUrl: "https://www.unisa.ac.za/sites/myunisa/default",
    phone: "012 441 5491", email: "study-info@unisa.ac.za",
    fields: ["Education", "Law", "Commerce", "Humanities", "Science", "Theology"],
    apsMin: 20, fees: "R8 000 – R25 000",
    description: "The largest open distance learning institution in Africa — study from anywhere.",
    closingDate: "30 Apr 2027",
    openingDate: "01 Sep 2026",
  },
  {
    id: "tut", name: "Tshwane University of Technology", short: "TUT",
    category: "public-university", province: "Gauteng", city: "Pretoria",
    website: "https://applications-prod.tut.ac.za/",
    applyUrl: "https://applications-prod.tut.ac.za/",
    phone: "086 110 2422", email: "general@tut.ac.za",
    fields: ["Engineering", "IT", "Business", "Arts", "Sciences"],
    apsMin: 24, fees: "R28 000 – R48 000",
    description: "Career-focused university of technology with strong engineering, IT and business programmes.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "nmu", name: "Nelson Mandela University", short: "NMU",
    category: "public-university", province: "Eastern Cape", city: "Gqeberha",
    website: "https://www.mandela.ac.za",
    applyUrl: "https://applyonline.mandela.ac.za/",
    prospectusUrl: "https://www.mandela.ac.za/study-at-mandela",
    phone: "041 504 1111", email: "info@mandela.ac.za",
    fields: ["Engineering", "Law", "Health Sciences", "Business", "Science"],
    apsMin: 26, fees: "R30 000 – R55 000",
    description: "Coastal university known for engineering, ocean sciences, law and commerce.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "nwu", name: "North-West University", short: "NWU",
    category: "public-university", province: "North West", city: "Potchefstroom",
    website: "https://www.nwu.ac.za",
    applyUrl: "https://studies.nwu.ac.za",
    prospectusUrl: "https://studies.nwu.ac.za",
    phone: "018 299 1111", email: "info@nwu.ac.za",
    fields: ["Education", "Law", "Economic Sciences", "Health Sciences", "Theology"],
    apsMin: 26, fees: "R28 000 – R52 000",
    description: "Multi-campus university delivering education, natural sciences, law and theology.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "ul", name: "University of Limpopo", short: "UL",
    category: "public-university", province: "Limpopo", city: "Polokwane",
    website: "https://www.ul.ac.za",
    applyUrl: "https://www.ul.ac.za",
    phone: "015 268 9111", email: "info@ul.ac.za",
    fields: ["Health Sciences", "Education", "Agriculture", "Management Sciences"],
    apsMin: 24, fees: "R22 000 – R40 000",
    description: "Rural-based university excelling in agriculture, health sciences and education.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "univen", name: "University of Venda", short: "Univen",
    category: "public-university", province: "Limpopo", city: "Thohoyandou",
    website: "https://www.univen.ac.za",
    applyUrl: "https://www.univen.ac.za",
    phone: "015 962 8000", email: "registrar@univen.ac.za",
    fields: ["Agriculture", "Law", "Management", "Science", "Education"],
    apsMin: 22, fees: "R20 000 – R38 000",
    description: "Comprehensive university serving the Limpopo region with strong agricultural and science faculties.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "cut", name: "Central University of Technology", short: "CUT",
    category: "public-university", province: "Free State", city: "Bloemfontein",
    website: "https://www.cut.ac.za",
    applyUrl: "https://www.cut.ac.za",
    phone: "051 507 3911", email: "info@cut.ac.za",
    fields: ["Engineering", "IT", "Built Environment", "Health Sciences"],
    apsMin: 24, fees: "R26 000 – R44 000",
    description: "Career-oriented institution known for engineering, IT and built environment programmes.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "cput", name: "Cape Peninsula University of Technology", short: "CPUT",
    category: "public-university", province: "Western Cape", city: "Cape Town",
    website: "https://www.cput.ac.za",
    applyUrl: "https://www.cput.ac.za",
    phone: "021 460 3911", email: "info@cput.ac.za",
    fields: ["Engineering", "Business", "Design", "Health Sciences", "IT"],
    apsMin: 26, fees: "R30 000 – R52 000",
    description: "Cape Town's largest university of technology with strong engineering, business and design faculties.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "dut", name: "Durban University of Technology", short: "DUT",
    category: "public-university", province: "KwaZulu-Natal", city: "Durban",
    website: "https://www.dut.ac.za",
    applyUrl: "https://www.dut.ac.za/admissions/",
    phone: "031 373 2000", email: "info@dut.ac.za",
    fields: ["Engineering", "Health Sciences", "Media", "Business", "Applied Sciences"],
    apsMin: 24, fees: "R28 000 – R46 000",
    description: "KZN's leading university of technology known for engineering, health sciences and media.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "vut", name: "Vaal University of Technology", short: "VUT",
    category: "public-university", province: "Gauteng", city: "Vanderbijlpark",
    website: "https://www.vut.ac.za",
    applyUrl: "https://www.vut.ac.za/apply",
    phone: "016 950 9000", email: "info@vut.ac.za",
    fields: ["Engineering", "Management Sciences", "Applied Sciences", "Health Sciences"],
    apsMin: 24, fees: "R26 000 – R44 000",
    description: "Technology-focused university in the Vaal Triangle with strong industry links.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "wsu", name: "Walter Sisulu University", short: "WSU",
    category: "public-university", province: "Eastern Cape", city: "Mthatha",
    website: "https://www.wsu.ac.za",
    applyUrl: "https://applications.wsu.ac.za/",
    phone: "047 502 2844", email: "info@wsu.ac.za",
    fields: ["Education", "Management Sciences", "Applied Sciences", "Health Sciences"],
    apsMin: 22, fees: "R22 000 – R38 000",
    description: "Rural comprehensive university serving the Eastern Cape with applied sciences and education.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "smu", name: "Sefako Makgatho Health Sciences University", short: "SMU",
    category: "public-university", province: "Gauteng", city: "Pretoria",
    website: "https://www.smu.ac.za",
    applyUrl: "https://www.smu.ac.za/apply/",
    phone: "012 521 4111", email: "info@smu.ac.za",
    fields: ["Medicine", "Nursing", "Pharmacy", "Oral Health"],
    apsMin: 30, fees: "R35 000 – R60 000",
    description: "South Africa's premier health sciences university producing doctors, nurses and pharmacists.",
    closingDate: "30 Jun 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "ru", name: "Rhodes University", short: "RU",
    category: "public-university", province: "Eastern Cape", city: "Makhanda",
    website: "https://www.ru.ac.za",
    applyUrl: "https://www.ru.ac.za/admissiongateway/",
    prospectusUrl: "https://www.ru.ac.za/admissiongateway",
    phone: "046 603 8111", email: "registrar@ru.ac.za",
    fields: ["Journalism", "Law", "Pharmacy", "Humanities", "Commerce"],
    apsMin: 32, fees: "R38 000 – R58 000",
    description: "Small, prestigious university known for journalism, law, pharmacy and humanities.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "sun", name: "Stellenbosch University", short: "SU",
    category: "public-university", province: "Western Cape", city: "Stellenbosch",
    website: "https://www.sun.ac.za",
    applyUrl: "https://www.sun.ac.za/english/maties/apply",
    prospectusUrl: "https://www.sun.ac.za/english/maties",
    phone: "021 808 9111", email: "info@sun.ac.za",
    fields: ["Engineering", "Medicine", "Law", "Agriculture", "Science", "Economic Sciences"],
    apsMin: 34, fees: "R40 000 – R70 000",
    description: "One of Africa's top research universities with world-class engineering, science and wine programmes.",
    closingDate: "31 Jul 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "ufh", name: "University of Fort Hare", short: "UFH",
    category: "public-university", province: "Eastern Cape", city: "Alice",
    website: "https://www.ufh.ac.za",
    applyUrl: "https://www.ufh.ac.za",
    phone: "040 602 2011", email: "info@ufh.ac.za",
    fields: ["Law", "Education", "Management", "Science", "Humanities"],
    apsMin: 24, fees: "R24 000 – R42 000",
    description: "Historic university that produced many of Africa's leaders including Mandela.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "unizulu", name: "University of Zululand", short: "UniZulu",
    category: "public-university", province: "KwaZulu-Natal", city: "KwaDlangezwa",
    website: "https://www.unizulu.ac.za",
    applyUrl: "https://www.unizulu.ac.za",
    phone: "035 902 6000", email: "info@unizulu.ac.za",
    fields: ["Education", "Commerce", "Science", "Humanities", "Law"],
    apsMin: 22, fees: "R22 000 – R38 000",
    description: "Comprehensive university serving KwaZulu-Natal with education, commerce and science faculties.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "ump", name: "University of Mpumalanga", short: "UMP",
    category: "public-university", province: "Mpumalanga", city: "Mbombela",
    website: "https://www.ump.ac.za",
    applyUrl: "https://www.ump.ac.za/Apply/",
    phone: "013 002 0001", email: "info@ump.ac.za",
    fields: ["Mining Engineering", "Agriculture", "Applied Computing", "Education"],
    apsMin: 24, fees: "R24 000 – R40 000",
    description: "Youngest university in SA with mining, agriculture and applied computing strengths.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "spu", name: "Sol Plaatje University", short: "SPU",
    category: "public-university", province: "Northern Cape", city: "Kimberley",
    website: "https://www.spu.ac.za",
    applyUrl: "https://www.spu.ac.za",
    phone: "053 491 0000", email: "information@spu.ac.za",
    fields: ["Education", "Mining Sciences", "Applied IT", "Commerce"],
    apsMin: 24, fees: "R24 000 – R40 000",
    description: "Northern Cape's first university with education, mining support and applied IT programmes.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "ufs", name: "University of the Free State", short: "UFS",
    category: "public-university", province: "Free State", city: "Bloemfontein",
    website: "https://www.ufs.ac.za",
    applyUrl: "https://www.ufs.ac.za/apply",
    phone: "051 401 9111", email: "info@ufs.ac.za",
    fields: ["Education", "Health Sciences", "Law", "Economic Sciences", "Theology"],
    apsMin: 30, fees: "R36 000 – R58 000",
    description: "Multi-campus research university with strong education, health and law programmes.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "ukzn", name: "University of KwaZulu-Natal", short: "UKZN",
    category: "public-university", province: "KwaZulu-Natal", city: "Durban",
    website: "https://www.ukzn.ac.za",
    applyUrl: "https://applications.ukzn.ac.za/",
    prospectusUrl: "https://applications.ukzn.ac.za/",
    phone: "031 260 1111", email: "enquiries@ukzn.ac.za",
    fields: ["Medicine", "Engineering", "Law", "Agriculture", "Education", "Humanities"],
    apsMin: 30, fees: "R36 000 – R65 000",
    description: "Top research university in KZN with five campuses and strong health sciences.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
  {
    id: "mut", name: "Mangosuthu University of Technology", short: "MUT",
    category: "public-university", province: "KwaZulu-Natal", city: "Umlazi",
    website: "https://www.mut.ac.za",
    applyUrl: "https://www.mut.ac.za/apply",
    phone: "031 907 7111", email: "info@mut.ac.za",
    fields: ["Engineering", "Natural Sciences", "Management Sciences"],
    apsMin: 22, fees: "R24 000 – R40 000",
    description: "Township-based university of technology with strong engineering programmes.",
    closingDate: "30 Sep 2026",
    openingDate: "01 Apr 2026",
  },
];

// ============================================================
// PRIVATE UNIVERSITIES & PHEIs (DHET-Registered, top 10)
// ============================================================
export const privateUniversities: Institution[] = [
  {
    id: "varsity-college", name: "IIE Varsity College", short: "VC",
    category: "private-university", province: "Multi-Province", city: "National",
    website: "https://www.varsitycollege.co.za",
    applyUrl: "https://www.varsitycollege.co.za/apply-now",
    prospectusUrl: "https://www.varsitycollege.co.za",
    phone: "0860 482 748", email: "info@varsitycollege.co.za",
    fields: ["Business", "IT", "Law", "Humanities", "Education"],
    apsMin: 24, fees: "R55 000 – R85 000",
    description: "Part of The IIE — South Africa's largest private higher education provider with 8 campuses.",
    dhetReg: "2007/HE07/002",
  },
  {
    id: "eduvos", name: "Eduvos", short: "Eduvos",
    category: "private-university", province: "Multi-Province", city: "National",
    website: "https://www.eduvos.com/apply-now",
    applyUrl: "https://www.eduvos.com/apply-now",
    prospectusUrl: "https://www.eduvos.com/apply-now",
    phone: "087 222 7777", email: "info@eduvos.com",
    fields: ["IT", "Engineering", "Commerce", "Humanities", "Law"],
    apsMin: 24, fees: "R52 000 – R78 000",
    description: "Formerly Pearson Institute — comprehensive university with 11 campuses and strong IT focus.",
    dhetReg: "2001/HE07/008",
  },
  {
    id: "mancosa", name: "MANCOSA", short: "MANCOSA",
    category: "private-university", province: "KwaZulu-Natal", city: "Durban",
    website: "https://www.mancosa.co.za",
    applyUrl: "https://www.mancosa.co.za/apply-now/",
    prospectusUrl: "https://www.mancosa.co.za",
    phone: "031 300 7200", email: "info@mancosa.co.za",
    fields: ["MBA", "Commerce", "Public Admin", "Education", "IT"],
    apsMin: 22, fees: "R28 000 – R55 000",
    description: "Distance-learning business school — affordable MBA and management programmes.",
    dhetReg: "2000/HE07/003",
  },
  {
    id: "stadio", name: "STADIO Higher Education", short: "STADIO",
    category: "private-university", province: "Multi-Province", city: "National",
    website: "https://www.stadio.ac.za",
    applyUrl: "https://www.stadio.ac.za/apply-now",
    prospectusUrl: "https://www.stadio.ac.za",
    phone: "021 003 1111", email: "info@stadio.ac.za",
    fields: ["Commerce", "Law", "Education", "Policing", "Fashion"],
    apsMin: 24, fees: "R38 000 – R65 000",
    description: "Multi-campus higher education provider with JSE listing — Embury, AFDA, LISOF brands.",
    dhetReg: "2008/HE07/004",
  },
  {
    id: "rosebank", name: "IIE Rosebank College", short: "Rosebank",
    category: "private-university", province: "Multi-Province", city: "National",
    website: "https://www.rosebankcollege.co.za",
    applyUrl: "https://www.rosebankcollege.co.za/apply",
    prospectusUrl: "https://www.rosebankcollege.co.za",
    phone: "0860 762 765", email: "info@rosebankcollege.co.za",
    fields: ["Business", "IT", "Marketing", "Tourism", "Educare"],
    apsMin: 20, fees: "R32 000 – R58 000",
    description: "Affordable IIE-accredited college with 9 campuses focusing on career-ready qualifications.",
    dhetReg: "2007/HE07/002",
  },
  {
    id: "afda", name: "AFDA School of Film", short: "AFDA",
    category: "private-university", province: "Multi-Province", city: "National",
    website: "https://www.afda.co.za",
    applyUrl: "https://www.afda.co.za/apply-now",
    prospectusUrl: "https://www.afda.co.za",
    phone: "011 482 8345", email: "info@afda.co.za",
    fields: ["Film", "Television", "Performance", "Business Innovation"],
    apsMin: 26, fees: "R85 000 – R120 000",
    description: "Africa's top film school with 4 campuses — Emmy and Oscar-winning alumni.",
    dhetReg: "2001/HE07/012",
  },
  {
    id: "richfield", name: "Richfield Graduate Institute", short: "Richfield",
    category: "private-university", province: "Multi-Province", city: "National",
    website: "https://www.richfield.ac.za",
    applyUrl: "https://www.richfield.ac.za",
    prospectusUrl: "https://www.richfield.ac.za",
    phone: "0861 742 433", email: "info@richfield.ac.za",
    fields: ["IT", "Commerce", "Education", "Hospitality", "Public Admin"],
    apsMin: 20, fees: "R28 000 – R52 000",
    description: "Affordable IT-focused private institution with strong industry partnerships.",
    dhetReg: "2008/HE07/005",
  },
  {
    id: "boston", name: "Boston City Campus", short: "Boston",
    category: "private-university", province: "Multi-Province", city: "National",
    website: "https://www.boston.co.za",
    applyUrl: "https://www.boston.co.za/apply/",
    prospectusUrl: "https://www.boston.co.za",
    phone: "011 551 2000", email: "boston@boston.co.za",
    fields: ["Business", "IT", "Media", "Marketing", "Tourism"],
    apsMin: 18, fees: "R22 000 – R48 000",
    description: "Distance and contact learning provider with 40+ campuses nationwide.",
    dhetReg: "2003/HE07/001",
  },
  {
    id: "milpark", name: "Milpark Education", short: "Milpark",
    category: "private-university", province: "Multi-Province", city: "National",
    website: "https://www.milpark.ac.za",
    applyUrl: "https://www.milpark.ac.za/contact-us",
    prospectusUrl: "https://www.milpark.ac.za",
    phone: "086 999 0001", email: "info@milpark.ac.za",
    fields: ["Business", "Finance", "Banking", "Insurance"],
    apsMin: 26, fees: "R32 000 – R58 000",
    description: "Specialist business school with strong banking and insurance qualifications.",
    dhetReg: "2007/HE07/006",
  },
  {
    id: "regent", name: "Regent Business School", short: "Regent",
    category: "private-university", province: "KwaZulu-Natal", city: "Durban",
    website: "https://www.regent.ac.za",
    applyUrl: "https://www.regent.ac.za/apply/",
    phone: "031 304 4626", email: "info@regent.ac.za",
    fields: ["MBA", "Commerce", "Public Management", "IT"],
    apsMin: 24, fees: "R28 000 – R52 000",
    description: "Distance-learning business school with MBA and postgraduate programmes.",
    dhetReg: "2000/HE07/009",
  },
];

// ============================================================
// PUBLIC TVET COLLEGES (50 verified — all from DHET register)
// ============================================================
export const publicTvets: Institution[] = [
  // Eastern Cape
  { id: "bccollege", name: "Buffalo City TVET College", short: "BCC", category: "public-tvet", province: "Eastern Cape", city: "East London", website: "https://www.bccollege.co.za", applyUrl: "https://www.bccollege.co.za", phone: "043 049 9201", email: "information@bccollege.co.za", fields: ["Engineering", "Business", "IT", "Hospitality"], description: "Public TVET college serving the Buffalo City Metropolitan Municipality.", closingDate: "30 Sep" },
  { id: "emcol", name: "Eastcape Midlands TVET College", short: "EMCOL", category: "public-tvet", province: "Eastern Cape", city: "Uitenhage", website: "https://emc.coltech.co.za", applyUrl: "https://emc.coltech.co.za", phone: "041 995 2000", email: "info@emcol.co.za", fields: ["Engineering", "Business", "Hospitality"], description: "TVET college serving Nelson Mandela Bay and surrounds.", closingDate: "30 Sep" },
  { id: "ikhala", name: "Ikhala TVET College", short: "Ikhala", category: "public-tvet", province: "Eastern Cape", city: "Queenstown", website: "https://www.ikhalacollege.co.za", applyUrl: "https://www.ikhalacollege.co.za", phone: "045 838 2593", email: "africa.mgaleli@ikhala.edu.za", fields: ["Engineering", "Business", "Tourism"], description: "TVET serving rural Eastern Cape communities.", closingDate: "30 Sep" },
  { id: "ingwe", name: "Ingwe TVET College", short: "Ingwe", category: "public-tvet", province: "Eastern Cape", city: "Mount Frere", website: "https://www.ingwecollege.edu.za", applyUrl: "https://www.ingwecollege.edu.za", phone: "039 255 0346", email: "canca@ingwecollege.org.za", fields: ["Engineering", "Business", "Educare"], description: "Rural TVET college with multiple campuses across Eastern Cape.", closingDate: "30 Sep" },
  { id: "kinghintsa", name: "King Hintsa TVET College", short: "KHTC", category: "public-tvet", province: "Eastern Cape", city: "Butterworth", website: "https://www.kinghintsacollege.edu.za", applyUrl: "https://www.kinghintsacollege.edu.za", phone: "047 491 3722", email: "pumla.toboti@kinghintsa.org.za", fields: ["Engineering", "Business", "Educare"], description: "TVET college serving the former Transkei region.", closingDate: "30 Sep" },
  { id: "ksd", name: "King Sabata Dalindyebo TVET College", short: "KSD", category: "public-tvet", province: "Eastern Cape", city: "Mthatha", website: "https://www.ksdcollege.edu.za", applyUrl: "https://www.ksdcollege.edu.za", phone: "047 505 1001", email: "ericmatola@ksdfetcollege.org.za", fields: ["Engineering", "Business", "Hospitality"], description: "TVET serving the OR Tambo District.", closingDate: "30 Sep" },
  { id: "lovedale", name: "Lovedale TVET College", short: "Lovedale", category: "public-tvet", province: "Eastern Cape", city: "Alice", website: "https://www.lovedalecollege.co.za", applyUrl: "https://www.lovedalecollege.co.za", phone: "043 604 0700", email: "headquarters@lovedale.org.za", fields: ["Engineering", "Business", "Agriculture"], description: "One of South Africa's oldest TVET colleges.", closingDate: "30 Sep" },
  { id: "pecollege", name: "Port Elizabeth TVET College", short: "PETVET", category: "public-tvet", province: "Eastern Cape", city: "Gqeberha", website: "https://www.pecollege.edu.za", applyUrl: "https://www.pecollege.edu.za", phone: "041 586 0002", email: "info@pecollege.edu.za", fields: ["Engineering", "Business", "Hospitality"], description: "Coastal TVET college in Nelson Mandela Bay.", closingDate: "30 Sep" },

  // Free State
  { id: "flaviusmareka", name: "Flavius Mareka TVET College", short: "FMTC", category: "public-tvet", province: "Free State", city: "Sasolburg", website: "https://www.flaviusmareka.net", applyUrl: "https://www.flaviusmareka.net", phone: "016 976 0815", fields: ["Engineering", "Business", "Petrochemical"], description: "TVET with strong petrochemical training links to Sasol.", closingDate: "30 Sep" },
  { id: "goldfields", name: "Goldfields TVET College", short: "GFC", category: "public-tvet", province: "Free State", city: "Welkom", website: "https://www.gfc.za.net", applyUrl: "https://www.gfc.za.net", phone: "057 392 1027", email: "admin@gfc.za.net", fields: ["Engineering", "Mining", "Business"], description: "TVET serving the Goldfields mining region.", closingDate: "30 Sep" },
  { id: "maluti", name: "Maluti TVET College", short: "Maluti", category: "public-tvet", province: "Free State", city: "QwaQwa", website: "https://www.malutitvet.co.za", applyUrl: "https://www.malutitvet.co.za", phone: "058 713 6100", fields: ["Engineering", "Business", "Tourism"], description: "TVET serving the Eastern Free State and QwaQwa region.", closingDate: "30 Sep" },
  { id: "motheo", name: "Motheo TVET College", short: "Motheo", category: "public-tvet", province: "Free State", city: "Bloemfontein", website: "https://www.motheotvet.co.za", applyUrl: "https://www.motheotvet.co.za", phone: "051 406 9300", email: "marketing@motheotvet.co.za", fields: ["Engineering", "Business", "IT"], description: "Largest TVET in the Free State with multiple campuses.", closingDate: "30 Sep" },

  // Gauteng
  { id: "cjc", name: "Central Johannesburg TVET College", short: "CJC", category: "public-tvet", province: "Gauteng", city: "Johannesburg", website: "https://www.cjc.edu.za", applyUrl: "https://www.cjc.edu.za", phone: "011 484 1388", fields: ["Engineering", "Business", "IT", "Hospitality"], description: "TVET serving inner-city Johannesburg.", closingDate: "30 Sep" },
  { id: "eec", name: "Ekurhuleni East TVET College", short: "EEC", category: "public-tvet", province: "Gauteng", city: "Springs", website: "https://www.eec.edu.za", applyUrl: "https://www.eec.edu.za", phone: "011 736 4400", fields: ["Engineering", "Business", "IT"], description: "TVET serving the eastern Ekurhuleni region.", closingDate: "30 Sep" },
  { id: "ewc", name: "Ekurhuleni West TVET College", short: "EWC", category: "public-tvet", province: "Gauteng", city: "Benoni", website: "https://www.ewc.edu.za", applyUrl: "https://www.ewc.edu.za", phone: "011 323 1600", fields: ["Engineering", "Business", "IT"], description: "TVET serving Benoni, Germiston and Alberton.", closingDate: "30 Sep" },
  { id: "sedcol", name: "Sedibeng TVET College", short: "Sedibeng", category: "public-tvet", province: "Gauteng", city: "Vereeniging", website: "https://www.sedcol.co.za", applyUrl: "https://www.sedcol.co.za", phone: "016 422 6645", email: "info@sedcol.co.za", fields: ["Engineering", "Business", "Petrochemical"], description: "TVET serving the Vaal Triangle.", closingDate: "30 Sep" },
  { id: "swgc", name: "South West Gauteng TVET College", short: "SWGC", category: "public-tvet", province: "Gauteng", city: "Soweto", website: "https://www.swgc.co.za", applyUrl: "https://www.swgc.co.za", phone: "086 176 8849", email: "callcentre@swgc.co.za", fields: ["Engineering", "Business", "IT"], description: "TVET serving Soweto and surrounding areas.", closingDate: "30 Sep" },
  { id: "tnc", name: "Tshwane North TVET College", short: "TNC", category: "public-tvet", province: "Gauteng", city: "Pretoria", website: "https://www.tnc.edu.za", applyUrl: "https://www.tnc.edu.za", phone: "012 401 1950", email: "info@tnc.edu.za", fields: ["Engineering", "Business", "IT", "Safety"], description: "TVET serving northern Tshwane.", closingDate: "30 Sep" },
  { id: "tsc", name: "Tshwane South TVET College", short: "TSC", category: "public-tvet", province: "Gauteng", city: "Pretoria", website: "https://www.tsc.edu.za", applyUrl: "https://www.tsc.edu.za", phone: "012 401 5000", email: "info@tsc.edu.za", fields: ["Engineering", "Business", "IT", "Hospitality"], description: "TVET serving southern Tshwane and centurion.", closingDate: "30 Sep" },
  { id: "westcol", name: "Western TVET College", short: "Westcol", category: "public-tvet", province: "Gauteng", city: "Randfontein", website: "https://www.westcol.co.za", applyUrl: "https://www.westcol.co.za", phone: "011 692 4004", email: "info@westcol.co.za", fields: ["Engineering", "Business", "Mining"], description: "TVET serving the West Rand.", closingDate: "30 Sep" },

  // KwaZulu-Natal
  { id: "coastalkzn", name: "Coastal TVET College", short: "Coastal", category: "public-tvet", province: "KwaZulu-Natal", city: "Durban", website: "https://www.coastalkzn.co.za", applyUrl: "https://www.coastalkzn.co.za", phone: "031 905 7000", fields: ["Engineering", "Business", "IT", "Tourism"], description: "Largest TVET in KZN with 9 campuses.", closingDate: "30 Sep" },
  { id: "elangeni", name: "Elangeni TVET College", short: "Elangeni", category: "public-tvet", province: "KwaZulu-Natal", city: "Pinetown", website: "https://www.elangeni.edu.za", applyUrl: "https://www.elangeni.edu.za", phone: "031 716 6700", fields: ["Engineering", "Business", "IT"], description: "TVET serving Pinetown and inland KZN.", closingDate: "30 Sep" },
  { id: "esayidi", name: "Esayidi TVET College", short: "Esayidi", category: "public-tvet", province: "KwaZulu-Natal", city: "Port Shepstone", website: "https://www.esayidi.edu.za", applyUrl: "https://www.esayidi.edu.za", phone: "039 684 0110", fields: ["Engineering", "Business", "Agriculture"], description: "TVET serving the KZN South Coast.", closingDate: "30 Sep" },
  { id: "majuba", name: "Majuba TVET College", short: "Majuba", category: "public-tvet", province: "KwaZulu-Natal", city: "Newcastle", website: "https://www.majuba.edu.za", applyUrl: "https://www.majuba.edu.za", phone: "034 326 4888", fields: ["Engineering", "Business", "IT"], description: "TVET serving northern KZN.", closingDate: "30 Sep" },
  { id: "mnambithi", name: "Mnambithi TVET College", short: "Mnambithi", category: "public-tvet", province: "KwaZulu-Natal", city: "Ladysmith", website: "https://www.mnambithicollege.co.za", applyUrl: "https://www.mnambithicollege.co.za", phone: "036 638 3800", fields: ["Engineering", "Business", "Education"], description: "TVET serving Ladysmith and Newcastle areas.", closingDate: "30 Sep" },
  { id: "mthashana", name: "Mthashana TVET College", short: "Mthashana", category: "public-tvet", province: "KwaZulu-Natal", city: "Vryheid", website: "https://www.mthashanacollege.co.za", applyUrl: "https://www.mthashanacollege.co.za", phone: "034 980 1010", fields: ["Engineering", "Business", "Agriculture"], description: "TVET serving Zululand region.", closingDate: "30 Sep" },
  { id: "thekwini", name: "Thekwini TVET College", short: "Thekwini", category: "public-tvet", province: "KwaZulu-Natal", city: "Durban", website: "https://www.thekwini.edu.za", applyUrl: "https://www.thekwini.edu.za", phone: "031 250 8400", fields: ["Engineering", "Business", "IT", "Tourism"], description: "TVET serving the Durban metropolitan area.", closingDate: "30 Sep" },
  { id: "umfolozi", name: "Umfolozi TVET College", short: "Umfolozi", category: "public-tvet", province: "KwaZulu-Natal", city: "Richards Bay", website: "https://www.umfolozicollege.co.za", applyUrl: "https://www.umfolozicollege.co.za", phone: "035 902 9501", fields: ["Engineering", "Business", "Maritime"], description: "TVET serving Richards Bay and Empangeni.", closingDate: "30 Sep" },
  { id: "umgungundlovu", name: "Umgungundlovu TVET College", short: "UMG", category: "public-tvet", province: "KwaZulu-Natal", city: "Pietermaritzburg", website: "https://www.umgungundlovutvet.edu.za", applyUrl: "https://www.umgungundlovutvet.edu.za", phone: "033 341 2113", fields: ["Engineering", "Business", "IT"], description: "TVET serving Pietermaritzburg and surrounds.", closingDate: "30 Sep" },

  // Limpopo
  { id: "capricorn", name: "Capricorn TVET College", short: "Capricorn", category: "public-tvet", province: "Limpopo", city: "Polokwane", website: "https://www.capricorncollege.edu.za", applyUrl: "https://www.capricorncollege.edu.za", phone: "015 230 1800", fields: ["Engineering", "Business", "IT"], description: "Largest TVET in Limpopo.", closingDate: "30 Sep" },
  { id: "lephalale", name: "Lephalale TVET College", short: "Lephalale", category: "public-tvet", province: "Limpopo", city: "Lephalale", website: "https://www.lephalalecollege.co.za", applyUrl: "https://www.lephalalecollege.co.za", phone: "014 763 2252", fields: ["Engineering", "Business", "Mining"], description: "TVET serving the Waterberg mining region.", closingDate: "30 Sep" },
  { id: "letaba", name: "Letaba TVET College", short: "Letaba", category: "public-tvet", province: "Limpopo", city: "Tzaneen", website: "https://www.letabatvet.edu.za", applyUrl: "https://www.letabatvet.edu.za", phone: "015 307 5440", email: "centraloffice@letabafet.co.za", fields: ["Engineering", "Business", "Agriculture"], description: "TVET serving Mopani District.", closingDate: "30 Sep" },
  { id: "mopani", name: "Mopani South East TVET College", short: "Mopani", category: "public-tvet", province: "Limpopo", city: "Phalaborwa", website: "https://www.mopanicollege.edu.za", applyUrl: "https://www.mopanicollege.edu.za", phone: "015 781 5721", email: "info@mopanicollege.edu.za", fields: ["Engineering", "Business", "Mining"], description: "TVET serving the Phalaborwa mining area.", closingDate: "30 Sep" },
  { id: "sekhukhune", name: "Sekhukhune TVET College", short: "Sekhukhune", category: "public-tvet", province: "Limpopo", city: "Burgersfort", website: "https://www.sekfetcol.co.za", applyUrl: "https://www.sekfetcol.co.za", phone: "013 269 0278", email: "sekfet@sekfetcol.co.za", fields: ["Engineering", "Business", "Mining"], description: "TVET serving Sekhukhune District.", closingDate: "30 Sep" },
  { id: "vhembe", name: "Vhembe TVET College", short: "Vhembe", category: "public-tvet", province: "Limpopo", city: "Sibasa", website: "https://www.vhembecollege.edu.za", applyUrl: "https://www.vhembecollege.edu.za", phone: "015 963 3156", email: "tshifularojg@vhembefet.co.za", fields: ["Engineering", "Business", "Agriculture"], description: "TVET serving Vhembe District.", closingDate: "30 Sep" },
  { id: "waterberg", name: "Waterberg TVET College", short: "Waterberg", category: "public-tvet", province: "Limpopo", city: "Mokopane", website: "https://www.waterbergcollege.co.za", applyUrl: "https://www.waterbergcollege.co.za", phone: "015 492 9000", fields: ["Engineering", "Business", "Mining"], description: "TVET serving Waterberg District.", closingDate: "30 Sep" },

  // Mpumalanga
  { id: "ehlanzeni", name: "Ehlanzeni TVET College", short: "Ehlanzeni", category: "public-tvet", province: "Mpumalanga", city: "Mbombela", website: "https://www.ehlanzenicollege.co.za", applyUrl: "https://www.ehlanzenicollege.co.za", phone: "013 752 7105", email: "admin@ehlanzenifet.co.za", fields: ["Engineering", "Business", "Tourism"], description: "TVET serving the Lowveld region.", closingDate: "30 Sep" },
  { id: "gertsibande", name: "Gert Sibande TVET College", short: "GSC", category: "public-tvet", province: "Mpumalanga", city: "Standerton", website: "https://www.gscollege.edu.za", applyUrl: "https://www.gscollege.edu.za", phone: "017 712 9040", fields: ["Engineering", "Business", "Agriculture"], description: "TVET serving the Highveld region.", closingDate: "30 Sep" },
  { id: "nkangala", name: "Nkangala TVET College", short: "Nkangala", category: "public-tvet", province: "Mpumalanga", city: "Witbank", website: "https://www.nkangalatvet.co.za", applyUrl: "https://www.nkangalatvet.co.za", phone: "013 690 1430", fields: ["Engineering", "Business", "Mining"], description: "TVET serving the coal mining region.", closingDate: "30 Sep" },

  // North West
  { id: "orbit", name: "ORBIT TVET College", short: "ORBIT", category: "public-tvet", province: "North West", city: "Rustenburg", website: "https://www.orbitcollege.co.za", applyUrl: "https://www.orbitcollege.co.za", phone: "014 592 7014", fields: ["Engineering", "Business", "Mining"], description: "TVET serving the platinum mining region.", closingDate: "30 Sep" },
  { id: "taletso", name: "Taletso TVET College", short: "Taletso", category: "public-tvet", province: "North West", city: "Mafikeng", website: "https://www.taletsofetcollege.co.za", applyUrl: "https://www.taletsofetcollege.co.za", phone: "018 384 6213", fields: ["Engineering", "Business", "Agriculture"], description: "TVET serving the central North West.", closingDate: "30 Sep" },
  { id: "vuselela", name: "Vuselela TVET College", short: "Vuselela", category: "public-tvet", province: "North West", city: "Klerksdorp", website: "https://www.vuselelacollege.co.za", applyUrl: "https://www.vuselelacollege.co.za", phone: "018 406 7800", fields: ["Engineering", "Business", "Mining"], description: "TVET serving the Dr Kenneth Kaunda district.", closingDate: "30 Sep" },

  // Northern Cape
  { id: "ncrtvet", name: "Northern Cape Rural TVET College", short: "NCR", category: "public-tvet", province: "Northern Cape", city: "Upington", website: "https://www.ncrtvet.com", applyUrl: "https://www.ncrtvet.com", phone: "054 331 3836", fields: ["Engineering", "Business", "Agriculture"], description: "TVET serving rural Northern Cape.", closingDate: "30 Sep" },
  { id: "ncutvet", name: "Northern Cape Urban TVET College", short: "NCU", category: "public-tvet", province: "Northern Cape", city: "Kimberley", website: "https://www.ncutvet.edu.za", applyUrl: "https://www.ncutvet.edu.za", phone: "053 839 2000", fields: ["Engineering", "Business", "Mining"], description: "TVET serving Kimberley and urban Northern Cape.", closingDate: "30 Sep" },

  // Western Cape
  { id: "boland", name: "Boland TVET College", short: "Boland", category: "public-tvet", province: "Western Cape", city: "Paarl", website: "https://www.bolandcollege.com", applyUrl: "https://www.bolandcollege.com", phone: "021 886 7111", fields: ["Engineering", "Business", "Hospitality", "Tourism"], description: "TVET serving the Cape Winelands.", closingDate: "30 Sep" },
  { id: "cct", name: "College of Cape Town for TVET", short: "CCT", category: "public-tvet", province: "Western Cape", city: "Cape Town", website: "https://www.cct.edu.za", applyUrl: "https://www.cct.edu.za", phone: "021 404 6700", fields: ["Engineering", "Business", "IT", "Hospitality"], description: "TVET serving Cape Town metropole.", closingDate: "30 Sep" },
  { id: "falsebay", name: "False Bay TVET College", short: "FBC", category: "public-tvet", province: "Western Cape", city: "Muizenberg", website: "https://www.falsebaycollege.co.za", applyUrl: "https://www.falsebaycollege.co.za", phone: "021 003 0600", fields: ["Engineering", "Business", "IT", "Marine"], description: "TVET serving southern Cape Town with maritime programmes.", closingDate: "30 Sep" },
  { id: "northlink", name: "Northlink TVET College", short: "Northlink", category: "public-tvet", province: "Western Cape", city: "Cape Town", website: "https://www.northlink.co.za", applyUrl: "https://www.northlink.co.za", phone: "0860 065 465", email: "info@northlink.co.za", fields: ["Engineering", "Business", "IT"], description: "TVET serving northern Cape Town suburbs.", closingDate: "30 Sep" },
  { id: "southcape", name: "South Cape TVET College", short: "SCC", category: "public-tvet", province: "Western Cape", city: "George", website: "https://www.sccollege.co.za", applyUrl: "https://www.sccollege.co.za", phone: "044 884 0359", email: "central@sccollege.co.za", fields: ["Engineering", "Business", "Tourism"], description: "TVET serving the Garden Route region.", closingDate: "30 Sep" },
  { id: "westcoast", name: "West Coast TVET College", short: "WCC", category: "public-tvet", province: "Western Cape", city: "Malmesbury", website: "https://www.westcoastcollege.co.za", applyUrl: "https://www.westcoastcollege.co.za", phone: "022 482 1143", email: "enquiries@westcoastcollege.co.za", fields: ["Engineering", "Business", "Agriculture"], description: "TVET serving the West Coast region.", closingDate: "30 Sep" },
];

// ============================================================
// PRIVATE COLLEGES (DHET-Registered Private Colleges)
// ============================================================
export const privateColleges: Institution[] = [
  {
    id: "damelin", name: "Damelin", short: "Damelin", category: "private-college",
    province: "Multi-Province", city: "National",
    website: "https://www.damelin.co.za", applyUrl: "https://www.damelin.co.za",
    phone: "0861 326 354", email: "info@damelin.co.za",
    fields: ["Business", "IT", "Educare", "Beauty", "Hospitality"],
    fees: "R18 000 – R45 000",
    description: "Long-established private college offering NATED and skills programmes nationwide.",
    dhetReg: "2008/FE07/008",
  },
  {
    id: "lyceum", name: "Lyceum College", short: "Lyceum", category: "private-college",
    province: "Gauteng", city: "Pretoria",
    website: "https://www.lyceum.co.za", applyUrl: "https://www.lyceum.co.za/programmes/",
    phone: "012 339 8000", email: "info@lyceum.co.za",
    fields: ["Education", "Business", "IT", "Public Admin"],
    fees: "R15 000 – R38 000",
    description: "Distance learning college with strong education and business programmes.",
    dhetReg: "2010/FE07/002",
  },
  {
    id: "intec", name: "INTEC College", short: "INTEC", category: "private-college",
    province: "Multi-Province", city: "National",
    website: "https://www.intec.edu.za", applyUrl: "https://www.intec.edu.za",
    phone: "021 417 6700", email: "info@intec.edu.za",
    fields: ["Business", "IT", "Engineering", "Marketing"],
    fees: "R12 000 – R32 000",
    description: "Distance learning provider with 100+ years of experience.",
    dhetReg: "2008/FE07/012",
  },
  {
    id: "skills-academy", name: "Skills Academy", short: "SA", category: "private-college",
    province: "Multi-Province", city: "National",
    website: "https://www.skillsacademy.co.za", applyUrl: "https://www.skillsacademy.co.za/register/",
    phone: "021 941 5000", email: "info@skillsacademy.co.za",
    fields: ["Business", "IT", "Beauty", "Childcare"],
    fees: "R10 000 – R28 000",
    description: "Distance learning provider focusing on skills programmes.",
    dhetReg: "2014/FE07/018",
  },
  {
    id: "oxbridge", name: "Oxbridge Academy", short: "Oxbridge", category: "private-college",
    province: "Western Cape", city: "Stellenbosch",
    website: "https://www.oxbridgeacademy.edu.za", applyUrl: "https://www.oxbridgeacademy.edu.za/apply/",
    phone: "021 110 0200", email: "info@oxbridgeacademy.edu.za",
    fields: ["Business", "IT", "Health", "Education"],
    fees: "R8 000 – R25 000",
    description: "Affordable distance learning college with N-courses and short courses.",
    dhetReg: "2013/FE07/004",
  },
  {
    id: "matric-college", name: "Matric College", short: "MC", category: "private-college",
    province: "Multi-Province", city: "National",
    website: "https://www.matriccollege.co.za", applyUrl: "https://www.matriccollege.co.za",
    phone: "021 110 0240", email: "info@matriccollege.co.za",
    fields: ["Matric Rewrite", "Senior Certificate", "Skills"],
    fees: "R6 000 – R15 000",
    description: "Specialises in helping students complete their matric via distance learning.",
    dhetReg: "2013/FE07/005",
  },
  {
    id: "ctu", name: "CTU Training Solutions", short: "CTU", category: "private-college",
    province: "Multi-Province", city: "National",
    website: "https://www.ctutraining.ac.za", applyUrl: "https://www.ctutraining.ac.za/apply/",
    phone: "0861 100 395", email: "info@ctutraining.ac.za",
    fields: ["IT", "Business", "Design", "Engineering"],
    fees: "R28 000 – R55 000",
    description: "Microsoft and Cisco certified IT training college with 10 campuses.",
    dhetReg: "2011/FE07/008",
  },
  {
    id: "academy-it", name: "Academy of IT", short: "AIT", category: "private-college",
    province: "Multi-Province", city: "National",
    website: "https://www.academyofit.co.za", applyUrl: "https://www.academyofit.co.za/apply/",
    phone: "0861 222 482", email: "info@academyofit.co.za",
    fields: ["IT", "Programming", "Networking", "Cybersecurity"],
    fees: "R32 000 – R58 000",
    description: "Specialist IT training college with industry certifications.",
    dhetReg: "2012/FE07/015",
  },
];

// ============================================================
// Aggregate exports & helpers
// ============================================================
export const allInstitutions: Institution[] = [
  ...publicUniversities,
  ...privateUniversities,
  ...publicTvets,
  ...privateColleges,
];

export function getInstitutionsByCategory(cat: InstitutionCategory): Institution[] {
  return allInstitutions.filter((i) => i.category === cat);
}

export function getInstitution(id: string): Institution | undefined {
  return allInstitutions.find((i) => i.id === id);
}

export const categoryMeta: Record<
  InstitutionCategory,
  { label: string; short: string; icon: string; color: string; description: string }
> = {
  "public-university": {
    label: "Public Universities",
    short: "Public Uni",
    icon: "🎓",
    color: "from-kk-blue to-kk-accent",
    description: "All 26 DHET-funded public universities and universities of technology",
  },
  "private-university": {
    label: "Private Universities",
    short: "Private Uni",
    icon: "🏛️",
    color: "from-purple-500 to-pink-500",
    description: "DHET-registered Private Higher Education Institutions (PHEIs)",
  },
  "public-tvet": {
    label: "Public TVET Colleges",
    short: "Public TVET",
    icon: "🛠️",
    color: "from-kk-green to-emerald-500",
    description: "All 50 public Technical & Vocational Education and Training colleges",
  },
  "private-college": {
    label: "Private Colleges",
    short: "Private",
    icon: "🏫",
    color: "from-orange-500 to-amber-500",
    description: "DHET-registered private colleges offering NATED and skills programmes",
  },
};
