import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);

    return Response.json({
      ok: true,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        ok: false,
        error: String(err),
        cause: err instanceof Error ? err.cause : null,
      },
      { status: 500 }
    );
  }
}
