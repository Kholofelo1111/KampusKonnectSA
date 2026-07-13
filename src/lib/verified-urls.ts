// ============================================================
// Verified URL overrides & "How to apply" fallbacks
// Maps institution IDs and opportunity IDs to:
//   1. Verified applyUrl (replaces possibly-broken default)
//   2. Verified prospectusUrl (only if officially published)
//   3. applyInstructions[] (manual steps if no direct portal)
// All URLs verified Jan 2026 against official sites.
// ============================================================

export type UrlOverride = {
  applyUrl?: string;
  prospectusUrl?: string | null; // null = explicitly not available
  applyInstructions: string[];
};

// ============================================================
// PUBLIC UNIVERSITIES — Verified portals
// ============================================================
export const universityOverrides: Record<string, UrlOverride> = {
  up: {
    applyUrl: "https://www.up.ac.za/online-application",
    prospectusUrl: "https://www.up.ac.za/prospectuses",
    applyInstructions: [
      "Visit www.up.ac.za and click 'Apply'",
      "Click 'New Applicant' and register with your email address",
      "Verify your email and log in to the application portal",
      "Choose up to 2 study programmes",
      "Upload certified ID, latest school report or matric results",
      "Pay the R300 application fee (R600 international) via EFT",
      "Save your reference number and check status on the portal",
    ],
  },
  uj: {
    applyUrl: "https://www.uj.ac.za/admission-aid/undergraduate/",
    prospectusUrl: "https://www.uj.ac.za/study-at-uj/",
    applyInstructions: [
      "Visit www.uj.ac.za/studyatuj/apply",
      "Click 'New User Registration'",
      "Enter your ID/passport and create a profile",
      "Select your qualification (max 3 choices)",
      "Upload certified ID + latest results",
      "Pay R200 application fee (free if applying via UJ Open Day)",
      "Closing date: 30 September annually",
    ],
  },
  uct: {
    applyUrl: "https://applyonline.uct.ac.za/",
    prospectusUrl: "https://www.students.uct.ac.za/sites/default/files/content_migration/students_uct_ac_za/142/files/uct-undergraduate-prospectus.pdf",
    applyInstructions: [
      "Visit applyonline.uct.ac.za",
      "Register as a new applicant with email and ID",
      "Complete the online application form",
      "Upload Grade 11 results + Grade 12 mid-year results",
      "Submit National Benchmark Test (NBT) results",
      "Pay R100 application fee (R300 international)",
      "Closing date: 31 July 2026",
    ],
  },
  wits: {
    applyUrl: "https://www.wits.ac.za/applications/",
    prospectusUrl: "https://www.wits.ac.za/study-at-wits/",
    applyInstructions: [
      "Visit www.wits.ac.za/applications",
      "Click 'Apply Online'",
      "Create a candidate profile",
      "Select up to 2 qualification choices",
      "Upload matric results, ID and supporting docs",
      "Pay R100 application fee",
      "Some programmes require additional NBT or audition",
      "Closing date: 31 July 2026",
    ],
  },
  unisa: {
    applyUrl: "https://www.unisa.ac.za/sites/myunisa/default",
    prospectusUrl: "https://www.unisa.ac.za/sites/myunisa/default",
    applyInstructions: [
      "Visit www.unisa.ac.za and click 'Apply for Admission'",
      "Choose your qualification from the list",
      "Create a myUnisa account",
      "Complete the online application form",
      "Upload certified ID + senior certificate / academic record",
      "Pay R135 application fee",
      "You'll receive an applicant number — keep it safe",
    ],
  },
  tut: {
    applyUrl: "https://applications-prod.tut.ac.za/",
    prospectusUrl: "https://applications-prod.tut.ac.za/",
    applyInstructions: [
      "Visit www.tut.ac.za",
      "Click 'Apply for 2026' on the homepage",
      "Register as a new applicant",
      "Choose qualification + campus",
      "Upload matric results + ID",
      "Pay R240 application fee",
      "Closing date: 30 September",
    ],
  },
  nmu: {
    applyUrl: "https://applyonline.mandela.ac.za/",
    prospectusUrl: "https://www.mandela.ac.za/study-at-mandela",
    applyInstructions: [
      "Visit applications.mandela.ac.za",
      "Register and create a profile",
      "Select qualification (you may apply for up to 2)",
      "Upload matric results / latest school report",
      "Pay R100 application fee",
      "Closing date: 30 September",
    ],
  },
  nwu: {
    applyUrl: "https://studies.nwu.ac.za",
    prospectusUrl: "https://studies.nwu.ac.za",
    applyInstructions: [
      "Visit studies.nwu.ac.za",
      "Click 'Apply now' under your campus choice",
      "Create an applicant profile",
      "Choose qualification(s)",
      "Upload certified ID + matric/school results",
      "Pay R150 application fee",
      "Closing dates vary by campus and programme",
    ],
  },
  ul: {
    applyUrl: "https://www.ul.ac.za",
    prospectusUrl: "https://www.ul.ac.za/index.php?Entity=Prospectus",
    applyInstructions: [
      "Visit www.ul.ac.za and click 'Online Application'",
      "Register a new account",
      "Fill in personal, academic and programme details",
      "Upload certified ID, latest school report or matric certificate",
      "Pay R200 application fee",
      "You'll receive a student/reference number for tracking",
      "Closing date: 30 September",
    ],
  },
  univen: {
    applyUrl: "https://www.univen.ac.za",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.univen.ac.za",
      "Click 'Apply Online'",
      "Register and create an applicant profile",
      "Choose qualification (max 3 choices)",
      "Upload ID + matric / Grade 11 results",
      "Pay R100 application fee",
      "Closing date: 30 September",
    ],
  },
  cut: {
    applyUrl: "https://www.cut.ac.za",
    prospectusUrl: "https://www.cut.ac.za",
    applyInstructions: [
      "Visit www.cut.ac.za",
      "Click 'Online Application 2026'",
      "Register as a new applicant",
      "Select qualification + campus (Bloemfontein or Welkom)",
      "Upload certified ID + academic results",
      "Pay R200 application fee",
      "Closing date: 30 September",
    ],
  },
  cput: {
    applyUrl: "https://www.cput.ac.za",
    prospectusUrl: "https://www.cput.ac.za",
    applyInstructions: [
      "Visit www.cput.ac.za/study/apply",
      "Create an account on the applicant portal",
      "Select your qualification + campus",
      "Upload ID, latest school report or matric results",
      "Pay R100 application fee (free if applying online before 30 Sept)",
      "Closing date: 30 September",
    ],
  },
  dut: {
    applyUrl: "https://www.dut.ac.za/admissions/",
    prospectusUrl: "https://www.dut.ac.za",
    applyInstructions: [
      "Visit www.dut.ac.za and click 'Apply Online'",
      "Register on the applicant portal",
      "Select qualification (max 3 choices)",
      "Upload ID + matric / school report",
      "Pay R250 application fee",
      "Closing date: 30 September",
    ],
  },
  vut: {
    applyUrl: "https://www.vut.ac.za/apply",
    prospectusUrl: "https://www.vut.ac.za",
    applyInstructions: [
      "Visit www.vut.ac.za",
      "Click 'Apply Online'",
      "Register as a new applicant",
      "Select qualification",
      "Upload ID + matric results",
      "Pay R150 application fee",
      "Closing date: 30 September",
    ],
  },
  wsu: {
    applyUrl: "https://applications.wsu.ac.za/",
    prospectusUrl: "https://www.wsu.ac.za/en/study-with-us/application-and-registration/how-to-apply-the-process",
    applyInstructions: [
      "Visit applications.wsu.ac.za (the only official portal)",
      "Enter your ID/passport + email for OTP verification",
      "Receive your student number via email",
      "Choose up to 3 qualification choices",
      "Upload certified ID + matric results or Grade 11 results",
      "Submit your application (free)",
      "Email questions to: applicationsmth@wsu.ac.za (Mthatha) or applicationsbcc@wsu.ac.za (Buffalo City)",
    ],
  },
  smu: {
    applyUrl: "https://www.smu.ac.za/apply/",
    prospectusUrl: "https://www.smu.ac.za",
    applyInstructions: [
      "Visit www.smu.ac.za and click 'Apply'",
      "Register as a new applicant",
      "Select your health sciences programme",
      "Upload certified ID + matric / Grade 11 results",
      "Pay R200 application fee",
      "Closing date: 30 June (early due to high demand)",
    ],
  },
  ru: {
    applyUrl: "https://www.ru.ac.za/admissiongateway/",
    prospectusUrl: "https://www.ru.ac.za/admissiongateway",
    applyInstructions: [
      "Visit www.ru.ac.za/applications",
      "Click 'Apply Online'",
      "Register and complete the application form",
      "Upload ID + Grade 11 results + reference letter",
      "Pay R280 application fee (R450 international)",
      "Closing date: 30 September",
    ],
  },
  sun: {
    applyUrl: "https://www.maties.com/",
    prospectusUrl: "https://www.sun.ac.za/english/Documents/Yearbooks/Current/Undergraduate%20Prospectus%202026.pdf",
    applyInstructions: [
      "Visit www.maties.com (official applicant portal)",
      "Register as a new applicant",
      "Select up to 2 qualifications",
      "Upload ID + Grade 11 + Grade 12 mid-year results",
      "Pay R100 application fee (free if applying online by 31 July)",
      "Closing date: 31 July 2026",
    ],
  },
  ufh: {
    applyUrl: "https://www.ufh.ac.za/",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.ufh.ac.za/admissions",
      "Click 'Apply Online'",
      "Register a new account",
      "Select qualification + campus (Alice / East London / Bhisho)",
      "Upload ID + academic record",
      "Pay R120 application fee",
      "Closing date: 30 September",
    ],
  },
  unizulu: {
    applyUrl: "https://www.unizulu.ac.za",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.unizulu.ac.za and click 'Apply'",
      "Create an applicant account",
      "Choose qualification",
      "Upload ID + matric / Grade 11 results",
      "Pay R220 application fee",
      "Closing date: 30 September",
    ],
  },
  ump: {
    applyUrl: "https://www.ump.ac.za",
    prospectusUrl: "https://www.ump.ac.za",
    applyInstructions: [
      "Visit www.ump.ac.za and click 'Apply'",
      "Register as a new applicant",
      "Select qualification",
      "Upload ID + matric results",
      "Pay R150 application fee",
      "Closing date: 30 September",
    ],
  },
  spu: {
    applyUrl: "https://www.spu.ac.za",
    prospectusUrl: "https://www.spu.ac.za",
    applyInstructions: [
      "Visit www.spu.ac.za/admissions",
      "Click 'Apply Now'",
      "Register a new account",
      "Choose your qualification",
      "Upload ID + matric results / Grade 11",
      "Pay R100 application fee",
      "Closing date: 30 September",
    ],
  },
  ufs: {
    applyUrl: "https://www.ufs.ac.za/apply",
    prospectusUrl: "https://www.ufs.ac.za",
    applyInstructions: [
      "Visit www.ufs.ac.za/apply",
      "Register as a new applicant",
      "Select up to 3 qualifications",
      "Upload ID + Grade 11 + Grade 12 results",
      "Pay R510 application fee (R1100 international)",
      "Closing date: 30 September",
    ],
  },
  ukzn: {
    applyUrl: "https://applications.ukzn.ac.za/",
    prospectusUrl: "https://applications.ukzn.ac.za/",
    applyInstructions: [
      "Visit applications.ukzn.ac.za",
      "Register as a new user",
      "Choose qualification + campus (5 campuses)",
      "Upload ID + matric / Grade 11 results",
      "Pay R210 application fee (R420 international)",
      "Closing date: 30 September",
    ],
  },
  mut: {
    applyUrl: "https://www.mut.ac.za/apply",
    prospectusUrl: "https://www.mut.ac.za",
    applyInstructions: [
      "Visit www.mut.ac.za and click 'Apply Now'",
      "Register an applicant account",
      "Select qualification",
      "Upload ID + matric / Grade 11 results",
      "Pay R250 application fee",
      "Closing date: 30 September",
    ],
  },
};

// ============================================================
// PRIVATE UNIVERSITIES — Verified
// ============================================================
export const privateUniversityOverrides: Record<string, UrlOverride> = {
  "varsity-college": {
    applyUrl: "https://www.varsitycollege.co.za/apply-now",
    prospectusUrl: "https://www.varsitycollege.co.za",
    applyInstructions: [
      "Visit www.varsitycollege.co.za and click 'Apply Now'",
      "Choose your qualification + campus (8 campuses)",
      "Register and complete the application form",
      "Upload ID + matric results",
      "Pay R200 application fee",
      "An academic adviser will contact you within 48 hours",
    ],
  },
  eduvos: {
    applyUrl: "https://www.eduvos.com/apply-now/",
    prospectusUrl: "https://www.eduvos.com/apply-now",
    applyInstructions: [
      "Visit www.eduvos.com and click 'Apply Now'",
      "Choose qualification + campus (11 campuses)",
      "Register and submit your application online",
      "Upload ID + Grade 11 / matric results",
      "Pay R300 application fee",
      "Admissions consultant will contact you",
    ],
  },
  mancosa: {
    applyUrl: "https://www.mancosa.co.za/apply-now/",
    prospectusUrl: "https://www.mancosa.co.za",
    applyInstructions: [
      "Visit www.mancosa.co.za and click 'Apply Now'",
      "Choose your qualification (MBA, BCom, etc.)",
      "Complete the online application",
      "Upload ID + academic transcripts",
      "Pay R350 application fee",
      "All programmes are distance learning — apply any time",
    ],
  },
  stadio: {
    applyUrl: "https://www.stadio.ac.za/apply-now",
    prospectusUrl: "https://www.stadio.ac.za",
    applyInstructions: [
      "Visit www.stadio.ac.za and click 'Apply'",
      "Choose qualification (commerce, education, law, policing, fashion)",
      "Register and complete application",
      "Upload ID + academic record",
      "Pay R200 application fee",
      "Multiple intakes per year",
    ],
  },
  rosebank: {
    applyUrl: "https://www.rosebankcollege.co.za/apply",
    prospectusUrl: "https://www.rosebankcollege.co.za",
    applyInstructions: [
      "Visit www.rosebankcollege.co.za and click 'Apply Now'",
      "Choose qualification + campus (9 campuses)",
      "Register and complete the application form",
      "Upload ID + Grade 11 / matric results",
      "Pay R200 application fee",
      "Multiple intakes (January & July)",
    ],
  },
  afda: {
    applyUrl: "https://www.afda.co.za/apply/",
    prospectusUrl: "https://www.afda.co.za",
    applyInstructions: [
      "Visit www.afda.co.za and click 'Apply'",
      "Choose campus (Cape Town, JHB, Durban, PTA)",
      "Complete application + creative portfolio submission",
      "Upload ID + matric + creative work samples",
      "Pay R500 application fee",
      "Selection includes a creative review and interview",
    ],
  },
  richfield: {
    applyUrl: "https://www.richfield.ac.za",
    prospectusUrl: "https://www.richfield.ac.za",
    applyInstructions: [
      "Visit www.richfield.ac.za and click 'Apply'",
      "Choose your qualification (IT focus)",
      "Complete the online form",
      "Upload ID + academic record",
      "Pay R150 application fee",
      "Multiple intakes per year",
    ],
  },
  boston: {
    applyUrl: "https://www.boston.co.za/study-online/",
    prospectusUrl: "https://www.boston.co.za",
    applyInstructions: [
      "Visit www.boston.co.za and click 'Study Online'",
      "Choose qualification (40+ campuses + distance)",
      "Complete the application",
      "Upload ID + matric results",
      "Pay R200 application fee",
      "Rolling intakes throughout the year",
    ],
  },
  milpark: {
    applyUrl: "https://www.milpark.ac.za/contact-us",
    prospectusUrl: "https://www.milpark.ac.za",
    applyInstructions: [
      "Visit www.milpark.ac.za/apply",
      "Choose qualification (Business / Finance / Banking)",
      "Register and complete the application",
      "Upload ID + academic transcripts",
      "Pay R400 application fee",
      "Distance learning — apply any time",
    ],
  },
  regent: {
    applyUrl: "https://www.regent.ac.za/apply/",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.regent.ac.za and click 'Apply Online'",
      "Choose qualification (MBA, BCom, Public Mgmt)",
      "Register and complete application",
      "Upload ID + academic transcripts",
      "Pay R350 application fee",
      "Distance learning — apply any time",
    ],
  },
};

// ============================================================
// TVET COLLEGES — All website URLs verified, application is
// usually walk-in or via the college's "Apply" page on website
// ============================================================
const TVET_DEFAULT_INSTRUCTIONS = (name: string, website: string, phone?: string, email?: string) => [
  `Visit the official ${name} website: ${website}`,
  "Click 'Apply Now' or 'Admissions' on the homepage",
  "Download the application form (or apply online if available)",
  "Complete the form and gather: certified ID, Grade 9-12 results, proof of residence",
  "Submit to your nearest campus in person or by email",
  phone ? `Phone: ${phone} for help` : "Call the college for guidance",
  email ? `Email: ${email}` : "Apply walk-in at the nearest campus",
  "Application fee usually R100-R200 (some are free)",
  "Most TVETs have January and July intakes",
];

// Generated from data file — use the website URL since TVET-specific
// online portals are inconsistent. Override below for known portals.
export const tvetOverrides: Record<string, Partial<UrlOverride>> = {
  bccollege: {
    applyUrl: "https://www.bccollege.co.za",
    applyInstructions: TVET_DEFAULT_INSTRUCTIONS(
      "Buffalo City TVET College",
      "https://www.bccollege.co.za",
      "043 049 9201",
      "information@bccollege.co.za"
    ),
  },
  emcol: {
    applyUrl: "https://emc.coltech.co.za",
    applyInstructions: TVET_DEFAULT_INSTRUCTIONS(
      "Eastcape Midlands TVET College",
      "https://www.emcol.co.za",
      "041 995 2000",
      "info@emcol.co.za"
    ),
  },
  motheo: {
    applyUrl: "https://www.motheotvet.co.za",
    applyInstructions: TVET_DEFAULT_INSTRUCTIONS(
      "Motheo TVET College",
      "https://www.motheotvet.co.za",
      "051 406 9300"
    ),
  },
  // For all others, fall back to website + generic instructions
};

// ============================================================
// PRIVATE COLLEGES
// ============================================================
export const privateCollegeOverrides: Record<string, UrlOverride> = {
  damelin: {
    applyUrl: "https://www.damelin.co.za",
    prospectusUrl: "https://www.damelin.co.za",
    applyInstructions: [
      "Visit www.damelin.co.za and click 'Enquire Now'",
      "Choose your course (Business / IT / Educare / Beauty)",
      "Fill in the enquiry form — a consultant will contact you",
      "Or visit your nearest Damelin campus in person",
      "Bring ID + matric results + proof of residence",
      "Pay course fees (vary by qualification)",
    ],
  },
  lyceum: {
    applyUrl: "https://www.lyceum.co.za/programmes/",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.lyceum.co.za and click 'Apply Online'",
      "Choose qualification (distance learning)",
      "Complete the application form",
      "Upload ID + matric results",
      "Pay registration fee + monthly instalments",
    ],
  },
  intec: {
    applyUrl: "https://www.intec.edu.za",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.intec.edu.za and click 'Register Now'",
      "Choose your distance learning course",
      "Complete the online registration",
      "Upload ID + previous qualifications",
      "Pay registration fee — start any time",
    ],
  },
  "skills-academy": {
    applyUrl: "https://www.skillsacademy.co.za",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.skillsacademy.co.za/registration-form",
      "Choose your course",
      "Complete the registration form",
      "Pay registration fee — courses start any time",
      "Receive your study material via courier",
    ],
  },
  oxbridge: {
    applyUrl: "https://www.oxbridgeacademy.edu.za",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.oxbridgeacademy.edu.za/register",
      "Choose your N-course or skills programme",
      "Complete the online registration",
      "Pay course fee (R500-R1000 deposit)",
      "Material couriered within 7 days",
    ],
  },
  "matric-college": {
    applyUrl: "https://www.matriccollege.co.za",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.matriccollege.co.za and click 'Apply'",
      "Choose matric rewrite or upgrade course",
      "Complete the online application",
      "Upload ID + previous matric results",
      "Pay deposit + monthly instalments",
    ],
  },
  ctu: {
    applyUrl: "https://www.ctutraining.ac.za",
    prospectusUrl: "https://www.ctutraining.ac.za",
    applyInstructions: [
      "Visit ctutraining.ac.za and click 'Apply'",
      "Choose campus (10 campuses) + IT qualification",
      "Complete the online application",
      "Upload ID + matric results",
      "Pay R250 application fee",
      "Includes Microsoft & Cisco certifications",
    ],
  },
  "academy-it": {
    applyUrl: "https://www.academyofit.co.za",
    prospectusUrl: null,
    applyInstructions: [
      "Visit www.academyofit.co.za and click 'Apply'",
      "Choose specialist IT programme",
      "Complete enquiry form — consultant will contact you",
      "Upload ID + matric results",
      "Pay deposit + monthly fees",
    ],
  },
};

// ============================================================
// OPPORTUNITY URLs (jobs, learnerships, internships, bursaries)
// All verified against official career portals
// ============================================================
export const opportunityOverrides: Record<string, UrlOverride> = {
  // BURSARIES
  "op-001": {
    applyUrl: "https://www.sasolbursaries.com/welcome/",
    applyInstructions: [
      "Visit www.sasolbursaries.com",
      "Click 'Apply Now'",
      "Create an account with your email and ID",
      "Choose programme (Engineering / Science / IT)",
      "Upload matric results, ID, proof of residence",
      "Write a 200-300 word motivation letter",
      "Submit before 17 May 2026",
    ],
  },
  "op-002": {
    applyUrl: "https://my.nsfas.org.za",
    applyInstructions: [
      "Visit my.nsfas.org.za",
      "Click 'Register' and create a myNSFAS account",
      "Verify your email and ID via OTP",
      "Complete the funding application",
      "Upload: certified ID, parents/guardian ID, proof of income, consent form",
      "Submit before 31 January 2027",
      "Track status under 'Track Funding Progress'",
    ],
  },
  "op-003": {
    applyUrl: "https://www.eskom.co.za/careers",
    applyInstructions: [
      "Visit www.eskom.co.za/eskom-careers/eskom-bursaries",
      "Click 'Apply for a bursary'",
      "Register a candidate profile",
      "Complete the engineering bursary application",
      "Upload ID + matric + proof of income",
      "Submit before 30 September 2026",
    ],
  },
  "op-004": {
    applyUrl: "https://www.funzalushaka.doe.gov.za",
    applyInstructions: [
      "Visit www.funzalushaka.doe.gov.za",
      "Register a new account",
      "Complete the BEd bursary application",
      "Upload certified ID + matric results",
      "Accept the teaching service obligation",
      "Submit before 31 December 2026",
    ],
  },

  // LEARNERSHIPS
  "op-005": {
    applyUrl: "https://www.mict.org.za/learnerships/",
    applyInstructions: [
      "Visit www.mict.org.za/learnerships",
      "Click 'Apply' on the current MICT SETA IT learnership",
      "Register a learner profile",
      "Upload matric + ID + CV",
      "Complete the eligibility questionnaire",
      "Submit early — first-come, first-served",
    ],
  },
  "op-006": {
    applyUrl: "https://www.serviceseta.org.za",
    applyInstructions: [
      "Visit www.serviceseta.org.za",
      "Check 'Learnerships' or 'Discretionary Grants' for current openings",
      "Apply via the listed accredited training provider",
      "Submit: certified ID, matric, CV",
      "Must be unemployed, 18-35 years old",
    ],
  },
  "op-007": {
    applyUrl: "https://www.ewseta.org.za",
    applyInstructions: [
      "Visit www.ewseta.org.za/learnerships",
      "Find the Electrical Installation NQF 4 listing",
      "Apply via the listed accredited training provider",
      "Submit: certified ID, Grade 9 or higher, CV",
      "Some openings require a basic literacy assessment",
    ],
  },
  "op-008": {
    applyUrl: "https://www.mqa.org.za",
    applyInstructions: [
      "Visit www.mqa.org.za",
      "Click 'Learnerships' or current Rock Breaking opening",
      "Apply via the listed mining company training centre",
      "Submit: certified ID, matric, medical fitness certificate",
      "Must be 18-40 years and medically fit for underground work",
    ],
  },

  // INTERNSHIPS
  "op-009": {
    applyUrl: "https://www.standardbank.com/sbg/standard-bank-group/careers/early-careers",
    applyInstructions: [
      "Visit standardbank.com/sbg/.../graduate-programme",
      "Click 'Apply Now' on Software Engineering Intern role",
      "Create a candidate profile",
      "Upload CV + academic transcript + ID",
      "Complete online assessments (numerical + situational)",
      "Submit before 31 January 2027",
    ],
  },
  "op-010": {
    applyUrl: "https://bowmanslaw.com/careers/early-careers/",
    applyInstructions: [
      "Visit bowmanslaw.com/careers/early-careers",
      "Click 'Candidate Attorney Programme'",
      "Submit CV + academic transcript + cover letter",
      "Must have completed or be completing your LLB",
      "Selection includes assessment day + interviews",
      "Submit before 28 February 2027",
    ],
  },
  "op-011": {
    applyUrl: "https://www.eskom.co.za/careers",
    applyInstructions: [
      "Visit www.eskom.co.za/eskom-careers/work-integrated-learning",
      "Browse current engineering internships",
      "Apply via the linked job posting",
      "Upload CV + academic transcript",
      "Must be BEng student needing WIL placement",
    ],
  },
  "op-012": {
    applyUrl: "https://www.mtn.co.za/careers",
    applyInstructions: [
      "Visit www.mtn.com/careers",
      "Search 'Marketing Intern'",
      "Create candidate profile",
      "Upload CV + academic transcript",
      "Complete online assessment",
      "Submit before 30 April 2026",
    ],
  },

  // JOBS
  "op-013": {
    applyUrl: "https://www.discovery.co.za/corporate/careers",
    applyInstructions: [
      "Visit www.discovery.co.za/corporate/careers",
      "Click 'Search Jobs' (powered by Workday)",
      "Search 'Graduate Developer' or 'Junior Developer'",
      "Register a Workday profile",
      "Upload CV, ID, academic transcript",
      "Complete coding assessment (Java/Python)",
    ],
  },
  "op-014": {
    applyUrl: "https://www.shopriteholdings.co.za/careers.html",
    applyInstructions: [
      "Visit www.shopriteholdings.co.za/careers.html",
      "Click 'Search Jobs'",
      "Filter by 'General Worker' + your location",
      "Register a profile",
      "Upload CV + ID",
      "Or walk in to the nearest Shoprite store with CV",
    ],
  },
  "op-015": {
    applyUrl: "https://careers.picknpay.co.za/",
    applyInstructions: [
      "Visit careers.picknpay.co.za",
      "Search 'Cashier' + your location",
      "Register and complete application",
      "Upload CV + matric certificate",
      "Or apply in-store with printed CV",
    ],
  },
  "op-016": {
    applyUrl: "https://www.fidelity-services.com",
    applyInstructions: [
      "Visit www.fidelity-services.com/Vacancies",
      "Search 'Security Guard' + your area",
      "Submit CV + valid PSIRA certificate + clean criminal record",
      "Attend interview at branch office",
    ],
  },
  "op-017": {
    applyUrl: "https://www.bidvestfm.co.za/careers/",
    applyInstructions: [
      "Visit www.bidvestfm.co.za/careers",
      "Browse cleaner / facility vacancies in your area",
      "Submit CV + ID + reference letter",
      "Walk-in applications accepted at depots",
    ],
  },
  "op-018": {
    applyUrl: "https://www.transnet.net/Careers/Pages/Default.aspx",
    applyInstructions: [
      "Visit www.transnet.net/Careers",
      "Click 'Apply for vacancies'",
      "Search 'Driver Code 14'",
      "Upload CV + valid Code 14 licence + PDP",
      "Pass medical + driving assessment",
    ],
  },
  "op-019": {
    applyUrl: "https://www.health.gov.za",
    applyInstructions: [
      "Visit www.health.gov.za/recruitment",
      "Find the current Limpopo nursing vacancies bulletin",
      "Download Z83 form + complete it",
      "Attach CV + SANC certificate + ID + certified qualifications",
      "Email or hand-deliver to the listed HR office",
    ],
  },
  "op-020": {
    applyUrl: "https://www.takealot.com/jobs",
    applyInstructions: [
      "Visit www.takealot.com/jobs",
      "Search 'Customer Support' or 'Remote'",
      "Create candidate profile",
      "Upload CV + ID + internet speed test (min 10 Mbps)",
      "Complete online typing + customer service assessment",
    ],
  },
  "op-021": {
    applyUrl: "https://www.tshwane.gov.za/?page_id=4",
    applyInstructions: [
      "Visit www.tshwane.gov.za and click 'Careers'",
      "Find current EPWP recruitment notice",
      "Download Z83 application form",
      "Submit: completed Z83 + CV + ID + proof of Tshwane residency",
      "Drop off at listed Tshwane regional office",
      "Must be 18-35 and unemployed",
    ],
  },
  "op-022": {
    applyUrl: "https://www.angloamerican.com/careers",
    applyInstructions: [
      "Visit www.angloamerican.com/careers",
      "Search 'Safety Officer' + Rustenburg",
      "Register candidate profile",
      "Upload CV + Mine Safety Cert + SAMTRAC (preferred)",
      "Pass medical + safety competency assessment",
    ],
  },
};

// ============================================================
// API — Get verified URL info for any institution or opportunity
// ============================================================
export function getVerifiedUrls(
  type: "university" | "private-university" | "tvet" | "private-college" | "opportunity",
  id: string,
  fallback?: { website?: string; name?: string; phone?: string; email?: string }
): UrlOverride {
  let override: Partial<UrlOverride> | undefined;
  switch (type) {
    case "university":
      override = universityOverrides[id];
      break;
    case "private-university":
      override = privateUniversityOverrides[id];
      break;
    case "tvet":
      override = tvetOverrides[id];
      break;
    case "private-college":
      override = privateCollegeOverrides[id];
      break;
    case "opportunity":
      override = opportunityOverrides[id];
      break;
  }

  if (override?.applyInstructions) {
    return {
      applyUrl: override.applyUrl || fallback?.website,
      prospectusUrl: override.prospectusUrl ?? undefined,
      applyInstructions: override.applyInstructions,
    };
  }

  // TVET fallback — generic walk-in instructions
  if (type === "tvet" && fallback) {
    return {
      applyUrl: fallback.website,
      prospectusUrl: undefined,
      applyInstructions: TVET_DEFAULT_INSTRUCTIONS(
        fallback.name || "this college",
        fallback.website || "the college website",
        fallback.phone,
        fallback.email
      ),
    };
  }

  // Generic fallback
  return {
    applyUrl: fallback?.website,
    prospectusUrl: undefined,
    applyInstructions: [
      `Visit ${fallback?.website || "the official website"}`,
      "Look for 'Apply', 'Admissions' or 'Careers' in the main menu",
      "Register an applicant or candidate profile",
      "Complete the online form with personal + academic details",
      "Upload certified ID + supporting documents",
      "Pay any application fee",
      fallback?.phone ? `Phone: ${fallback.phone} for help` : "Contact the institution for assistance",
    ],
  };
}
