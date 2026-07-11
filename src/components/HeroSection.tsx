import Link from "next/link";
import { ArrowRight, Bot, GraduationCap, Briefcase, Wallet } from "lucide-react";

const promptSuggestions = [
  { q: "I got APS 28 and want to study engineering", icon: GraduationCap },
  { q: "Find me bursaries in Gauteng", icon: Wallet },
  { q: "Jobs in Pretoria without matric", icon: Briefcase },
  { q: "Check my NSFAS eligibility", icon: Bot },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-mesh">
      {/* Animated gradient orbs */}
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-kk-blue/20 blur-3xl" />
      <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-kk-green/20 blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-kk-accent/20 blur-3xl" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-dark opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-kk-green/30 bg-kk-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-kk-green backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kk-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-kk-green" />
            </span>
            AI-Powered • Live Now
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Find Universities, Bursaries, Jobs &{" "}
            <span className="relative inline-block">
              <span className="text-gradient">Career Opportunities</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C70 3 140 3 210 6C250 8 280 4 298 2"
                  stroke="url(#g1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#0066FF" />
                    <stop offset="0.5" stopColor="#22C55E" />
                    <stop offset="1" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            with AI.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
            Kampus KonnectSA uses artificial intelligence to guide South Africans from
            education to employment — universities, bursaries, NSFAS, jobs and
            learnerships in one place.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-kk-navy shadow-xl transition-transform hover:scale-105"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/ai"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-kk-blue to-kk-blue-dark px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-kk-blue/30 transition-all hover:shadow-xl hover:shadow-kk-blue/40"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kk-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-kk-green" />
              </span>
              Chat with AI
            </Link>
            <Link
              href="/bursaries"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Find opportunities
            </Link>
          </div>

          {/* AI prompt suggestions */}
          <div className="mx-auto mt-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
              Try asking the AI
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {promptSuggestions.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.q}
                    href={`/ai?q=${encodeURIComponent(s.q)}`}
                    className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur transition-all hover:border-kk-blue/50 hover:bg-kk-blue/10"
                  >
                    <Icon className="h-4 w-4 text-kk-blue" />
                    <span className="hidden sm:inline">"{s.q}"</span>
                    <span className="sm:hidden">"{s.q.slice(0, 30)}…"</span>
                    <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating opportunity cards preview */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-kk-blue/20 to-transparent blur-2xl" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Sasol Bursary",
                sub: "Engineering • Full tuition",
                tag: "Closes 31 Aug",
                emoji: "💰",
                delay: "0s",
              },
              {
                title: "Discovery Graduate Dev",
                sub: "R280k–R380k • Sandton",
                tag: "Graduate",
                emoji: "💼",
                delay: "0.2s",
              },
              {
                title: "University of Pretoria",
                sub: "APS 30+ • Applications open",
                tag: "Apply now",
                emoji: "🎓",
                delay: "0.4s",
              },
            ].map((c, i) => (
              <div
                key={c.title}
                className="glass rounded-2xl p-5 shadow-premium"
                style={{ animation: `fade-up 0.6s ease-out ${c.delay} backwards` }}
              >
                <div className="flex items-start justify-between">
                  <div className="text-2xl">{c.emoji}</div>
                  <span className="rounded-full bg-kk-green/15 px-2 py-0.5 text-[10px] font-semibold text-kk-green">
                    {c.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-kk-navy">
                  {c.title}
                </h3>
                <p className="mt-1 text-xs text-kk-navy/60">{c.sub}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-kk-navy/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-kk-blue to-kk-green"
                    style={{ width: `${75 - i * 15}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative h-16 sm:h-24">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M0,60 C240,100 480,0 720,40 C960,80 1200,20 1440,50 L1440,100 L0,100 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
