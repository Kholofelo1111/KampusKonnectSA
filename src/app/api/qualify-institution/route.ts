import { NextResponse } from "next/server";
import { allInstitutions } from "@/lib/institutions";
import { checkInstitutionQualification } from "@/lib/qualify-institution";
import type { MatricSubject } from "@/lib/qualify";

export const runtime = "nodejs";

// POST /api/qualify-institution
// Body: { institutionId, aps, subjects[] }
// Returns programmes at THIS institution with match %.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { institutionId, aps, subjects } = body as {
      institutionId: string;
      aps: number;
      subjects: MatricSubject[];
    };

    if (!institutionId) {
      return NextResponse.json({ error: "institutionId required" }, { status: 400 });
    }
    if (typeof aps !== "number" || aps < 1 || aps > 60) {
      return NextResponse.json(
        { error: "APS must be between 1 and 60" },
        { status: 400 }
      );
    }
    if (!Array.isArray(subjects)) {
      return NextResponse.json(
        { error: "subjects must be an array" },
        { status: 400 }
      );
    }

    const institution = allInstitutions.find((i) => i.id === institutionId);
    if (!institution) {
      return NextResponse.json(
        { error: "Institution not found" },
        { status: 404 }
      );
    }

    const result = checkInstitutionQualification(institution, aps, subjects, body.subjectMarks);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
