"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react";

type Msg = {
  role: "user" | "ai";
  text: string;
  sections?: { heading: string; items: { title: string; meta?: string }[] }[];
  followUps?: string[];
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "👋 Hi! I'm your AI guide. Ask me about universities, bursaries, jobs or careers in South Africa.",
      followUps: [
        "I got APS 28 – what can I study?",
        "Match me with bursaries",
        "Jobs without matric",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim()) return;
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-4 z-50 flex h-[calc(100dvh-14rem)] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-kk-navy/10 bg-white shadow-premium sm:right-6 lg:bottom-24 lg:h-[560px]"
          >
            <div className="relative flex items-center justify-between bg-gradient-to-br from-kk-navy via-kk-navy to-kk-navy-light px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-kk-green ring-2 ring-kk-navy" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Konnect AI</div>
                  <div className="text-[11px] text-white/60">Your AI guide • online</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "ai" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-kk-blue to-kk-green">
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.role === "user"
                        ? "bg-kk-blue text-white"
                        : "bg-white text-kk-navy shadow-sm ring-1 ring-kk-navy/5"
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    {m.sections?.map((s, j) => (
                      <div key={j} className="mt-3">
                        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-kk-blue">
                          {s.heading}
                        </div>
                        <ul className="space-y-1">
                          {s.items.map((it, k) => (
                            <li
                              key={k}
                              className="text-[13px] leading-snug text-kk-navy/80"
                            >
                              <span className="font-medium">{it.title}</span>
                              {it.meta && (
                                <span className="block text-[11px] text-kk-navy/50">
                                  {it.meta}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {m.followUps && m.followUps.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.followUps.map((f, k) => (
                          <button
                            key={k}
                            onClick={() => send(f)}
                            className="rounded-full border border-kk-blue/20 bg-kk-blue/5 px-2.5 py-1 text-[11px] font-medium text-kk-blue hover:bg-kk-blue/10"
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-kk-navy">
                      <User className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-kk-blue to-kk-green">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-kk-navy/5">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-kk-blue [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-kk-blue [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-kk-blue" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-kk-navy/10 bg-white p-3">
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
                  placeholder="Ask about studies, bursaries, jobs…"
                  className="flex-1 rounded-xl border border-kk-navy/10 bg-slate-50 px-3.5 py-2.5 text-sm text-kk-navy placeholder:text-kk-navy/40 focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green text-white shadow-md disabled:opacity-40"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-kk-blue to-kk-green text-white shadow-glow sm:right-6 lg:bottom-6"
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-2xl bg-kk-blue opacity-30" />
        )}
      </motion.button>
    </>
  );
}
