"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bot,
  User,
  Send,
  Sparkles,
  GraduationCap,
  Briefcase,
  Wallet,
  BookOpen,
  FileText,
  MapPin,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

type Msg = {
  role: "user" | "ai";
  text: string;
  sections?: { heading: string; items: { title: string; meta?: string; link?: string }[] }[];
  followUps?: string[];
};

const quickPrompts = [
  { icon: GraduationCap, text: "I got APS 28, what can I study?", color: "from-kk-blue to-kk-accent" },
  { icon: Wallet, text: "Match me with bursaries", color: "from-kk-green to-emerald-400" },
  { icon: Briefcase, text: "Jobs without matric", color: "from-purple-500 to-pink-500" },
  { icon: BookOpen, text: "Show me learnerships", color: "from-orange-500 to-kk-blue" },
  { icon: FileText, text: "Help me build my CV", color: "from-pink-500 to-kk-green" },
  { icon: MapPin, text: "NSFAS eligibility check", color: "from-kk-blue to-kk-green" },
];

function AiPageInner() {
  const searchParams = useSearchParams();
  const seededQuery = searchParams.get("q");

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "👋 Hi! I'm Konnect AI, your personal career coach for South Africa. Tell me about your goals — your APS score, province, interests — and I'll build you a tailored plan.",
      followUps: quickPrompts.slice(0, 3).map((p) => p.text),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (seededQuery) {
      send(decodeURIComponent(seededQuery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "ai", ...data }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "Sorry, I had trouble connecting. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="AI Assistant"
        title="Your AI career coach"
        description="Ask anything about South African education, bursaries, jobs and careers. Personalised answers in seconds."
        backHref="/"
        icon={<Sparkles className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_1fr] sm:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-kk-navy/50">
              Quick prompts
            </h3>
            <div className="space-y-1.5">
              {quickPrompts.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.text}
                    onClick={() => send(p.text)}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-kk-navy/80 transition-colors hover:bg-kk-blue/5"
                  >
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${p.color}`}>
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="flex-1">{p.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-kk-navy/5 bg-gradient-to-br from-kk-navy to-kk-navy-light p-4 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-kk-green" />
              <h3 className="text-sm font-semibold">Pro tip</h3>
            </div>
            <p className="mt-2 text-xs text-white/70">
              Include your APS score and province in every question for the most accurate
              recommendations.
            </p>
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-kk-navy/5 bg-white shadow-sm">
          <div
            ref={scrollRef}
            className="flex-1 space-y-5 overflow-y-auto bg-gradient-to-b from-kk-blue/[0.02] to-white p-5 sm:p-6"
          >
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "ai" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green shadow-md">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-kk-blue to-kk-blue-dark text-white shadow-md"
                      : "bg-white text-kk-navy shadow-sm ring-1 ring-kk-navy/5"
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  {m.sections?.map((s, j) => (
                    <div key={j} className="mt-4">
                      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-kk-blue">
                        {s.heading}
                      </div>
                      <div className="space-y-2">
                        {s.items.map((it, k) => (
                          <div
                            key={k}
                            className="rounded-xl border border-kk-navy/5 bg-slate-50 p-3"
                          >
                            <div className="text-sm font-semibold text-kk-navy">
                              {it.title}
                            </div>
                            {it.meta && (
                              <div className="mt-0.5 text-xs text-kk-navy/60">{it.meta}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {m.followUps && m.followUps.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {m.followUps.map((f, k) => (
                        <button
                          key={k}
                          onClick={() => send(f)}
                          className="rounded-full border border-kk-blue/20 bg-kk-blue/5 px-3 py-1.5 text-xs font-medium text-kk-blue transition-colors hover:bg-kk-blue/10"
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-kk-navy shadow-md">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-kk-navy/5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-kk-blue [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-kk-blue [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-kk-blue" />
                    <span className="ml-2 text-xs text-kk-navy/50">Thinking…</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-kk-navy/10 bg-white p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about universities, bursaries, jobs, careers…"
                className="flex-1 rounded-xl border border-kk-navy/10 bg-slate-50 px-4 py-3 text-sm text-kk-navy placeholder:text-kk-navy/40 focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green text-white shadow-md transition-transform hover:scale-105 disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-center text-[11px] text-kk-navy/40">
              Konnect AI can make mistakes. Verify important details.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function AiPageFallback() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-kk-navy/10">
        <div className="absolute inset-0 bg-mesh" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-white/20" />
          <div className="mt-4 h-12 w-96 animate-pulse rounded-lg bg-white/20" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-64 animate-pulse rounded-2xl bg-kk-navy/5" />
          <div className="h-[600px] animate-pulse rounded-2xl bg-kk-navy/5" />
        </div>
      </div>
    </>
  );
}

export default function AiPage() {
  return (
    <Suspense fallback={<AiPageFallback />}>
      <AiPageInner />
    </Suspense>
  );
}
