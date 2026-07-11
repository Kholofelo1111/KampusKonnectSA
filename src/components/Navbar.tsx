"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  GraduationCap,
  Menu,
  X,
  Sparkles,
  BookOpen,
  Briefcase,
  Wallet,
  FileText,
  ChevronDown,
  ExternalLink,
  LogOut,
  LayoutDashboard,
  Settings,
  Award,
  TrendingUp,
} from "lucide-react";

const links: { href: string; label: string; icon: typeof GraduationCap; external?: boolean }[] = [
  { href: "/institutions", label: "Institutions", icon: GraduationCap },
  { href: "/feed", label: "Opportunities", icon: Briefcase },
  { href: "/graduates", label: "Graduates", icon: Award },
  { href: "/business", label: "Business Support", icon: TrendingUp },
  { href: "/qualify", label: "Check Qualify", icon: Wallet },
  { href: "/cv-builder", label: "CV Builder", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green shadow-lg shadow-kk-blue/30 transition-transform group-hover:scale-105">
            <span className="font-display text-base font-extrabold tracking-tight text-white">
              KK
            </span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight text-kk-navy">
              Kampus<span className="text-kk-blue"> Konnect</span>
              <span className="text-kk-green">SA</span>
            </div>
            <div className="hidden text-[10px] font-medium uppercase tracking-widest text-kk-navy/50 sm:block">
              AI Education & Careers
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname?.startsWith(l.href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  active
                    ? "bg-kk-blue/10 text-kk-blue"
                    : "text-kk-navy/70 hover:bg-kk-navy/5 hover:text-kk-navy"
                }`}
              >
                <Icon className="h-4 w-4" />
                {l.label}
                {l.external && <ExternalLink className="h-3 w-3" />}
              </Link>
            );
          })}

          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-kk-navy/70 hover:bg-kk-navy/5 hover:text-kk-navy"
            >
              More
              <ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-kk-navy/10 bg-white p-1.5 shadow-premium">
                {[
                  { href: "/institutions?category=public-tvet", label: "TVET Colleges" },
                  { href: "/institutions?category=private-university", label: "Private Universities" },
                  { href: "/institutions?category=private-college", label: "Private Colleges" },
                  { href: "/nsfas", label: "NSFAS Center" },
                  { href: "/bursaries", label: "Bursaries" },
                  { href: "/jobs", label: "Jobs" },
                  { href: "/applications", label: "Application Tracker" },
                  { href: "/pricing", label: "Premium Plans" },
                  {
                    href: "https://kandktechsolutions.co.za",
                    label: "Contact Us",
                    external: true,
                  },
                ].map((i: { href: string; label: string; external?: boolean }) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    target={i.external ? "_blank" : undefined}
                    rel={i.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-kk-navy/70 hover:bg-kk-navy/5 hover:text-kk-navy"
                  >
                    {i.label}
                    {i.external && <ExternalLink className="h-3 w-3" />}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {status === "loading" ? (
            <div className="h-9 w-20 animate-pulse rounded-xl bg-kk-navy/10" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                className="flex items-center gap-2 rounded-xl bg-kk-navy/5 px-3 py-2 text-sm font-semibold text-kk-navy hover:bg-kk-navy/10"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-kk-blue to-kk-green text-xs font-bold text-white">
                  {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="max-w-[120px] truncate">{user.name?.split(" ")[0] || "Account"}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-kk-navy/10 bg-white p-1.5 shadow-premium">
                  <div className="px-3 py-2 border-b border-kk-navy/5">
                    <p className="text-xs font-semibold text-kk-navy">{user.name}</p>
                    <p className="truncate text-[11px] text-kk-navy/50">{user.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-kk-navy/80 hover:bg-kk-navy/5">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link href="/applications" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-kk-navy/80 hover:bg-kk-navy/5">
                    <FileText className="h-4 w-4" /> Applications
                  </Link>
                  <Link href="/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-kk-navy/80 hover:bg-kk-navy/5">
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="rounded-lg px-3 py-2 text-sm font-medium text-kk-navy/70 hover:bg-kk-navy/5">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-kk-blue to-kk-blue-dark px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-kk-blue/30 transition-all hover:shadow-xl hover:shadow-kk-blue/40"
              >
                <Sparkles className="h-4 w-4" />
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-kk-navy/5 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-kk-navy/10 bg-white lg:hidden">
          {user && (
            <div className="border-b border-kk-navy/5 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-kk-blue to-kk-green text-sm font-bold text-white">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-kk-navy">{user.name}</p>
                  <p className="truncate text-xs text-kk-navy/50">{user.email}</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-1 px-4 py-3">
            {user && (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg bg-kk-blue/10 px-3 py-2.5 text-sm font-semibold text-kk-blue"
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
            )}
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-kk-navy/80 hover:bg-kk-navy/5"
                >
                  <Icon className="h-4 w-4" />
                  {l.label}
                </Link>
              );
            })}
            {[
              { href: "/institutions?category=public-tvet", label: "TVET Colleges" },
              { href: "/institutions?category=private-university", label: "Private Universities" },
              { href: "/institutions?category=private-college", label: "Private Colleges" },
              { href: "/nsfas", label: "NSFAS Center" },
              { href: "/bursaries", label: "Bursaries" },
              { href: "/applications", label: "Applications" },
              { href: "/pricing", label: "Premium" },
              {
                href: "https://kandktechsolutions.co.za",
                label: "Contact Us",
                external: true,
              },
            ].map((i: { href: string; label: string; external?: boolean }) => (
              <Link
                key={i.href}
                href={i.href}
                target={i.external ? "_blank" : undefined}
                rel={i.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-kk-navy/80 hover:bg-kk-navy/5"
              >
                {i.label}
                {i.external && <ExternalLink className="h-3 w-3" />}
              </Link>
            ))}
            <div className="mt-3 border-t border-kk-navy/5 pt-3">
              {user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-kk-navy/15 bg-white py-2 text-center text-sm font-semibold text-kk-navy"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-2 text-center text-sm font-bold text-white"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
