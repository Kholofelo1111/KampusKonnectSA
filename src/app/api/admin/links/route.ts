// GET/POST/DELETE link_registry entries. All require header: x-admin-secret.
//
// Fix a broken link without redeploying:
//   curl -X POST https://<domain>/api/admin/links \
//     -H "Content-Type: application/json" -H "x-admin-secret: <secret>" \
//     -d '{"key":"job:op-sandf-001","label":"SANDF","category":"job","url":"https://..."}'
import { NextResponse } from "next/server";
import { db } from "@/db";
import { linkRegistry } from "@/db/schema";
import { eq } from "drizzle-orm";

function checkAuth(request: Request): NextResponse | null {
  const secret = request.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_SECRET;
  if (!expected) return NextResponse.json({ error: "ADMIN_SECRET not configured" }, { status: 500 });
  if (!secret || secret !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const rows = category
    ? await db.select().from(linkRegistry).where(eq(linkRegistry.category, category))
    : await db.select().from(linkRegistry);
  return NextResponse.json({ links: rows, count: rows.length });
}

export async function POST(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;
  const body = await request.json().catch(() => null);
  const { key, label, category, url, expectedDomain } = body || {};
  if (!key || !label || !category || !url) {
    return NextResponse.json({ error: "Body must include key, label, category, url" }, { status: 400 });
  }
  const [existing] = await db.select().from(linkRegistry).where(eq(linkRegistry.key, key)).limit(1);
  if (existing) {
    const [updated] = await db
      .update(linkRegistry)
      .set({ label, category, url, expectedDomain, updatedAt: new Date() })
      .where(eq(linkRegistry.key, key))
      .returning();
    return NextResponse.json({ success: true, action: "updated", link: updated });
  }
  const [created] = await db.insert(linkRegistry).values({ key, label, category, url, expectedDomain }).returning();
  return NextResponse.json({ success: true, action: "created", link: created });
}

export async function DELETE(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key) return NextResponse.json({ error: "?key= required" }, { status: 400 });
  await db.delete(linkRegistry).where(eq(linkRegistry.key, key));
  return NextResponse.json({ success: true, deleted: key });
}
