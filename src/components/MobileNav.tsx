"use client";

// ============================================================
// Mobile bottom tab bar — premium app-like navigation
// Visible only on mobile (<lg). Safe-area aware for iOS.
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  GraduationCap,
  Briefcase,
  Target,
  Sparkles,
} from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/institutions", label: "Study", icon: GraduationCap },
  { href: "/feed", label: "Jobs", icon: Briefcase },
  { href: "/qualify", label: "Qualify", icon: Target },
  { href: "/ai", label: "AI", icon: Sparkles },
];

export function MobileNav() {
  const pathname = usePathname();

  // Hide on auth pages for a cleaner flow
  if (
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/forgot-password")
  ) {
    return null;
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-kk-navy/10 bg-white/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {tabs.map((t) => {
          const active = t.exact
            ? pathname === t.href
            : pathname?.startsWith(t.href);
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`relative flex min-h-[56px] min-w-[56px] flex-1 flex-col items-center justify-center gap-0.5 py-1.5 transition-colors ${
                active ? "text-kk-blue" : "text-kk-navy/50 active:text-kk-navy"
              }`}
            >
              {active && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-kk-blue to-kk-green" />
              )}
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-xl transition-all ${
                  active ? "bg-kk-blue/10 scale-110" : ""
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.5 : 2} />
              </span>
              <span className={`text-[10px] ${active ? "font-bold" : "font-medium"}`}>
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
