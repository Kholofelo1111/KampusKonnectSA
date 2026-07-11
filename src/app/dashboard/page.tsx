"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Bookmark,
  Bell,
  Target,
  Calendar,
  TrendingUp,
  ArrowRight,
  Loader2,
  Award,
  FileText,
  Crown,
  Clock,
  BellRing,
} from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { getRecentlyViewed, type RecentlyViewedItem } from "@/lib/recently-viewed";

type DashboardData = {
  applications: any[];
  bookmarks: any[];
  notifications: any[];
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed());
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sign-in?callbackUrl=/dashboard");
    }
  }, [status, router]);

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

  useEffect(() => {
    if (status !== "authenticated") return;
    (async () => {
      try {
        const [appsRes, bookmarksRes, notifsRes] = await Promise.all([
          fetch("/api/applications"),
          fetch("/api/bookmarks"),
          fetch("/api/notifications"),
        ]);
        const [apps, bookmarks, notifs] = await Promise.all([
          appsRes.json(),
          bookmarksRes.json(),
          notifsRes.json(),
        ]);
        setData({
          applications: apps.applications || [],
          bookmarks: bookmarks.bookmarks || [],
          notifications: notifs.notifications || [],
        });
      } catch (err) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, [status]);

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-kk-blue" />
      </div>
    );
  }

  const stats = [
    {
      label: "Applications",
      value: data?.applications?.length || 0,
      icon: FileText,
      color: "from-kk-blue to-kk-accent",
      href: "/applications",
    },
    {
      label: "Bookmarks",
      value: data?.bookmarks?.length || 0,
      icon: Bookmark,
      color: "from-kk-green to-emerald-500",
      href: "/dashboard/bookmarks",
    },
    {
      label: "Notifications",
      value: data?.notifications?.filter((n) => !n.read).length || 0,
      icon: Bell,
      color: "from-purple-500 to-pink-500",
      href: "/dashboard/notifications",
    },
    {
      label: "Recently Viewed",
      value: recentlyViewed.length,
      icon: Award,
      color: "from-orange-500 to-amber-500",
      href: "/feed",
    },
  ];

  const upcoming = (data?.applications || [])
    .filter((a) => a.deadline)
    .map((a) => ({ ...a, daysLeft: Math.ceil((new Date(a.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) }))
    .filter((a) => a.daysLeft >= 0 && a.daysLeft <= 30)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title={`Welcome back${session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}!`}
        description="Your personalized education and career hub."
        icon={<Sparkles className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Profile summary + Premium promo */}
        <div className="mb-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="flex items-center gap-4 rounded-2xl border border-kk-navy/5 bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-kk-blue to-kk-green font-display text-xl font-bold text-white shadow-md">
              {(session?.user?.name || session?.user?.email || "?").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-bold text-kk-navy">
                {session?.user?.name || "Welcome"}
              </p>
              <p className="truncate text-xs text-kk-navy/50">{session?.user?.email}</p>
              <p className="mt-1 text-[11px] font-medium text-kk-navy/40">Welcome to your dashboard</p>
            </div>
            <Link
              href="/settings"
              className="shrink-0 rounded-xl border border-kk-navy/15 px-3 py-2 text-xs font-semibold text-kk-navy hover:bg-kk-navy/5"
            >
              Settings
            </Link>
          </div>

          <Link
            href="/pricing"
            className="group flex items-center gap-3 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold text-kk-navy">Premium — Coming Soon</p>
              <p className="text-xs text-kk-navy/60">AI tools to help you apply faster. Join the waitlist.</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-amber-600 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Link
                  href={s.href}
                  className="group relative block overflow-hidden rounded-2xl border border-kk-navy/5 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium"
                >
                  <div
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-md`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="font-display text-3xl font-bold text-kk-navy">{s.value}</div>
                  <div className="text-xs font-medium text-kk-navy/50">{s.label}</div>
                  <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-kk-navy/30 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Upcoming deadlines */}
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-kk-navy">
                <Calendar className="h-5 w-5 text-pink-500" /> Upcoming Deadlines
              </h2>
              <Link href="/applications" className="text-xs font-semibold text-kk-blue hover:underline">
                View all
              </Link>
            </div>

            {/* Compact 7-day calendar strip — highlights days with a tracked deadline */}
            <div className="mt-4 grid grid-cols-7 gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => {
                const day = new Date();
                day.setDate(day.getDate() + i);
                const dayHasDeadline = upcoming.some((a) => {
                  const d = new Date(a.deadline);
                  return d.toDateString() === day.toDateString();
                });
                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-center ${
                      i === 0 ? "border-kk-blue/30 bg-kk-blue/5" : "border-kk-navy/5 bg-slate-50"
                    }`}
                  >
                    <span className="text-[9px] font-medium uppercase text-kk-navy/40">
                      {day.toLocaleDateString("en-ZA", { weekday: "short" })}
                    </span>
                    <span className="text-sm font-bold text-kk-navy">{day.getDate()}</span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${dayHasDeadline ? "bg-pink-500" : "bg-transparent"}`}
                    />
                  </div>
                );
              })}
            </div>
            {upcoming.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-kk-navy/15 bg-slate-50 p-8 text-center">
                <Calendar className="mx-auto h-10 w-10 text-kk-navy/30" />
                <p className="mt-2 font-semibold text-kk-navy">No upcoming deadlines</p>
                <p className="mt-1 text-xs text-kk-navy/50">
                  Track an application or explore opportunities to get started
                </p>
                <Link
                  href="/feed"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-kk-blue px-4 py-2 text-xs font-bold text-white hover:bg-kk-blue-dark"
                >
                  Browse Opportunities <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {upcoming.slice(0, 5).map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-kk-navy">{a.title}</p>
                      <p className="text-xs text-kk-navy/60">{a.organization}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
                        a.daysLeft <= 3
                          ? "bg-red-100 text-red-700 animate-pulse"
                          : a.daysLeft <= 7
                          ? "bg-amber-100 text-amber-700"
                          : "bg-kk-blue/10 text-kk-blue"
                      }`}
                    >
                      {a.daysLeft === 0 ? "Today!" : `${a.daysLeft}d left`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-kk-navy">
              <TrendingUp className="h-5 w-5 text-kk-green" /> Quick Actions
            </h2>
            <div className="mt-4 space-y-2">
              {[
                { href: "/qualify", label: "Check what you qualify for", icon: Target, color: "text-kk-blue" },
                { href: "/feed", label: "Browse opportunity feed", icon: Briefcase, color: "text-purple-500" },
                { href: "/institutions", label: "Find institutions", icon: GraduationCap, color: "text-kk-green" },
                { href: "/cv-builder", label: "Build your CV", icon: Award, color: "text-orange-500" },
                { href: "/ai", label: "Ask AI Coach", icon: Sparkles, color: "text-pink-500" },
              ].map((a) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="group flex items-center gap-3 rounded-xl p-3 text-sm text-kk-navy/70 transition-colors hover:bg-slate-50 hover:text-kk-navy"
                  >
                    <Icon className={`h-5 w-5 ${a.color}`} />
                    <span className="flex-1 font-medium">{a.label}</span>
                    <ArrowRight className="h-4 w-4 text-kk-navy/30 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent applications */}
        <div className="mt-6 rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-kk-navy">
            <FileText className="h-5 w-5 text-kk-blue" /> Recent Applications
          </h2>
          {data?.applications && data.applications.length > 0 ? (
            <ul className="mt-4 divide-y divide-kk-navy/5">
              {data.applications.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-kk-navy">{a.title}</p>
                    <p className="text-xs text-kk-navy/60">
                      {a.organization} · {a.type}
                    </p>
                  </div>
                  <span className="rounded-full bg-kk-blue/10 px-3 py-1 text-xs font-semibold capitalize text-kk-blue">
                    {a.status?.replace(/-/g, " ")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-kk-navy/15 bg-slate-50 p-8 text-center">
              <FileText className="mx-auto h-10 w-10 text-kk-navy/30" />
              <p className="mt-2 font-semibold text-kk-navy">No applications yet</p>
              <p className="mt-1 text-xs text-kk-navy/50">
                Start tracking your university, bursary or job applications here
              </p>
            </div>
          )}
        </div>

        {/* Saved, Recently Viewed, Notifications */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Saved opportunities */}
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-kk-navy">
                <Bookmark className="h-4.5 w-4.5 text-kk-green" /> Saved
              </h2>
              <Link href="/dashboard/bookmarks" className="text-xs font-semibold text-kk-blue hover:underline">
                View all
              </Link>
            </div>
            {data?.bookmarks && data.bookmarks.length > 0 ? (
              <ul className="mt-3 space-y-1">
                {data.bookmarks.slice(0, 5).map((b) => (
                  <li key={b.id}>
                    <Link
                      href={(b.metadata as { href?: string })?.href || "/feed"}
                      className="block truncate rounded-lg px-2 py-2 text-sm font-medium text-kk-navy hover:bg-slate-50"
                    >
                      {b.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-kk-navy/15 bg-slate-50 p-5 text-center">
                <p className="text-xs text-kk-navy/50">
                  Nothing saved yet — tap "Save" on any opportunity to bookmark it here.
                </p>
              </div>
            )}
          </div>

          {/* Recently viewed */}
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-kk-navy">
              <Clock className="h-4.5 w-4.5 text-purple-500" /> Recently Viewed
            </h2>
            {recentlyViewed.length > 0 ? (
              <ul className="mt-3 space-y-1">
                {recentlyViewed.slice(0, 5).map((r) => (
                  <li key={r.id}>
                    <Link
                      href={r.href}
                      className="block truncate rounded-lg px-2 py-2 text-sm font-medium text-kk-navy hover:bg-slate-50"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-kk-navy/15 bg-slate-50 p-5 text-center">
                <p className="text-xs text-kk-navy/50">
                  Opportunities and institutions you view will show up here.
                </p>
              </div>
            )}
          </div>

          {/* Notifications preview */}
          <div className="rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-kk-navy">
                <BellRing className="h-4.5 w-4.5 text-pink-500" /> Notifications
              </h2>
              <Link href="/dashboard/notifications" className="text-xs font-semibold text-kk-blue hover:underline">
                View all
              </Link>
            </div>
            {data?.notifications && data.notifications.length > 0 ? (
              <ul className="mt-3 space-y-1">
                {data.notifications.slice(0, 5).map((n) => (
                  <li key={n.id}>
                    <Link
                      href={n.link || "/dashboard/notifications"}
                      className={`flex items-start gap-2 rounded-lg px-2 py-2 text-sm hover:bg-slate-50 ${
                        n.read ? "text-kk-navy/60" : "font-semibold text-kk-navy"
                      }`}
                    >
                      {!n.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kk-blue" />}
                      <span className="truncate">{n.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-kk-navy/15 bg-slate-50 p-5 text-center">
                <Bell className="mx-auto h-8 w-8 text-kk-navy/25" />
                <p className="mt-2 text-xs text-kk-navy/50">You're all caught up — no notifications yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
