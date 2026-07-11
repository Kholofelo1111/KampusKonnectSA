"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ExternalLink,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Loader2,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { InstitutionQualifyModal } from "@/components/InstitutionQualifyModal";
import { allInstitutions } from "@/lib/institutions";
import {
  MATRIC_SUBJECTS as SUBJECTS,
  STUDY_FIELDS as FIELDS,
  SA_PROVINCES as PROVINCES,
} from "@/lib/constants";
import type { QualifyResult, MatricSubject, FieldOfStudy } from "@/lib/qualify";

function QualifyPageInner() {
  const searchParams = useSearchParams();
  const instId = searchParams.get("inst");

  // If an institution is specified, show the institution-scoped modal directly
  const institution = instId ? allInstitutions.find((i) => i.id === instId) : null;
  const [showInstModal, setShowInstModal] = useState(!!instId);

  // Ensure modal opens when inst param changes
  useEffect(() => {
    if (instId) setShowInstModal(true);
  }, [instId]);

  const [aps, setAps] = useState(searchParams.get("aps") || "");
  const [selectedSubjects, setSelectedSubjects] = useState<MatricSubject[]>(() => {
    const fromUrl = searchParams.get("subjects");
    if (fromUrl) return fromUrl.split(",").filter(Boolean) as MatricSubject[];
    return ["English", "Mathematics"];
  });
  const [subjectMarks, setSubjectMarks] = useState<Record<string, number>>({});
  const [field, setField] = useState<FieldOfStudy | "">("");
  const [province, setProvince] = useState("");
  const [institutionType, setInstitutionType] = useState<"all" | "university" | "tvet">("all");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QualifyResult | null>(null);
  const [error, setError] = useState("");

  // Removed auto-calculation. User must enter overall APS from certificate.

  function toggleSubject(s: MatricSubject) {
    setSelectedSubjects((prev) => {
      const newSubjects = prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s];
      // Remove mark if subject is deselected
      if (prev.includes(s)) {
        const newMarks = { ...subjectMarks };
        delete newMarks[s];
        setSubjectMarks(newMarks);
      }
      return newSubjects;
    });
  }

  function updateSubjectMark(subject: MatricSubject, mark: number) {
    setSubjectMarks((prev) => ({ ...prev, [subject]: Math.min(100, Math.max(0, mark)) }));
  }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setError("");
      const apsNum = parseInt(aps);
      if (!apsNum || apsNum < 1 || apsNum > 60) {
        setError("Please enter a valid overall APS score (1-60).");
        return;
      }
      
      // Check for minimum 3 subject marks
      const subjectsWithMarks = selectedSubjects.filter(s => subjectMarks[s] && subjectMarks[s] > 0);
      if (subjectsWithMarks.length < 3) {
        setError("Please enter marks (0-100%) for at least 3 subjects.");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/qualify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            aps: apsNum,
            subjects: selectedSubjects,
            subjectMarks,
            field: field || undefined,
            province: province || undefined,
            institutionType,
          }),
        });
      const data = await res.json();
      setResult(data);
      setTimeout(() => {
        document.getElementById("qualify-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError("");
  }

  return (
    <>
      <PageHeader
        eyebrow="Eligibility Engine"
        title={institution ? `Check your match at ${institution.name}` : "Check if you qualify"}
        description={institution
          ? `See which programmes at ${institution.name} match your APS and subjects. Click "See other institutions" to expand your search.`
          : "Enter your APS, subjects and field of interest. We match you against real institution requirements — not generic advice."
        }
        backHref={institution ? `/opportunities/universities/${institution.id}` : "/"}
        icon={<Target className="h-6 w-6 text-white" />}
      />

      {/* Institution-specific modal — opens automatically when ?inst=xxx */}
      {institution && (
        <InstitutionQualifyModal
          institutionId={institution.id}
          institutionName={institution.name}
          open={showInstModal}
          onClose={() => setShowInstModal(false)}
        />
      )}

      {/* Banner when in institution mode */}
      {institution && !showInstModal && (
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-kk-blue/20 bg-kk-blue/5 p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-kk-blue" />
              <div>
                <p className="font-semibold text-kk-navy text-sm">
                  Showing qualification for <strong>{institution.name}</strong>
                </p>
                <p className="text-xs text-kk-navy/60">
                  Click below to see programme-specific results, or use the form to search all institutions.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInstModal(true)}
              className="shrink-0 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-4 py-2 text-xs font-bold text-white shadow-md hover:scale-105"
            >
              <Target className="mr-1.5 inline h-3.5 w-3.5" />
              Check {institution.short}
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 self-start lg:sticky lg:top-24"
          >
            <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-kk-navy">
                <Sparkles className="h-4 w-4 text-kk-blue" /> Step 1: Your Overall APS Score
              </h3>
              <input
                type="number"
                value={aps}
                onChange={(e) => setAps(e.target.value)}
                placeholder="e.g. 32"
                min="1"
                max="60"
                className="mt-3 w-full rounded-xl border border-kk-navy/10 bg-slate-50 px-4 py-3 text-2xl font-bold text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
              />
              <p className="mt-1 text-[11px] text-kk-navy/50">
                Enter your total APS score as shown on your certificate/report
              </p>
            </div>

            <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-kk-navy">
                <GraduationCap className="h-4 w-4 text-kk-green" /> Step 2: Matric Subjects & Marks
              </h3>
              <p className="mt-1 text-xs text-kk-navy/50">
                Select subjects and enter your marks (0-100%). Minimum 3 subjects required.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {SUBJECTS.map((s) => {
                  const active = selectedSubjects.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleSubject(s)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all ${
                        active
                          ? "border-kk-blue bg-kk-blue text-white shadow-md"
                          : "border-kk-navy/15 bg-white text-kk-navy hover:bg-kk-navy/5"
                      }`}
                    >
                      {active && "✓ "}
                      {s}
                    </button>
                  );
                })}
              </div>
              
              {/* Subject Mark Inputs */}
              {selectedSubjects.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {selectedSubjects.map((s) => (
                    <div key={s} className="relative">
                      <label className="mb-1 block text-[10px] font-bold uppercase text-kk-navy/50">
                        {s}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subjectMarks[s] || ""}
                        onChange={(e) => updateSubjectMark(s, parseInt(e.target.value) || 0)}
                        placeholder="%"
                        className="w-full rounded-lg border border-kk-navy/10 bg-slate-50 px-2 py-1.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-1 focus:ring-kk-blue/20"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-kk-navy">
                <Target className="h-4 w-4 text-orange-500" /> Step 3: What do you want to study?
              </h3>
              <select
                value={field}
                onChange={(e) => setField(e.target.value as FieldOfStudy)}
                className="mt-3 w-full rounded-xl border border-kk-navy/10 bg-slate-50 px-3 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
              >
                <option value="">Any field</option>
                {FIELDS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="mt-2 w-full rounded-xl border border-kk-navy/10 bg-slate-50 px-3 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
              >
                <option value="">Any province</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <div className="mt-4">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                  Institution Type
                </label>
                <div className="flex gap-2">
                  {[
                    { key: "all", label: "All" },
                    { key: "university", label: "Universities" },
                    { key: "tvet", label: "TVETs & Colleges" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setInstitutionType(t.key as any)}
                      className={`flex-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                        institutionType === t.key
                          ? "border-kk-blue bg-kk-blue text-white shadow-md"
                          : "border-kk-navy/15 bg-white text-kk-navy hover:bg-kk-navy/5"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Matching…
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Find my matches
                </span>
              )}
            </button>
          </form>

          {/* Results */}
          <div id="qualify-results">
            {!result ? (
              <div className="rounded-3xl border border-dashed border-kk-navy/20 bg-white p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-kk-blue/10 to-kk-green/10">
                  <Target className="h-8 w-8 text-kk-blue" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-kk-navy">
                  Your matches will appear here
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-kk-navy/60">
                  Fill in your APS, subjects and field on the left to see real institutions that
                  match your profile.
                </p>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Headline */}
                  <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-kk-navy via-kk-navy to-kk-navy-light p-6 text-white shadow-premium">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-kk-blue to-kk-green shadow-glow">
                        <CheckCircle2 className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold uppercase tracking-wider text-kk-green">
                          Qualification Result
                        </div>
                        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                          You qualify for{" "}
                          <span className="text-gradient">{result.totalQualified}</span>{" "}
                          programme{result.totalQualified === 1 ? "" : "s"}
                        </h2>
                        <p className="mt-2 text-sm text-white/80">{result.summary}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {result.recommendations.length > 0 && (
                    <div className="rounded-2xl border border-kk-blue/20 bg-gradient-to-br from-kk-blue/5 to-kk-green/5 p-5">
                      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-kk-blue">
                        <TrendingUp className="h-4 w-4" /> Recommendations
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {result.recommendations.map((r, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-kk-navy/80"
                          >
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-kk-blue" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Qualified matches */}
                  {result.matches.length > 0 && (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-kk-navy">
                        <CheckCircle2 className="h-5 w-5 text-kk-green" />
                        Matched Programmes ({result.matches.length})
                      </h3>
                      <div className="space-y-3">
                        {result.matches.map((m, i) => (
                          <MatchCard key={m.institution.id} match={m} rank={i + 1} qualified />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Near misses */}
                  {result.nearMisses.length > 0 && (
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-kk-navy">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        Close Calls ({result.nearMisses.length})
                      </h3>
                      <p className="mb-3 text-xs text-kk-navy/60">
                        You're close — small APS improvements or subject choices would qualify you.
                      </p>
                      <div className="space-y-3">
                        {result.nearMisses.map((m) => (
                          <MatchCard key={m.institution.id} match={m} qualified={false} />
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={reset}
                    className="mx-auto block rounded-xl border border-kk-navy/15 bg-white px-6 py-2.5 text-sm font-semibold text-kk-navy hover:bg-kk-navy/5"
                  >
                    Try different inputs
                  </button>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function MatchCard({
  match,
  rank,
  qualified,
}: {
  match: import("@/lib/qualify").ProgrammeMatch;
  rank?: number;
  qualified: boolean;
}) {
  const { institution, matchedField, apsGap, reasoning } = match;
  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-premium ${
        qualified ? "border-kk-green/20" : "border-amber-200"
      }`}
    >
      <div className="flex items-start gap-3 p-5">
        {rank && (
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
              qualified
                ? "bg-gradient-to-br from-kk-green to-emerald-500 text-white"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            #{rank}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-display text-base font-bold text-kk-navy">
              {institution.name}
            </h4>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                qualified
                  ? "bg-kk-green/15 text-kk-green"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {qualified
                ? `+${apsGap} APS`
                : `Short by ${Math.abs(apsGap)} APS`}
            </span>
            <span className="rounded-full bg-kk-blue/10 px-2 py-0.5 text-[10px] font-semibold text-kk-blue">
              {matchedField}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-kk-navy/60">
            <MapPin className="h-3 w-3" /> {institution.city}, {institution.province}
          </div>
          <ul className="mt-2 space-y-0.5">
            {reasoning.map((r, i) => (
              <li key={i} className="text-[12px] text-kk-navy/70">
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={institution.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-kk-blue to-kk-green px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:scale-105"
            >
              <ExternalLink className="h-3 w-3" /> Apply
            </a>
            {institution.prospectusUrl && (
              <a
                href={institution.prospectusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-kk-navy/15 bg-white px-3 py-1.5 text-xs font-semibold text-kk-navy hover:bg-kk-navy/5"
              >
                📄 Prospectus
              </a>
            )}
            <a
              href={institution.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-kk-navy/15 bg-white px-3 py-1.5 text-xs font-semibold text-kk-navy hover:bg-kk-navy/5"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function QualifyPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[80vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-kk-blue" /></div>}>
      <QualifyPageInner />
    </Suspense>
  );
}
