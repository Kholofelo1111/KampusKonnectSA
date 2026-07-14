import { NextResponse } from "next/server";
import { db } from "@/db";
import { opportunities } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const rows = await db
    .select()
    .from(opportunities)
    .where(eq(opportunities.isActive, true))
    .orderBy(desc(opportunities.postedDate));

  return NextResponse.json(rows);
}
