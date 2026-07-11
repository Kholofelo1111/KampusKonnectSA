"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Sparkles, Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // If already signed in, redirect
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      if (result?.ok) {
        toast.success("Welcome back!");
        // Hard navigation to ensure session cookie is picked up by middleware
        setTimeout(() => {
          window.location.href = callbackUrl;
        }, 500);
      } else {
        toast.error("Sign in failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Sign in error:", err);
      toast.error("Network error. Please check your connection.");
      setLoading(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-[90vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-kk-blue" />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex min-h-[90vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-kk-blue" />
          <p className="mt-3 text-sm text-kk-navy/60">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-kk-navy via-kk-navy to-kk-navy-light px-4 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-kk-blue/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green shadow-lg">
            <span className="font-display text-base font-extrabold text-white">KK</span>
          </div>
          <span className="font-display text-lg font-bold">Kampus KonnectSA</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/95 backdrop-blur-xl p-8 shadow-2xl"
        >
          <h1 className="font-display text-2xl font-bold text-kk-navy">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-kk-navy/60">
            Sign in to access your dashboard and applications.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-kk-navy/10 bg-slate-50 py-3 pl-10 pr-4 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20 transition-all"
                  required
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-kk-navy/10 bg-slate-50 py-3 pl-10 pr-10 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20 transition-all"
                  required
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-kk-navy/40 hover:text-kk-navy/70"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <Link href="/forgot-password" className="font-semibold text-kk-blue hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-3.5 text-sm font-bold text-white shadow-lg shadow-kk-blue/25 transition-all hover:shadow-xl hover:shadow-kk-blue/30 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-2">
                  Sign in <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-kk-navy/60">
              Don't have an account?{" "}
              <Link href="/sign-up" className="font-semibold text-kk-blue hover:underline">
                Create one free
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-kk-navy/10">
            <p className="text-xs text-center text-kk-navy/50">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[90vh] items-center justify-center bg-gradient-to-br from-kk-navy to-kk-navy-light">
        <Loader2 className="h-8 w-8 animate-spin text-kk-blue" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
