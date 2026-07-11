"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import {
  Settings,
  Bell,
  Mail,
  Smartphone,
  Shield,
  Trash2,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pushPermission, setPushPermission] = useState<NotificationPermission | "unsupported">("default");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/sign-in?callbackUrl=/settings");
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
    if (typeof window !== "undefined" && "Notification" in window) {
      setPushPermission(Notification.permission);
    } else {
      setPushPermission("unsupported");
    }
  }, []);

  async function requestPushPermission() {
    if (pushPermission === "unsupported") {
      toast.error("Push notifications are not supported on this device.");
      return;
    }
    const perm = await Notification.requestPermission();
    setPushPermission(perm);
    if (perm === "granted") {
      new Notification("Kampus KonnectSA", {
        body: "Notifications enabled! We'll alert you about deadlines and updates.",
        icon: "/icon-192.svg",
      });
      toast.success("Push notifications enabled ✓");
    } else if (perm === "denied") {
      toast.error("Notifications blocked. Enable them in your browser settings.");
    }
  }

  async function handleDeleteAccount() {
    if (!confirm("Are you sure? This will permanently delete your account and all data.")) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (res.ok) {
        toast.success("Account deleted");
        signOut({ callbackUrl: "/" });
      } else {
        toast.error("Could not delete account. Please contact support.");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setDeleting(false);
    }
  }



  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Account & Preferences"
        description="Manage your notifications, privacy and account."
        backHref="/dashboard"
        icon={<Settings className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        {/* Notifications */}
        <section className="rounded-3xl border border-kk-navy/5 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green text-white">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-kk-navy">Notifications</h2>
              <p className="text-xs text-kk-navy/60">
                Choose how we contact you about deadlines and updates
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Push */}
            <div className="flex items-center justify-between rounded-2xl border border-kk-navy/5 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <Smartphone className="mt-0.5 h-5 w-5 text-kk-blue" />
                <div>
                  <p className="text-sm font-semibold text-kk-navy">Push notifications</p>
                  <p className="text-xs text-kk-navy/60">
                    Browser + mobile alerts for deadlines, status changes, new bursaries
                  </p>
                  {pushPermission === "denied" && (
                    <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-red-600">
                      <AlertCircle className="h-3 w-3" /> Blocked — enable in browser settings
                    </p>
                  )}
                  {pushPermission === "granted" && (
                    <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-kk-green">
                      <Check className="h-3 w-3" /> Active
                    </p>
                  )}
                </div>
              </div>
              {pushPermission === "default" || pushPermission === "denied" ? (
                <button
                  onClick={requestPushPermission}
                  className="rounded-xl bg-kk-blue px-4 py-2 text-xs font-bold text-white hover:bg-kk-blue-dark"
                >
                  Enable
                </button>
              ) : (
                <Toggle checked={pushNotifs} onChange={setPushNotifs} />
              )}
            </div>

            {/* Email */}
            <div className="flex items-center justify-between rounded-2xl border border-kk-navy/5 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-kk-green" />
                <div>
                  <p className="text-sm font-semibold text-kk-navy">Email notifications</p>
                  <p className="text-xs text-kk-navy/60">
                    Daily digest of new opportunities matching your profile
                  </p>
                </div>
              </div>
              <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-kk-blue/15 bg-kk-blue/5 p-4">
            <p className="text-xs font-semibold text-kk-navy">You'll receive:</p>
            <ul className="mt-2 grid grid-cols-1 gap-1 text-[11px] text-kk-navy/70 sm:grid-cols-2">
              <li>• Application status updates</li>
              <li>• Closing dates reminders</li>
              <li>• New bursaries matching you</li>
              <li>• NSFAS updates</li>
              <li>• University announcements</li>
              <li>• TVET announcements</li>
              <li>• Interview notifications</li>
              <li>• Missing documents reminders</li>
            </ul>
          </div>
        </section>

        {/* Account */}
        <section className="rounded-3xl border border-kk-navy/5 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kk-navy to-kk-navy-light text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-kk-navy">Account & Privacy</h2>
              <p className="text-xs text-kk-navy/60">{session?.user?.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full rounded-2xl border border-kk-navy/15 bg-white px-4 py-3 text-left text-sm font-semibold text-kk-navy hover:bg-kk-navy/5"
            >
              Sign out
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
            >
              <span className="inline-flex items-center gap-2">
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete my account
              </span>
              <p className="mt-1 text-[11px] font-normal text-red-600/80">
                This will permanently delete your profile, applications and all data.
              </p>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        checked ? "bg-kk-green" : "bg-kk-navy/20"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
