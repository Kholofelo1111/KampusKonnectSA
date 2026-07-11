"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-400 to-red-600 shadow-lg">
          <AlertTriangle className="h-10 w-10 text-white" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-kk-navy">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-kk-navy/60">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        {error.digest && (
          <p className="mt-1 text-[10px] font-mono text-kk-navy/40">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-kk-blue to-kk-green px-5 py-2.5 text-sm font-bold text-white shadow-md"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-kk-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-kk-navy hover:bg-kk-navy/5"
          >
            <Home className="h-4 w-4" /> Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
