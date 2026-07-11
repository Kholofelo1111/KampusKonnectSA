import { NextResponse } from "next/server";
import { generateIcs } from "@/lib/ics";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Deadline";
    const date = searchParams.get("date") || "";
    const description = searchParams.get("description") || "";
    const location = searchParams.get("location") || "";
    const url = searchParams.get("url") || "";

    if (!date) {
      return new NextResponse("Date is required", { status: 400 });
    }

    const ics = generateIcs({
      title,
      startDate: date,
      description,
      location,
      url,
    });

    return new NextResponse(ics, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${title.replace(/\s+/g, "_")}.ics"`,
      },
    });
  } catch (e) {
    return new NextResponse("Error generating calendar file", { status: 500 });
  }
}
