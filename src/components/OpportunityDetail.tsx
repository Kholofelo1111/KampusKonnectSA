// Shared opportunity detail page component with Qualification Checker
"use client";

import { useState, useEffect } from "react";
import {
  ExternalLink,
  Calendar,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Target,
  X,
  Loader2,
  Sparkles,
  AlertCircle,
  Clock,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { downloadIcs } from "@/lib/ics";
import { addRecentlyViewed } from "@/lib/recently-viewed";
import { InstitutionQualifyModal } from "./InstitutionQualifyModal";
import { getApplicationStatus } from "@/lib/institutions";

type OpportunityDetailProps = {
  type: string;
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  deadline?: string;
  openingDate?: string;
  applyUrl?: string;
  prospectusUrl?: string;
  howToApply?: string[];
  metaItems?: { label: string; value: string }[];
  coverItems?: string[];
  requirements?: string[];
  backUrl: string;
  email?: string;
};

type QualificationResult = {
  qualified: boolean;
  matchPercentage: number;
  matchedRequirements: string[];
  missingRequirements: string[];
  message: string;
};

export function OpportunityDetail({
  type,
  id,
  title,
  subtitle,
  description,
  deadline,
  openingDate,
  applyUrl,
  prospectusUrl,
  howToApply,
  metaItems,
  coverItems,
  requirements,
  backUrl,
  email,
}: OpportunityDetailProps) {
  const [showQualifyModal, setShowQualifyModal] = useState(false);
  const [showInstitutionQualify, setShowInstitutionQualify] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savingBookmark, setSavingBookmark] = useState(false);

  useEffect(() => {
    addRecentlyViewed({
      id: `${type}-${id}`,
      type,
      title,
      subtitle,
      href: `/opportunities/${type}/${id}`,
    });
    // Check whether this item is already bookmarked, so the button shows
    // the right state on load instead of always starting "unsaved".
    fetch("/api/bookmarks")
      .then((res) => (res.ok ? res.json() : { bookmarks: [] }))
      .then((data) => {
        const bookmarks = data.bookmarks || [];
        setIsSaved(bookmarks.some((b: { itemType: string; itemId: string }) => b.itemType === type && b.itemId === id));
      })
      .catch(() => {}); // not signed in, or request failed — leave as unsaved
    // Only track/check once per mount — re-running on every render would
    // just bump the same item's timestamp repeatedly for no benefit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id]);

  async function toggleSave() {
    setSavingBookmark(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: type,
          itemId: id,
          title,
          metadata: { href: `/opportunities/${type}/${id}`, subtitle },
        }),
      });
      if (res.status === 401) {
        window.location.href = `/sign-in?callbackUrl=/opportunities/${type}/${id}`;
        return;
      }
      if (res.ok) setIsSaved((s) => !s);
    } finally {
      setSavingBookmark(false);
    }
  }

  // Compute application status for institutions
  const isInstitution = type === "universities";
  const appStatus = isInstitution ? getApplicationStatus(openingDate, deadline) : null;
  const statusLabel =
    appStatus === "open"
      ? "Open"
      : appStatus === "closed"
      ? "Closed"
      : appStatus === "opening-soon"
      ? "Opening Soon"
      : null;
  const statusColor =
    appStatus === "open"
      ? "bg-kk-green/15 text-kk-green border-kk-green/30"
      : appStatus === "closed"
      ? "bg-red-100 text-red-700 border-red-200"
      : "bg-amber-100 text-amber-700 border-amber-200";
  const [qualificationResult, setQualificationResult] = useState<QualificationResult | null>(null);
  const [userProfile, setUserProfile] = useState({
    aps: "",
    province: "",
    matric: "",
  });

  const handleAddToCalendar = () => {
    if (deadline) {
      downloadIcs({
        title: `${title} - Application Deadline`,
        startDate: deadline,
        description: `Application deadline for ${subtitle || title}`,
        url: applyUrl,
      });
    }
  };

  const handleDownloadProspectus = () => {
    if (prospectusUrl) {
      window.open(prospectusUrl, "_blank");
    } else {
      toast.error("Prospectus not available for this opportunity. Please contact the institution directly.");
    }
  };

  const handleApply = () => {
    if (applyUrl) {
      window.open(applyUrl, "_blank");
    }
  };

  const checkQualification = () => {
    // Simple qualification logic based on APS and requirements
    const userAps = parseInt(userProfile.aps);
    const userProvince = userProfile.province.toLowerCase();
    const userMatric = userProfile.matric.toLowerCase();

    if (!userAps) {
      setQualificationResult({
        qualified: false,
        matchPercentage: 0,
        matchedRequirements: [],
        missingRequirements: ["Please enter your APS score"],
        message: "We need your APS score to check eligibility.",
      });
      return;
    }

    // Parse requirements to check qualification
    const matched: string[] = [];
    const missing: string[] = [];
    let matchCount = 0;
    let totalChecks = 0;

    // Check APS requirement (if mentioned in requirements)
    if (requirements && requirements.length > 0) {
      requirements.forEach((req) => {
        totalChecks++;
        const lowerReq = req.toLowerCase();

        // Check APS match
        const apsMatch = lowerReq.match(/aps\s*(\d+)/i);
        if (apsMatch) {
          const requiredAps = parseInt(apsMatch[1]);
          if (userAps >= requiredAps) {
            matched.push(`APS ${userAps} meets requirement of ${requiredAps}`);
            matchCount++;
          } else {
            missing.push(`APS ${userAps} below requirement of ${requiredAps}`);
          }
        } else if (lowerReq.includes("matric") || lowerReq.includes("grade 12")) {
          if (userMatric.includes("passed") || userMatric.includes("completed") || userMatric.includes("2024") || userMatric.includes("2023")) {
            matched.push(`Matric completed`);
            matchCount++;
          } else {
            missing.push(`Matric/Grade 12 required`);
          }
        } else if (lowerReq.includes("gauteng") || lowerReq.includes("western cape") || lowerReq.includes("kwazulu")) {
          if (userProvince && lowerReq.includes(userProvince)) {
            matched.push(`Province match`);
            matchCount++;
          } else if (lowerReq.includes("national") || lowerReq.includes("south africa")) {
            matched.push(`Open to all provinces`);
            matchCount++;
          } else {
            missing.push(`Province requirement may not match`);
          }
        } else {
          // Generic requirement - give partial credit
          matched.push(`Requirement: ${req}`);
          matchCount += 0.5;
        }
      });
    }

    const matchPercentage = totalChecks > 0 ? Math.round((matchCount / totalChecks) * 100) : 50;
    const qualified = matchPercentage >= 70;

    setQualificationResult({
      qualified,
      matchPercentage,
      matchedRequirements: matched,
      missingRequirements: missing,
      message: qualified
        ? `Great news! You appear to qualify for ${title} with a ${matchPercentage}% match.`
        : `You may not fully qualify ( ${matchPercentage}% match). Consider improving your APS or looking at similar opportunities.`,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={backUrl}
        className="inline-flex items-center gap-2 text-sm font-medium text-kk-blue hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {type}
      </Link>

      <div className="mt-6 rounded-3xl border border-kk-navy/10 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-3xl font-bold text-kk-navy">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-lg text-kk-navy/60">{subtitle}</p>
            )}
          </div>
          {statusLabel && (
            <span
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusColor}`}
            >
              {appStatus === "open" && <CheckCircle2 className="h-3.5 w-3.5" />}
              {appStatus === "closed" && <X className="h-3.5 w-3.5" />}
              {appStatus === "opening-soon" && <Clock className="h-3.5 w-3.5" />}
              Applications {statusLabel}
            </span>
          )}
        </div>

        {/* Opening + closing dates */}
        {isInstitution && (openingDate || deadline) && (
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {openingDate && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-kk-blue/10 px-3 py-1.5 text-kk-blue font-semibold">
                <Calendar className="h-3.5 w-3.5" /> Opens: {openingDate}
              </span>
            )}
            {deadline && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-pink-100 px-3 py-1.5 text-pink-700 font-semibold">
                <Clock className="h-3.5 w-3.5" /> Closes: {deadline}
              </span>
            )}
          </div>
        )}

        {description && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-kk-navy">Overview</h2>
            <p className="mt-2 text-base text-kk-navy/70 leading-relaxed">{description}</p>
          </div>
        )}

        {metaItems && metaItems.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-kk-navy">Details</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {metaItems.map((item, i) => (
                <div key={i} className="rounded-xl bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-kk-navy/50">
                    {item.label}
                  </div>
                  <div className="mt-1 font-semibold text-kk-navy">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {coverItems && coverItems.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-kk-navy">What's Covered</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {coverItems.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full bg-kk-green/10 px-3 py-1 text-sm font-medium text-kk-green"
                >
                  <CheckCircle2 className="h-4 w-4" /> {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {requirements && requirements.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-kk-navy">Requirements</h2>
            <ul className="mt-3 space-y-2">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-kk-navy/70">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kk-blue" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {howToApply && howToApply.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-kk-navy">How to Apply</h2>
            <ol className="mt-3 space-y-2">
              {howToApply.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-kk-navy/70">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kk-blue/10 text-xs font-semibold text-kk-blue">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Action Buttons - Always show both Qualify and Prospectus */}
        <div className="mt-8 flex flex-wrap gap-3">
          {applyUrl && (
            <button
              onClick={handleApply}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" /> Apply Now
            </button>
          )}

          {!applyUrl && email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" /> Email Application
            </a>
          )}

          {/* Check Qualification Button - Always visible.
              For universities, opens institution-scoped modal (only programmes here).
              For other opportunities, opens generic checker. */}
          <button
            onClick={() => {
              if (isInstitution) {
                setShowInstitutionQualify(true);
              } else {
                setShowQualifyModal(true);
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-kk-blue bg-kk-blue/5 px-6 py-3 text-sm font-semibold text-kk-blue hover:bg-kk-blue/10"
          >
            <Target className="h-4 w-4" />
            {isInstitution ? `Qualify at ${title.split(" ").slice(0, 2).join(" ")}` : "Check if I Qualify"}
          </button>

          {deadline && (
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 rounded-xl border border-kk-navy/20 bg-white px-6 py-3 text-sm font-semibold text-kk-navy hover:bg-kk-navy/5"
            >
              <Calendar className="h-4 w-4" /> Add to Calendar
            </button>
          )}

          <button
            onClick={toggleSave}
            disabled={savingBookmark}
            className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-60 ${
              isSaved
                ? "border-kk-blue bg-kk-blue/10 text-kk-blue"
                : "border-kk-navy/20 bg-white text-kk-navy hover:bg-kk-navy/5"
            }`}
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {isSaved ? "Saved" : "Save"}
          </button>

          {/* Download Prospectus Button - Show even if no URL (will alert user) */}
          <button
            onClick={handleDownloadProspectus}
            className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold ${
              prospectusUrl
                ? "border-kk-navy/20 bg-white text-kk-navy hover:bg-kk-navy/5"
                : "border-kk-navy/10 bg-kk-navy/5 text-kk-navy/40 cursor-not-allowed"
            }`}
            disabled={!prospectusUrl}
          >
            <FileText className="h-4 w-4" />
            {prospectusUrl ? "Download Prospectus" : "Prospectus N/A"}
          </button>
        </div>

        {!applyUrl && howToApply && howToApply.length > 0 && (
          <div className="mt-6 rounded-xl bg-kk-blue/5 border-2 border-kk-blue/20 p-5">
            <p className="text-sm font-bold text-kk-navy">
              📋 No direct online portal — use the steps above to apply the official way.
            </p>
            <p className="mt-1 text-xs text-kk-navy/70">
              Follow the "How to Apply" instructions above. Phone or email the institution
              if you need extra help.
            </p>
          </div>
        )}
        {!applyUrl && !email && (!howToApply || howToApply.length === 0) && (
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-amber-800">
              ⚠️ Application link not yet available. Please contact the organization directly.
            </p>
          </div>
        )}
      </div>

      {/* Qualification Modal */}
      {showQualifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-kk-navy/60 p-4 backdrop-blur-sm">
          <div className="relative max-w-md w-full rounded-3xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => {
                setShowQualifyModal(false);
                setQualificationResult(null);
              }}
              className="absolute right-4 top-4 rounded-lg p-1 text-kk-navy/40 hover:bg-kk-navy/5 hover:text-kk-navy"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-kk-blue to-kk-green">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-kk-navy">
                  Check Qualification
                </h3>
                <p className="text-sm text-kk-navy/60">
                  See if you meet the requirements
                </p>
              </div>
            </div>

            {!qualificationResult ? (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-kk-navy/50">
                    Your APS Score
                  </label>
                  <input
                    type="number"
                    value={userProfile.aps}
                    onChange={(e) => setUserProfile({ ...userProfile, aps: e.target.value })}
                    placeholder="e.g. 32"
                    className="w-full rounded-xl border border-kk-navy/10 px-3.5 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-kk-navy/50">
                    Province
                  </label>
                  <select
                    value={userProfile.province}
                    onChange={(e) => setUserProfile({ ...userProfile, province: e.target.value })}
                    className="w-full rounded-xl border border-kk-navy/10 px-3.5 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  >
                    <option value="">Select province</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                    <option value="Free State">Free State</option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                    <option value="North West">North West</option>
                    <option value="Northern Cape">Northern Cape</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-kk-navy/50">
                    Matric Status
                  </label>
                  <input
                    value={userProfile.matric}
                    onChange={(e) => setUserProfile({ ...userProfile, matric: e.target.value })}
                    placeholder="e.g. Passed 2024"
                    className="w-full rounded-xl border border-kk-navy/10 px-3.5 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  />
                </div>

                <button
                  onClick={checkQualification}
                  className="w-full rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> Check Qualification
                  </span>
                </button>
              </div>
            ) : (
              <div className="mt-6">
                <div
                  className={`rounded-2xl p-5 ${
                    qualificationResult.qualified
                      ? "bg-gradient-to-br from-kk-green/10 to-kk-blue/5"
                      : "bg-gradient-to-br from-amber-50 to-orange-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {qualificationResult.qualified ? (
                      <CheckCircle2 className="h-10 w-10 text-kk-green" />
                    ) : (
                      <AlertCircle className="h-10 w-10 text-amber-600" />
                    )}
                    <div>
                      <div className="font-display text-2xl font-bold text-kk-navy">
                        {qualificationResult.matchPercentage}%
                      </div>
                      <div className="text-xs text-kk-navy/60">Match Score</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-kk-navy/80">
                    {qualificationResult.message}
                  </p>
                </div>

                {qualificationResult.matchedRequirements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-kk-green">
                      ✓ Matched Requirements
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {qualificationResult.matchedRequirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-kk-navy/70">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-kk-green" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {qualificationResult.missingRequirements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                       Missing Requirements
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {qualificationResult.missingRequirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-kk-navy/70">
                          <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-amber-600" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => setQualificationResult(null)}
                    className="flex-1 rounded-xl border border-kk-navy/20 bg-white py-2.5 text-sm font-semibold text-kk-navy hover:bg-kk-navy/5"
                  >
                    Try Again
                  </button>
                  {applyUrl && qualificationResult.qualified && (
                    <button
                      onClick={() => {
                        setShowQualifyModal(false);
                        handleApply();
                      }}
                      className="flex-1 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-2.5 text-sm font-semibold text-white shadow-md"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Institution-scoped qualify modal (universities only) */}
      {isInstitution && (
        <InstitutionQualifyModal
          institutionId={id}
          institutionName={title}
          open={showInstitutionQualify}
          onClose={() => setShowInstitutionQualify(false)}
        />
      )}
    </div>
  );
}
