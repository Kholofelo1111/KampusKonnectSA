"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, ArrowRight, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    // In production: POST to /api/forgot-password to send reset link
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
    toast.success("If an account exists, a reset link has been sent.");
  }

  return (
    <div className="relative min-h-[90vh] bg-mesh px-4 py-16">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="relative mx-auto max-w-md">
        <Link href="/sign-in" className="mb-6 inline-flex items-center gap-2 text-white/80 hover:text-white">
          ← Back to sign in
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-premium">
          <h1 className="font-display text-2xl font-bold text-kk-navy">Reset password</h1>
          {!sent ? (
            <>
              <p className="mt-1 text-sm text-kk-navy/60">
                Enter the email you used to sign up and we'll send you a reset link.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-kk-navy/10 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-3 text-sm font-bold text-white shadow-md hover:scale-[1.02] disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Send reset link <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-kk-green/30 bg-kk-green/5 p-5 text-sm text-kk-navy/80">
              <p className="font-semibold text-kk-navy">Check your email</p>
              <p className="mt-1">
                If an account exists for <strong>{email}</strong>, we've sent a password reset link.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
