// ============================================================
// Real CV PDF export — one layout per template, matching what's
// actually shown on screen (src/components/cv-templates/*.tsx).
//
// Previously "Download PDF" was a bare alert("Demo mode"), then later
// generated a single generic plain-text layout for all 5 templates —
// which is why a Creative-template CV downloaded looking nothing like
// the bold gradient/grid layout shown on screen.
//
// This version draws each template's real structure (sidebar, header
// banner, form table, colour blocks) using jsPDF's native fill/line/text
// primitives — NOT a screenshot (html2canvas etc). That distinction is
// what keeps this ATS-friendly: every word is real, selectable, parseable
// text in a standard font, just arranged to visually match the template.
//
// Standard PDF fonts (helvetica/times) don't render emoji reliably, so
// on-screen emoji section icons (✨ 🎓 💼) are replaced with plain text
// labels in the PDF — which is also better for ATS parsing anyway.
// ============================================================
import jsPDF from "jspdf";
import type { CvData, TemplateKey } from "@/components/cv-templates/types";

const PAGE_W = 210;
const PAGE_H = 297;

type RGB = [number, number, number];

function splitLines(doc: jsPDF, text: string, width: number): string[] {
  return doc.splitTextToSize((text || "").trim(), width) as string[];
}

function newPageIfNeeded(doc: jsPDF, y: number, needed: number, margin = 15): number {
  if (y + needed > PAGE_H - margin) {
    doc.addPage();
    return margin;
  }
  return y;
}

// ---------------------------------------------------------------
// 1. MODERN CORPORATE — dark navy sidebar (35%) + main content (65%)
// ---------------------------------------------------------------
function renderModernCorporate(doc: jsPDF, data: CvData) {
  const navy: RGB = [15, 27, 51];
  const blue: RGB = [37, 99, 235];
  const sidebarW = 70;

  doc.setFillColor(...navy);
  doc.rect(0, 0, sidebarW, PAGE_H, "F");

  let sy = 18;
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const nameLines = splitLines(doc, data.fullName, sidebarW - 16);
  nameLines.forEach((l) => {
    doc.text(l, 8, sy);
    sy += 7;
  });
  doc.setDrawColor(...blue);
  doc.setLineWidth(0.8);
  doc.line(8, sy + 1, sidebarW - 8, sy + 1);
  sy += 10;

  function sidebarSection(title: string, body: () => void) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(96, 165, 250);
    doc.text(title, 8, sy);
    sy += 6;
    doc.setTextColor(255, 255, 255);
    body();
    sy += 6;
  }

  sidebarSection("CONTACT", () => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    [data.email, data.phone, data.location].filter(Boolean).forEach((line) => {
      splitLines(doc, line!, sidebarW - 16).forEach((l) => {
        doc.text(l, 8, sy);
        sy += 5;
      });
    });
  });

  if (data.skills?.trim()) {
    sidebarSection("SKILLS", () => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      data.skills.split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => {
        splitLines(doc, `\u2022 ${s}`, sidebarW - 16).forEach((l) => {
          doc.text(l, 8, sy);
          sy += 5;
        });
      });
    });
  }

  if (data.references?.trim()) {
    sidebarSection("REFERENCES", () => {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      splitLines(doc, data.references, sidebarW - 16).forEach((l) => {
        doc.text(l, 8, sy);
        sy += 5;
      });
    });
  }

  // Main content area
  const mainX = sidebarW + 10;
  const mainW = PAGE_W - mainX - 15;
  let my = 20;

  function mainSection(title: string, content: string) {
    if (!content?.trim()) return;
    my = newPageIfNeeded(doc, my, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...navy);
    doc.text(title, mainX, my);
    my += 2;
    doc.setDrawColor(...blue);
    doc.setLineWidth(0.6);
    doc.line(mainX, my + 1.5, mainX + 14, my + 1.5);
    my += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    splitLines(doc, content, mainW).forEach((line) => {
      my = newPageIfNeeded(doc, my, 6);
      doc.text(line, mainX, my);
      my += 5.2;
    });
    my += 5;
  }

  mainSection("PROFESSIONAL SUMMARY", data.summary);
  mainSection("EXPERIENCE", data.experience);
  mainSection("EDUCATION", data.education);
}

// ---------------------------------------------------------------
// 2. SIMPLE STUDENT — centered header, generous single column, green accent
// ---------------------------------------------------------------
function renderSimpleStudent(doc: jsPDF, data: CvData) {
  const green: RGB = [5, 150, 105];
  const margin = 22;
  const width = PAGE_W - margin * 2;
  let y = 28;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(24);
  doc.setTextColor(15, 27, 51);
  doc.text(data.fullName || "Full Name", PAGE_W / 2, y, { align: "center" });
  y += 6;

  doc.setDrawColor(...green);
  doc.setLineWidth(0.5);
  doc.line(PAGE_W / 2 - 12, y, PAGE_W / 2 + 12, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(90, 90, 90);
  const contact = [data.email, data.phone, data.location].filter(Boolean).join("   \u00b7   ");
  doc.text(contact, PAGE_W / 2, y, { align: "center" });
  y += 14;

  function section(title: string, content: string) {
    if (!content?.trim()) return;
    y = newPageIfNeeded(doc, y, 18, margin);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.setTextColor(...green);
    doc.text(title, margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(50, 50, 50);
    splitLines(doc, content, width).forEach((line) => {
      y = newPageIfNeeded(doc, y, 6, margin);
      doc.text(line, margin, y);
      y += 5.4;
    });
    y += 8;
  }

  section("About Me", data.summary);
  section("Education", data.education);
  section("Experience & Internships", data.experience);
  section("Skills", data.skills);
  section("References", data.references);
}

// ---------------------------------------------------------------
// 3. CREATIVE — bold gradient-style header block + colour-accented sections
// ---------------------------------------------------------------
function renderCreative(doc: jsPDF, data: CvData) {
  const purple: RGB = [147, 51, 234];
  const pink: RGB = [219, 39, 119];
  const orange: RGB = [234, 88, 12];
  const margin = 15;
  const width = PAGE_W - margin * 2;

  // Header block (solid vivid colour — jsPDF has no native gradient fill)
  doc.setFillColor(...purple);
  doc.rect(0, 0, PAGE_W, 42, "F");

  const initials = (data.fullName || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, 10, 22, 22, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...purple);
  doc.text(initials, margin + 11, 24, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(data.fullName || "Full Name", margin + 28, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(data.location || "", margin + 28, 27);
  doc.text([data.email, data.phone].filter(Boolean).join("   \u00b7   "), margin + 28, 33);

  let y = 52;

  function block(title: string, content: string, color: RGB, wide = false) {
    if (!content?.trim()) return null;
    const lines = splitLines(doc, content, wide ? width - 10 : width / 2 - 12);
    const blockH = 12 + lines.length * 5;
    y = newPageIfNeeded(doc, y, blockH + 6);
    doc.setDrawColor(...color);
    doc.setLineWidth(1.2);
    doc.line(margin, y, margin, y + blockH);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...color);
    doc.text(title, margin + 4, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(50, 50, 50);
    let ly = y + 12;
    lines.forEach((line) => {
      doc.text(line, margin + 4, ly);
      ly += 5;
    });
    y += blockH + 6;
  }

  block("ABOUT", data.summary, purple, true);
  block("EDUCATION", data.education, pink, true);
  block("EXPERIENCE", data.experience, orange, true);

  if (data.skills?.trim()) {
    y = newPageIfNeeded(doc, y, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...purple);
    doc.text("SKILLS", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(50, 50, 50);
    const skillsLine = data.skills.split(",").map((s) => s.trim()).filter(Boolean).join("   \u2022   ");
    splitLines(doc, skillsLine, width).forEach((line) => {
      y = newPageIfNeeded(doc, y, 6);
      doc.text(line, margin, y);
      y += 5.2;
    });
    y += 6;
  }

  block("REFERENCES", data.references, orange, true);
}

// ---------------------------------------------------------------
// 4. Z83 GOVERNMENT — formal serif, boxed form tables, label/value rows
// ---------------------------------------------------------------
function renderZ83Government(doc: jsPDF, data: CvData) {
  const navy: RGB = [15, 27, 51];
  const margin = 18;
  const width = PAGE_W - margin * 2;
  let y = 18;

  doc.setFont("times", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...navy);
  doc.text("REPUBLIC OF SOUTH AFRICA", PAGE_W / 2, y, { align: "center" });
  y += 7;
  doc.setFontSize(16);
  doc.text("CURRICULUM VITAE", PAGE_W / 2, y, { align: "center" });
  y += 6;
  doc.setFont("times", "normal");
  doc.setFontSize(8.5);
  doc.text("Z83 Format \u00b7 Department of Public Service & Administration", PAGE_W / 2, y, { align: "center" });
  y += 3;
  doc.setDrawColor(...navy);
  doc.setLineWidth(0.8);
  doc.line(margin, y, PAGE_W - margin, y);
  y += 8;

  function formTableHeader(title: string) {
    y = newPageIfNeeded(doc, y, 14);
    doc.setFillColor(...navy);
    doc.rect(margin, y, width, 7, "F");
    doc.setFont("times", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title, margin + 3, y + 5);
    y += 7;
  }

  function row(label: string, value: string) {
    const lines = splitLines(doc, value || "\u2014", width * 0.63);
    const rowH = Math.max(7, lines.length * 5 + 2);
    y = newPageIfNeeded(doc, y, rowH);
    doc.setDrawColor(...navy);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, width, rowH);
    doc.line(margin + width * 0.35, y, margin + width * 0.35, y + rowH);
    doc.setFillColor(245, 247, 250);
    doc.rect(margin, y, width * 0.35, rowH, "F");
    doc.setFont("times", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...navy);
    doc.text(label.toUpperCase(), margin + 2, y + 5);
    doc.setFont("times", "normal");
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    let ly = y + 5;
    lines.forEach((l) => {
      doc.text(l, margin + width * 0.35 + 2, ly);
      ly += 5;
    });
    y += rowH;
  }

  function boxedBlock(title: string, content: string) {
    if (!content?.trim()) return;
    formTableHeader(title);
    const lines = splitLines(doc, content, width - 6);
    const blockH = lines.length * 5 + 6;
    y = newPageIfNeeded(doc, y, blockH);
    doc.setDrawColor(...navy);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, width, blockH);
    doc.setFont("times", "normal");
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    let ly = y + 5;
    lines.forEach((l) => {
      doc.text(l, margin + 3, ly);
      ly += 5;
    });
    y += blockH + 5;
  }

  formTableHeader("1. PERSONAL INFORMATION");
  row("Full Names", data.fullName);
  row("ID Number", data.idNumber || "\u2014");
  row("Postal Address", data.location);
  row("Email Address", data.email);
  row("Contact Number", data.phone);
  row("Nationality", "South African");
  y += 5;

  boxedBlock("2. EDUCATIONAL QUALIFICATIONS", data.education);
  boxedBlock("3. EMPLOYMENT HISTORY", data.experience);
  boxedBlock("4. SKILLS & COMPETENCIES", data.skills);
  boxedBlock("5. PROFILE STATEMENT", data.summary);
  boxedBlock("6. REFERENCES", data.references);

  y = newPageIfNeeded(doc, y, 30);
  y += 8;
  doc.setDrawColor(...navy);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + 70, y);
  doc.line(margin + 90, y, margin + 160, y);
  doc.setFont("times", "normal");
  doc.setFontSize(8);
  doc.text("SIGNATURE OF APPLICANT", margin, y + 5);
  doc.text("DATE", margin + 90, y + 5);
  y += 14;
  doc.setFont("times", "italic");
  doc.setFontSize(8);
  doc.text(
    "I hereby declare that the information furnished above is true and correct.",
    PAGE_W / 2,
    y,
    { align: "center" }
  );
}

// ---------------------------------------------------------------
// 5. SKILLS-BASED — amber banner header, skills-first, clean skill tags
//    (no fabricated proficiency percentages — see note in SkillsBased.tsx)
// ---------------------------------------------------------------
function renderSkillsBased(doc: jsPDF, data: CvData) {
  const amber: RGB = [217, 119, 6];
  const margin = 15;
  const width = PAGE_W - margin * 2;

  doc.setFillColor(...amber);
  doc.rect(0, 0, PAGE_W, 38, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(data.fullName || "Full Name", margin, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(data.location || "", margin, 23);
  doc.text([data.email, data.phone].filter(Boolean).join("   \u00b7   "), margin, 29);

  let y = 48;

  if (data.summary?.trim()) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    splitLines(doc, data.summary, width).forEach((line) => {
      y = newPageIfNeeded(doc, y, 6);
      doc.text(line, margin, y);
      y += 5;
    });
    y += 6;
  }

  if (data.skills?.trim()) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...amber);
    doc.text("CORE SKILLS & COMPETENCIES", margin, y);
    y += 7;

    const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);
    const colW = width / 2 - 3;
    let col = 0;
    let rowStartY = y;
    let rowMaxH = 0;

    skills.forEach((s) => {
      const x = margin + col * (colW + 6);
      const lines = splitLines(doc, s, colW - 6);
      const boxH = lines.length * 4.5 + 5;
      if (col === 0) rowStartY = y;
      rowMaxH = Math.max(rowMaxH, boxH);

      doc.setDrawColor(230, 200, 150);
      doc.setLineWidth(0.3);
      doc.rect(x, y, colW, boxH);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 30, 30);
      let ly = y + 4.5;
      lines.forEach((l) => {
        doc.text(l, x + 3, ly);
        ly += 4.5;
      });

      col++;
      if (col === 2) {
        col = 0;
        y = rowStartY + rowMaxH + 4;
        rowMaxH = 0;
        y = newPageIfNeeded(doc, y, 20);
      }
    });
    if (col === 1) y = rowStartY + rowMaxH + 4;
    y += 8;
  }

  function section(title: string, content: string) {
    if (!content?.trim()) return;
    y = newPageIfNeeded(doc, y, 18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...amber);
    doc.text(title, margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(50, 50, 50);
    splitLines(doc, content, width).forEach((line) => {
      y = newPageIfNeeded(doc, y, 6);
      doc.text(line, margin, y);
      y += 5;
    });
    y += 7;
  }

  section("PROFESSIONAL EXPERIENCE", data.experience);
  section("EDUCATION", data.education);
  section("REFERENCES", data.references);
}

const RENDERERS: Record<TemplateKey, (doc: jsPDF, data: CvData) => void> = {
  "modern-corporate": renderModernCorporate,
  "simple-student": renderSimpleStudent,
  creative: renderCreative,
  "z83-government": renderZ83Government,
  "skills-based": renderSkillsBased,
};

const FILE_LABEL: Record<TemplateKey, string> = {
  "modern-corporate": "Modern_Corporate",
  "simple-student": "Simple_Student",
  creative: "Creative",
  "z83-government": "Z83_Government",
  "skills-based": "Skills_Based",
};

export function generateCvPdf(data: CvData, template: TemplateKey): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  RENDERERS[template](doc, data);

  // Small footer watermark on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(180, 180, 180);
    doc.text("Generated with Kampus KonnectSA", 15, PAGE_H - 8);
  }

  const safeName = (data.fullName || "CV").replace(/[^a-z0-9]+/gi, "_");
  
  doc.save(`${safeName}_${FILE_LABEL[template]}.pdf`);
}
