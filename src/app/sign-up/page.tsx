"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Mail, Lock, User, Loader2, ArrowRight, Check as CheckIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const passwordValid = Object.values(passwordChecks).every(Boolean);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim() || !/.+@.+\..+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!passwordValid) {
      toast.error("Password does not meet all requirements");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not create account");
        setLoading(false);
        return;
      }

      // Auto sign-in
      const signin = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (signin?.ok) {
        toast.success("Welcome to Kampus KonnectSA!");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.success("Account created! Please sign in.");
        router.push("/sign-in");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[90vh] bg-mesh px-4 py-16">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="relative mx-auto max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-white/80 hover:text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green shadow-lg">
            <span className="font-display text-base font-extrabold text-white">KK</span>
          </div>
          <span className="font-display text-lg font-bold">Kampus KonnectSA</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-white p-8 shadow-premium"
        >
          <h1 className="font-display text-2xl font-bold text-kk-navy">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-kk-navy/60">
            Free forever. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Thandi Nkosi"
                  className="w-full rounded-xl border border-kk-navy/10 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-kk-navy/10 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-kk-navy/50">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kk-navy/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-kk-navy/10 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-kk-navy focus:border-kk-blue focus:outline-none focus:ring-2 focus:ring-kk-blue/20"
                  required
                  autoComplete="new-password"
                />
              </div>
              <ul className="mt-2 space-y-0.5 text-[11px]">
                <CheckItem c={passwordChecks.length} text="At least 8 characters" />
                <CheckItem c={passwordChecks.upper} text="At least one uppercase letter" />
                <CheckItem c={passwordChecks.number} text="At least one number" />
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading || !passwordValid || !name || !email}
              className="w-full rounded-xl bg-gradient-to-br from-kk-blue to-kk-green py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Creating account…
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  Create account <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </button>

            <p className="text-[11px] text-kk-navy/50">
              By signing up you agree to our Terms & Privacy Policy.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-kk-navy/60">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-kk-blue hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function CheckItem({ c, text }: { c: boolean; text: string }) {
  return (
    <li className={`inline-flex w-full items-center gap-1.5 ${c ? "text-kk-green" : "text-kk-navy/40"}`}>
      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
          c ? "bg-kk-green text-white" : "bg-kk-navy/10"
        }`}
      >
        {c && <CheckIcon className="h-2.5 w-2.5" />}
      </span>
      {text}
    </li>
  );
}
