// ============================================================
// Reusable UI component library — Kampus KonnectSA design system
// Extracted from duplicated patterns across pages.
// All components are mobile-first with 44px+ touch targets.
// ============================================================
"use client";

import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { Loader2, ExternalLink } from "lucide-react";

// ---- Badge ----
type BadgeVariant = "blue" | "green" | "amber" | "red" | "purple" | "navy" | "orange";

const badgeStyles: Record<BadgeVariant, string> = {
  blue: "bg-kk-blue/10 text-kk-blue",
  green: "bg-kk-green/15 text-kk-green",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
  navy: "bg-kk-navy/10 text-kk-navy/70",
  orange: "bg-orange-100 text-orange-700",
};

export function Badge({
  variant = "navy",
  children,
  className = "",
  pulse = false,
}: {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[variant]} ${pulse ? "animate-pulse" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

// ---- Buttons ----
type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "whatsapp";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-kk-blue to-kk-green text-white shadow-md hover:scale-[1.02] active:scale-[0.98]",
  secondary: "bg-kk-navy text-white hover:bg-kk-blue",
  outline:
    "border border-kk-navy/15 bg-white text-kk-navy hover:bg-kk-navy/5 active:bg-kk-navy/10",
  danger: "bg-red-50 border border-red-200 text-red-700 hover:bg-red-100",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1FAE54] shadow-md",
};

export function Button({
  variant = "primary",
  loading = false,
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
}) {
  return (
    <button
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed ${buttonStyles[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  href,
  external = false,
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  href: string;
  external?: boolean;
}) {
  const cls = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${buttonStyles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props}>
        {children}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

// ---- Card ----
export function Card({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-kk-navy/5 bg-white p-5 shadow-sm ${
        hover ? "transition-all hover:-translate-y-0.5 hover:shadow-premium" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---- Loading states ----
export function PageLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-kk-blue" />
        <p className="mt-3 text-sm text-kk-navy/60">{label}</p>
      </div>
    </div>
  );
}

export function InlineLoader() {
  return <Loader2 className="h-4 w-4 animate-spin" />;
}

// ---- Empty state ----
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-kk-navy/20 bg-white p-10 text-center sm:p-12">
      {icon && <div className="mx-auto mb-3 flex justify-center text-kk-navy/30">{icon}</div>}
      <p className="font-semibold text-kk-navy">{title}</p>
      {description && <p className="mt-1 text-sm text-kk-navy/50">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

// ---- Section heading ----
export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : ""}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-kk-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-kk-blue">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-2xl font-bold text-kk-navy sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base text-kk-navy/60 sm:text-lg">{description}</p>}
    </div>
  );
}

// ---- Form field (mobile-first inputs) ----
export function FormInput({
  label,
  error,
  required,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        className={`min-h-[44px] w-full rounded-xl border bg-white px-3 py-2.5 text-base text-kk-navy focus:outline-none focus:ring-2 sm:text-sm ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200"
            : "border-kk-navy/10 focus:border-kk-blue focus:ring-kk-blue/20"
        }`}
        {...props}
      />
      {error && <span className="mt-1 block text-[11px] text-red-600">{error}</span>}
    </label>
  );
}
