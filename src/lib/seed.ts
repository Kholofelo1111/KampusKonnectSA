// ============================================================
// Database seeder — Inserts verified institutions + sample
// opportunities. Run via /api/seed endpoint.
// ============================================================
import { db } from "@/db";
import { institutions, opportunities } from "@/db/schema";
import { allInstitutions } from "@/lib/institutions";
import { opportunityFeed } from "@/lib/opportunities";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  // Clear existing data
  await db.delete(institutions);
  await db.delete(opportunities);

  // Insert all 94 verified institutions
  const instRows = allInstitutions.map((i) => ({
    id: i.id,
    name: i.name,
    shortName: i.short,
    category: i.category,
    province: i.province,
    city: i.city,
    website: i.website,
    applyUrl: i.applyUrl,
    prospectusUrl: i.prospectusUrl ?? null,
    phone: i.phone ?? null,
    email: i.email ?? null,
    fields: i.fields,
    apsMin: i.apsMin ?? null,
    fees: i.fees ?? null,
    description: i.description,
    closingDate: i.closingDate ?? null,
    openingDate: i.openingDate ?? null,
    dhetReg: i.dhetReg ?? null,
  }));

  await db.insert(institutions).values(instRows);

  // Insert all verified opportunities (now 100+)
  const oppRows = opportunityFeed.map((o) => ({
    id: o.id,
    type: o.type,
    title: o.title,
    company: o.company,
    location: o.location,
    province: o.province,
    closingDate: o.closingDate,
    postedDate: o.postedDate,
    applyUrl: o.applyUrl,
    email: o.email ?? null,
    category: o.category ?? null,
    salary: o.salary ?? null,
    description: o.description,
    requirements: o.requirements,
    isVerified: o.isVerified,
    isActive: true,
  }));

  await db.insert(opportunities).values(oppRows);

  return {
    institutionsInserted: instRows.length,
    opportunitiesInserted: oppRows.length,
  };
}
