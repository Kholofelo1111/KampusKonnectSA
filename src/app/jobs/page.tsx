import { jobs } from "@/lib/data";
import { getApplyLink } from "@/lib/apply-links";
import { getVerifiedUrls } from "@/lib/verified-urls";
import { Briefcase, MapPin, Calendar, DollarSign, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Job Hub"
        title="Jobs across South Africa"
        description="Government, corporate, remote and graduate opportunities updated daily."
        backHref="/"
        icon={<Briefcase className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-kk-green to-emerald-600 p-6 text-white shadow-premium">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6" />
            <h3 className="font-display text-xl font-bold">AI matches jobs to you</h3>
          </div>
          <p className="text-sm text-white/90">
            Tell us your skills and location, and we'll surface the best roles — including
            ones you might never have found.
          </p>
          <a
            href="/ai?q=jobs near me"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-kk-green"
          >
            Find jobs with AI
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => {
            const link = getApplyLink("jobs", j.id);
            // Verified URL lookup — falls back to instructions if URL is unreliable
            const verified = getVerifiedUrls("opportunity", j.id);
            const finalUrl = verified.applyUrl || link?.applyUrl;
            return (
              <article
                key={j.id}
                className="group rounded-2xl border border-kk-navy/5 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <span className="rounded-full bg-kk-navy/5 px-2.5 py-1 text-[11px] font-semibold text-kk-navy/70">
                    {j.type}
                  </span>
                </div>
                <Link href={`/opportunities/jobs/${j.id}`}>
                  <h3 className="mt-3 font-display text-base font-bold text-kk-navy hover:text-kk-blue transition-colors">
                    {j.title}
                  </h3>
                </Link>
                <p className="mt-0.5 text-sm text-kk-navy/60">{j.company}</p>
                <p className="mt-2 text-xs text-kk-navy/60 line-clamp-2">{j.description}</p>

                <div className="mt-4 space-y-1.5 text-xs text-kk-navy/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-kk-blue" /> {j.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3.5 w-3.5 text-kk-green" /> {j.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-pink-500" /> Closes {j.deadline}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {j.requirements.slice(0, 3).map((r) => (
                    <span key={r} className="rounded-full bg-kk-navy/5 px-2 py-0.5 text-[11px] text-kk-navy/70">
                      {r}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <Link
                    href={`/opportunities/jobs/${j.id}`}
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
                      href={`/opportunities/jobs/${j.id}`}
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
