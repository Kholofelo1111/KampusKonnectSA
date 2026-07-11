import { learnerships } from "@/lib/data";
import { getApplyLink } from "@/lib/apply-links";
import { getVerifiedUrls } from "@/lib/verified-urls";
import { BookOpen, MapPin, Calendar, DollarSign, Award, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function LearnershipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learnership Hub"
        title="Earn while you learn"
        description="SETA, government and corporate learnerships across South Africa."
        backHref="/"
        icon={<BookOpen className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {learnerships.map((l) => {
            const link = getApplyLink("learnerships", l.id);
            const verified = getVerifiedUrls("opportunity", l.id);
            const finalUrl = verified.applyUrl || link?.applyUrl;
            return (
              <article
                key={l.id}
                className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-kk-blue">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <span className="rounded-full bg-kk-blue/10 px-2.5 py-1 text-[11px] font-semibold text-kk-blue">
                    {l.level}
                  </span>
                </div>
                <Link href={`/opportunities/learnerships/${l.id}`}>
                  <h3 className="mt-4 font-display text-base font-bold text-kk-navy hover:text-kk-blue transition-colors">
                    {l.title}
                  </h3>
                </Link>
                <p className="mt-0.5 text-sm text-kk-navy/60">{l.provider}</p>

                <div className="mt-4 space-y-1.5 text-xs text-kk-navy/70">
                  <div className="flex items-center gap-2">
                    <Award className="h-3.5 w-3.5 text-kk-green" /> {l.seta}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-kk-blue" /> {l.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-pink-500" /> {l.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3.5 w-3.5 text-kk-green" /> {l.stipend}
                  </div>
                </div>

                <p className="mt-3 text-xs text-kk-navy/60">{l.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {l.requirements.slice(0, 3).map((r) => (
                    <span key={r} className="rounded-full bg-kk-navy/5 px-2 py-0.5 text-[11px] text-kk-navy/70">
                      {r}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <Link
                    href={`/opportunities/learnerships/${l.id}`}
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
                      href={`/opportunities/learnerships/${l.id}`}
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
