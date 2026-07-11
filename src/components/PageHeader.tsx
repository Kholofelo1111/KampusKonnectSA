// Shared "hub" page header used across Education/Bursary/Job pages
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  backHref,
  gradient = "from-kk-blue to-kk-green",
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  backHref?: string;
  gradient?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-kk-navy/10">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {backHref && (
          <Link
            href={backHref}
            className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        )}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-glow`}
          >
            {icon}
          </div>
          <div className="text-white">
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-kk-green">
              {eyebrow}
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-white/70 sm:text-lg">
              {description}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
