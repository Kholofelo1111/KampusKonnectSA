import { NextResponse } from "next/server";
import { checkQualification, QualifyInput } from "@/lib/qualify";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<QualifyInput>;

    if (typeof body.aps !== "number" || body.aps < 1 || body.aps > 60) {
      return NextResponse.json(
        { error: "APS score must be between 1 and 60" },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.subjects)) {
      return NextResponse.json(
        { error: "Subjects must be an array" },
        { status: 400 }
      );
    }

    const result = checkQualification({
      aps: body.aps,
      subjects: body.subjects,
      subjectMarks: body.subjectMarks,
      field: body.field,
      province: body.province,
      institutionType: body.institutionType,
    });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
