import { NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { auth } from "@/lib/auth";
import { applicationSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id!;

  const list = await db
    .select()
    .from(applications)
    .where(eq(applications.userId, userId))
    .orderBy(desc(applications.createdAt));

  return NextResponse.json({ applications: list });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id!;
  const body = await request.json();
  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid application data", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const [created] = await db
    .insert(applications)
    .values({ userId, ...parsed.data })
    .returning();

  return NextResponse.json({ application: created });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id!;
  const { id, status } = await request.json();
  if (!id || !status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  const [updated] = await db
    .update(applications)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(applications.id, id), eq(applications.userId, userId)))
    .returning();

  return NextResponse.json({ application: updated });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id!;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  await db
    .delete(applications)
    .where(and(eq(applications.id, id), eq(applications.userId, userId)));

  return NextResponse.json({ success: true });
}
