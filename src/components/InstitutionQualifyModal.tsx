"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  X,
  Loader2,
  Sparkles,
  Target,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import type { InstitutionQualifyResult, ProgrammeMatch } from "@/lib/qualify-institution";
import type { MatricSubject } from "@/lib/qualify";
import { MATRIC_SUBJECTS as SUBJECTS } from "@/lib/constants";

type Props = {
  institutionId: string;
  institutionName: string;
  open: boolean;
  onClose: () => void;
};

export function InstitutionQualifyModal({
  institutionId,
  institutionName,
  open,
  onClose,
}: Props) {
  const [aps, setAps] = useState("");
  const [subjects, setSubjects] = useState<MatricSubject[]>(["English", "Mathematics"]);
  const [subjectMarks, setSubjectMarks] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Removed auto-calculation. User must enter overall APS from certificate.
  const [result, setResult] = useState<InstitutionQualifyResult | null>(null);

  function toggleSubject(s: MatricSubject) {
    setSubjects((prev) => {
      const newSubjects = prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s];
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

  async function handleCheck() {
    setError("");
    const apsNum = parseInt(aps);
    if (!apsNum || apsNum < 1 || apsNum > 60) {
      setError("Enter a valid overall APS score (1-60)");
      return;
    }
    
    // Check for minimum 3 subject marks
    const subjectsWithMarks = subjects.filter(s => subjectMarks[s] && subjectMarks[s] > 0);
    if (subjectsWithMarks.length < 3) {
      setError("Please enter marks (0-100%) for at least 3 subjects");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/qualify-institution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ institutionId, aps: apsNum, subjects, subjectMarks }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not check qualification");
        setLoading(false);
        return;
      }
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError("");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-kk-navy/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-kk-navy via-kk-navy to-kk-navy-light p-6 text-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green shadow-glow">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-kk-green">
                Qualification Check
              </div>
              <h2 className="mt-0.5 font-display text-xl font-bold leading-tight">
                {result
                  ? `Your matches at ${institutionName}`
                  : `Check what you qualify for at ${institutionName}`}
              </h2>
              <p className="mt-0.5 text-xs text-white/60">
                Programmes scored vs your APS + subjects
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-7">
          {!result ? (
            <>
              <div className="space-y-5">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                    Your Overall APS Score
                  </label>
                  <input
                    type="number"
                    value={aps}
                    onChange={(e) => setAps(e.target.value)}
                    placeholder="e.g. 32"
                    min="1"
                    max="60"
                    className="w-full rounded-xl border border-kk-navy/10 bg-slate-50 px-4 py-3 text-2xl font-bold text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  />
                  <p className="mt-1 text-[11px] text-kk-navy/50">
                    Enter your total APS score as shown on your certificate
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                    Matric subjects & marks (0-100%) - Min 3 required
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {SUBJECTS.map((s) => {
                      const active = subjects.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSubject(s)}
                          className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition-all ${
                            active
                              ? "border-kk-blue bg-kk-blue text-white shadow-sm"
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
                  {subjects.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {subjects.map((s) => (
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

                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleCheck}
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Checking…
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Check qualification at {institutionName}
                    </span>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Headline */}
              <div className="rounded-2xl bg-gradient-to-br from-kk-blue/5 to-kk-green/5 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green text-white shadow-md">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-kk-navy">
                      {result.qualifiedCount} of {result.totalProgrammes}
                    </div>
                    <div className="text-xs text-kk-navy/60">
                      programmes you qualify for at {result.institution.name}
                      {result.nearMissCount > 0 &&
                        ` (+ ${result.nearMissCount} close calls)`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Programmes — match % per programme */}
              <div className="mt-5 space-y-2">
                <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-kk-navy/60">
                  <TrendingUp className="h-3.5 w-3.5" />
                  All programmes, ranked by match %
                </h3>
                {result.matches.map((m, i) => (
                  <ProgrammeRow key={i} m={m} rank={i + 1} />
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={reset}
                  className="rounded-xl border border-kk-navy/15 bg-white py-3 text-sm font-semibold text-kk-navy hover:bg-kk-navy/5"
                >
                  Check different APS / subjects
                </button>
                <Link
                  href={`/qualify?aps=${aps}&subjects=${subjects.join(",")}`}
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-3 text-sm font-bold text-white shadow-md hover:scale-[1.02]"
                >
                  See other institutions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-3 text-center text-[11px] text-kk-navy/50">
                💡 Want to compare {result.institution.name} with other universities?
                Click "See other institutions" above.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ProgrammeRow({ m, rank }: { m: ProgrammeMatch; rank: number }) {
  const pct = Math.round(m.matchPercentage);
  const barColor =
    pct >= 80
      ? "from-kk-green to-emerald-500"
      : pct >= 60
      ? "from-kk-blue to-cyan-500"
      : pct >= 40
      ? "from-amber-400 to-orange-500"
      : "from-red-400 to-rose-500";

  return (
    <div
      className={`rounded-xl border bg-white p-4 transition-colors ${
        m.qualified ? "border-kk-green/30" : "border-kk-navy/10"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                rank <= 3
                  ? "bg-gradient-to-br from-kk-blue to-kk-green text-white"
                  : "bg-kk-navy/5 text-kk-navy/60"
              }`}
            >
              {rank}
            </span>
            <h4 className="font-display text-sm font-bold text-kk-navy">
              {m.name}
            </h4>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-kk-navy/60">
            <span>📚 {m.level}</span>
            <span>⏱ {m.duration}</span>
            <span>📊 APS req: {m.apsRequired}</span>
            <span
              className={m.apsGap >= 0 ? "font-bold text-kk-green" : "font-bold text-amber-700"}
            >
              {m.apsGap >= 0 ? `+${m.apsGap}` : m.apsGap}
            </span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div
            className={`font-display text-xl font-bold ${
              m.qualified ? "text-kk-green" : pct >= 40 ? "text-amber-700" : "text-red-600"
            }`}
          >
            {pct}%
          </div>
          <div className="text-[9px] uppercase tracking-wider text-kk-navy/50">
            {m.qualified ? "✓ Qualify" : pct >= 60 ? "Close" : "Below"}
          </div>
        </div>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-kk-navy/5">
        <div
          className={`h-full bg-gradient-to-r ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <details className="mt-2">
        <summary className="cursor-pointer text-[10px] font-semibold text-kk-blue hover:underline">
          Why this score?
        </summary>
        <ul className="mt-1 space-y-0.5 pl-3 text-[10px] text-kk-navy/60">
          {m.reasons.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
