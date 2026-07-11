// Credentials provider with bcrypt password hashing
// Drizzle adapter for Neon PostgreSQL persistence
// ============================================================

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "@/db/schema";

import { signinSchema } from "@/lib/validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/sign-in",
  },

  trustHost: true,

  secret:
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET ||
    "dev-secret-change-me",

  providers: [
    Credentials({
      name: "Email",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const parsed = signinSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const found = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase()))
          .limit(1);

        const user = found[0];

        if (!user || !user.passwordHash) {
          return null;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);

        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          plan: user.plan,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id!;
        token.email = user.email!;
        token.role = (user as any).role;
        token.plan = (user as any).plan;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.uid;
        (session.user as any).role = token.role;
        (session.user as any).plan = token.plan;
      }

      return session;
    },
  },
});
