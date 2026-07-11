import { NextResponse } from "next/server";
import { eq, and, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { institutions as institutionsTable } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const province = searchParams.get("province");
    const field = searchParams.get("field");
    const search = searchParams.get("q");

    const conditions = [];

    if (category) conditions.push(eq(institutionsTable.category, category));
    if (province && province !== "All Provinces") {
      conditions.push(
        or(
          eq(institutionsTable.province, province),
          eq(institutionsTable.province, "National"),
          eq(institutionsTable.province, "Multi-Province")
        )!
      );
    }
    if (search) {
      conditions.push(
        or(
          ilike(institutionsTable.name, `%${search}%`),
          ilike(institutionsTable.city, `%${search}%`)
        )!
      );
    }
    if (field) {
      conditions.push(sql`${institutionsTable.fields}::jsonb @> ${JSON.stringify([field])}::jsonb`);
    }

    const list = await db
      .select()
      .from(institutionsTable)
      .where(conditions.length ? and(...conditions) : undefined);

    return NextResponse.json({ total: list.length, institutions: list });
  } catch (err) {
    console.error("Institutions API error:", err);
    return NextResponse.json(
      { error: "Could not load institutions" },
      { status: 500 }
    );
  }
}
