import { NextResponse } from "next/server";
import { opportunityFeed } from "@/lib/opportunities";
import { syncOpportunities } from "@/lib/ai-opportunity-engine";

export async function POST() {
  const result = await syncOpportunities(opportunityFeed);

  return NextResponse.json({
    success: true,
    ...result,
  });
}
