import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  boolean,
  jsonb,
  primaryKey,
  serial,
} from "drizzle-orm/pg-core";

// ============================================================
// AUTH TABLES (NextAuth / Auth.js compatible)
// ============================================================
export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  passwordHash: text("password_hash"),
  role: text("role").default("user").notNull(),
  plan: text("plan").default("free").notNull(),
  notificationsEnabled: boolean("notifications_enabled").default(true).notNull(),
  emailNotifications: boolean("email_notifications").default(true).notNull(),
  pushToken: text("push_token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.provider, t.providerAccountId] }),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.identifier, t.token] }) })
);

// ============================================================
// PROFILES (Detailed user profile)
// ============================================================
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  firstName: text("first_name"),
  lastName: text("last_name"),
  idNumber: text("id_number"),
  phone: text("phone"),
  dateOfBirth: text("date_of_birth"),
  gender: text("gender"),
  citizenship: text("citizenship").default("South African"),
  province: text("province"),
  city: text("city"),
  address: text("address"),
  schoolName: text("school_name"),
  matricYear: text("matric_year"),
  matricStatus: text("matric_status"),
  apsScore: integer("aps_score"),
  subjects: jsonb("subjects").$type<{ subject: string; mark: number }[]>(),
  interests: jsonb("interests").$type<string[]>(),
  fieldOfInterest: text("field_of_interest"),
  careerGoals: text("career_goals"),
  skills: jsonb("skills").$type<string[]>(),
  completionPercentage: integer("completion_percentage").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// INSTITUTIONS
// ============================================================
export const institutions = pgTable("institutions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name"),
  category: text("category").notNull(),
  province: text("province").notNull(),
  city: text("city").notNull(),
  website: text("website").notNull(),
  applyUrl: text("apply_url").notNull(),
  prospectusUrl: text("prospectus_url"),
  logoUrl: text("logo_url"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  fields: jsonb("fields").$type<string[]>(),
  apsMin: integer("aps_min"),
  fees: text("fees"),
  accommodation: text("accommodation"),
  description: text("description"),
  closingDate: text("closing_date"),
  openingDate: text("opening_date"),
  dhetReg: text("dhet_reg"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// OPPORTUNITIES
// ============================================================
export const opportunities = pgTable("opportunities", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  province: text("province").notNull(),
  closingDate: text("closing_date").notNull(),
  postedDate: text("posted_date").notNull(),
  applyUrl: text("apply_url").notNull(),
  email: text("email"), // For mailto fallback
  category: text("category"), // e.g., Retail, IT, Driver
  salary: text("salary"),
  description: text("description"),
  requirements: jsonb("requirements").$type<string[]>(),
  isVerified: boolean("is_verified").default(true).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// APPLICATIONS
// ============================================================
export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  institutionId: text("institution_id"),
  opportunityId: text("opportunity_id"),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  status: text("status").default("submitted").notNull(),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  deadline: text("deadline"),
  notes: text("notes"),
  applyUrl: text("apply_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// BOOKMARKS
// ============================================================
export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  itemType: text("item_type").notNull(),
  itemId: text("item_id").notNull(),
  title: text("title").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// DOCUMENTS
// ============================================================
export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  category: text("category"),
  url: text("url").notNull(),
  size: integer("size"),
  mimeType: text("mime_type"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// NOTIFICATIONS
// ============================================================
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(),
  link: text("link"),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// CV DOCUMENTS
// ============================================================
export const cvDocuments = pgTable("cv_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  template: text("template").notNull(),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// PREMIUM WAITLIST — collected from the Premium "Coming Soon" page.
// No payment is taken; this just records interest for launch.
// ============================================================
export const premiumWaitlist = pgTable("premium_waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  age: integer("age").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// LINK REGISTRY — automated daily health checks for every apply link.
// This is what makes "get updates automatically" real: every URL added
// here gets checked daily (via /api/cron/check-links), flagged if it
// breaks or silently redirects to the wrong domain, and can be updated
// in one place via /api/admin/links without a redeploy.
// ============================================================
export const linkRegistry = pgTable("link_registry", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(), // e.g. "job:op-sandf-001"
  label: text("label").notNull(),
  category: text("category").notNull(),
  url: text("url").notNull(),
  expectedDomain: text("expected_domain"), // flags a silent redirect to the wrong site
  lastCheckedAt: timestamp("last_checked_at"),
  lastStatusCode: integer("last_status_code"),
  isHealthy: boolean("is_healthy").default(true).notNull(),
  lastError: text("last_error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
