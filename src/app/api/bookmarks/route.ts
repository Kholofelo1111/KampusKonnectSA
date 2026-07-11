import { NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/db";
import { bookmarks } from "@/db/schema";
import { auth } from "@/lib/auth";
import { bookmarkSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id!;

  const list = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));

  return NextResponse.json({ bookmarks: list });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id!;
  const body = await request.json();
  const parsed = bookmarkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid bookmark data" }, { status: 400 });
  }

  // Toggle: if exists, delete; otherwise insert
  const existing = await db
    .select()
    .from(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.itemType, parsed.data.itemType),
        eq(bookmarks.itemId, parsed.data.itemId)
      )
    );

  if (existing.length) {
    await db.delete(bookmarks).where(eq(bookmarks.id, existing[0].id));
    return NextResponse.json({ bookmarked: false });
  }

  const [created] = await db
    .insert(bookmarks)
    .values({
      userId,
      ...parsed.data,
    })
    .returning();

  return NextResponse.json({ bookmarked: true, bookmark: created });
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
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await db
    .delete(bookmarks)
    .where(and(eq(bookmarks.id, id), eq(bookmarks.userId, userId)));

  return NextResponse.json({ success: true });
}
