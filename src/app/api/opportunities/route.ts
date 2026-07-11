import { NextResponse } from "next/server";
import { eq, and, ilike, or, desc, asc } from "drizzle-orm";
import { db } from "@/db";
import { opportunities as opportunitiesTable } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const province = searchParams.get("province");
    const search = searchParams.get("q");
    const sort = searchParams.get("sort") || "latest";

    const conditions = [eq(opportunitiesTable.isActive, true)];

    if (type && type !== "all") {
      conditions.push(eq(opportunitiesTable.type, type));
    }
    if (province && province !== "All Provinces") {
      conditions.push(
        or(
          eq(opportunitiesTable.province, province),
          eq(opportunitiesTable.province, "National")
        )!
      );
    }
    if (search) {
      conditions.push(
        or(
          ilike(opportunitiesTable.title, `%${search}%`),
          ilike(opportunitiesTable.company, `%${search}%`),
          ilike(opportunitiesTable.location, `%${search}%`)
        )!
      );
    }

    let query = db.select().from(opportunitiesTable).where(and(...conditions));
    const list = await query;

    // Sort in JS for simplicity (small dataset)
    let sorted = [...list];
    if (sort === "latest") {
      sorted.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
    } else if (sort === "deadline") {
      sorted.sort(
        (a, b) =>
          new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime()
      );
    } else if (sort === "salary") {
      sorted.sort((a, b) => {
        const ax = parseInt((a.salary || "").replace(/\D/g, "")) || 0;
        const bx = parseInt((b.salary || "").replace(/\D/g, "")) || 0;
        return bx - ax;
      });
    }

    return NextResponse.json({ total: sorted.length, sort, opportunities: sorted });
  } catch (err) {
    console.error("Opportunities API error:", err);
    return NextResponse.json(
      { error: "Could not load opportunities" },
      { status: 500 }
    );
  }
}
