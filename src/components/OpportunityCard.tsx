import type { Opportunity } from "@/lib/opportunities";
import { getRelativePosted } from "@/lib/opportunities";
import { getVerifiedUrls } from "@/lib/verified-urls";

const badgeColors: Record<string, string> = {
  internship: "bg-blue-100 text-blue-700",
  bursary: "bg-green-100 text-green-700",
  learnership: "bg-orange-100 text-orange-700",
  job: "bg-gray-200 text-gray-800",
};

const categoryLabels: Record<string, string> = {
  internship: "Internship",
  bursary: "Bursary",
  learnership: "Learnership",
  job: "Job",
};

export default function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const verified = getVerifiedUrls("opportunity", opportunity.id);
  // Only ever show "Apply Now" when we have a real, verified direct link.
  // No search-engine fallback — if there's no working direct link, no
  // apply button renders at all.
  const applyUrl = verified.applyUrl || (opportunity.isVerified ? opportunity.applyUrl : null);
  const relative = getRelativePosted(opportunity.postedDate);
  const isRecent = relative === "Today" || relative === "Yesterday";

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">{opportunity.title}</h3>
        {isRecent && (
          <span className="shrink-0 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
            NEW
          </span>
        )}
      </div>

      <p className="mt-1 text-gray-600">{opportunity.company}</p>

      <span
        className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${
          badgeColors[opportunity.type] ?? "bg-gray-100 text-gray-700"
        }`}
      >
        {categoryLabels[opportunity.type] ?? opportunity.type}
      </span>

      <div className="mt-4 space-y-1 text-sm text-gray-500">
        <p>📍 {opportunity.location}</p>
        <p>📅 Closes: {opportunity.closingDate}</p>
        <p>🕒 {relative}</p>
      </div>

      {applyUrl && (
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Apply Now →
        </a>
      )}
    </div>
  );
}
