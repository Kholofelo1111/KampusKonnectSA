"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Search,
  MapPin,
  ExternalLink,
  FileText,
  Target,
  Phone,
  Mail,
  Filter,
  Shield,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import {
  allInstitutions,
  categoryMeta,
  InstitutionCategory,
  publicUniversities,
  privateUniversities,
  privateColleges,
  publicTvets,
} from "@/lib/institutions";
import { getVerifiedUrls } from "@/lib/verified-urls";

function getInstitutionApplyInfo(inst: typeof allInstitutions[number]) {
  const typeMap = {
    "public-university": "university" as const,
    "private-university": "private-university" as const,
    "public-tvet": "tvet" as const,
    "private-college": "private-college" as const,
  };
  return getVerifiedUrls(typeMap[inst.category], inst.id, {
    website: inst.website,
    name: inst.name,
    phone: inst.phone,
    email: inst.email,
  });
}

const SA_PROVINCES = [
  "All Provinces",
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
];

export default function InstitutionsPage() {
  const [category, setCategory] = useState<InstitutionCategory>("public-university");
  const [province, setProvince] = useState("All Provinces");
  const [search, setSearch] = useState("");

  const counts: Record<InstitutionCategory, number> = {
    "public-university": 0,
    "private-university": 0,
    "public-tvet": 0,
    "private-college": 0,
  };
  allInstitutions.forEach((i) => counts[i.category]++);

  const filtered = useMemo(() => {
    return allInstitutions.filter((i) => {
      if (i.category !== category) return false;
      if (province !== "All Provinces" && i.province !== province && i.province !== "National" && i.province !== "Multi-Province") return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !i.name.toLowerCase().includes(q) &&
          !i.city.toLowerCase().includes(q) &&
          !i.fields.some((f) => f.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
  }, [category, province, search]);

  const meta = categoryMeta[category];

  return (
    <>
      <PageHeader
        eyebrow="Education Directory"
        title="Verified SA Institutions"
        description="All DHET-registered universities, TVETs and private colleges with verified links and prospectus info."
        backHref="/"
        icon={<GraduationCap className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Trust banner */}
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-kk-green/20 bg-kk-green/5 p-4">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-kk-green" />
          <div className="text-sm">
            <p className="font-semibold text-kk-navy">
              All links verified · DHET-registered only
            </p>
            <p className="mt-0.5 text-xs text-kk-navy/70">
              Every institution listed has been cross-checked against the official DHET
              register. Private colleges show their registration number (e.g. 2007/HE07/002).
            </p>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {(Object.keys(categoryMeta) as InstitutionCategory[]).map((c) => {
            const cm = categoryMeta[c];
            const active = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                  active
                    ? "border-kk-blue bg-gradient-to-br shadow-premium " + cm.color
                    : "border-kk-navy/10 bg-white hover:border-kk-navy/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{cm.icon}</span>
                  <span
                    className={`text-xs font-bold ${
                      active ? "text-white" : "text-kk-navy/60"
                    }`}
                  >
                    {counts[c]}
                  </span>
                </div>
                <div
                  className={`mt-2 font-display text-sm font-bold ${
                    active ? "text-white" : "text-kk-navy"
                  }`}
                >
                  {cm.label}
                </div>
                <div
                  className={`text-[11px] ${
                    active ? "text-white/80" : "text-kk-navy/50"
                  }`}
                >
                  {cm.short}
                </div>
              </button>
            );
          })}
        </div>

        {/* Description */}
        <p className="mb-6 text-sm text-kk-navy/60">{meta.description}</p>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city or field…"
              className="w-full rounded-xl border border-kk-navy/10 bg-white py-2.5 pl-10 pr-4 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
            />
          </div>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="rounded-xl border border-kk-navy/10 bg-white px-4 py-2.5 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
          >
            {SA_PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <Link
            href="/qualify"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
          >
            <Target className="h-4 w-4" /> Check if I qualify
          </Link>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-kk-navy/60">
          Showing <strong className="text-kk-navy">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "institution" : "institutions"}
        </div>

        {/* Layout per category */}
        {category === "public-university" || category === "private-university" ? (
          // Directory style cards
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((u) => {
              const apply = getInstitutionApplyInfo(u);
              return (
              <article
                key={u.id}
                className="group relative overflow-hidden rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} text-white font-bold shadow-md`}
                  >
                    {u.short.slice(0, 3)}
                  </div>
                  {u.dhetReg && (
                    <span className="rounded-full bg-kk-green/10 px-2 py-0.5 text-[10px] font-semibold text-kk-green">
                      DHET ✓
                    </span>
                  )}
                </div>
                  
<Link href={`/institutions/${u.id}`} className="block">
  <h3 className="mt-4 font-display text-lg font-bold text-kk-navy hover:text-kk-blue">
    {u.name}
  </h3>

  <p className="mt-1 line-clamp-2 text-xs text-kk-navy/60">
    {u.description}
  </p>
</Link>
                <div className="mt-3 space-y-1 text-xs text-kk-navy/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-kk-blue" />
                    <span>
                      {u.city}, {u.province}
                    </span>
                  </div>
                  {u.apsMin !== undefined && (
                    <div className="flex items-center gap-2">
                      <Target className="h-3.5 w-3.5 text-kk-green" />
                      <span>APS min: {u.apsMin}</span>
                    </div>
                  )}
                  {u.fees && (
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">R</span>
                      <span>{u.fees}</span>
                    </div>
                  )}
                  {/* Opening/Closing Dates */}
                  {(u.openingDate || u.closingDate) && (
                    <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-semibold">
                      {u.openingDate && (
                        <span className="inline-flex items-center gap-1 rounded bg-kk-blue/10 px-2 py-0.5 text-kk-blue">
                          Opens: {u.openingDate}
                        </span>
                      )}
                      {u.closingDate && (
                        <span className="inline-flex items-center gap-1 rounded bg-pink-100 px-2 py-0.5 text-pink-700">
                          Closes: {u.closingDate}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {u.fields.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-kk-blue/8 px-2 py-0.5 text-[10px] font-medium text-kk-blue"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  {apply.applyUrl ? (
                    <a
                      href={apply.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-2 text-xs font-semibold text-white shadow-md"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Apply Online
                    </a>
                  ) : (
                    <Link
                      href={`/opportunities/universities/${u.id}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-2 text-xs font-semibold text-white shadow-md"
                    >
                      📋 How to apply
                    </Link>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    {apply.prospectusUrl ? (
                      <a
                        href={apply.prospectusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-kk-navy/15 bg-white py-1.5 text-[11px] font-semibold text-kk-navy hover:bg-kk-navy/5"
                      >
                        <FileText className="h-3 w-3" /> Prospectus
                      </a>
                    ) : (
                      <span
                        title="Official prospectus not published yet"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-kk-navy/15 bg-kk-navy/5 py-1.5 text-[11px] text-kk-navy/40"
                      >
                        <FileText className="h-3 w-3" /> No PDF
                      </span>
                    )}
                    <Link
                      href={`/qualify?inst=${u.id}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-kk-navy/15 bg-white py-1.5 text-[11px] font-semibold text-kk-navy hover:bg-kk-blue hover:text-white"
                    >
                      <Target className="h-3 w-3" /> Qualify?
                    </Link>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        ) : category === "public-tvet" ? (
          // Map/list hybrid for TVETs — denser list grouped visually
          <div className="overflow-hidden rounded-2xl border border-kk-navy/10 bg-white">
            <ul className="divide-y divide-kk-navy/5">
              {filtered.map((t) => {
                const apply = getInstitutionApplyInfo(t);
                return (
                <li
                  key={t.id}
                  className="group flex flex-col gap-3 p-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-3 sm:flex-1">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} font-bold text-white shadow-sm`}
                    >
                      {t.short.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-sm font-bold text-kk-navy">
                        {t.name}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-kk-navy/60">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {t.city}, {t.province}
                        </span>
                        {t.phone && (
                          <a
                            href={`tel:${t.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-1 hover:text-kk-blue"
                          >
                            <Phone className="h-3 w-3" /> {t.phone}
                          </a>
                        )}
                        {t.email && (
                          <a
                            href={`mailto:${t.email}`}
                            className="inline-flex items-center gap-1 truncate hover:text-kk-blue"
                          >
                            <Mail className="h-3 w-3" /> {t.email}
                          </a>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {t.fields.slice(0, 4).map((f) => (
                          <span
                            key={f}
                            className="rounded-full bg-kk-green/10 px-1.5 py-0.5 text-[10px] font-medium text-kk-green"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:shrink-0">
                    <a
                      href={apply.applyUrl || t.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-kk-green to-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:scale-105"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Apply
                    </a>
                    <Link
                      href={`/opportunities/universities/${t.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-kk-navy/20 bg-white px-3 py-2 text-xs font-semibold text-kk-navy hover:bg-kk-navy/5"
                    >
                      📋 How to apply
                    </Link>
                  </div>
                </li>
                );
              })}
            </ul>
          </div>
        ) : (
          // Private colleges — compact card grid
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => {
              const apply = getInstitutionApplyInfo(c);
              return (
              <article
                key={c.id}
                className="rounded-2xl border border-orange-200/50 bg-gradient-to-br from-orange-50/40 to-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} text-white font-bold shadow-md`}
                  >
                    {c.short.slice(0, 3)}
                  </div>
                  {c.dhetReg && (
                    <span className="rounded-full bg-kk-navy/5 px-2 py-0.5 font-mono text-[10px] text-kk-navy/60">
                      {c.dhetReg}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-kk-navy">
                  {c.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-kk-navy/60">
                  {c.description}
                </p>
                <div className="mt-3 space-y-1 text-xs text-kk-navy/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-kk-blue" />
                    <span>{c.province}</span>
                  </div>
                  {c.fees && (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange-500">R</span>
                      <span>{c.fees}</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {c.fields.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={apply.applyUrl || c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 py-2 text-[11px] font-semibold text-white shadow-md"
                  >
                    <ExternalLink className="h-3 w-3" /> Apply
                  </a>
                  <Link
                    href={`/opportunities/universities/${c.id}`}
                    className="inline-flex items-center justify-center gap-1 rounded-xl border border-kk-navy/15 bg-white py-2 text-[11px] font-semibold text-kk-navy hover:bg-kk-navy/5"
                  >
                    📋 How to apply
                  </Link>
                </div>
                <p
                  title={apply.prospectusUrl ? "Prospectus available" : "Official prospectus not published yet"}
                  className="mt-2 text-center text-[10px] text-kk-navy/40"
                >
                  {apply.prospectusUrl ? "📄 Prospectus available on website" : "📄 Official prospectus not published yet"}
                </p>
              </article>
              );
            })}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-kk-navy/20 bg-white p-12 text-center">
            <Filter className="mx-auto h-10 w-10 text-kk-navy/30" />
            <p className="mt-3 font-semibold text-kk-navy">No institutions match your filters</p>
            <p className="text-sm text-kk-navy/50">Try widening your search or province filter.</p>
          </div>
        )}
      </div>
    </>
  );
}
