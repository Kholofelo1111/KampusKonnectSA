import { internships } from "@/lib/data";
import { getApplyLink } from "@/lib/apply-links";
import { getVerifiedUrls } from "@/lib/verified-urls";
import { Users, MapPin, Calendar, DollarSign, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function InternshipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Internship Hub"
        title="Kickstart your career"
        description="Internships from government, municipalities, SOEs and private companies."
        backHref="/"
        icon={<Users className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {internships.map((i) => {
            const link = getApplyLink("internships", i.id);
            const verified = getVerifiedUrls("opportunity", i.id);
            const finalUrl = verified.applyUrl || link?.applyUrl;
            return (
              <article
                key={i.id}
                className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm transition-all hover:shadow-premium"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-kk-accent to-kk-blue">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span className="rounded-full bg-kk-green/10 px-2.5 py-1 text-[11px] font-semibold text-kk-green">
                    {i.sector}
                  </span>
                </div>
                <Link href={`/opportunities/internships/${i.id}`}>
                  <h3 className="mt-4 font-display text-lg font-bold text-kk-navy hover:text-kk-blue transition-colors">
                    {i.title}
                  </h3>
                </Link>
                <p className="mt-0.5 text-sm text-kk-navy/60">{i.organization}</p>
                <p className="mt-2 text-xs text-kk-navy/60">{i.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-kk-navy/50">
                      <MapPin className="h-3.5 w-3.5" /> Location
                    </div>
                    <div className="mt-0.5 font-semibold text-kk-navy">{i.location}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-1.5 text-kk-navy/50">
                      <Calendar className="h-3.5 w-3.5" /> Duration
                    </div>
                    <div className="mt-0.5 font-semibold text-kk-navy">{i.duration}</div>
                  </div>
                </div>

                <div className="mt-3 rounded-xl bg-kk-green/10 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-kk-green">
                    <DollarSign className="h-3.5 w-3.5" /> Stipend
                  </div>
                  <div className="mt-0.5 font-display text-base font-bold text-kk-navy">
                    {i.stipend}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {i.requirements.slice(0, 3).map((r) => (
                    <span key={r} className="rounded-full bg-kk-navy/5 px-2 py-0.5 text-[11px] text-kk-navy/70">
                      {r}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <Link
                    href={`/opportunities/internships/${i.id}`}
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
                      href={`/opportunities/internships/${i.id}`}
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
