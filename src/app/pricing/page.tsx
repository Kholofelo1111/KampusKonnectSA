"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Sparkles,
  Bot,
  FileText,
  MessageSquareText,
  Mic,
  Compass,
  ClipboardCheck,
  Wand2,
  LayoutTemplate,
  BellRing,
  Gauge,
  Headset,
  Loader2,
  CheckCircle2,
  Rocket,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const FEATURES = [
  {
    icon: Bot,
    title: "AI Auto Apply",
    desc: "Our AI fills in and submits applications to matching jobs, bursaries, and university/TVET applications for you, so you never miss a deadline buried in a busy week.",
  },
  {
    icon: FileText,
    title: "AI CV Optimizer",
    desc: "Paste a job description and our AI rewrites your CV's wording to match it — helping you get past ATS keyword filters that silently reject good candidates.",
  },
  {
    icon: MessageSquareText,
    title: "AI Cover Letter Generator",
    desc: "Generates a tailored cover letter for every application in seconds, so a blank page never stops you from applying.",
  },
  {
    icon: Mic,
    title: "AI Interview Coach",
    desc: "Practice real interview questions for your field and get instant feedback on your answers, before the real interview.",
  },
  {
    icon: Compass,
    title: "AI Career Guidance",
    desc: "Get a personalised roadmap of qualifications, skills and experience to reach the career you want, based on where you are today.",
  },
  {
    icon: ClipboardCheck,
    title: "AI Qualification Checker",
    desc: "Instantly see which bursaries, learnerships and degree programmes you actually qualify for, based on your real results.",
  },
  {
    icon: Wand2,
    title: "AI Application Assistant",
    desc: "Get step-by-step help completing tricky application forms — NSFAS, government Z83 forms, and bursary portals — without getting stuck.",
  },
  {
    icon: LayoutTemplate,
    title: "Unlimited CV Templates",
    desc: "Every current and future CV template, unlocked — build a different CV for every kind of role you're going for.",
  },
  {
    icon: BellRing,
    title: "Premium Notifications",
    desc: "Get instantly notified the moment a bursary, learnership or job matching your profile opens — before the rush.",
  },
  {
    icon: Gauge,
    title: "Faster Application Tracking",
    desc: "Advanced tracking with reminders, status automation and deadline alerts, so nothing falls through the cracks.",
  },
  {
    icon: Headset,
    title: "Priority Support",
    desc: "Jump the queue when you need help — priority responses from our support team when you're up against a deadline.",
  },
];

export default function PricingPage() {
  const [form, setForm] = useState({ fullName: "", email: "", age: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/premium-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) {
        setErrorMsg(result.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Coming Soon"
        title="Kampus KonnectSA Premium"
        description="AI-powered tools to help you find, apply for, and win opportunities faster — launching soon."
        icon={<Crown className="h-7 w-7 text-white" />}
        backHref="/"
        gradient="from-amber-500 to-orange-600"
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Coming soon banner */}
        <div className="mb-12 flex flex-col items-center gap-3 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-kk-navy sm:text-3xl">
            Premium Coming Soon
          </h2>
          <p className="max-w-xl text-sm text-kk-navy/70 sm:text-base">
            We're building a set of AI-powered tools to help South African students find and win
            more opportunities, faster. Nothing to buy yet — join the waiting list below and
            we'll let you know the moment it's ready.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="rounded-2xl border border-kk-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                  <Icon className="h-5.5 w-5.5 text-white" />
                </div>
                <h3 className="font-display text-base font-bold text-kk-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-kk-navy/60">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Waitlist form */}
        <div className="mx-auto max-w-lg rounded-3xl border border-kk-navy/10 bg-white p-8 shadow-premium">
          {status === "done" ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="font-display text-lg font-bold text-kk-navy">
                Thank you for joining the Premium Waiting List.
              </h3>
              <p className="text-sm text-kk-navy/60">
                You'll be notified as soon as Premium launches.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green">
                  <Rocket className="h-5.5 w-5.5 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-kk-navy">Join the Waiting List</h3>
                <p className="mt-1 text-sm text-kk-navy/60">
                  Be first in line when Premium launches. No payment, no commitment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-kk-navy/70">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    placeholder="Thandi Nkosi"
                    className="w-full rounded-xl border border-kk-navy/10 px-4 py-3 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-kk-navy/70">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="thandi@email.com"
                    className="w-full rounded-xl border border-kk-navy/10 px-4 py-3 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-kk-navy/70">
                    Age
                  </label>
                  <input
                    required
                    type="number"
                    min={13}
                    max={120}
                    value={form.age}
                    onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                    placeholder="21"
                    className="w-full rounded-xl border border-kk-navy/10 px-4 py-3 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Joining...
                    </>
                  ) : (
                    "Join the Waiting List"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
