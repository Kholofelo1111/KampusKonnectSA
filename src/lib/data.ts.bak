// ============================================================
// Kampus KonnectSA – Central data library
// Mock dataset for all hubs (universities, TVETs, bursaries,
// jobs, internships, learnerships, accommodation, tutors)
// ============================================================

export type University = {
  id: string;
  name: string;
  short: string;
  province: string;
  city: string;
  type: "University" | "University of Technology";
  founded: number;
  apsRange: [number, number];
  fees: string;
  description: string;
  programs: string[];
  closingDates: { program: string; date: string }[];
};

export const universities: University[] = [
  {
    id: "up", name: "University of Pretoria", short: "UP", province: "Gauteng", city: "Pretoria",
    type: "University", founded: 1908, apsRange: [30, 48], fees: "R38 000 – R62 000",
    description: "One of South Africa's top research universities with world-class engineering, health sciences, law and commerce faculties.",
    programs: ["Engineering", "Medicine", "Law", "Commerce", "Education", "Natural Sciences", "Veterinary Science"],
    closingDates: [{ program: "Undergraduate", date: "30 Jun" }, { program: "Postgraduate", date: "30 Sep" }],
  },
  {
    id: "uj", name: "University of Johannesburg", short: "UJ", province: "Gauteng", city: "Johannesburg",
    type: "University", founded: 2005, apsRange: [28, 48], fees: "R35 000 – R60 000",
    description: "Pan-African university known for engineering, built environment, arts and business innovation.",
    programs: ["Engineering", "Art & Design", "Business", "Education", "Health Sciences", "Law"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "uct", name: "University of Cape Town", short: "UCT", province: "Western Cape", city: "Cape Town",
    type: "University", founded: 1829, apsRange: [38, 48], fees: "R45 000 – R75 000",
    description: "Africa's leading university with globally ranked Medicine, Law and Commerce programmes.",
    programs: ["Medicine", "Law", "Commerce", "Engineering", "Humanities", "Science"],
    closingDates: [{ program: "Undergraduate", date: "31 Jul" }],
  },
  {
    id: "unisa", name: "University of South Africa", short: "UNISA", province: "Gauteng", city: "Pretoria",
    type: "University", founded: 1873, apsRange: [20, 40], fees: "R8 000 – R25 000",
    description: "The largest open distance learning institution in Africa – study from anywhere.",
    programs: ["Education", "Law", "Commerce", "Humanities", "Science", "Theology"],
    closingDates: [{ program: "Undergraduate", date: "30 Apr" }],
  },
  {
    id: "tut", name: "Tshwane University of Technology", short: "TUT", province: "Gauteng", city: "Pretoria",
    type: "University of Technology", founded: 2004, apsRange: [24, 38], fees: "R28 000 – R48 000",
    description: "Career-focused university of technology with strong engineering, IT and business programmes.",
    programs: ["Engineering", "IT", "Business", "Arts", "Sciences"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "nmmu", name: "Nelson Mandela University", short: "NMU", province: "Eastern Cape", city: "Gqeberha",
    type: "University", founded: 2005, apsRange: [26, 42], fees: "R30 000 – R55 000",
    description: "Coastal university known for engineering, ocean sciences, law and commerce.",
    programs: ["Engineering", "Law", "Health Sciences", "Business", "Science"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "nwu", name: "North-West University", short: "NWU", province: "North West", city: "Potchefstroom",
    type: "University", founded: 2004, apsRange: [26, 42], fees: "R28 000 – R52 000",
    description: "Multi-campus university delivering education, natural sciences, law and theology.",
    programs: ["Education", "Law", "Economic Sciences", "Health Sciences", "Theology"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "ul", name: "University of Limpopo", short: "UL", province: "Limpopo", city: "Polokwane",
    type: "University", founded: 2005, apsRange: [24, 38], fees: "R22 000 – R40 000",
    description: "Rural-based university excelling in agriculture, health sciences and education.",
    programs: ["Health Sciences", "Education", "Agriculture", "Management Sciences"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "univen", name: "University of Venda", short: "Univen", province: "Limpopo", city: "Thohoyandou",
    type: "University", founded: 1982, apsRange: [22, 36], fees: "R20 000 – R38 000",
    description: "Comprehensive university serving the Limpopo region with strong agricultural and science faculties.",
    programs: ["Agriculture", "Law", "Management", "Science", "Education"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "cut", name: "Central University of Technology", short: "CUT", province: "Free State", city: "Bloemfontein",
    type: "University of Technology", founded: 2004, apsRange: [24, 36], fees: "R26 000 – R44 000",
    description: "Career-oriented institution known for engineering, IT and built environment programmes.",
    programs: ["Engineering", "IT", "Built Environment", "Health Sciences"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "cput", name: "Cape Peninsula University of Technology", short: "CPUT", province: "Western Cape", city: "Cape Town",
    type: "University of Technology", founded: 2005, apsRange: [26, 40], fees: "R30 000 – R52 000",
    description: "Cape Town's largest university of technology with strong engineering, business and design faculties.",
    programs: ["Engineering", "Business", "Design", "Health Sciences", "IT"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "dut", name: "Durban University of Technology", short: "DUT", province: "KwaZulu-Natal", city: "Durban",
    type: "University of Technology", founded: 2002, apsRange: [24, 38], fees: "R28 000 – R46 000",
    description: "KZN's leading university of technology known for engineering, health sciences and media.",
    programs: ["Engineering", "Health Sciences", "Media", "Business", "Applied Sciences"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "vut", name: "Vaal University of Technology", short: "VUT", province: "Gauteng", city: "Vanderbijlpark",
    type: "University of Technology", founded: 1979, apsRange: [24, 36], fees: "R26 000 – R44 000",
    description: "Technology-focused university in the Vaal Triangle with strong industry links.",
    programs: ["Engineering", "Management Sciences", "Applied Sciences", "Health Sciences"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "wsu", name: "Walter Sisulu University", short: "WSU", province: "Eastern Cape", city: "Mthatha",
    type: "University", founded: 2005, apsRange: [22, 36], fees: "R22 000 – R38 000",
    description: "Rural comprehensive university serving the Eastern Cape with applied sciences and education.",
    programs: ["Education", "Management Sciences", "Applied Sciences", "Health Sciences"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "smu", name: "Sefako Makgatho Health Sciences University", short: "SMU", province: "Gauteng", city: "Pretoria",
    type: "University", founded: 2014, apsRange: [30, 45], fees: "R35 000 – R60 000",
    description: "South Africa's premier health sciences university producing doctors, nurses and pharmacists.",
    programs: ["Medicine", "Nursing", "Pharmacy", "Oral Health"],
    closingDates: [{ program: "Undergraduate", date: "30 Jun" }],
  },
  {
    id: "ru", name: "Rhodes University", short: "RU", province: "Eastern Cape", city: "Makhanda",
    type: "University", founded: 1904, apsRange: [32, 46], fees: "R38 000 – R58 000",
    description: "Small, prestigious university known for journalism, law, pharmacy and humanities.",
    programs: ["Journalism", "Law", "Pharmacy", "Humanities", "Commerce"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "sun", name: "Stellenbosch University", short: "SU", province: "Western Cape", city: "Stellenbosch",
    type: "University", founded: 1918, apsRange: [34, 48], fees: "R40 000 – R70 000",
    description: "One of Africa's top research universities with world-class engineering, science and wine programmes.",
    programs: ["Engineering", "Medicine", "Law", "Agriculture", "Science", "Economic Sciences"],
    closingDates: [{ program: "Undergraduate", date: "31 Jul" }],
  },
  {
    id: "ufh", name: "University of Fort Hare", short: "UFH", province: "Eastern Cape", city: "Alice",
    type: "University", founded: 1916, apsRange: [24, 38], fees: "R24 000 – R42 000",
    description: "Historic university that produced many of Africa's leaders including Mandela.",
    programs: ["Law", "Education", "Management", "Science", "Humanities"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "unizulu", name: "University of Zululand", short: "UniZulu", province: "KwaZulu-Natal", city: "KwaDlangezwa",
    type: "University", founded: 1960, apsRange: [22, 36], fees: "R22 000 – R38 000",
    description: "Comprehensive university serving KwaZulu-Natal with education, commerce and science faculties.",
    programs: ["Education", "Commerce", "Science", "Humanities", "Law"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "ump", name: "University of Mpumalanga", short: "UMP", province: "Mpumalanga", city: "Mbombela",
    type: "University", founded: 2013, apsRange: [24, 38], fees: "R24 000 – R40 000",
    description: "Youngest university in SA with mining, agriculture and applied computing strengths.",
    programs: ["Mining Engineering", "Agriculture", "Applied Computing", "Education"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
  {
    id: "spu", name: "Sol Plaatje University", short: "SPU", province: "Northern Cape", city: "Kimberley",
    type: "University", founded: 2013, apsRange: [24, 38], fees: "R24 000 – R40 000",
    description: "Northern Cape's first university with education, mining support and applied IT programmes.",
    programs: ["Education", "Mining Sciences", "Applied IT", "Commerce"],
    closingDates: [{ program: "Undergraduate", date: "30 Sep" }],
  },
];

export type Tvet = {
  id: string;
  name: string;
  province: string;
  campuses: string[];
  courses: string[];
  closingDate: string;
};

export const tvets: Tvet[] = [
  { id: "flc", name: "False Bay TVET College", province: "Western Cape", campuses: ["Cape Town", "Mitchells Plain", "Heatherhill"], courses: ["Business", "IT", "Engineering", "Hospitality"], closingDate: "15 Oct" },
  { id: "cnc", name: "College of Cape Town", province: "Western Cape", campuses: ["Athlone", "Crawford", "Grassy Park"], courses: ["Business", "IT", "Engineering", "Primary Health"], closingDate: "30 Sep" },
  { id: "wnc", name: "Western Cape TVET College", province: "Western Cape", campuses: ["Bellville", "Goodwood", "Worcester"], courses: ["Engineering", "Business", "Office Admin"], closingDate: "30 Sep" },
  { id: "tshwane-east", name: "Tshwane East TVET College", province: "Gauteng", campuses: ["Mamelodi", "Mabopane"], courses: ["Engineering", "Business", "IT", "Safety"], closingDate: "30 Sep" },
  { id: "south-college", name: "South College", province: "Gauteng", campuses: ["Johannesburg", "Springs"], courses: ["Business", "IT", "Engineering Studies"], closingDate: "30 Sep" },
  { id: "ekurhuleni-west", name: "Ekurhuleni West TVET College", province: "Gauteng", campuses: ["Benoni", "Germiston", "Alberton"], courses: ["Engineering", "Business", "IT"], closingDate: "30 Sep" },
  { id: "boland", name: "Boland TVET College", province: "Western Cape", campuses: ["Paarl", "Worcester", "Stellenbosch"], courses: ["Business", "IT", "Engineering", "Tourism"], closingDate: "30 Sep" },
  { id: "el", name: "East London TVET College", province: "Eastern Cape", campuses: ["East London", "Butterworth"], courses: ["Business", "Engineering", "IT", "Hospitality"], closingDate: "30 Sep" },
  { id: "port-elizabeth", name: "Port Elizabeth TVET College", province: "Eastern Cape", campuses: ["North End", "Kariega"], courses: ["Engineering", "Business", "Hospitality"], closingDate: "30 Sep" },
  { id: "umfolozi", name: "Umfolozi TVET College", province: "KwaZulu-Natal", campuses: ["Richards Bay", "Mthonjaneni"], courses: ["Engineering", "Business", "IT"], closingDate: "30 Sep" },
  { id: "mnambithi", name: "Mnambithi TVET College", province: "KwaZulu-Natal", campuses: ["Ladysmith", "Newcastle"], courses: ["Engineering", "Business", "Education"], closingDate: "30 Sep" },
  { id: "es", name: "Ekurhuleni South TVET College", province: "Gauteng", campuses: ["Nigel", "Germiston", "Springs"], courses: ["Engineering", "Business", "IT"], closingDate: "30 Sep" },
];

export type Bursary = {
  id: string;
  name: string;
  sponsor: string;
  field: string;
  level: "High School" | "Undergraduate" | "Postgraduate";
  province: string;
  amount: string;
  deadline: string;
  covers: string[];
  eligibility: string;
  gender?: "Any" | "Female" | "Male";
  disability?: boolean;
};

export const bursaries: Bursary[] = [
  {
    id: "nsfas", name: "NSFAS Bursary", sponsor: "Department of Higher Education",
    field: "All fields", level: "Undergraduate", province: "National",
    amount: "Full cost of study", deadline: "31 Jan 2026",
    covers: ["Tuition", "Accommodation", "Transport", "Living allowance", "Learning materials"],
    eligibility: "Household income under R350 000/year, South African citizen",
  },
  {
    id: "sasol", name: "Sasol Bursary", sponsor: "Sasol",
    field: "Engineering, Science, IT", level: "Undergraduate", province: "National",
    amount: "Full tuition + living", deadline: "31 Aug 2026",
    covers: ["Tuition", "Accommodation", "Books", "Monthly allowance"],
    eligibility: "APS 30+, Mathematics 70%+, Physical Science 70%+",
  },
  {
    id: "eskom", name: "Eskom Bursary", sponsor: "Eskom",
    field: "Engineering, IT", level: "Undergraduate", province: "National",
    amount: "Up to R200 000/year", deadline: "30 Sep 2026",
    covers: ["Tuition", "Accommodation", "Books", "Living allowance"],
    eligibility: "APS 30+, Engineering or IT, South African citizen",
  },
  {
    id: "fdb", name: "Funza Lushaka Teaching Bursary", sponsor: "DBE",
    field: "Education (BEd)", level: "Undergraduate", province: "National",
    amount: "Full cost of study", deadline: "31 Dec 2026",
    covers: ["Tuition", "Accommodation", "Books", "Monthly allowance"],
    eligibility: "BEd applicants, APS 28+, will teach in public school",
  },
  {
    id: "anglo", name: "Anglo American Bursary", sponsor: "Anglo American",
    field: "Mining Engineering, Geology", level: "Undergraduate", province: "National",
    amount: "Full tuition + living", deadline: "31 Aug 2026",
    covers: ["Tuition", "Accommodation", "Books", "Allowance", "Work experience"],
    eligibility: "Mining/Geology/Engineering, APS 30+",
  },
  {
    id: "stdbank", name: "Standard Bank Bursary", sponsor: "Standard Bank",
    field: "Commerce, IT, Engineering", level: "Undergraduate", province: "National",
    amount: "Full tuition + living", deadline: "30 Sep 2026",
    covers: ["Tuition", "Accommodation", "Laptop", "Monthly allowance"],
    eligibility: "Commerce/IT/Engineering, APS 32+",
  },
  {
    id: "absa", name: "Absa Bursary", sponsor: "Absa",
    field: "Commerce, IT, Actuarial", level: "Undergraduate", province: "National",
    amount: "Full tuition + living", deadline: "30 Jun 2026",
    covers: ["Tuition", "Accommodation", "Laptop", "Allowance"],
    eligibility: "Commerce/IT/Actuarial, APS 34+",
  },
  {
    id: "fem", name: "FEM Foundation Bursary", sponsor: "FEM Foundation",
    field: "Civil, Mining, Electrical Engineering", level: "Undergraduate", province: "National",
    amount: "Full tuition + living", deadline: "31 Aug 2026",
    covers: ["Tuition", "Accommodation", "Books", "Allowance"],
    eligibility: "Engineering students, APS 32+",
  },
  {
    id: "nrf", name: "NRF Postgraduate Bursary", sponsor: "NRF",
    field: "All research fields", level: "Postgraduate", province: "National",
    amount: "Up to R180 000/year", deadline: "31 Aug 2026",
    covers: ["Tuition", "Research", "Living allowance"],
    eligibility: "Honours/Masters/PhD, strong academic record",
  },
  {
    id: "women-in-eng", name: "Women in Engineering Bursary", sponsor: "SAICE",
    field: "Civil Engineering", level: "Undergraduate", province: "National",
    amount: "Full tuition + living", deadline: "30 Oct 2026",
    covers: ["Tuition", "Accommodation", "Books", "Mentorship"],
    eligibility: "Female students, Civil Engineering, APS 30+",
    gender: "Female",
  },
  {
    id: "capitec", name: "Capitec Bursary", sponsor: "Capitec Bank",
    field: "Commerce, IT, Data Science", level: "Undergraduate", province: "National",
    amount: "Full tuition + living", deadline: "31 Jul 2026",
    covers: ["Tuition", "Accommodation", "Laptop", "Allowance"],
    eligibility: "Commerce/IT/Data Science, APS 32+",
  },
];

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  province: string;
  type: "Full-time" | "Part-time" | "Contract" | "Graduate";
  category: string;
  salary: string;
  deadline: string;
  requirements: string[];
  description: string;
  matricRequired: boolean;
};

export const jobs: Job[] = [
  {
    id: "j1", title: "General Worker – Warehouse", company: "Shoprite Holdings",
    location: "Pretoria", province: "Gauteng", type: "Full-time", category: "General Worker",
    salary: "R4 500 – R5 500", deadline: "15 Nov 2026",
    requirements: ["Grade 9 or equivalent", "Physically fit", "Punctual"],
    description: "Stock handling, cleaning, and general warehouse duties.", matricRequired: false,
  },
  {
    id: "j2", title: "Cashier", company: "Pick n Pay", location: "Johannesburg",
    province: "Gauteng", type: "Full-time", category: "Retail",
    salary: "R5 500 – R7 000", deadline: "30 Nov 2026",
    requirements: ["Matric", "Customer service skills", "Basic math"],
    description: "Operate tills, assist customers, handle cash.", matricRequired: true,
  },
  {
    id: "j3", title: "Security Guard", company: "Fidelity ADT", location: "Cape Town",
    province: "Western Cape", type: "Full-time", category: "Security",
    salary: "R6 000 – R8 000", deadline: "20 Nov 2026",
    requirements: ["PSIRA Grade C", "Clean criminal record", "Matric preferred"],
    description: "Access control, patrols, incident reporting.", matricRequired: false,
  },
  {
    id: "j4", title: "Junior Developer", company: "Discovery", location: "Sandton",
    province: "Gauteng", type: "Graduate", category: "IT",
    salary: "R280 000 – R380 000 CTC", deadline: "31 Dec 2026",
    requirements: ["BSc IT / Diploma", "Java or Python", "SQL basics"],
    description: "Join the graduate programme to build healthcare platform features.", matricRequired: true,
  },
  {
    id: "j5", title: "Cleaner", company: "Bidvest Facilities", location: "Durban",
    province: "KwaZulu-Natal", type: "Full-time", category: "Cleaning",
    salary: "R4 200 – R5 000", deadline: "10 Nov 2026",
    requirements: ["Grade 9", "Clean criminal record", "Reliable"],
    description: "Office and facility cleaning in corporate buildings.", matricRequired: false,
  },
  {
    id: "j6", title: "Driver Code 14", company: "Transnet Freight Rail", location: "Pretoria",
    province: "Gauteng", type: "Full-time", category: "Driver",
    salary: "R15 000 – R22 000", deadline: "25 Nov 2026",
    requirements: ["Code 14 license", "PDP", "3+ years experience"],
    description: "Long-distance freight driving across Gauteng and surrounds.", matricRequired: true,
  },
  {
    id: "j7", title: "Enrolled Nurse", company: "Department of Health", location: "Limpopo",
    province: "Limpopo", type: "Full-time", category: "Healthcare",
    salary: "R180 000 – R240 000 CTC", deadline: "15 Dec 2026",
    requirements: ["Enrolled Nursing Diploma", "SANC registration"],
    description: "Community health clinic nursing in rural Limpopo.", matricRequired: true,
  },
  {
    id: "j8", title: "Mine Safety Officer", company: "Valterra Platinum (formerly Anglo American Platinum)", location: "Rustenburg",
    province: "North West", type: "Full-time", category: "Mining",
    salary: "R380 000 – R520 000 CTC", deadline: "30 Nov 2026",
    requirements: ["Mine Safety Cert", "3+ years mining exp", "SAMTRAC preferred"],
    description: "Ensure underground safety compliance and conduct audits.", matricRequired: true,
  },
  {
    id: "j9", title: "Remote Customer Support Agent", company: "Takealot", location: "Remote",
    province: "National", type: "Full-time", category: "Remote Jobs",
    salary: "R12 000 – R16 000", deadline: "05 Dec 2026",
    requirements: ["Matric", "Fluent English", "Stable internet", "Quiet workspace"],
    description: "Handle customer queries via chat and phone, work from home.", matricRequired: true,
  },
  {
    id: "j10", title: "EPWP General Worker", company: "City of Tshwane", location: "Pretoria",
    province: "Gauteng", type: "Contract", category: "General Worker",
    salary: "R3 500 – R4 500", deadline: "20 Nov 2026",
    requirements: ["Unemployed", "Tshwane resident", "18-35 years"],
    description: "6-month municipal cleaning and greening project.", matricRequired: false,
  },
];

export type Internship = {
  id: string;
  title: string;
  organization: string;
  sector: string;
  location: string;
  duration: string;
  stipend: string;
  deadline: string;
  requirements: string[];
  description: string;
};

export const internships: Internship[] = [
  {
    id: "i1", title: "Graduate Intern – Software Engineering", organization: "Standard Bank",
    sector: "Banking", location: "Johannesburg", duration: "12 months", stipend: "R15 000/month",
    deadline: "31 Jan 2026",
    requirements: ["BSc IT / Computer Science", "Java, SQL, Git"],
    description: "12-month rotational programme across retail banking technology.",
  },
  {
    id: "i2", title: "Candidate Attorney", organization: "Bowmans Law",
    sector: "Legal", location: "Cape Town", duration: "24 months", stipend: "R18 000/month",
    deadline: "28 Feb 2026",
    requirements: ["LLB degree", "Completed articles requirements"],
    description: "Corporate law internship at Africa's top law firm.",
  },
  {
    id: "i3", title: "Engineering Intern", organization: "Eskom",
    sector: "Energy", location: "Pretoria", duration: "12 months", stipend: "R14 000/month",
    deadline: "30 Jun 2026",
    requirements: ["BEng Electrical / Mechanical", "ECSA registration"],
    description: "Power generation and grid engineering exposure.",
  },
  {
    id: "i4", title: "Municipal Intern – Public Admin", organization: "City of Johannesburg",
    sector: "Government", location: "Johannesburg", duration: "12 months", stipend: "R8 500/month",
    deadline: "15 Mar 2026",
    requirements: ["Public Admin / Commerce Diploma or Degree"],
    description: "Gain public sector experience in municipal governance.",
  },
  {
    id: "i5", title: "Marketing Intern", organization: "MTN",
    sector: "Telecoms", location: "Johannesburg", duration: "12 months", stipend: "R12 000/month",
    deadline: "30 Apr 2026",
    requirements: ["Marketing / Communications degree", "Social media savvy"],
    description: "Digital marketing campaign planning and analytics.",
  },
];

export type Learnership = {
  id: string;
  title: string;
  provider: string;
  seta: string;
  sector: string;
  level: "NQF 4" | "NQF 5" | "NQF 6";
  duration: string;
  stipend: string;
  deadline: string;
  location: string;
  requirements: string[];
  description: string;
};

export const learnerships: Learnership[] = [
  {
    id: "l1", title: "Business Administration NQF 5", provider: "Services SETA",
    seta: "Services SETA", sector: "Business Admin", level: "NQF 5", duration: "12 months",
    stipend: "R4 500/month", deadline: "30 Nov 2026", location: "Gauteng",
    requirements: ["Matric", "18-35 years", "Unemployed preferred"],
    description: "Office admin, business communication and customer service learnership.",
  },
  {
    id: "l2", title: "Electrical Installation NQF 4", provider: "EWSETA",
    seta: "EWSETA", sector: "Electrical", level: "NQF 4", duration: "18 months",
    stipend: "R5 000/month", deadline: "15 Dec 2026", location: "KwaZulu-Natal",
    requirements: ["Grade 9 minimum", "Maths literacy"],
    description: "Become a qualified electrician with practical workplace experience.",
  },
  {
    id: "l3", title: "IT Systems Support NQF 5", provider: "MICT SETA",
    seta: "MICT SETA", sector: "IT", level: "NQF 5", duration: "12 months",
    stipend: "R5 500/month", deadline: "30 Nov 2026", location: "National",
    requirements: ["Matric", "Basic computer skills"],
    description: "Desktop support, networking and helpdesk learnership.",
  },
  {
    id: "l4", title: "Retail Sales NQF 4", provider: "W&RSETA",
    seta: "W&RSETA", sector: "Retail", level: "NQF 4", duration: "12 months",
    stipend: "R3 800/month", deadline: "20 Dec 2026", location: "Western Cape",
    requirements: ["Matric", "Customer-focused"],
    description: "Retail operations, visual merchandising and customer service.",
  },
  {
    id: "l5", title: "Mining Rock Breaking NQF 4", provider: "MQA",
    seta: "MQA", sector: "Mining", level: "NQF 4", duration: "12 months",
    stipend: "R6 000/month", deadline: "31 Jan 2027", location: "North West",
    requirements: ["Matric", "Medically fit", "18-40 years"],
    description: "Underground rock breaking and blasting operations learnership.",
  },
  {
    id: "l6", title: "Project Management NQF 5", provider: "SASSETA",
    seta: "SASSETA", sector: "Project Management", level: "NQF 5", duration: "12 months",
    stipend: "R5 000/month", deadline: "30 Nov 2026", location: "Gauteng",
    requirements: ["Matric", "Good communication skills"],
    description: "Project planning, scheduling and execution learnership.",
  },
];

export const provinces = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State",
  "Limpopo", "Mpumalanga", "North West", "Northern Cape", "National",
];

export const jobCategories = [
  "Government Jobs", "General Worker", "Retail", "Driver", "Security",
  "Cleaning", "Healthcare", "IT", "Mining", "Hospitality", "Warehouse",
  "Remote Jobs", "Graduate Jobs",
];
