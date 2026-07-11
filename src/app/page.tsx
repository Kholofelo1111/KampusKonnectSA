import LatestOpportunities from "@/components/LatestOpportunities";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Wallet,
  Sparkles,
  ArrowRight,
  Bot,
  Check,
  Star,
  Zap,
  Shield,
  Globe,
  BookOpen,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { StatsCounter } from "@/components/StatsCounter";

const features = [
  {
    icon: GraduationCap,
    title: "All SA Institutions",
    desc: "26 public unis, 10 private unis, 50 TVETs & 8 private colleges — all DHET-verified.",
    color: "from-kk-blue to-kk-accent",
    href: "/institutions",
  },
  {
    icon: Wallet,
    title: "Bursaries & NSFAS",
    desc: "AI-matched funding opportunities. Know exactly what you qualify for.",
    color: "from-kk-green to-emerald-400",
    href: "/bursaries",
  },
  {
    icon: Briefcase,
    title: "Jobs & Internships",
    desc: "Government, corporate and remote opportunities updated daily.",
    color: "from-purple-500 to-pink-500",
    href: "/jobs",
  },
  {
    icon: BookOpen,
    title: "Learnerships & TVETs",
    desc: "Earn while you learn. All SETA and government learnerships listed.",
    color: "from-orange-500 to-kk-blue",
    href: "/learnerships",
  },
  {
    icon: GraduationCap,
    title: "Graduate Hub & YES4Youth",
    desc: "Course-matched graduate programmes + YES4Youth + LinkedIn for more jobs.",
    color: "from-kk-blue to-kk-green",
    href: "/graduates",
  },
  {
    icon: Award,
    title: "CV & Cover Letters",
    desc: "Build ATS-friendly CVs and motivation letters in minutes.",
    color: "from-pink-500 to-kk-green",
    href: "/cv-builder",
  },
];

const stats = [
  { value: "36", label: "Universities", suffix: "" },
  { value: "50", label: "Public TVETs", suffix: "+" },
  { value: "8", label: "Private Colleges", suffix: "+" },
  { value: "22", label: "Live Opportunities", suffix: "+" },
];

const testimonials = [
  {
    name: "Thandi Mkhize",
    role: "Engineering Student, UJ",
    quote: "Konnect AI matched me with the Sasol bursary I never knew existed. It changed my life.",
    rating: 5,
  },
  {
    name: "Sipho Ndlovu",
    role: "IT Graduate, Pretoria",
    quote: "Landed a junior dev role at Discovery through a learnership listed here. The CV builder is incredible.",
    rating: 5,
  },
  {
    name: "Lerato Molefe",
    role: "TVET Student, Cape Town",
    quote: "I used the NSFAS checker and it walked me through my application step by step. Got funded!",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Stats counter strip */}
      <section className="relative -mt-20 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StatsCounter stats={stats} />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-kk-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-kk-blue">
            <Zap className="h-3.5 w-3.5" /> Everything you need
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-kk-navy sm:text-4xl lg:text-5xl">
            One platform. <span className="text-gradient">Every opportunity.</span>
          </h2>
          <p className="mt-4 text-lg text-kk-navy/60">
            From your first university application to your first job – Kampus KonnectSA
            guides every step with AI.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.title}
                href={f.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-kk-navy/5 bg-white p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:border-kk-blue/30 hover:shadow-premium"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity group-hover:opacity-20" style={{backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`}} />
                <div>
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-kk-navy">{f.title}</h3>
                  <p className="mt-2 text-sm text-kk-navy/60">{f.desc}</p>
                </div>
                
                {/* Visible Clickable Button/Tag */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-kk-blue/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-kk-blue transition-colors group-hover:bg-kk-blue group-hover:text-white">
                    View All <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[10px] font-semibold text-kk-navy/40 group-hover:text-kk-blue">
                    Click to explore
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* AI Assistant Preview */}
      <section className="relative overflow-hidden bg-kk-navy py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-kk-blue/30 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-kk-green/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-kk-green backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Your personal <span className="text-gradient">career coach</span> in your pocket.
            </h2>
            <p className="mt-5 text-lg text-white/70">
              Ask anything. "I got APS 28 and want to study engineering." "Find me a job
              in Pretoria without matric." Our AI understands your situation and gives
              personalised, actionable answers.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Matches bursaries to your APS and province",
                "Builds CVs & cover letters in seconds",
                "Checks NSFAS eligibility instantly",
                "Recommends universities, TVETs & learnerships",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-kk-green">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/ai"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-kk-navy shadow-lg transition-transform hover:scale-105"
              >
                <Sparkles className="h-4 w-4 text-kk-blue" />
                Try the AI now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Get started free
              </Link>
            </div>
          </div>

          {/* Chat preview */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 translate-y-4 rounded-3xl bg-gradient-to-br from-kk-blue/30 to-kk-green/30 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-kk-navy-light/80 p-1 shadow-2xl backdrop-blur">
              <div className="rounded-2xl bg-kk-navy p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-kk-blue to-kk-green">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Konnect AI</div>
                    <div className="text-[11px] text-kk-green">● Online</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl bg-kk-blue px-4 py-2.5 text-sm text-white">
                      I got APS 28 and want to study engineering.
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-kk-blue to-kk-green">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="rounded-2xl bg-white/5 px-4 py-2.5 text-sm text-white/90">
                      <p className="mb-2">Great! With APS 28, you qualify for:</p>
                      <div className="space-y-1 text-[13px]">
                        <p>🎓 UJ, TUT, CPUT – BEng / Diploma Eng.</p>
                        <p>💰 Sasol, Eskom & FEM bursaries</p>
                        <p>📅 Apply before <span className="font-semibold text-kk-green">30 Sep</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Opportunities */}
      <LatestOpportunities />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-kk-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-kk-green">
              <TrendingUp className="h-3.5 w-3.5" /> Hot right now
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-kk-navy sm:text-4xl">
              Trending opportunities
            </h2>
          </div>
          <Link
            href="/bursaries"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-kk-blue hover:gap-2.5"
          >
            View all <ArrowRight className="h-4 w-4 transition-all" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Sasol Bursary 2026",
              meta: "Engineering • Full tuition + R35k stipend",
              tag: "Closes 31 Aug",
              tagColor: "bg-kk-blue/10 text-kk-blue",
              icon: "💰",
              href: "/bursaries",
            },
            {
              title: "Discovery Graduate Dev",
              meta: "R280k–R380k • Sandton, Gauteng",
              tag: "Graduate",
              tagColor: "bg-kk-green/10 text-kk-green",
              icon: "💼",
              href: "/jobs",
            },
            {
              title: "IT Systems Support Learnership",
              meta: "MICT SETA • R5 500/month • NQF 5",
              tag: "12 months",
              tagColor: "bg-purple-100 text-purple-700",
              icon: "🛠️",
              href: "/learnerships",
            },
            {
              title: "University of Pretoria 2026",
              meta: "APS 30+ • 7 faculties • Closing 30 Jun",
              tag: "Applications open",
              tagColor: "bg-orange-100 text-orange-700",
              icon: "🎓",
              href: "/institutions",
            },
            {
              title: "Standard Bank Internship",
              meta: "Graduate • R15k/month • 12 months",
              tag: "Banking",
              tagColor: "bg-kk-blue/10 text-kk-blue",
              icon: "🧑‍💼",
              href: "/internships",
            },
            {
              title: "NSFAS 2026 Applications",
              meta: "Household < R350k • Full cost covered",
              tag: "Closes 31 Jan",
              tagColor: "bg-kk-green/10 text-kk-green",
              icon: "🎯",
              href: "/nsfas",
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{c.icon}</div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${c.tagColor}`}>
                  {c.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-kk-navy">{c.title}</h3>
              <p className="mt-1 text-sm text-kk-navy/60">{c.meta}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-kk-blue opacity-0 transition-all group-hover:opacity-100">
                View details <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative bg-gradient-to-br from-kk-blue/5 via-white to-kk-green/5 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-kk-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-kk-blue">
              <Users className="h-3.5 w-3.5" /> Student stories
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-kk-navy sm:text-4xl">
              Real students. Real results.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="relative rounded-3xl border border-kk-navy/5 bg-white p-7 shadow-sm transition-all hover:shadow-premium"
              >
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-kk-green text-kk-green" />
                  ))}
                </div>
                <p className="text-kk-navy/80">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-kk-blue to-kk-green font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-kk-navy">{t.name}</div>
                    <div className="text-xs text-kk-navy/50">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-kk-navy/40">
          Trusted by students across South Africa
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-kk-navy/30">
          {["UP", "UJ", "UCT", "UNISA", "TUT", "NWU", "NMU", "CPUT", "DUT", "UNIVEN"].map(
            (u) => (
              <span key={u} className="font-display text-xl font-bold tracking-tight">
                {u}
              </span>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-kk-navy via-kk-navy to-kk-navy-light p-8 text-white sm:p-16">
          <div className="absolute inset-0 bg-grid-dark opacity-30" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-kk-blue/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-kk-green/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-kk-green backdrop-blur">
                <Globe className="h-3.5 w-3.5" /> Start today — it's free
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
                Ready to find your path?
              </h2>
              <p className="mt-4 text-lg text-white/70">
                Join thousands of South African students using AI to unlock education,
                bursaries and career opportunities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/sign-up"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-kk-navy shadow-lg transition-transform hover:scale-105"
                >
                  Get started free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/ai"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  <Sparkles className="h-4 w-4" /> Chat with AI
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: "100% free to start" },
                { icon: Zap, label: "AI answers in seconds" },
                { icon: Globe, label: "All 9 provinces" },
                { icon: TrendingUp, label: "Daily opportunities" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <Icon className="h-6 w-6 text-kk-green" />
                    <p className="mt-3 text-sm font-semibold text-white">{f.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
