import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, profiles } from "@/db/schema";
import { signupSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    console.log("1. Signup request received");

    const body = await request.json();
    console.log("2. Request body parsed");

    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      console.log("3. Validation failed");

      return NextResponse.json(
        {
          error: "Validation failed",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.log("4. Validation passed");

    const { name, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    console.log("5. Checking existing user");

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    console.log("6. Existing user check complete");

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    console.log("7. Hashing password");

    const passwordHash = await bcrypt.hash(password, 12);

    console.log("8. Creating user");

    const [created] = await db
      .insert(users)
      .values({
        name,
        email: normalizedEmail,
        passwordHash,
      })
      .returning();

    console.log("9. User created");

    await db.insert(profiles).values({
      userId: created.id,
      completionPercentage: 0,
    });

    console.log("10. Profile created");

    return NextResponse.json({
      success: true,
      user: {
        id: created.id,
        name: created.name,
        email: created.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);

    return NextResponse.json(
      {
        error: "Could not create account.",
      },
      { status: 500 }
    );
  }
}
