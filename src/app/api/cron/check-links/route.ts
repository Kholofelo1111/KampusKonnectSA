// ============================================================
// Daily link health check — the "get updates automatically" system.
//
// Checks every URL in link_registry, updates is_healthy/last_status_code,
// and (if RESEND_API_KEY + ALERT_EMAIL_TO are set) emails a report when
// anything's broken. Also catches the specific bug found repeatedly in
// this app: a link that returns 200 OK but silently redirects to the
// wrong page (e.g. a careers URL redirecting to a homepage).
//
// TRIGGER OPTIONS:
// 1) Vercel Cron — add to vercel.json:
//      { "crons": [{ "path": "/api/cron/check-links", "schedule": "0 6 * * *" }] }
// 2) Manually or via Termux/cron:
//      curl -X POST https://<your-domain>/api/cron/check-links \
//        -H "x-admin-secret: <ADMIN_SECRET>"
// ============================================================
import { NextResponse } from "next/server";
import { db } from "@/db";
import { linkRegistry } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthorized(request: Request): boolean {
  const adminSecret = request.headers.get("x-admin-secret");
  if (adminSecret && adminSecret === process.env.ADMIN_SECRET) return true;
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;
  return false;
}

async function checkOneLink(url: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "KampusKonnectSA-LinkChecker/1.0" },
    });
    clearTimeout(timeout);
    return { ok: res.status < 400, status: res.status, error: null as string | null, finalUrl: res.url };
  } catch (e) {
    return { ok: false, status: null, error: e instanceof Error ? e.message : "Unknown error", finalUrl: null };
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links = await db.select().from(linkRegistry);
  const results: Array<{ key: string; label: string; url: string; ok: boolean; status: number | null; error: string | null }> = [];

  for (const link of links) {
    const check = await checkOneLink(link.url);
    const domainMismatch =
      !!link.expectedDomain && !!check.finalUrl && !check.finalUrl.includes(link.expectedDomain);
    const healthy = check.ok && !domainMismatch;

    await db
      .update(linkRegistry)
      .set({
        lastCheckedAt: new Date(),
        lastStatusCode: check.status,
        isHealthy: healthy,
        lastError: check.error || (domainMismatch ? `Redirected to unexpected domain: ${check.finalUrl}` : null),
        updatedAt: new Date(),
      })
      .where(eq(linkRegistry.key, link.key));

    results.push({
      key: link.key,
      label: link.label,
      url: link.url,
      ok: healthy,
      status: check.status,
      error: check.error || (domainMismatch ? `Redirected to unexpected domain (${check.finalUrl})` : null),
    });
  }

  const broken = results.filter((r) => !r.ok);

  if (broken.length > 0 && process.env.RESEND_API_KEY && process.env.ALERT_EMAIL_TO) {
    await sendBrokenLinksEmail(broken);
  }

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    totalChecked: results.length,
    brokenCount: broken.length,
    broken,
  });
}

async function sendBrokenLinksEmail(broken: Array<{ key: string; label: string; url: string; status: number | null; error: string | null }>) {
  const rows = broken
    .map((b) => `<tr><td>${b.label}</td><td>${b.key}</td><td>${b.url}</td><td>${b.status ?? "\u2014"}</td><td>${b.error ?? ""}</td></tr>`)
    .join("");
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ALERT_EMAIL_FROM || "alerts@kampuskonnectsa.co.za",
        to: process.env.ALERT_EMAIL_TO,
        subject: `\u26a0\ufe0f ${broken.length} broken link(s) on Kampus KonnectSA`,
        html: `<p>The daily link check found ${broken.length} broken link(s):</p>
          <table border="1" cellpadding="6" style="border-collapse:collapse">
            <tr><th>Label</th><th>Key</th><th>URL</th><th>Status</th><th>Error</th></tr>
            ${rows}
          </table>`,
      }),
    });
  } catch {
    // Don't fail the whole health check just because the email failed.
  }
}
