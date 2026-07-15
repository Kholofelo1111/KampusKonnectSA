"use client";

import { useEffect, useMemo, useState } from "react";
import {
  TrendingUp,
  ExternalLink,
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  Briefcase,
  BookOpen,
  Users,
  Wallet,
  Shield,
  Clock,
  Flame,
  Mail,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import {
  sortOpportunities,
  filterOpportunities,
  Opportunity,
  OpportunityType,
  SortKey,
  getDaysUntil,
  formatRelative,
  getRelativePosted,
} from "@/lib/opportunities";
import { getVerifiedUrls } from "@/lib/verified-urls";
import Link from "next/link";

const typeIcons: Record<OpportunityType, typeof Briefcase> = {
  job: Briefcase,
  learnership: BookOpen,
  internship: Users,
  bursary: Wallet,
};

const typeColors: Record<OpportunityType, string> = {
  job: "from-purple-500 to-pink-500",
  learnership: "from-orange-500 to-amber-500",
  internship: "from-kk-accent to-kk-blue",
  bursary: "from-kk-green to-emerald-500",
};

const typeBg: Record<OpportunityType, string> = {
  job: "bg-purple-50 text-purple-700",
  learnership: "bg-orange-50 text-orange-700",
  internship: "bg-blue-50 text-blue-700",
  bursary: "bg-green-50 text-green-700",
};

import { SA_PROVINCES } from "@/lib/constants";

const PROVINCES = ["All Provinces", ...SA_PROVINCES, "National"];

// Pagination page size — keeps initial mobile render fast
const PAGE_SIZE = 20;

export default function FeedPage() {
  const [type, setType] = useState<OpportunityType | "all">("all");
  const [province, setProvince] = useState("All Provinces");
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("latest");
  const [linkedinOnly, setLinkedinOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
const [opportunityFeed, setOpportunityFeed] = useState<Opportunity[]>([]);

useEffect(() => {
fetch("/api/opportunities")
.then(r => r.json())
.then(setOpportunityFeed)
.catch(console.error);
}, []);

  const filtered = useMemo(() => {
    let filtered = filterOpportunities(opportunityFeed, {
      type,
      province: province === "All Provinces" ? undefined : province,
      search,
    });
    // Filter by category
    if (category !== "All Categories") {
      filtered = filtered.filter((o) => o.category === category);
    }
    if (linkedinOnly) {
      filtered = filtered.filter((o) => !!o.linkedinUrl);
    }
    return sortOpportunities(filtered, sort);
  }, [type, province, category, search, sort, linkedinOnly]);

  // Reset pagination when filters change
  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const counts = useMemo(() => {
    return {
      all: opportunityFeed.length,
      job: opportunityFeed.filter((o) => o.type === "job").length,
      learnership: opportunityFeed.filter((o) => o.type === "learnership").length,
      internship: opportunityFeed.filter((o) => o.type === "internship").length,
      bursary: opportunityFeed.filter((o) => o.type === "bursary").length,
    };
  }, [opportunityFeed]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    opportunityFeed.forEach((o) => {
      if (o.category) cats.add(o.category);
    });
    return ["All Categories", ...Array.from(cats).sort()];
  }, [opportunityFeed]);

  return (
    <>
      <PageHeader
        eyebrow="Opportunity Feed"
        title="Real-time opportunities"
        description="Verified jobs, learnerships, internships and bursaries — sorted by latest. Apply directly to official portals."
        backHref="/"
        icon={<TrendingUp className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Verified banner */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-kk-green/20 bg-kk-green/5 p-4">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-kk-green" />
          <div className="text-sm">
            <p className="font-semibold text-kk-navy">
              All opportunities verified · Direct apply links
            </p>
            <p className="mt-0.5 text-xs text-kk-navy/70">
              Every listing links to the official company/SETA portal. New opportunities
              added daily via AI-monitored feeds.
            </p>
          </div>
        </div>

        {/* Type tabs */}
        <div className="mb-5 flex flex-wrap gap-2">
          {[
            { key: "all", label: "All", icon: Filter, count: counts.all },
            { key: "job", label: "Jobs", icon: Briefcase, count: counts.job },
            { key: "learnership", label: "Learnerships", icon: BookOpen, count: counts.learnership },
            { key: "internship", label: "Internships", icon: Users, count: counts.internship },
            { key: "bursary", label: "Bursaries", icon: Wallet, count: counts.bursary },
          ].map((t) => {
            const Icon = t.icon;
            const active = type === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setType(t.key as any)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "bg-gradient-to-r from-kk-blue to-kk-green text-white shadow-md"
                    : "bg-white text-kk-navy/70 hover:bg-kk-navy/5 border border-kk-navy/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    active ? "bg-white/20 text-white" : "bg-kk-navy/10 text-kk-navy/60"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, company, location…"
              className="w-full rounded-xl border border-kk-navy/10 bg-white py-2.5 pl-10 pr-4 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
            />
          </div>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="rounded-xl border border-kk-navy/10 bg-white px-3 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
          >
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-kk-navy/10 bg-white px-3 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setLinkedinOnly((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
              linkedinOnly
                ? "border-[#0A66C2] bg-[#0A66C2]/10 text-[#0A66C2]"
                : "border-kk-navy/10 bg-white text-kk-navy/60 hover:bg-kk-navy/5"
            }`}
          >
            <ExternalLink className="h-4 w-4" /> On LinkedIn
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl border border-kk-navy/10 bg-white px-3 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
          >
            <option value="latest">Latest first</option>
            <option value="deadline">Deadline soonest</option>
            <option value="salary">Highest salary</option>
          </select>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-kk-navy/60">
            <strong className="text-kk-navy">{filtered.length}</strong> opportunities
            {sort === "latest" && " · sorted by newest"}
            {sort === "deadline" && " · sorted by closing date"}
            {sort === "salary" && " · sorted by salary"}
          </span>
        </div>

        {/* Timeline / feed */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-kk-navy/20 bg-white p-12 text-center">
            <Filter className="mx-auto h-10 w-10 text-kk-navy/30" />
            <p className="mt-3 font-semibold text-kk-navy">No opportunities match</p>
            <p className="text-sm text-kk-navy/50">Try different filters or check back tomorrow.</p>
          </div>
        ) : (
          <>
            <ol className="space-y-3">
              {visible.map((o, i) => (
                <FeedItem key={o.id} opportunity={o} rank={i + 1} />
              ))}
            </ol>
            {hasMore && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-kk-navy/15 bg-white px-6 py-3 text-sm font-bold text-kk-navy transition-all hover:bg-kk-navy/5 active:scale-[0.98]"
                >
                  Load {Math.min(PAGE_SIZE, filtered.length - visibleCount)} more
                  <span className="rounded-full bg-kk-blue/10 px-2 py-0.5 text-[10px] font-bold text-kk-blue">
                    {filtered.length - visibleCount} left
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function FeedItem({ opportunity: o, rank }: { opportunity: Opportunity; rank: number }) {
  const Icon = typeIcons[o.type];
  const daysLeft = getDaysUntil(o.closingDate);
  const isUrgent = daysLeft <= 7 && daysLeft >= 0;
  const isClosed = daysLeft < 0;
  const verified = getVerifiedUrls("opportunity", o.id);

  return (
    <li className="group relative">
      {/* Rank circle */}
      <div
        className={`absolute -left-1 top-5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold shadow-md ${
          rank <= 3
            ? "bg-gradient-to-br from-kk-blue to-kk-green text-white"
            : "bg-kk-navy text-white"
        }`}
      >
        {rank}
      </div>

      <article
        className={`ml-10 overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-premium ${
          isClosed ? "opacity-60" : "border-kk-navy/5"
        }`}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${typeColors[o.type]} shadow-md`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${typeBg[o.type]}`}>
                  {o.type}
                </span>
                {o.category && (
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                    {o.category}
                  </span>
                )}
                <span className="inline-flex items-center gap-0.5 rounded-full bg-kk-navy/10 px-2 py-0.5 text-[10px] font-semibold text-kk-navy/70">
                  <Clock className="h-2.5 w-2.5" /> Posted {getRelativePosted(o.postedDate)}
                </span>
                {o.isVerified && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-kk-green/15 px-2 py-0.5 text-[10px] font-semibold text-kk-green">
                    <Shield className="h-2.5 w-2.5" /> Verified
                  </span>
                )}
                {isUrgent && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 animate-pulse">
                    <Flame className="h-2.5 w-2.5" /> {daysLeft === 0 ? "Today!" : `${daysLeft}d left`}
                  </span>
                )}
                {isClosed && (
                  <span className="rounded-full bg-kk-navy/10 px-2 py-0.5 text-[10px] font-bold text-kk-navy/50">
                    Closed
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-display text-base font-bold text-kk-navy leading-tight">
                {o.title}
              </h3>
              <p className="text-sm text-kk-navy/60">{o.company}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-kk-navy/70 line-clamp-2">{o.description}</p>

        {/* Meta info */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-kk-navy/60">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {o.location}
          </span>
          {o.salary && (
            <span className="inline-flex items-center gap-1 font-semibold text-kk-green">
              <DollarSign className="h-3 w-3" /> {o.salary}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> Posted {getRelativePosted(o.postedDate)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Closes {formatRelative(o.closingDate)}
          </span>
        </div>

        {/* Requirements pills */}
        <div className="mt-3 flex flex-wrap gap-1">
          {o.requirements.slice(0, 4).map((r) => (
            <span
              key={r}
              className="rounded-full bg-kk-navy/5 px-2 py-0.5 text-[10px] text-kk-navy/70"
            >
              {r}
            </span>
          ))}
        </div>

        {/* Apply buttons — verified URL, mailto fallback, or how-to-apply */}
        <div className="mt-4 flex flex-wrap gap-2">
          {isClosed ? (
            <button
              disabled
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-kk-navy/10 px-4 py-2 text-xs font-bold text-kk-navy/40 cursor-not-allowed"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Closed
            </button>
          ) : verified.applyUrl || (o.isVerified && o.applyUrl) ? (
            <a
              href={verified.applyUrl || o.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-4 py-2 text-xs font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Apply on official site
            </a>
          ) : o.email ? (
            <a
              href={`mailto:${o.email}?subject=Application for ${encodeURIComponent(o.title)}&body=Dear Hiring Manager,%0D%0A%0D%0AI am writing to apply for the ${encodeURIComponent(o.title)} position advertised on Kampus KonnectSA.%0D%0A%0D%0APlease find my CV attached.%0D%0A%0D%0AKind regards,%0D%0A[Your Name]`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-4 py-2 text-xs font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              <Mail className="h-3.5 w-3.5" /> Email Application
            </a>
          ) : null}
          
          <Link
            href={`/opportunities/${
              o.type === "job" ? "jobs"
              : o.type === "learnership" ? "learnerships"
              : o.type === "internship" ? "internships"
              : "bursaries"
            }/${o.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-kk-navy/15 bg-white px-4 py-2 text-xs font-bold text-kk-navy hover:bg-kk-navy/5"
          >
            📋 How to apply
          </Link>

          {o.linkedinUrl && (
            <a
              href={o.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0A66C2]/30 bg-[#0A66C2]/5 px-4 py-2 text-xs font-bold text-[#0A66C2] hover:bg-[#0A66C2]/10"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View on LinkedIn
            </a>
          )}
        </div>
      </article>
    </li>
  );
}
