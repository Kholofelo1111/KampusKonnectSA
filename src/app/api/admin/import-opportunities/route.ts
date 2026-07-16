import { NextResponse } from "next/server";
import { syncOpportunities } from "@/lib/ai-opportunity-engine";

export async function POST(request: Request) {
  try {
    const records = await request.json();

    if (!Array.isArray(records)) {
      return NextResponse.json(
        { success: false, error: "Expected an array of opportunities." },
        { status: 400 }
      );
    }

    const result = await syncOpportunities(records);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Import failed." },
      { status: 500 }
    );
  }
}