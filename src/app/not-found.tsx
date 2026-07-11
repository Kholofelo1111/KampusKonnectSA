import Link from "next/link";
import { Home, Search, GraduationCap, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative mx-auto max-w-md text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-kk-blue to-kk-green shadow-glow">
          <span className="font-display text-5xl font-extrabold text-white">404</span>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-kk-navy">
          Page not found
        </h1>
        <p className="mt-2 text-kk-navy/60">
          The page you're looking for doesn't exist or has moved.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            href="/"
            className="rounded-2xl border border-kk-navy/10 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <Home className="mx-auto h-6 w-6 text-kk-blue" />
            <p className="mt-2 text-xs font-semibold text-kk-navy">Home</p>
          </Link>
          <Link
            href="/institutions"
            className="rounded-2xl border border-kk-navy/10 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <GraduationCap className="mx-auto h-6 w-6 text-kk-green" />
            <p className="mt-2 text-xs font-semibold text-kk-navy">Institutions</p>
          </Link>
          <Link
            href="/feed"
            className="rounded-2xl border border-kk-navy/10 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <Search className="mx-auto h-6 w-6 text-purple-500" />
            <p className="mt-2 text-xs font-semibold text-kk-navy">Opportunities</p>
          </Link>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-kk-blue hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to homepage
        </Link>
      </div>
    </div>
  );
}
