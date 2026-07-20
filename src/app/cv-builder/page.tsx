"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Sparkles,
  Download,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Star,
  Lock,
  Crown,
  Check,
  ArrowLeft,
  ArrowRight,
  X,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TEMPLATE_LIST, TemplateKey, CvData } from "@/components/cv-templates/types";
import { generateCvPdf } from "@/lib/cv-pdf-export";
import { ModernCorporate } from "@/components/cv-templates/ModernCorporate";
import { SimpleStudent } from "@/components/cv-templates/SimpleStudent";
import { Creative } from "@/components/cv-templates/Creative";
import { Z83Government } from "@/components/cv-templates/Z83Government";
import { SkillsBased } from "@/components/cv-templates/SkillsBased";

const WIZARD_STEPS = [
  { id: "template", label: "Template", icon: Sparkles },
  { id: "personal", label: "Personal", icon: User },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Award },
  { id: "preview", label: "Preview", icon: Eye },
];

const TEMPLATE_RENDERERS: Record<TemplateKey, (props: { data: CvData }) => React.JSX.Element> = {
  "modern-corporate": ModernCorporate,
  "simple-student": SimpleStudent,
  creative: Creative,
  "z83-government": Z83Government,
  "skills-based": SkillsBased,
};

export default function CvBuilderPage() {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState<TemplateKey>("modern-corporate");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [data, setData] = useState<CvData>({
    fullName: "Thandi Nkosi",
    email: "thandi.nkosi@email.com",
    phone: "+27 82 555 1234",
    location: "Johannesburg, Gauteng",
    summary:
      "Recent BCom IT graduate with strong Java, SQL and problem-solving skills. Seeking a junior developer role to apply academic knowledge in a fast-paced corporate environment.",
    education:
      "BCom Information Systems — University of Johannesburg (2022–2025)\n• Dean's Merit List 2024\n• Capstone: Inventory management system in Java/Spring",
    experience:
      "IT Intern — Standard Bank (Jan–Dec 2024)\n• Built internal dashboard used by 200+ staff\n• Reduced support tickets by 30% through automation",
    skills: "Java, Spring Boot, SQL, Git, REST APIs, Excel, Business Analysis",
    references: "Available on request",
    idNumber: "",
  });

  function update<K extends keyof CvData>(key: K, value: CvData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function handleTemplateChoose(t: TemplateKey) {
    const meta = TEMPLATE_LIST.find((x) => x.key === t)!;
    if (meta.premium) {
      setShowPremiumModal(true);
      return;
    }
    setTemplate(t);
    setStep(1);
  }

  const next = () => setStep((s) => Math.min(WIZARD_STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  function handleDownload() {
    alert("handleDownload called");
    setDownloadError(null);
    if (!data.fullName.trim()) {
      setDownloadError("Please add your full name before downloading (see Personal Info step).");
      return;
    }
    setDownloading(true);
    try {
      generateCvPdf(data, template);
    } catch {
      setDownloadError("Something went wrong generating your PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  const Renderer = TEMPLATE_RENDERERS[template];

  return (
    <>
      <PageHeader
        eyebrow="CV Builder"
        title="Professional CV in 7 steps"
        description="5 distinct templates — Modern Corporate, Student, Creative, Z83 Government, Skills-Based. Wizard-style builder."
        backHref="/"
        icon={<FileText className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Step indicator */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {WIZARD_STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = i === step;
              const done = i < step;
              return (
                <div key={s.id} className="flex items-center">
                  <button
                    onClick={() => setStep(i)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                      active
                        ? "bg-gradient-to-r from-kk-blue to-kk-green text-white shadow-md"
                        : done
                        ? "bg-kk-green/10 text-kk-green"
                        : "bg-white text-kk-navy/40 border border-kk-navy/10"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                        active
                          ? "bg-white/20"
                          : done
                          ? "bg-kk-green text-white"
                          : "bg-kk-navy/5"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {i < WIZARD_STEPS.length - 1 && (
                    <div
                      className={`h-px w-4 ${done ? "bg-kk-green" : "bg-kk-navy/10"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* STEP 0 — Template */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-kk-navy">
                  Choose a template
                </h2>
                <p className="mt-1 text-sm text-kk-navy/60">
                  5 visually different templates. 4 free + 1 premium.
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {TEMPLATE_LIST.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => handleTemplateChoose(t.key)}
                      className={`group relative overflow-hidden rounded-2xl border-2 bg-white p-6 text-left transition-all hover:-translate-y-1 hover:shadow-premium ${
                        template === t.key
                          ? "border-kk-blue shadow-md"
                          : "border-kk-navy/10"
                      }`}
                    >
                      {t.premium && (
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                          <Lock className="h-2.5 w-2.5" /> PREMIUM
                        </span>
                      )}
                      <div
                        className={`mb-4 h-2 w-full rounded-full bg-gradient-to-r ${t.gradient}`}
                      />
                      <h3 className="font-display text-base font-bold text-kk-navy">
                        {t.name}
                      </h3>
                      <p className="mt-1 text-xs text-kk-navy/60">{t.tagline}</p>
                      <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-kk-blue opacity-0 transition-opacity group-hover:opacity-100">
                        Choose this template <ArrowRight className="h-3 w-3" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1 — Personal */}
            {step === 1 && (
              <StepCard title="Personal Information" icon={User}>
                <Grid>
                  <Field label="Full name" value={data.fullName} onChange={(v) => update("fullName", v)} />
                  <Field label="Email" value={data.email} onChange={(v) => update("email", v)} type="email" />
                  <Field label="Phone" value={data.phone} onChange={(v) => update("phone", v)} />
                  <Field label="Location (City, Province)" value={data.location} onChange={(v) => update("location", v)} />
                  {template === "z83-government" && (
                    <Field
                      label="ID Number"
                      value={data.idNumber || ""}
                      onChange={(v) => update("idNumber", v)}
                      placeholder="0000000000000"
                      className="sm:col-span-2"
                    />
                  )}
                </Grid>
              </StepCard>
            )}

            {/* STEP 2 — Summary */}
            {step === 2 && (
              <StepCard title="Professional Summary" icon={FileText}>
                <p className="mb-3 text-xs text-kk-navy/60">
                  3-4 sentences about who you are, what you do, and what you're looking for.
                </p>
                <textarea
                  value={data.summary}
                  onChange={(e) => update("summary", e.target.value)}
                  rows={6}
                  className="w-full rounded-xl border border-kk-navy/10 px-4 py-3 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                />
              </StepCard>
            )}

            {/* STEP 3 — Education */}
            {step === 3 && (
              <StepCard title="Education" icon={GraduationCap}>
                <p className="mb-3 text-xs text-kk-navy/60">
                  List degrees, certifications, year of study, and key achievements.
                </p>
                <textarea
                  value={data.education}
                  onChange={(e) => update("education", e.target.value)}
                  rows={8}
                  placeholder="Degree — University (Year start-end)&#10;• Achievement 1&#10;• Achievement 2"
                  className="w-full rounded-xl border border-kk-navy/10 px-4 py-3 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                />
              </StepCard>
            )}

            {/* STEP 4 — Experience */}
            {step === 4 && (
              <StepCard title="Work Experience" icon={Briefcase}>
                <p className="mb-3 text-xs text-kk-navy/60">
                  Most recent first. Use bullet points and measurable results.
                </p>
                <textarea
                  value={data.experience}
                  onChange={(e) => update("experience", e.target.value)}
                  rows={10}
                  placeholder="Role — Company (Year-Year)&#10;• What you did&#10;• Measurable impact"
                  className="w-full rounded-xl border border-kk-navy/10 px-4 py-3 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                />
              </StepCard>
            )}

            {/* STEP 5 — Skills */}
            {step === 5 && (
              <StepCard title="Skills & References" icon={Award}>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                      Skills (comma-separated)
                    </label>
                    <input
                      value={data.skills}
                      onChange={(e) => update("skills", e.target.value)}
                      placeholder="Java, Excel, Leadership, Communication"
                      className="w-full rounded-xl border border-kk-navy/10 px-4 py-3 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                      References
                    </label>
                    <input
                      value={data.references}
                      onChange={(e) => update("references", e.target.value)}
                      className="w-full rounded-xl border border-kk-navy/10 px-4 py-3 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                    />
                  </div>
                </div>
              </StepCard>
            )}

            {/* STEP 6 — Preview */}
            {step === 6 && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-kk-navy">
                      Preview your CV
                    </h2>
                    <p className="text-sm text-kk-navy/60">
                      Template: {TEMPLATE_LIST.find((t) => t.key === template)?.name}
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 disabled:opacity-60"
                  >
                    <Download className="h-4 w-4" /> {downloading ? "Generating..." : "Download PDF"}
                  </button>
                </div>
                {downloadError && (
                  <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                    {downloadError}
                  </div>
                )}
                <div className="relative">
                  <div className="absolute inset-0 -z-10 translate-y-4 rounded-3xl bg-gradient-to-br from-kk-blue/20 to-kk-green/20 blur-2xl" />
                  <Renderer data={data} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Step nav buttons */}
        {step > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={back}
              className="inline-flex items-center gap-2 rounded-xl border border-kk-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-kk-navy hover:bg-kk-navy/5"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < WIZARD_STEPS.length - 1 ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-5 py-2.5 text-sm font-bold text-white shadow-md hover:scale-105"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-2 rounded-xl border border-kk-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-kk-navy hover:bg-kk-navy/5"
              >
                Start over
              </button>
            )}
          </div>
        )}
      </div>

      {/* Premium modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-kk-navy/60 p-4 backdrop-blur-sm"
            onClick={() => setShowPremiumModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-3xl bg-white p-8 shadow-2xl"
            >
              <button
                onClick={() => setShowPremiumModal(false)}
                className="absolute right-4 top-4 rounded-lg p-1 text-kk-navy/40 hover:bg-kk-navy/5"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg">
                  <Crown className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-center font-display text-2xl font-bold text-kk-navy">
                Premium template
              </h3>
              <p className="mt-2 text-center text-sm text-kk-navy/60">
                The Skills-Based template is available on our Scholar plan and above.
              </p>
              <Link
                href="/pricing"
                onClick={() => setShowPremiumModal(false)}
                className="mt-6 block w-full rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-3 text-center text-sm font-semibold text-white shadow-md"
              >
                View plans from R250/mo
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function StepCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof User;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-kk-navy/5 bg-white p-8 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green text-white shadow-md">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-display text-xl font-bold text-kk-navy">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className || ""}`}>
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-kk-navy/10 px-4 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
      />
    </label>
  );
}
