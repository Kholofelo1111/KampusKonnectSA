import { NextResponse } from "next/server";
import { runAi } from "@/lib/ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (typeof query !== "string" || !query.trim()) {
      return NextResponse.json({ error: "Query required" }, { status: 400 });
    }
    const response = runAi(query);
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
