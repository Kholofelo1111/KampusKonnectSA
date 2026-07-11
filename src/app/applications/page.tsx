"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Briefcase,
  GraduationCap,
  Wallet,
  BookOpen,
  Users,
  Plus,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Sparkles,
  Calendar,
  Bell,
  Download,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { downloadIcs } from "@/lib/ics";

type Application = {
  id: string;
  type: "university" | "bursary" | "job" | "internship" | "learnership";
  title: string;
  organization: string;
  status: "submitted" | "under-review" | "accepted" | "rejected" | "waiting-list" | "documents-required" | "offer-received" | "interview";
  appliedAt: string;
  deadline?: string | null;
  notes?: string | null;
  applyUrl?: string | null;
};

const typeIcon: Record<Application["type"], typeof Briefcase> = {
  university: GraduationCap,
  bursary: Wallet,
  job: Briefcase,
  internship: Users,
  learnership: BookOpen,
};

const statusMeta: Record<
  Application["status"],
  { label: string; icon: typeof CheckCircle2; bg: string; color: string }
> = {
  submitted: { label: "Submitted", icon: Loader2, bg: "bg-kk-blue/10 border-kk-blue/20", color: "text-kk-blue" },
  "under-review": { label: "Under Review", icon: Clock, bg: "bg-amber-100 border-amber-200", color: "text-amber-700" },
  interview: { label: "Interview", icon: Bell, bg: "bg-purple-100 border-purple-200", color: "text-purple-700" },
  "waiting-list": { label: "Waiting List", icon: Clock, bg: "bg-slate-100 border-slate-200", color: "text-slate-700" },
  "documents-required": { label: "Docs Required", icon: AlertCircle, bg: "bg-orange-100 border-orange-200", color: "text-orange-700" },
  "offer-received": { label: "Offer Received", icon: CheckCircle2, bg: "bg-emerald-100 border-emerald-300", color: "text-emerald-700" },
  accepted: { label: "Accepted", icon: CheckCircle2, bg: "bg-kk-green/15 border-kk-green/30", color: "text-kk-green" },
  rejected: { label: "Rejected", icon: XCircle, bg: "bg-red-100 border-red-200", color: "text-red-700" },
};

export default function ApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    type: "university" as Application["type"],
    title: "",
    organization: "",
    status: "submitted" as Application["status"],
    deadline: "",
    notes: "",
  });

  useEffect(() => {
    // Middleware handles redirect, but belt-and-braces client check
    if (status === "unauthenticated") {
      router.replace(`/sign-in?callbackUrl=/applications`);
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetchApps();
  }, [status]);

  // Don't render the page at all unless authenticated
  if (status !== "authenticated") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-kk-blue" />
          <p className="mt-3 text-sm text-kk-navy/60">
            {status === "loading" ? "Loading…" : "Redirecting to sign in…"}
          </p>
        </div>
      </div>
    );
  }

  async function fetchApps() {
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      setApps(data.applications || []);
    } catch (err) {
      toast.error("Could not load applications");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return apps.filter((a) => {
      if (filter !== "all" && a.status !== filter) return false;
      if (search && !`${a.title} ${a.organization}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [apps, filter, search]);

  const counts = useMemo(() => {
    return {
      all: apps.length,
      submitted: apps.filter((a) => a.status === "submitted").length,
      "under-review": apps.filter((a) => a.status === "under-review").length,
      interview: apps.filter((a) => a.status === "interview").length,
      accepted: apps.filter((a) => a.status === "accepted").length,
      rejected: apps.filter((a) => a.status === "rejected").length,
    };
  }, [apps]);

  async function addApplication() {
    if (!form.title.trim() || !form.organization.trim()) {
      toast.error("Title and organization are required");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not add application");
        return;
      }
      toast.success("Application added");
      setApps([data.application, ...apps]);
      setShowNew(false);
      setForm({ type: "university", title: "", organization: "", status: "submitted", deadline: "", notes: "" });
    } catch {
      toast.error("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  async function updateStatus(id: string, newStatus: Application["status"]) {
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) {
        toast.error("Could not update status");
        return;
      }
      setApps(apps.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
      toast.success(`Marked as ${statusMeta[newStatus].label}`);
    } catch {
      toast.error("Network error");
    }
  }

  async function removeApplication(id: string) {
    if (!confirm("Delete this application?")) return;
    try {
      const res = await fetch(`/api/applications?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        toast.error("Could not delete");
        return;
      }
      setApps(apps.filter((a) => a.id !== id));
      toast.success("Application deleted");
    } catch {
      toast.error("Network error");
    }
  }

  function addToCalendar(a: Application) {
    if (!a.deadline) return;
    downloadIcs({
      title: `${a.title} — Deadline`,
      startDate: a.deadline,
      description: `${a.organization}${a.notes ? `\n${a.notes}` : ""}`,
      url: a.applyUrl ?? undefined,
    });
    toast.success("Calendar file downloaded");
  }

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-kk-blue" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Application Tracker"
        title="All your applications, in one place"
        description="Track every university, bursary, job and learnership. Never miss a deadline."
        backHref="/dashboard"
        icon={<Briefcase className="h-6 w-6 text-white" />}
      >
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {[
            { label: "Submitted", value: counts.submitted, color: "bg-kk-blue text-white" },
            { label: "Reviewing", value: counts["under-review"], color: "bg-amber-400 text-white" },
            { label: "Interview", value: counts.interview, color: "bg-purple-500 text-white" },
            { label: "Accepted", value: counts.accepted, color: "bg-kk-green text-white" },
            { label: "Rejected", value: counts.rejected, color: "bg-red-500 text-white" },
            { label: "Total", value: counts.all, color: "bg-white/10 text-white ring-1 ring-white/20" },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-3 ${s.color}`}>
              <div className="font-display text-xl font-bold">{s.value}</div>
              <div className="text-[10px] font-medium opacity-90">{s.label}</div>
            </div>
          ))}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applications…"
              className="w-full rounded-xl border border-kk-navy/10 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
            />
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-4 py-2.5 text-sm font-bold text-white shadow-md hover:scale-105"
          >
            <Plus className="h-4 w-4" /> Add application
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { key: "all", label: "All" },
            { key: "submitted", label: "Submitted" },
            { key: "under-review", label: "Reviewing" },
            { key: "interview", label: "Interview" },
            { key: "accepted", label: "Accepted" },
            { key: "rejected", label: "Rejected" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                filter === t.key
                  ? "bg-kk-navy text-white"
                  : "bg-kk-navy/5 text-kk-navy/60 hover:bg-kk-navy/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-kk-navy/20 bg-white p-12 text-center">
            <Filter className="mx-auto h-10 w-10 text-kk-navy/30" />
            <p className="mt-3 font-semibold text-kk-navy">
              {apps.length === 0 ? "No applications yet" : "No applications match your filters"}
            </p>
            <p className="text-sm text-kk-navy/50">
              {apps.length === 0
                ? "Add your first application to start tracking."
                : "Try a different search or filter."}
            </p>
            {apps.length === 0 && (
              <button
                onClick={() => setShowNew(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-4 py-2 text-xs font-bold text-white"
              >
                <Plus className="h-4 w-4" /> Add first application
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((a) => {
                const Icon = typeIcon[a.type];
                const s = statusMeta[a.status];
                const StatusIcon = s.icon;
                return (
                  <motion.div
                    key={a.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="group rounded-2xl border border-kk-navy/5 bg-white p-5 shadow-sm hover:shadow-premium"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue/10 to-kk-green/10">
                        <Icon className="h-5 w-5 text-kk-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-base font-bold text-kk-navy">{a.title}</h3>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${s.bg} ${s.color}`}
                          >
                            <StatusIcon className="h-3 w-3" /> {s.label}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-kk-navy/60">{a.organization}</p>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-kk-navy/50">
                          {a.deadline && (
                            <button
                              onClick={() => addToCalendar(a)}
                              className="inline-flex items-center gap-1 hover:text-kk-blue"
                            >
                              <Calendar className="h-3 w-3" /> {a.deadline}
                              <Download className="h-3 w-3" />
                            </button>
                          )}
                          {a.notes && <span>📝 {a.notes}</span>}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {(["submitted", "under-review", "interview", "accepted", "rejected"] as const)
                            .filter((st) => st !== a.status)
                            .map((st) => {
                              const meta = statusMeta[st];
                              return (
                                <button
                                  key={st}
                                  onClick={() => updateStatus(a.id, st)}
                                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${meta.bg} ${meta.color}`}
                                >
                                  → {meta.label}
                                </button>
                              );
                            })}
                          {a.applyUrl && (
                            <a
                              href={a.applyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-full bg-kk-green/15 border border-kk-green/30 px-2.5 py-1 text-[11px] font-semibold text-kk-green"
                            >
                              <ExternalLink className="h-3 w-3" /> Open
                            </a>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeApplication(a.id)}
                        className="rounded-lg p-2 text-kk-navy/30 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add modal */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-kk-navy/60 p-4 backdrop-blur-sm"
            onClick={() => setShowNew(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <h2 className="font-display text-xl font-bold text-kk-navy">Add application</h2>
              <div className="mt-5 space-y-3">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Programme or role *"
                  className="w-full rounded-xl border border-kk-navy/10 px-3 py-2.5 text-sm focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                />
                <input
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  placeholder="Institution / company *"
                  className="w-full rounded-xl border border-kk-navy/10 px-3 py-2.5 text-sm focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as Application["type"] })}
                    className="rounded-xl border border-kk-navy/10 px-3 py-2.5 text-sm focus:border-kk-blue focus:outline-none"
                  >
                    <option value="university">University</option>
                    <option value="bursary">Bursary</option>
                    <option value="job">Job</option>
                    <option value="internship">Internship</option>
                    <option value="learnership">Learnership</option>
                  </select>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="rounded-xl border border-kk-navy/10 px-3 py-2.5 text-sm focus:border-kk-blue focus:outline-none"
                  />
                </div>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Notes (optional)"
                  rows={2}
                  className="w-full rounded-xl border border-kk-navy/10 px-3 py-2.5 text-sm focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                />
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setShowNew(false)}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-kk-navy/60 hover:bg-kk-navy/5"
                >
                  Cancel
                </button>
                <button
                  onClick={addApplication}
                  disabled={submitting}
                  className="rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-4 py-2 text-sm font-bold text-white shadow-md disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
