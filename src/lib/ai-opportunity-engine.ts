import { db } from "@/db";
import { opportunities } from "@/db/schema";
import { eq } from "drizzle-orm";

export type OpportunityInput = {
  id: string;
  type: string;
  title: string;
  company: string;
  location: string;
  province: string;
  closingDate: string;
  postedDate: string;
  applyUrl: string;
  email?: string | null;
  category?: string | null;
  salary?: string | null;
  description: string;
  requirements: string[];
};

export async function syncOpportunities(
  records: OpportunityInput[]
) {
  let inserted = 0;
  let duplicates = 0;

  for (const record of records) {
    const exists = await db.query.opportunities.findFirst({
      where: eq(opportunities.id, record.id),
    });

    if (exists) {
      duplicates++;
      continue;
    }

    await db.insert(opportunities).values({
      ...record,
      isVerified: true,
      isActive: true,
    });

    inserted++;
  }

  return {
    received: records.length,
    inserted,
    duplicates,
  };
}
