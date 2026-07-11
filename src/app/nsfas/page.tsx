import { Check, AlertCircle, FileText, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function NsfasPage() {
  return (
    <>
      <PageHeader
        eyebrow="NSFAS Center"
        title="NSFAS made simple"
        description="Eligibility checks, step-by-step guides, application tracking and appeals help — all in one place."
        backHref="/"
        icon={<FileText className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Eligibility checker card */}
        <div className="mb-10 rounded-3xl bg-gradient-to-br from-kk-blue to-kk-navy p-8 text-white shadow-premium">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles className="h-7 w-7 text-kk-green" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Do I qualify for NSFAS?
              </h2>
              <p className="mt-2 text-white/80">
                Let our AI check your eligibility in 30 seconds — including bursaries you
                might qualify for as alternatives.
              </p>
              <Link
                href="/ai?q=check my NSFAS eligibility"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-kk-navy shadow-lg"
              >
                <Sparkles className="h-4 w-4 text-kk-blue" /> Check eligibility with AI
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Checklist */}
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-kk-navy">
              <Check className="h-5 w-5 text-kk-green" /> Eligibility checklist
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "South African citizen or permanent resident",
                "Combined household income under R350 000 per year",
                "First-time entering a public university or TVET",
                "Meet the APS requirements of your chosen institution",
                "Pass at least 50% of modules each year to keep funding",
                "Not already receiving another bursary/scholarship",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-kk-green">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-sm text-kk-navy/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What's covered */}
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-kk-navy">
              <AlertCircle className="h-5 w-5 text-kk-blue" /> What NSFAS covers
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Tuition & registration", value: "100% covered" },
                { label: "Accommodation", value: "Up to R45 000" },
                { label: "Transport", value: "Up to R7 500" },
                { label: "Living allowance", value: "R15 000 / year" },
                { label: "Learning materials", value: "R5 200 / year" },
                { label: "Personal care", value: "R3 045 / year" },
              ].map((c) => (
                <div key={c.label} className="rounded-xl bg-gradient-to-br from-kk-blue/5 to-kk-green/5 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-kk-navy/50">
                    {c.label}
                  </div>
                  <div className="mt-1 font-display text-base font-bold text-kk-navy">
                    {c.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key dates */}
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-kk-navy">
              <Calendar className="h-5 w-5 text-pink-500" /> Key dates 2026
            </h3>
            <div className="mt-4 space-y-3">
              {[
                { date: "1 Sep 2025", event: "NSFAS applications open", status: "open" },
                { date: "31 Jan 2026", event: "Closing date for new applicants", status: "urgent" },
                { date: "Feb–Apr 2026", event: "Funding decisions released", status: "info" },
                { date: "Within 30 days", event: "Appeals window", status: "info" },
              ].map((d) => (
                <div key={d.event} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                  <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${d.status === "urgent" ? "bg-red-500" : d.status === "open" ? "bg-kk-green" : "bg-kk-blue"}`} />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-kk-navy/50">{d.date}</div>
                    <div className="text-sm font-medium text-kk-navy">{d.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to apply */}
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-kk-navy">
              <FileText className="h-5 w-5 text-kk-green" /> How to apply
            </h3>
            <ol className="mt-4 space-y-3">
              {[
                "Go to nsfas.org.za and click 'myNSFAS Portal'",
                "Register an account with your email and ID number",
                "Complete the online application form",
                "Upload supporting documents (ID, proof of income, academic records)",
                "Submit and track your status in the portal",
                "Respond to any requests for additional documents within 7 days",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-kk-blue to-kk-green text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm text-kk-navy/80">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
