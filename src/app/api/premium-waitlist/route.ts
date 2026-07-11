import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { premiumWaitlist } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

const waitlistSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(200),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
  age: z.coerce.number().int().min(13, "You must be at least 13").max(120, "Please enter a valid age"),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  const { fullName, email, age } = parsed.data;

  const [existing] = await db
    .select()
    .from(premiumWaitlist)
    .where(eq(premiumWaitlist.email, email))
    .limit(1);

  if (existing) {
    // Already on the list — treat as success so the UI doesn't feel broken,
    // it's just not a new row.
    return NextResponse.json({ success: true, alreadyJoined: true });
  }

  await db.insert(premiumWaitlist).values({ fullName, email, age });

  return NextResponse.json({ success: true, alreadyJoined: false });
}

export async function GET(request: Request) {
  // Lightweight admin view of signups — protected by ADMIN_SECRET.
  const secret = request.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await db.select().from(premiumWaitlist);
  return NextResponse.json({ count: rows.length, signups: rows });
}
