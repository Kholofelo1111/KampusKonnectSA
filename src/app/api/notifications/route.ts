import { NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/db";
import { notifications, users } from "@/db/schema";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id!;

  const list = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(50);

  return NextResponse.json({ notifications: list });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id!;
  const { id, markAll } = await request.json();

  if (markAll) {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, userId));
    return NextResponse.json({ success: true });
  }

  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  await db
    .update(notifications)
    .set({ read: true })
    .where(and(eq(notifications.id, id), eq(notifications.userId, userId)));

  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id!;
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  await db
    .update(users)
    .set({
      pushToken: token,
    })
    .where(eq(users.id, userId));

  return NextResponse.json({
    success: true,
  });
}
