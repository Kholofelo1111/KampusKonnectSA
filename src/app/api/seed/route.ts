import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed";

// Idempotent seed endpoint. Run once after deployment to populate
// institutions + opportunities tables from verified data.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await seedDatabase();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json(
      { error: "Seed failed", details: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
