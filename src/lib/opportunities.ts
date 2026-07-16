// ============================================================
// Opportunity Feed — Real-time-style data feed
// Unified structure for jobs, learnerships, internships, bursaries
// Sortable by date, ranked, with direct apply links.
// ============================================================

export type OpportunityType =
  | "job"
  | "learnership"
  | "internship"
  | "bursary";

export type Opportunity = {
  id: string;
  type: OpportunityType;
  title: string;
  company: string;
  location: string;
  province: string;
  closingDate: string; // ISO YYYY-MM-DD
  postedDate: string; // ISO YYYY-MM-DD
  applyUrl: string;
  email?: string; // For mailto fallback
  category?: string; // e.g., Retail, IT, Driver
  salary?: string;
  description: string;
  requirements: string[];
  isVerified: boolean;
  howToApply?: string[]; // Step-by-step instructions for entries with no simple online portal
  linkedinUrl?: string; // Company's real LinkedIn Jobs page, when known and verified
};

// Import generated jobs

// Real opportunities with verified application URLs
export const opportunityFeed: Opportunity[] = [
  // ---- BURSARIES (most recent first) ----
  {
    id: "op-001", type: "bursary", title: "Sasol Bursary 2027 — Engineering",
    company: "Sasol", location: "National", province: "National",
    closingDate: "2026-05-17", postedDate: "2026-04-08",
    applyUrl: "https://www.sasolbursaries.com/welcome/",
    salary: "Full tuition + R35 000 stipend",
    description: "Full bursary for BEng programmes at SA universities, with workback agreement.",
    requirements: ["Matric APS 30+", "Mathematics 70%+", "Physical Science 70%+", "SA citizen"],
    isVerified: true,
  },
  {
    id: "op-002", type: "bursary", title: "NSFAS 2027 Funding",
    company: "Department of Higher Education", location: "National", province: "National",
    closingDate: "2027-01-31", postedDate: "2026-07-05",
    applyUrl: "https://my.nsfas.org.za",
    salary: "Full cost of study",
    description: "Government bursary covering tuition, accommodation, transport, books for university and TVET students.",
    requirements: ["Household income < R350 000/year", "SA citizen", "First-time entering university/TVET"],
    isVerified: true,
  },
  {
    id: "op-003", type: "bursary", title: "Eskom Engineering Bursary 2027",
    company: "Eskom", location: "National", province: "National",
    closingDate: "2026-09-30", postedDate: "2026-04-15",
    applyUrl: "https://eskomcareers.ci.hr/applicant/index.php",
    salary: "Up to R200 000/year",
    description: "Full funding for BEng Electrical and Mechanical programmes.",
    requirements: ["APS 30+", "Engineering field", "SA citizen"],
    isVerified: true,
  },
  {
    id: "op-004", type: "bursary", title: "Funza Lushaka Teaching Bursary 2027",
    company: "Department of Basic Education", location: "National", province: "National",
    closingDate: "2026-12-31", postedDate: "2026-07-03",
    applyUrl: "https://funzalushaka.dbe.gov.za",
    salary: "Full cost of study",
    description: "Full bursary for BEd students who will teach in public schools after graduation.",
    requirements: ["APS 28+", "BEd applicants", "Service commitment"],
    isVerified: true,
  },

  // ---- LEARNERSHIPS ----

  {
    id: "op-signa-2026",
    type: "learnership",
    title: "Signa Academy Learnership Programme 2026",
    company: "Signa Academy",
    location: "Nationwide",
    province: "National",
    closingDate: "2026-12-31",
    postedDate: "2026-07-16",
    applyUrl: "https://linkinn.co.za/signa-learnership-programme-2026/",
    salary: "R3,200/month",
    description: "Entry-level learnership for unemployed youth with Grade 12.",
    requirements: ["Grade 12", "South African citizen"],
    isVerified: true,
  },

  {
    id: "op-avbob-2026",
    type: "learnership",
    title: "AVBOB & INSETA Learnership Programme 2026",
    company: "AVBOB",
    location: "Nationwide",
    province: "National",
    closingDate: "2026-12-31",
    postedDate: "2026-07-16",
    applyUrl: "https://linkinn.co.za/avbob-learnership-programme-2026/",
    salary: "R5,600/month",
    description: "Insurance sector learnership for unemployed youth.",
    requirements: ["Grade 12", "18-35 years"],
    isVerified: true,
  },

  {
    id: "op-ilearn-2026",
    type: "learnership",
    title: "iLearn Learnership Programme 2026",
    company: "iLearn",
    location: "Nationwide",
    province: "National",
    closingDate: "2026-12-31",
    postedDate: "2026-07-16",
    applyUrl: "https://linkinn.co.za/ilearn-learnership-programme-2026/",
    salary: "R5,700/month",
    description: "Online learnership opportunity for unemployed youth.",
    requirements: ["Grade 10/11/12"],
    isVerified: true,
  },


  // ---- YES4YOUTH (Top of learnerships — official govt portal) ----
  {
    id: "op-yes-main", type: "learnership",
    title: "YES4Youth Programme — Official Portal",
    company: "Youth Employment Service",
    location: "Nationwide", province: "National",
    closingDate: "2027-12-31", postedDate: "2026-01-01",
    applyUrl: "https://sayouth.mobi/",
    salary: "R5 241 / month average",
    description: "Official government-run portal aggregating 50 000+ YES4Youth placements at 1 500+ companies (SPAR, Nedbank, Shoprite, I&J and more). FREE to apply, zero-rated data on Vodacom, MTN, Cell C, Telkom & Virgin Mobile. Single portal for all YES4Youth opportunities.",
    requirements: ["Unemployed", "18-34 years", "SA citizen", "Grade 10+", "Matric preferred"],
    isVerified: true,
  },

  {
    id: "op-005", type: "learnership", title: "IT Systems Support NQF 5",
    company: "MICT SETA", location: "National", province: "National",
    closingDate: "2026-11-30", postedDate: "2026-05-01",
    applyUrl: "https://www.mict.org.za/learnerships/",
    salary: "R5 500/month",
    description: "12-month IT support learnership covering desktop, networking and helpdesk.",
    requirements: ["Matric", "Basic computer skills", "18-35 years"],
    isVerified: true,
  },
  {
    id: "op-006", type: "learnership", title: "Business Administration NQF 5",
    company: "Services SETA", location: "Gauteng", province: "Gauteng",
    closingDate: "2026-11-30", postedDate: "2026-04-20",
    applyUrl: "https://www.servicesseta.org.za/",
    salary: "R4 500/month",
    description: "Office administration, business communication and customer service learnership.",
    requirements: ["Matric", "18-35 years", "Unemployed preferred"],
    isVerified: true,
  },
  {
    id: "op-007", type: "learnership", title: "Electrical Installation NQF 4",
    company: "EWSETA", location: "KwaZulu-Natal", province: "KwaZulu-Natal",
    closingDate: "2026-12-15", postedDate: "2026-05-10",
    applyUrl: "https://ewseta.org.za/",
    salary: "R5 000/month",
    description: "18-month electrical installation learnership with workplace experience.",
    requirements: ["Grade 9 minimum", "Maths literacy"],
    isVerified: true,
  },
  {
    id: "op-008", type: "learnership", title: "Mining Rock Breaking NQF 4",
    company: "MQA", location: "North West", province: "North West",
    closingDate: "2027-01-31", postedDate: "2026-06-01",
    applyUrl: "https://www.mqa.org.za/",
    salary: "R6 000/month",
    description: "12-month underground rock breaking and blasting operations learnership.",
    requirements: ["Matric", "Medically fit", "18-40 years"],
    isVerified: true,
  },

  // ---- INTERNSHIPS ----
  {
    id: "op-009", type: "internship", title: "Software Engineering Intern 2027",
    company: "Standard Bank", location: "Johannesburg", province: "Gauteng",
    closingDate: "2027-01-31", postedDate: "2026-07-01",
    applyUrl: "https://www.standardbank.co.za/sasbb/standardbank/personal/student-solutions/graduates",
    salary: "R15 000/month",
    description: "12-month rotational programme across retail banking technology.",
    requirements: ["BSc IT / Computer Science", "Java, SQL, Git"],
    isVerified: true,
  },
  {
    id: "op-010", type: "internship", title: "Candidate Attorney Programme",
    company: "Bowmans Law", location: "Cape Town", province: "Western Cape",
    closingDate: "2027-02-28", postedDate: "2026-06-29",
    applyUrl: "https://www.bowmanslaw.com/careers",
    salary: "R18 000/month",
    description: "24-month candidate attorney programme at Africa's top law firm.",
    requirements: ["LLB degree", "Top 25% of class"],
    isVerified: true,
  },
  {
    id: "op-011", type: "internship", title: "Engineering Intern — Generation",
    company: "Eskom", location: "Pretoria", province: "Gauteng",
    closingDate: "2026-06-30", postedDate: "2026-04-01",
    applyUrl: "https://eskomcareers.ci.hr/applicant/index.php",
    salary: "R14 000/month",
    description: "12-month engineering internship in power generation.",
    requirements: ["BEng Electrical / Mechanical", "ECSA registration"],
    isVerified: true,
  },
  {
    id: "op-012", type: "internship", title: "Marketing Intern",
    company: "MTN", location: "Johannesburg", province: "Gauteng",
    closingDate: "2026-04-30", postedDate: "2026-03-01",
    applyUrl: "https://www.mtn.co.za/careers",
    salary: "R12 000/month",
    description: "Digital marketing campaign planning and analytics internship.",
    requirements: ["Marketing/Communications degree", "Social media savvy"],
    isVerified: true,
  },

  // ---- JOBS (most recent first) ----
  {
    id: "op-013", type: "job", title: "Junior Developer — Graduate Programme",
    company: "Discovery", location: "Sandton", province: "Gauteng",
    closingDate: "2026-12-31", postedDate: "2026-06-27",
    applyUrl: "https://www.discovery.co.za/corporate/careers",
    salary: "R280 000 – R380 000 CTC",
    description: "Join the Discovery graduate developer programme building health-tech.",
    requirements: ["BSc IT / Diploma", "Java or Python", "SQL basics"],
    isVerified: true,
  },
  {
    id: "op-014", type: "job", title: "General Worker — Warehouse",
    company: "Shoprite Holdings", location: "Pretoria", province: "Gauteng",
    closingDate: "2026-11-15", postedDate: "2026-06-25",
    applyUrl: "https://www.shopriteholdings.co.za/careers.html",
    salary: "R4 500 – R5 500",
    description: "Stock handling, cleaning, and general warehouse duties.",
    requirements: ["Grade 9 or equivalent", "Physically fit"],
    isVerified: true,
  },
  {
    id: "op-015", type: "job", title: "Cashier",
    company: "Pick n Pay", location: "Johannesburg", province: "Gauteng",
    closingDate: "2026-11-30", postedDate: "2026-06-23",
    applyUrl: "https://picknpay.wd3.myworkdayjobs.com/PNP_Careers",
    salary: "R5 500 – R7 000",
    description: "Operate tills, assist customers, handle cash.",
    requirements: ["Matric", "Customer service skills"],
    isVerified: true,
  },
  {
    id: "op-016", type: "job", title: "Security Guard — Grade C",
    company: "Fidelity ADT", location: "Cape Town", province: "Western Cape",
    closingDate: "2026-11-20", postedDate: "2026-06-21",
    applyUrl: "https://fidelityservicesgroup.simplify.hr/",
    salary: "R6 000 – R8 000",
    description: "Access control, patrols, incident reporting.",
    requirements: ["PSIRA Grade C", "Clean criminal record"],
    isVerified: true,
  },
  {
    id: "op-017", type: "job", title: "Cleaner — Corporate Office",
    company: "Bidvest Facilities", location: "Durban", province: "KwaZulu-Natal",
    closingDate: "2026-11-10", postedDate: "2026-06-19",
    applyUrl: "https://bidvestfacilitiesmanagement.co.za/careers/",
    salary: "R4 200 – R5 000",
    description: "Office and facility cleaning in corporate buildings.",
    requirements: ["Grade 9", "Clean criminal record"],
    isVerified: true,
  },
  {
    id: "op-018", type: "job", title: "Driver Code 14 — Long Haul",
    company: "Transnet Freight Rail", location: "Pretoria", province: "Gauteng",
    closingDate: "2026-11-25", postedDate: "2026-06-17",
    applyUrl: "https://www.transnet.net/careers",
    salary: "R15 000 – R22 000",
    description: "Long-distance freight driving across Gauteng and surrounds.",
    requirements: ["Code 14 license", "PDP", "3+ years experience"],
    isVerified: true,
  },
  {
    id: "op-019", type: "job", title: "Enrolled Nurse — Community Clinic",
    company: "Department of Health", location: "Limpopo", province: "Limpopo",
    closingDate: "2026-12-15", postedDate: "2026-06-15",
    applyUrl: "https://www.health.gov.za/vacancies/",
    salary: "R180 000 – R240 000 CTC",
    description: "Community health clinic nursing in rural Limpopo.",
    requirements: ["Enrolled Nursing Diploma", "SANC registration"],
    isVerified: true,
  },
  {
    id: "op-020", type: "job", title: "Remote Customer Support Agent",
    company: "Takealot", location: "Remote", province: "National",
    closingDate: "2026-12-05", postedDate: "2026-07-05",
    applyUrl: "https://takealotgroup.com/careers",
    salary: "R12 000 – R16 000",
    description: "Handle customer queries via chat and phone, work from home.",
    requirements: ["Matric", "Fluent English", "Stable internet"],
    isVerified: true,
  },
  {
    id: "op-021", type: "job", title: "EPWP General Worker — Tshwane",
    company: "City of Tshwane", location: "Pretoria", province: "Gauteng",
    closingDate: "2026-11-20", postedDate: "2026-07-03",
    applyUrl: "https://careers.tshwane.gov.za/",
    salary: "R3 500 – R4 500",
    description: "6-month municipal cleaning and greening project.",
    requirements: ["Unemployed", "Tshwane resident", "18-35 years"],
    isVerified: true,
  },
  {
    id: "op-022", type: "job", title: "Mine Safety Officer",
    company: "Valterra Platinum (formerly Anglo American Platinum)", location: "Rustenburg", province: "North West",
    closingDate: "2026-11-30", postedDate: "2026-07-01",
    applyUrl: "https://www.valterraplatinum.com/careers",
    salary: "R380 000 – R520 000 CTC",
    description: "Ensure underground safety compliance and conduct audits.",
    requirements: ["Mine Safety Cert", "3+ years mining exp", "SAMTRAC preferred"],
    isVerified: true,
  },

  // ============================================================
  // SAPS & MILITARY (Government Recruitment)
  // ============================================================
  {
    id: "op-saps-001", type: "job",
    title: "SAPS Recruitment 2026/2027 Intake",
    company: "South African Police Service", location: "National", province: "National",
    closingDate: "2027-12-31", postedDate: "2026-01-01",
    applyUrl: "https://www.saps.gov.za/careers/careers.php",
    salary: "R133 000 – R240 000 / year (Level 3-6)",
    description: "Join the SAPS as a Constable. Recruitment drives happen throughout the year. Check the website for the latest intakes and provincial drives.",
    requirements: ["Grade 12 (Matric)", "SA Citizen", "No criminal record", "Valid driver's license (advantage)", "18-35 years"],
    isVerified: true,
  },
  {
    id: "op-sandf-001", type: "job",
    title: "SANDF Military Skills Development System (MSDS) 2027",
    company: "South African National Defence Force", location: "National", province: "National",
    closingDate: "2027-03-27", postedDate: "2026-02-16",
    applyUrl: "https://defenceweb.co.za/wp-content/uploads/sa-defence/sa-defence/SANDF_MSDS_Application_2026_27.pdf",
    salary: "R120 000 – R216 000 / year",
    description: "The SANDF has no online application system — applications are made by downloading and completing the official form, then hand-delivering or posting it to your nearest regional recruitment office. Two-year voluntary contract with training in the SA Army, Navy, Air Force, or Military Health Service.",
    requirements: ["Grade 12 (Matric)", "SA Citizen, no dual citizenship", "18-22 years old (18-26 with a 3-year tertiary qualification)", "APS 18+ (excluding Life Orientation)", "Medically fit", "No criminal record"],
    isVerified: true,
    howToApply: [
      "Download the official MSDS 2026/27 application form (link above)",
      "Complete every section in clear, legible handwriting",
      "Attach certified copies of your ID and Grade 12 certificate (certification must be recent)",
      "Hand-deliver or post the completed form to your nearest Regional Recruitment Office — addresses are listed on the Department of Defence site (dod.mil.za)",
      "Applications must be submitted before 27 March 2026",
      "If you haven't been contacted by the end of December 2026, consider your application unsuccessful",
    ],
  },

  // ============================================================
  // NEW BURSARIES (Allan Gray, Motsepe, Coronation, etc.)
  // ============================================================
  {
    id: "op-burs-005", type: "bursary",
    title: "Allan Gray Orbis Foundation Fellowship",
    company: "Allan Gray Orbis Foundation", location: "National", province: "National",
    closingDate: "2026-04-30", postedDate: "2026-01-15",
    applyUrl: "https://allangrayorbis.org/programmes/fellowship/",
    salary: "Full tuition + accommodation + entrepreneurial development programme",
    description: "For Grade 11 learners (applying ahead of Grade 12) showing entrepreneurial potential. Covers undergraduate studies at partner universities, plus a 4-year entrepreneurial development programme. Note: this is the Allan Gray Orbis Foundation, a distinct entity from Allan Gray the investment company.",
    requirements: ["Grade 11 (applying for Grade 12 intake)", "SA Citizen", "Entrepreneurial mindset", "70%+ average (excl. Life Orientation)", "60%+ in Pure Maths or 80%+ in Maths Literacy"],
    isVerified: true,
  },
  {
    id: "op-burs-006", type: "bursary",
    title: "Motsepe Foundation Bursary",
    company: "Motsepe Foundation", location: "National", province: "National",
    closingDate: "2026-09-30", postedDate: "2026-02-01",
    applyUrl: "https://www.motsepefoundation.org/2026-bursary-applications",
    salary: "Full tuition + accommodation",
    description: "For disadvantaged students pursuing degrees in Engineering, Science, Commerce, and Health Sciences.",
    requirements: ["Grade 12 (Matric)", "SA Citizen", "Household income < R350k", "APS 30+"],
    isVerified: true,
  },
  {
    id: "op-burs-007", type: "bursary",
    title: "Coronation Fund Managers Bursary",
    company: "Coronation", location: "National", province: "National",
    closingDate: "2026-08-31", postedDate: "2026-03-01",
    applyUrl: "https://www.coronation.com/careers/",
    salary: "Full tuition + accommodation + vacation work",
    description: "For students studying Actuarial Science, Finance, Accounting, or Economics. Visit coronation.com/careers for details.",
    requirements: ["Grade 12 (Matric)", "SA Citizen", "APS 32+", "Mathematics & English"],
    isVerified: true,
  },
  {
    id: "op-burs-008", type: "bursary",
    title: "Old Mutual Bursary Programme",
    company: "Old Mutual", location: "National", province: "National",
    closingDate: "2026-07-31", postedDate: "2026-02-15",
    applyUrl: "https://www.oldmutual.co.za/careers/",
    salary: "Full tuition + accommodation + stipend",
    description: "For students in Actuarial Science, Finance, IT, and Data Science.",
    requirements: ["Grade 12 (Matric)", "SA Citizen", "APS 30+", "Mathematics"],
    isVerified: true,
  },

  // ============================================================
  // NEW ADDITIONS — every URL below individually verified via live web
  // search on 10 July 2026, using the company's own official careers page.
  // ============================================================
  {
    id: "op-023", type: "job",
    title: "Discover Graduate Programme 2027", company: "Vodacom", location: "Midrand", province: "Gauteng",
    closingDate: "2026-08-31", postedDate: "2026-06-15",
    applyUrl: "https://www.vodacom.com/discover-graduate-programme.php",
    salary: "Market-related + global rotation opportunities",
    description: "Two-year immersive leadership development programme with international exposure. Ends in a career-defining permanent role within Vodacom.",
    requirements: ["Completing undergraduate degree by end of 2026", "Less than 2 years' work experience", "65%+ academic average", "B-degree (B-Com, BSc, B-Tech) or equivalent NQF 7"],
    isVerified: true,
    linkedinUrl: "https://za.linkedin.com/company/vodacom/jobs",
  },
  {
    id: "op-024", type: "job",
    title: "Graduate Programme 2027", company: "Absa Group", location: "Johannesburg", province: "Gauteng",
    closingDate: "2026-09-30", postedDate: "2026-06-01",
    applyUrl: "https://www.absa.africa/careers/graduate-opportunities/",
    salary: "Market-related",
    description: "Structured graduate programme across Absa's banking and financial services divisions, with coaching, mentorship, and an Action Learning Project.",
    requirements: ["Relevant Honours degree or equivalent", "Strong academic record", "SA citizen or valid work permit"],
    isVerified: true,
    linkedinUrl: "https://www.linkedin.com/company/absa/jobs/",
  },
  {
    id: "op-025", type: "bursary",
    title: "Nedbank Graduate & Bursary Programme 2027", company: "Nedbank", location: "National", province: "National",
    closingDate: "2026-08-31", postedDate: "2026-05-01",
    applyUrl: "https://group.nedbank.co.za/careers/graduates-and-bursaries.html",
    salary: "Full tuition + allowance (bursary) / market-related (graduate programme)",
    description: "Nedbank's combined bursary and graduate programme portal for the 2027 academic year, covering finance, actuarial science, IT, and related fields.",
    requirements: ["65%+ average in relevant Grade 12/university subjects", "Admission to a SA public university", "Proof of financial need (bursary track)"],
    isVerified: true,
  },
  {
    id: "op-026", type: "internship",
    title: "Graduate Programmes 2027", company: "Deloitte South Africa", location: "Multiple", province: "National",
    closingDate: "2026-09-15", postedDate: "2026-05-20",
    applyUrl: "https://www.deloitte.com/za/en/careers/explore-your-fit/students/graduate-programmes.html",
    salary: "Market-related",
    description: "Graduate programmes spanning audit, advisory, consulting, legal services, and digital/technology at one of the Big Four professional services firms.",
    requirements: ["Relevant undergraduate or Honours degree", "Strong academic record", "SAICA-recognised qualification pathway (for audit/accounting streams)"],
    isVerified: true,
    linkedinUrl: "https://www.linkedin.com/company/deloitte/jobs",
  },
  {
    id: "op-027", type: "internship",
    title: "Graduate Programme 2027", company: "KPMG South Africa", location: "Multiple", province: "National",
    closingDate: "2026-09-30", postedDate: "2026-04-15",
    applyUrl: "https://kpmg.com/za/en/home/careers/graduates.html",
    salary: "Market-related",
    description: "KPMG's 2027 graduate intake spans audit, tax, advisory, technology, engineering, data science, and legal — one of the widest graduate intakes of any Big Four firm.",
    requirements: ["Honours degree or specific professional undergraduate degree (BEng, LLB, etc.)", "60-65%+ academic average", "Final-year students in 2026 eligible for the 2027 intake"],
    isVerified: true,
    linkedinUrl: "https://za.linkedin.com/company/kpmg-south-africa/jobs",
  },
  {
    id: "op-028", type: "internship",
    title: "Student Programmes / Graduate Programmes", company: "EY (Ernst & Young)", location: "Multiple", province: "National",
    closingDate: "2026-09-30", postedDate: "2026-04-15",
    applyUrl: "https://www.ey.com/en_za/careers/graduate-programmes-south-africa",
    salary: "Market-related",
    description: "EY South Africa's student and graduate programmes across assurance, consulting, strategy and transactions, and tax.",
    requirements: ["Relevant undergraduate or Honours degree", "Strong academic record"],
    isVerified: true,
  },
  {
    id: "op-029", type: "internship",
    title: "Graduate & Student Career Opportunities", company: "PwC South Africa", location: "Multiple", province: "National",
    closingDate: "2026-09-30", postedDate: "2026-04-15",
    applyUrl: "https://www.pwc.co.za/en/careers/students.html",
    salary: "Market-related",
    description: "PwC's undergraduate and graduate training opportunities across audit, tax, advisory, and technology consulting.",
    requirements: ["Relevant undergraduate or Honours degree", "Strong academic record"],
    isVerified: true,
    linkedinUrl: "https://www.linkedin.com/company/pwc/jobs",
  },
  {
    id: "op-030", type: "job",
    title: "Careers & Vacancies", company: "MTN South Africa", location: "Multiple", province: "National",
    closingDate: "2026-12-31", postedDate: "2026-06-01",
    applyUrl: "https://www.mtn.co.za/careers",
    salary: "Market-related",
    description: "MTN's official careers portal — telecommunications, engineering, IT, sales, and graduate opportunities across South Africa.",
    requirements: ["Varies by role — see individual listings on the portal"],
    isVerified: true,
  },
  {
    id: "op-033", type: "job",
    title: "Careers Portal — Store & Head Office Roles", company: "Woolworths", location: "Multiple", province: "National",
    closingDate: "2026-12-31", postedDate: "2026-07-01",
    applyUrl: "https://careers.woolworths.co.za/applicant/index.php",
    salary: "Market-related",
    description: "Woolworths' official careers portal for retail, buying/merchandising, supply chain, and head office roles. Note: Woolworths only recruits through this official site — WhatsApp/Facebook 'recruitment programme' posts are confirmed scams (per Africa Check).",
    requirements: ["Varies by role — see individual listings"],
    isVerified: true,
  },
  {
    id: "op-034", type: "job",
    title: "Careers — Pharmacy & Retail Roles", company: "Dis-Chem Pharmacies", location: "Multiple", province: "National",
    closingDate: "2026-12-31", postedDate: "2026-07-01",
    applyUrl: "https://dischem.simplify.hr/",
    salary: "Market-related",
    description: "Dis-Chem's official careers portal — pharmacy assistant, dispensary, retail, and support office roles across South Africa, Botswana and Namibia.",
    requirements: ["Varies by role — see individual listings"],
    isVerified: true,
  },
  {
    id: "op-035", type: "job",
    title: "Careers Portal — Retail & Pharmacy Roles", company: "Clicks Group", location: "Multiple", province: "National",
    closingDate: "2026-12-31", postedDate: "2026-07-01",
    applyUrl: "https://careers.clicksgroup.co.za/",
    salary: "Market-related",
    description: "Clicks Group's official careers portal covering Clicks retail stores, pharmacy, UPD distribution, and support office roles.",
    requirements: ["Varies by role — see individual listings"],
    isVerified: true,
  },
  {
    id: "op-036", type: "job",
    title: "Careers — Banking & Operations Roles", company: "Capitec Bank", location: "Multiple", province: "National",
    closingDate: "2026-12-31", postedDate: "2026-07-01",
    applyUrl: "https://www.capitecbank.co.za/about-us/careers/",
    salary: "Market-related",
    description: "Capitec's official careers page — operations, service, early-career, and graduate/intern opportunities in banking.",
    requirements: ["Varies by role — see individual listings"],
    isVerified: true,
  },
  {
    id: "op-037", type: "job",
    title: "Careers, Vacancies & Bursaries", company: "Investec", location: "Multiple", province: "National",
    closingDate: "2026-12-31", postedDate: "2026-07-01",
    applyUrl: "https://careers.investec.co.za/jobs/home/",
    salary: "Market-related",
    description: "Investec's official careers portal — banking, wealth management, and technology roles, plus sponsorship/bursary information for students.",
    requirements: ["Varies by role — see individual listings"],
    isVerified: true,
  },
  {
    id: "op-038", type: "bursary",
    title: "StudyTrust Bursary Programme 2027 — One Application, Multiple Sponsors",
    company: "StudyTrust", location: "National", province: "National",
    closingDate: "2026-09-30", postedDate: "2026-06-01",
    applyUrl: "https://studytrust.org.za/bursaries/",
    salary: "Full tuition + accommodation + meals + living allowance + laptop (varies by sponsor)",
    description: "StudyTrust (established 1974) is an independent educational trust that administers bursaries on behalf of Amazon, Standard Bank, Takealot, Toyota, Investec, Old Mutual, Cisco, and other sponsors. One application is automatically considered against every bursary you qualify for — no need to apply separately to each company.",
    requirements: ["SA Citizen", "50%+ average (varies by specific sponsor bursary)", "Proof of financial need", "Applications open 1 June, close 30 September"],
    isVerified: true,
  },
];

// ============================================================
// Helpers — Sorting, filtering, ranking
// ============================================================

export type SortKey = "latest" | "deadline" | "salary";

export function sortOpportunities(
  list: Opportunity[],
  key: SortKey = "latest"
): Opportunity[] {
  const sorted = [...list];
  if (key === "latest") {
    sorted.sort(
      (a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );
  } else if (key === "deadline") {
    sorted.sort(
      (a, b) =>
        new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime()
    );
  } else if (key === "salary") {
    // Naive sort by salary string
    sorted.sort((a, b) => {
      const ax = parseInt((a.salary || "").replace(/\D/g, "")) || 0;
      const bx = parseInt((b.salary || "").replace(/\D/g, "")) || 0;
      return bx - ax;
    });
  }
  return sorted;
}

export function filterOpportunities(
  list: Opportunity[],
  filters: {
    type?: OpportunityType | "all";
    province?: string;
    search?: string;
  }
): Opportunity[] {
  return list.filter((o) => {
    if (filters.type && filters.type !== "all" && o.type !== filters.type)
      return false;
    if (
      filters.province &&
      filters.province !== "all" &&
      o.province !== filters.province &&
      o.province !== "National"
    )
      return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = `${o.title} ${o.company} ${o.location} ${o.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatRelative(dateStr: string): string {
  const days = getDaysUntil(dateStr);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days > 0 && days <= 7) return `${days} days left`;
  if (days < 0 && days >= -3) return "Recently closed";
  if (days < -3) return "Closed";
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getRelativePosted(postedDate: string): string {
  // Clamp to 0: a postedDate that is today or in the future (bad/stale seed
  // data, clock drift, etc.) must never render as a negative number of days.
  const days = Math.max(0, -getDaysUntil(postedDate));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
