// ============================================================
// Central URL map for external application portals & PDFs.
// Each entry has the official, currently-live online
// application link and (where available) a prospectus PDF.
// ============================================================

export type ApplyLink = {
  applyUrl: string;
  prospectusUrl?: string;
  howToApply: string[];
};

export const universityLinks: Record<string, ApplyLink> = {
  up: {
    applyUrl: "https://www.up.ac.za/online-application",
    prospectusUrl: "https://www.up.ac.za/prospectuses",
    howToApply: [
      "Go to the UP online application portal",
      "Click 'New Applicant' and register with your email",
      "Verify your email and log in",
      "Select your programme and complete the form",
      "Upload certified ID, matric results (or transcript)",
      "Pay the R150 application fee via EFT/card",
      "Save your application reference number",
    ],
  },
  uj: {
    applyUrl: "https://www.uj.ac.za/apply",
    howToApply: [
      "Visit the UJ application portal",
      "Create an online application account",
      "Choose your programme of interest",
      "Upload certified documents",
      "Pay the R100 non-refundable fee",
      "Submit and track via the student portal",
    ],
  },
  uct: {
    applyUrl: "https://applyonline.uct.ac.za/",
    howToApply: [
      "Go to the UCT online application system",
      "Register a new applicant profile",
      "Select your programme(s) — max 2 choices",
      "Upload certified ID, APS evidence, and English results",
      "Pay the R100 fee",
      "Submit before 31 July 2026",
    ],
  },
  unisa: {
    applyUrl: "https://www.unisa.ac.za/apply",
    howToApply: [
      "Go to the UNISA online application portal",
      "Create a 'myUnisa' account if you don't have one",
      "Select your qualification from the list",
      "Upload supporting documents",
      "Pay the R110 application fee",
      "Submit and note your student number",
    ],
  },
  tut: {
    applyUrl: "https://applications-prod.tut.ac.za/",
    howToApply: [
      "Visit the TUT online application portal",
      "Create a new applicant account",
      "Select your programme",
      "Upload certified ID and academic results",
      "Pay the R240 application fee",
      "Submit before the faculty deadline",
    ],
  },
  nmmu: {
    applyUrl: "https://applyonline.mandela.ac.za/",
    howToApply: [
      "Go to the NMU online application portal",
      "Create a new profile",
      "Select your programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track status online",
    ],
  },
  nwu: {
    applyUrl: "https://www.nwu.ac.za/apply",
    howToApply: [
      "Visit the NWU online application portal",
      "Register a new account",
      "Choose your programme",
      "Upload certified ID and academic results",
      "Pay the R110 application fee",
      "Submit and check email for confirmation",
    ],
  },
  ul: {
    applyUrl: "https://www.ul.ac.za/apply",
    howToApply: [
      "Visit the UL online application portal",
      "Register as a new applicant",
      "Select your programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track via the student portal",
    ],
  },
  univen: {
    applyUrl: "https://www.univen.ac.za/apply",
    howToApply: [
      "Go to the Univen online application portal",
      "Create an account",
      "Select programme",
      "Upload documents",
      "Pay the R100 fee",
      "Submit and track",
    ],
  },
  cut: {
    applyUrl: "https://www.cut.ac.za/apply",
    howToApply: [
      "Visit the CUT online application portal",
      "Create an applicant account",
      "Select programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit before the faculty deadline",
    ],
  },
  cput: {
    applyUrl: "https://www.cput.ac.za/apply",
    howToApply: [
      "Go to the CPUT online application portal",
      "Create a new applicant profile",
      "Select your programme",
      "Upload certified ID and academic results",
      "Pay the R240 application fee",
      "Submit and track via the student portal",
    ],
  },
  dut: {
    applyUrl: "https://www.dut.ac.za/apply",
    howToApply: [
      "Visit the DUT online application portal",
      "Register a new applicant account",
      "Select your programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track status online",
    ],
  },
  vut: {
    applyUrl: "https://www.vut.ac.za/apply",
    howToApply: [
      "Go to the VUT online application portal",
      "Create a new applicant profile",
      "Select programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track",
    ],
  },
  wsu: {
    applyUrl: "https://www.wsu.ac.za/apply",
    howToApply: [
      "Visit the WSU online application portal",
      "Register as a new applicant",
      "Select programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track",
    ],
  },
  smu: {
    applyUrl: "https://www.smu.ac.za/apply",
    howToApply: [
      "Go to the SMU online application portal",
      "Create a new account",
      "Select your health science programme",
      "Upload certified ID and academic results",
      "Pay the R150 application fee",
      "Submit before the faculty deadline",
    ],
  },
  ru: {
    applyUrl: "https://www.ru.ac.za/apply",
    howToApply: [
      "Visit the Rhodes University online application portal",
      "Register as a new applicant",
      "Select your programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track",
    ],
  },
  sun: {
    applyUrl: "https://www.sun.ac.za/apply",
    howToApply: [
      "Go to the Stellenbosch online application portal",
      "Create a new account",
      "Select your programme",
      "Upload certified ID and academic results",
      "Pay the R150 application fee",
      "Submit before 31 July 2026",
    ],
  },
  ufh: {
    applyUrl: "https://www.ufh.ac.za/apply",
    howToApply: [
      "Visit the UFH online application portal",
      "Register as a new applicant",
      "Select your programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track status online",
    ],
  },
  unizulu: {
    applyUrl: "https://www.unizulu.ac.za/apply",
    howToApply: [
      "Go to the UniZulu online application portal",
      "Create a new applicant account",
      "Select your programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track",
    ],
  },
  ump: {
    applyUrl: "https://www.ump.ac.za/apply",
    howToApply: [
      "Visit the UMP online application portal",
      "Register as a new applicant",
      "Select programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track",
    ],
  },
  spu: {
    applyUrl: "https://www.spu.ac.za/apply",
    howToApply: [
      "Go to the SPU online application portal",
      "Create a new account",
      "Select your programme",
      "Upload certified documents",
      "Pay the R100 application fee",
      "Submit and track status online",
    ],
  },
};

export const bursaryLinks: Record<string, ApplyLink> = {
  nsfas: {
    applyUrl: "https://my.nsfas.org.za",
    prospectusUrl: "https://www.nsfas.org.za/content/uploads/2026/NSFAS-Guidelines-2026.pdf",
    howToApply: [
      "Go to my.nsfas.org.za (the official myNSFAS portal)",
      "Click 'Create Account' and register with your email and ID",
      "Verify your email via the link sent to you",
      "Log in and click 'Apply' on the dashboard",
      "Complete the online form (personal info, household income, institution)",
      "Upload certified ID, proof of income, matric results, consent form",
      "Submit your application — you'll get a reference number",
      "Track status regularly under 'Track Funding Progress'",
    ],
  },
  sasol: {
    applyUrl: "https://www.sasolbursaries.com/welcome/",
    howToApply: [
      "Go to the official Sasol bursary portal at sasolbursaries.com",
      "Create an account using your email and ID number",
      "Select the correct bursary programme (Engineering / Science / IT)",
      "Complete all sections: personal, academic, financial",
      "Upload certified matric results, ID, proof of residence",
      "Write your motivation letter (200-300 words)",
      "Submit before 17 May 2026",
    ],
  },
  eskom: {
    applyUrl: "https://www.eskom.co.za/careers/",
    howToApply: [
      "Visit the Eskom careers portal at eskom.co.za/careers",
      "Click 'Bursaries' and find the current cycle",
      "Register your profile with email and ID",
      "Complete the bursary application form",
      "Upload certified ID, academic results, proof of income",
      "Submit before 30 September 2026",
    ],
  },
  fdb: {
    applyUrl: "https://funzalushaka.dbe.gov.za",
    howToApply: [
      "Go to the Funza Lushaka portal at funzalushaka.dbe.gov.za",
      "Register a new account with your email",
      "Complete the BEd application form",
      "Upload certified ID and matric results",
      "Accept the teaching service obligation",
      "Submit before 31 December 2026",
    ],
  },
  anglo: {
    applyUrl: "https://www.angloamerican.com/careers",
    howToApply: [
      "Visit the Anglo American careers portal",
      "Create a candidate profile",
      "Navigate to 'Bursaries' under programmes",
      "Complete the mining/engineering bursary form",
      "Upload certified documents and a motivation letter",
      "Submit before 31 August 2026",
    ],
  },
  stdbank: {
    applyUrl: "https://www.standardbank.co.za/sasbb/standardbank/personal/student-solutions/bursaries",
    howToApply: [
      "Go to the Standard Bank bursary page",
      "Click 'Apply Now' and create a profile",
      "Complete the application form",
      "Upload certified ID, academic results, and motivation",
      "Submit before 30 September 2026",
    ],
  },
  absa: {
    applyUrl: "https://www.absa.co.za/absacoza/personal/careers/",
    howToApply: [
      "Visit the Absa careers portal",
      "Find the bursary programme section",
      "Create your profile",
      "Complete the online form",
      "Upload certified documents",
      "Submit before 30 June 2026",
    ],
  },
  fem: {
    applyUrl: "https://www.femfoundation.co.za",
    howToApply: [
      "Go to the FEM Foundation website",
      "Download the application form",
      "Complete it and gather certified documents",
      "Email to bursaries@femfoundation.co.za",
      "Submit before 31 August 2026",
    ],
  },
  nrf: {
    applyUrl: "https://www.nrf.ac.za",
    howToApply: [
      "Visit the NRF website",
      "Register on the NRF Research Grants portal",
      "Select your funding category (Honours / Masters / PhD)",
      "Complete the research proposal and CV",
      "Submit via your university's research office",
      "Deadline: 31 August 2026",
    ],
  },
  "women-in-eng": {
    applyUrl: "https://www.saice.org.za",
    howToApply: [
      "Visit the SAICE website",
      "Navigate to the Women in Engineering bursary",
      "Download the application form",
      "Complete and email with certified documents",
      "Submit before 31 October 2026",
    ],
  },
  capitec: {
    applyUrl: "https://www.capitecbank.co.za/careers/",
    howToApply: [
      "Go to the Capitec careers portal",
      "Find the bursary programme section",
      "Create a profile",
      "Complete the online application",
      "Upload certified documents",
      "Submit before 31 July 2026",
    ],
  },
};

export const jobLinks: Record<string, ApplyLink> = {
  j1: {
    applyUrl: "https://www.shopriteholdings.co.za/careers.html",
    howToApply: [
      "Visit the Shoprite careers portal",
      "Search for 'General Worker' in your area",
      "Create a candidate profile",
      "Upload your ID and CV",
      "Submit application",
      "Deadline: 15 November 2026",
    ],
  },
  j2: {
    applyUrl: "https://picknpay.wd3.myworkdayjobs.com/PNP_Careers",
    howToApply: [
      "Go to the Pick n Pay careers portal",
      "Search for cashier positions",
      "Create a profile and upload your CV",
      "Complete the application form",
      "Submit before 30 November 2026",
    ],
  },
  j3: {
    applyUrl: "https://fidelityservicesgroup.simplify.hr/",
    howToApply: [
      "Visit the Fidelity ADT careers portal",
      "Search for security guard positions",
      "Upload your PSIRA certificate and CV",
      "Complete the application",
      "Deadline: 20 November 2026",
    ],
  },
  j4: {
    applyUrl: "https://careers.discovery.co.za/",
    howToApply: [
      "Go to the Discovery careers portal",
      "Search for 'Graduate Developer'",
      "Create a profile and upload CV",
      "Complete the technical questionnaire",
      "Submit before 31 December 2026",
    ],
  },
  j5: {
    applyUrl: "https://bidvestfacilitiesmanagement.co.za/careers/",
    howToApply: [
      "Visit the Bidvest careers portal",
      "Search for cleaner positions",
      "Create a profile",
      "Upload your CV",
      "Submit before 10 November 2026",
    ],
  },
  j6: {
    applyUrl: "https://www.transnet.net/careers",
    howToApply: [
      "Go to the Transnet careers portal",
      "Search for 'Driver Code 14'",
      "Upload your licence, PDP and CV",
      "Complete the application",
      "Deadline: 25 November 2026",
    ],
  },
  j7: {
    applyUrl: "https://www.health.gov.za/vacancies/",
    howToApply: [
      "Visit the Department of Health careers portal",
      "Search for 'Enrolled Nurse'",
      "Upload your SANC registration and CV",
      "Submit application",
      "Deadline: 15 December 2026",
    ],
  },
  j8: {
    applyUrl: "https://www.valterraplatinum.com/careers",
    howToApply: [
      "Visit Anglo American Platinum careers",
      "Search for 'Safety Officer'",
      "Create a profile",
      "Upload your SAMTRAC and CV",
      "Submit before 30 November 2026",
    ],
  },
  j9: {
    applyUrl: "https://takealotgroup.com/careers",
    howToApply: [
      "Go to the Takealot Group careers portal",
      "Search for 'Remote Customer Support'",
      "Complete the online application",
      "Upload CV and proof of internet connection",
      "Deadline: 05 December 2026",
    ],
  },
  j10: {
    applyUrl: "https://careers.tshwane.gov.za/",
    howToApply: [
      "Visit the City of Tshwane careers portal",
      "Search for EPWP general worker",
      "Upload your ID and proof of Tshwane residency",
      "Submit before 20 November 2026",
    ],
  },
};

export const internshipLinks: Record<string, ApplyLink> = {
  i1: {
    applyUrl: "https://www.standardbank.co.za/sasbb/standardbank/personal/student-solutions/graduates",
    howToApply: [
      "Visit Standard Bank graduates portal",
      "Create a profile with your ID and academic details",
      "Select 'Software Engineering Intern'",
      "Upload your CV, transcript and ID",
      "Complete the online assessment",
      "Deadline: 31 January 2026",
    ],
  },
  i2: {
    applyUrl: "https://www.bowmanslaw.com/careers",
    howToApply: [
      "Go to the Bowmans careers page",
      "Navigate to 'Candidate Attorneys'",
      "Complete the application form",
      "Upload LLB transcript and CV",
      "Deadline: 28 February 2026",
    ],
  },
  i3: {
    applyUrl: "https://www.eskom.co.za/careers/",
    howToApply: [
      "Visit the Eskom careers portal",
      "Search for 'Engineering Intern'",
      "Create a profile and upload documents",
      "Submit before 30 June 2026",
    ],
  },
  i4: {
    applyUrl: "https://www.joburg.org.za/careers",
    howToApply: [
      "Go to the City of Johannesburg careers portal",
      "Search for 'Municipal Intern'",
      "Upload CV and academic certificate",
      "Submit before 15 March 2026",
    ],
  },
  i5: {
    applyUrl: "https://www.mtn.com/careers",
    howToApply: [
      "Visit the MTN careers portal",
      "Search for 'Marketing Intern'",
      "Create a profile",
      "Upload CV and academic transcript",
      "Deadline: 30 April 2026",
    ],
  },
};

export const learnershipLinks: Record<string, ApplyLink> = {
  l1: {
    applyUrl: "https://www.serviceseta.org.za/learnerships",
    howToApply: [
      "Go to the Services SETA learnerships portal",
      "Click 'Apply' on Business Administration NQF 5",
      "Create an account with your ID and email",
      "Upload your matric certificate and CV",
      "Complete the online questionnaire",
      "Submit before 30 November 2026",
    ],
  },
  l2: {
    applyUrl: "https://www.ewseta.org.za/learnerships",
    howToApply: [
      "Visit the EWSETA learnerships portal",
      "Select Electrical Installation NQF 4",
      "Create an account",
      "Upload your Grade 9 certificate and ID",
      "Submit before 15 December 2026",
    ],
  },
  l3: {
    applyUrl: "https://www.mictseta.org.za/learnerships",
    howToApply: [
      "Go to the MICT SETA learnerships portal",
      "Select IT Systems Support NQF 5",
      "Register with your ID and email",
      "Upload matric certificate and CV",
      "Submit before 30 November 2026",
    ],
  },
  l4: {
    applyUrl: "https://www.wrseta.org.za/learnerships",
    howToApply: [
      "Visit the W&R SETA learnerships portal",
      "Select Retail Sales NQF 4",
      "Create an account",
      "Upload matric certificate",
      "Submit before 20 December 2026",
    ],
  },
  l5: {
    applyUrl: "https://www.mqa.org.za/learnerships",
    howToApply: [
      "Go to the MQA learnerships portal",
      "Select Mining Rock Breaking NQF 4",
      "Register with your ID",
      "Upload matric certificate and medical fitness certificate",
      "Submit before 31 January 2027",
    ],
  },
  l6: {
    applyUrl: "https://www.sasseta.org.za/learnerships",
    howToApply: [
      "Visit the SASSETA learnerships portal",
      "Select Project Management NQF 5",
      "Create an account",
      "Upload matric certificate and CV",
      "Submit before 30 November 2026",
    ],
  },
};

export function getApplyLink(type: string, id: string): ApplyLink | null {
  const maps: Record<string, Record<string, ApplyLink>> = {
    universities: universityLinks,
    bursaries: bursaryLinks,
    jobs: jobLinks,
    internships: internshipLinks,
    learnerships: learnershipLinks,
  };
  return maps[type]?.[id] ?? null;
}
