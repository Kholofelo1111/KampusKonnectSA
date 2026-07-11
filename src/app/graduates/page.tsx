"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Search,
  ExternalLink,
  MapPin,
  Calendar,
  Briefcase,
  Sparkles,
  ArrowRight,
  Filter,
  Building2,
  Award,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Wrench,
  TrendingUp,
} from "lucide-react";

// Brand-coloured inline icons (lucide doesn't include LinkedIn/YouTube)
function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function Youtube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
import { PageHeader } from "@/components/PageHeader";
import {
  matchCourseToFields,
  AI_CAREER_VIDEOS,
  graduateOpportunities,
  type GraduateOpportunity,
} from "@/lib/graduate-opportunities";

// YES4Youth lives in /feed?type=learnership (at top). Not in graduates.
import {
  GRADUATE_FIELDS,
  getFieldById,
  buildLinkedInUrl,
  LINKEDIN_PROFILE_GUIDE,
  LINKEDIN_SIGNUP_URL,
} from "@/lib/linkedin";

const POPULAR_COURSES = [
  "BCom Accounting",
  "BSc IT / Computer Science",
  "BEng Mechanical Engineering",
  "BEng Civil Engineering",
  "BEng Electrical Engineering",
  "BSc Engineering (Mining)",
  "LLB",
  "BEd Foundation Phase",
  "BCom Marketing",
  "BCom Finance",
  "BSc Actuarial Science",
  "MBChB (Medicine)",
  "BNursing",
  "BPharm",
  "BA Communications",
  "BA Psychology",
  "BSc Data Science",
  "National Diploma IT",
  "BTech Engineering",
  "PGCE Teaching",
];

const POPULAR_INSTITUTIONS = [
  "University of Pretoria",
  "University of Johannesburg",
  "University of Cape Town",
  "University of the Witwatersrand",
  "UNISA",
  "Stellenbosch University",
  "TUT",
  "CPUT",
  "DUT",
  "UKZN",
  "UFS",
  "NWU",
  "NMU",
  "Rhodes University",
  "Walter Sisulu University",
  "Eduvos",
  "Varsity College",
  "MANCOSA",
  "TVET College",
  "Other",
];

function GraduatesInner() {
  const [course, setCourse] = useState("");
  const [institution, setInstitution] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "graduate">("all");
  const [showLinkedInGuide, setShowLinkedInGuide] = useState(false);

  const matchedFields = useMemo(() => matchCourseToFields(course), [course]);
  const fieldNames = matchedFields.map((id) => getFieldById(id)?.name || id);

  const matchedOpportunities = useMemo(() => {
    let list = graduateOpportunities;

    // Filter by course-matched fields
    if (matchedFields.length > 0) {
      list = list.filter((o) =>
        o.fields.some((f) => matchedFields.includes(f))
      );
    }

    // Free-text search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.company.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [course, search, activeTab, matchedFields]);

  // Build LinkedIn search URL for the user's chosen course
  const linkedInSearchUrl = useMemo(() => {
    if (course) {
      const fieldId = matchedFields[0];
      const field = fieldId ? getFieldById(fieldId) : null;
      const keywords = field?.linkedinKeywords || course;
      return buildLinkedInUrl({
        keywords,
        location: "South Africa",
        experienceLevel: "entry",
        datePosted: "week",
      });
    }
    return buildLinkedInUrl({
      keywords: "graduate",
      location: "South Africa",
      experienceLevel: "entry",
      datePosted: "week",
    });
  }, [course, matchedFields]);

  const showLinkedInPrompt = course && matchedOpportunities.length < 3;

  return (
    <>
      <PageHeader
        eyebrow="Graduate Hub"
        title="Graduate Opportunities"
        description="Find graduate programmes matched to your qualification + LinkedIn search + AI-career advice."
        backHref="/"
        icon={<GraduationCap className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Step 1 — Tell us about your qualification */}
        <div className="mb-8 rounded-3xl border border-kk-blue/20 bg-gradient-to-br from-kk-blue/5 to-kk-green/5 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-kk-navy">
                Step 1: Tell us what you studied
              </h2>
              <p className="mt-1 text-sm text-kk-navy/60">
                We'll match you with graduate programmes that accept your qualification.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                Your course / qualification
              </label>
              <input
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                list="course-suggestions"
                placeholder="e.g. BSc IT, BEng Civil, BCom Accounting"
                className="w-full rounded-xl border border-kk-navy/10 bg-white px-4 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
              />
              <datalist id="course-suggestions">
                {POPULAR_COURSES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                Institution (optional)
              </label>
              <select
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full rounded-xl border border-kk-navy/10 bg-white px-4 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
              >
                <option value="">Any institution</option>
                {POPULAR_INSTITUTIONS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {course && matchedFields.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-kk-navy/80 shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4 text-kk-green" />
              <span className="font-semibold">Matched to:</span>
              {fieldNames.map((f, i) => (
                <span
                  key={f}
                  className="rounded-full bg-kk-blue/10 px-2 py-0.5 text-xs font-semibold text-kk-blue"
                >
                  {f}
                </span>
              ))}
            </motion.div>
          )}
          {course && matchedFields.length === 0 && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-sm text-amber-800">
              <AlertCircle className="h-4 w-4" />
              We couldn't auto-match your course. Browse all opportunities or use LinkedIn search below.
            </p>
          )}
        </div>

        {/* YES4Youth banner — direct visitors to learnerships feed */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-orange-300/40 bg-gradient-to-br from-orange-50 to-amber-50 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
            <span className="text-xs font-extrabold">YES</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-kk-navy">Looking for YES4Youth?</p>
            <p className="mt-0.5 text-xs text-kk-navy/70">
              YES4Youth is a learnership programme. Find the official portal pinned at the top of our Learnerships feed.
            </p>
          </div>
          <Link
            href="/feed?type=learnership"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600"
          >
            Browse Learnerships <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company, title or keyword…"
              className="w-full rounded-xl border border-kk-navy/10 bg-white py-2.5 pl-10 pr-4 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
            />
          </div>
        </div>

        {/* Step 2 — Matched opportunities */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-kk-navy">
              Step 2: {course ? "Opportunities matched to you" : "Available opportunities"}
            </h2>
            <p className="text-sm text-kk-navy/60">
              {matchedOpportunities.length} opportunit
              {matchedOpportunities.length === 1 ? "y" : "ies"} found
            </p>
          </div>
        </div>

        {matchedOpportunities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-kk-navy/20 bg-white p-12 text-center">
            <Filter className="mx-auto h-10 w-10 text-kk-navy/30" />
            <p className="mt-3 font-semibold text-kk-navy">No direct matches found</p>
            <p className="mt-1 text-sm text-kk-navy/50">
              Try searching LinkedIn directly with your course keywords (button below) or
              browse all opportunities.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {matchedOpportunities.map((o) => (
              <OpportunityCard key={o.id} o={o} />
            ))}
          </div>
        )}

        {/* Step 3 — LinkedIn search */}
        <div className="mt-12 overflow-hidden rounded-3xl border-2 border-[#0A66C2]/20 bg-gradient-to-br from-[#0A66C2]/5 to-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0A66C2] text-white shadow-md">
              <Linkedin className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold text-kk-navy">
                Step 3: Get more opportunities on LinkedIn
              </h2>
              <p className="mt-2 text-sm text-kk-navy/70">
                LinkedIn has 10× more graduate roles than any single career portal. We've
                pre-built a search filtered for your course in South Africa, posted in the
                last 7 days.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={linkedInSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
                >
                  <Linkedin className="h-4 w-4" />
                  Search LinkedIn for "{course || "graduate jobs"}"
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => setShowLinkedInGuide(!showLinkedInGuide)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0A66C2] bg-white px-5 py-3 text-sm font-bold text-[#0A66C2] hover:bg-[#0A66C2]/5"
                >
                  <Sparkles className="h-4 w-4" />
                  {showLinkedInGuide ? "Hide" : "How to create a professional LinkedIn"}
                </button>
              </div>

              {showLinkedInPrompt && (
                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-900">
                        Few direct matches? Create a LinkedIn account
                      </p>
                      <p className="mt-1 text-sm text-amber-800">
                        90% of recruiters source candidates directly from LinkedIn. A
                        complete profile + the right keywords = recruiters find YOU.
                      </p>
                      <a
                        href={LINKEDIN_SIGNUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#0A66C2] px-4 py-2 text-xs font-bold text-white"
                      >
                        Create LinkedIn account (free)
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* LinkedIn Guide accordion */}
          {showLinkedInGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 rounded-2xl border border-kk-navy/10 bg-white p-6"
            >
              <h3 className="font-display text-lg font-bold text-kk-navy">
                10 steps to a professional LinkedIn profile
              </h3>
              <p className="mt-1 text-xs text-kk-navy/60">
                Follow these in order. Complete profiles get 40× more job offers than
                incomplete ones.
              </p>
              <ol className="mt-5 space-y-4">
                {LINKEDIN_PROFILE_GUIDE.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0A66C2] to-blue-600 text-xs font-bold text-white shadow-sm">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-semibold text-kk-navy">{s.title}</p>
                      <p className="mt-0.5 text-sm text-kk-navy/70">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href={LINKEDIN_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-5 py-3 text-sm font-bold text-white shadow-md"
              >
                <Linkedin className="h-4 w-4" />
                Start at linkedin.com/signup
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          )}
        </div>

        {/* Step 4 — Future-proof: AI replacement video */}
        <div className="mt-12 overflow-hidden rounded-3xl border-2 border-red-500/20 bg-gradient-to-br from-red-50/40 to-white">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
                <Youtube className="h-6 w-6" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                  <TrendingUp className="h-2.5 w-2.5" /> Future-proof your career
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold text-kk-navy">
                  Jobs AI is replacing in 2026
                </h2>
                <p className="mt-1 text-sm text-kk-navy/70">
                  Know which careers are at risk and which are AI-proof before you commit
                  to a graduate programme.
                </p>
              </div>
            </div>

            {/* Video grid */}
            <div className="mt-6 space-y-6">
              {AI_CAREER_VIDEOS.map((v) => (
                <div key={v.videoId} className="overflow-hidden rounded-2xl border border-kk-navy/5 bg-white shadow-sm">
                  <div className="relative aspect-video bg-kk-navy">
                    <iframe
                      src={v.embedUrl}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-kk-navy">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-xs text-kk-navy/60">
                      {v.channel} · {v.duration}
                    </p>
                    <p className="mt-2 text-sm text-kk-navy/70">{v.description}</p>
                    <a
                      href={v.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline"
                    >
                      Watch on YouTube
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* AI-proof career advice */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-kk-green/10 to-kk-blue/5 p-5">
              <h4 className="flex items-center gap-2 font-display text-base font-bold text-kk-navy">
                <Wrench className="h-5 w-5 text-kk-green" />
                AI-resistant career paths to consider
              </h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                {[
                  "Plumbing & Electrical",
                  "Healthcare (Nursing, Med)",
                  "Skilled trades (Welding)",
                  "Mental health professionals",
                  "Teaching & Childcare",
                  "Construction & Building",
                  "Renewable energy techs",
                  "Hairdressing & Beauty",
                  "Creative direction & Strategy",
                ].map((c) => (
                  <span
                    key={c}
                    className="rounded-lg bg-white px-3 py-2 font-medium text-kk-navy shadow-sm"
                  >
                    ✓ {c}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-kk-navy/60">
                💡 <strong>Tip:</strong> If you're choosing a graduate programme now,
                combine technical skills with human-centred ones (leadership,
                communication, creativity) — that's the AI-proof combo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function OpportunityCard({ o }: { o: GraduateOpportunity }) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium ${
        o.isYes4Youth ? "border-orange-300/50" : "border-kk-navy/5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              o.isYes4Youth
                ? "bg-gradient-to-br from-orange-500 to-amber-500"
                : "bg-gradient-to-br from-kk-blue to-kk-green"
            } text-white shadow-md`}
          >
            {o.isYes4Youth ? (
              <span className="text-xs font-extrabold">YES</span>
            ) : (
              <Briefcase className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              {o.isYes4Youth && (
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-700">
                  YES4Youth
                </span>
              )}
              <span className="rounded-full bg-kk-blue/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-kk-blue">
                {o.level}
              </span>
            </div>
            <h3 className="mt-1 font-display text-sm font-bold text-kk-navy leading-tight">
              {o.title}
            </h3>
            <p className="text-xs text-kk-navy/60">{o.company}</p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-kk-navy/70 line-clamp-2">{o.description}</p>

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-kk-navy/60">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {o.location}
        </span>
        {o.duration && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {o.duration}
          </span>
        )}
        {o.stipend && (
          <span className="inline-flex items-center gap-1 font-semibold text-kk-green">
            💰 {o.stipend}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {o.qualifications.slice(0, 3).map((q) => (
          <span
            key={q}
            className="rounded-full bg-kk-navy/5 px-2 py-0.5 text-[10px] text-kk-navy/70"
          >
            {q}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={o.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-md ${
            o.isYes4Youth
              ? "bg-gradient-to-r from-orange-500 to-amber-500"
              : "bg-gradient-to-r from-kk-blue to-kk-green"
          }`}
        >
          <ExternalLink className="h-3 w-3" />
          {o.isYes4Youth ? "Apply on sayouth.mobi" : "Apply Now"}
        </a>
        {o.applyInstructions && o.applyInstructions.length > 0 && (
          <details className="group/inst">
            <summary className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-kk-navy/15 bg-white px-3 py-2 text-xs font-bold text-kk-navy hover:bg-kk-navy/5">
              📋 How to apply
            </summary>
            <ol className="mt-2 space-y-1 rounded-xl bg-slate-50 p-3 text-[11px] text-kk-navy/70">
              {o.applyInstructions.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-kk-blue">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </details>
        )}
      </div>
    </article>
  );
}

export default function GraduatesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-kk-blue" />
        </div>
      }
    >
      <GraduatesInner />
    </Suspense>
  );
}
