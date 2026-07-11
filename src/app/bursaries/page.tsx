import { bursaries } from "@/lib/data";
import { getApplyLink } from "@/lib/apply-links";
import { getVerifiedUrls } from "@/lib/verified-urls";
import { Wallet, Calendar, DollarSign, Sparkles, Check, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function BursariesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bursary Finder"
        title="Get funded for your studies"
        description="Bursaries from every major sponsor in South Africa. AI-matched to your profile."
        backHref="/"
        icon={<Wallet className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-kk-navy to-kk-navy-light p-6 text-white sm:flex-row sm:items-center">
          <Sparkles className="h-6 w-6 text-kk-green" />
          <div className="flex-1">
            <h3 className="font-display font-bold">Want bursaries matched to YOU?</h3>
            <p className="text-sm text-white/70">
              Tell our AI your APS, province and field of study for personalised matches.
            </p>
          </div>
          <a
            href="/ai?q=match me with bursaries"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-kk-navy"
          >
            <Sparkles className="h-4 w-4 text-kk-blue" /> Chat with AI
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {bursaries.map((b) => {
            const link = getApplyLink("bursaries", b.id);
            const verified = getVerifiedUrls("opportunity", b.id);
            const finalUrl = verified.applyUrl || link?.applyUrl;
            return (
              <article
                key={b.id}
                className="group relative overflow-hidden rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm transition-all hover:shadow-premium"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-kk-blue via-kk-green to-kk-accent" />
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue/15 to-kk-green/15">
                    <Wallet className="h-5 w-5 text-kk-blue" />
                  </div>
                  <span className="rounded-full bg-kk-green/10 px-2.5 py-1 text-[11px] font-semibold text-kk-green">
                    {b.level}
                  </span>
                </div>
                <Link href={`/opportunities/bursaries/${b.id}`}>
                  <h3 className="mt-4 font-display text-lg font-bold text-kk-navy hover:text-kk-blue transition-colors">
                    {b.name}
                  </h3>
                </Link>
                <p className="mt-0.5 text-sm text-kk-navy/60">by {b.sponsor}</p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-kk-navy/50">
                      <DollarSign className="h-3.5 w-3.5" /> Amount
                    </div>
                    <div className="mt-0.5 font-semibold text-kk-navy">{b.amount}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-kk-navy/50">
                      <Calendar className="h-3.5 w-3.5" /> Deadline
                    </div>
                    <div className="mt-0.5 font-semibold text-kk-navy">{b.deadline}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-kk-navy/50">
                    Covers
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {b.covers.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1 rounded-full bg-kk-blue/8 px-2 py-0.5 text-[11px] font-medium text-kk-blue"
                      >
                        <Check className="h-3 w-3" /> {c}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-xs text-kk-navy/60">{b.eligibility}</p>

                <div className="mt-5 space-y-2">
                  <Link
                    href={`/opportunities/bursaries/${b.id}`}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-kk-navy/5 py-2 text-xs font-semibold text-kk-navy transition-colors hover:bg-gradient-to-r hover:from-kk-blue hover:to-kk-green hover:text-white"
                  >
                    View full details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  {finalUrl ? (
                    <a
                      href={finalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-2 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Apply Now
                    </a>
                  ) : (
                    <Link
                      href={`/opportunities/bursaries/${b.id}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-2 text-xs font-semibold text-white shadow-md"
                    >
                      📋 How to apply
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
