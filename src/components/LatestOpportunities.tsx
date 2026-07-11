"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import OpportunityCard from "./OpportunityCard";
import { opportunityFeed, sortOpportunities, OpportunityType } from "@/lib/opportunities";

const FILTERS: Array<{ label: string; value: OpportunityType | "all" }> = [
  { label: "All", value: "all" },
  { label: "Internship", value: "internship" },
  { label: "Learnership", value: "learnership" },
  { label: "Bursary", value: "bursary" },
  { label: "Job", value: "job" },
];

export default function LatestOpportunities() {
  const [selected, setSelected] = useState<OpportunityType | "all">("all");

  // Show a curated slice of the real, live-checked opportunity feed — the
  // same data source /feed uses — instead of 4 hardcoded placeholder cards
  // with dead "#" apply links.
  const sorted = useMemo(() => sortOpportunities(opportunityFeed, "latest"), []);
  const filtered = useMemo(
    () => (selected === "all" ? sorted : sorted.filter((o) => o.type === selected)).slice(0, 6),
    [sorted, selected]
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">🔥 Latest Opportunities</h2>
          <p className="mt-2 text-gray-600">
            Discover the latest jobs, bursaries, internships and learnerships across South
            Africa.
          </p>
        </div>

        {/* Was previously linking to /opportunities, which had no index page
            and 404'd. /feed is the real, fully-featured, filterable listing
            page — linking there instead of building a second, duplicate
            listing page. */}
        <Link href="/feed" className="font-semibold text-blue-600 hover:underline">
          View All →
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelected(filter.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selected === filter.value
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No {selected} opportunities right now — check back soon or browse{" "}
          <Link href="/feed" className="font-semibold text-blue-600 hover:underline">
            the full feed
          </Link>
          .
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </section>
  );
}
