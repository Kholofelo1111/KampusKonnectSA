import { notFound } from "next/navigation";
import {
  universities,
  bursaries,
  jobs,
  internships,
  learnerships,
} from "@/lib/data";
import { getApplyLink } from "@/lib/apply-links";
import { OpportunityDetail } from "@/components/OpportunityDetail";
import { getVerifiedUrls } from "@/lib/verified-urls";
import { allInstitutions, publicTvets, privateColleges, privateUniversities } from "@/lib/institutions";
import { opportunityFeed } from "@/lib/opportunities";

type Props = {
  params: Promise<{ type: string; id: string }>;
};

const TYPE_TO_FEED_TYPE: Record<string, string> = {
  jobs: "job",
  bursaries: "bursary",
  learnerships: "learnership",
  internships: "internship",
};

export default async function OpportunityPage({ params }: Props) {
  const { type, id } = await params;
  const link = getApplyLink(type, id);

  let content: {
    title: string;
    subtitle?: string;
    description?: string;
    deadline?: string;
    openingDate?: string;
    metaItems?: { label: string; value: string }[];
    coverItems?: string[];
    requirements?: string[];
  } | null = null;

  const backUrl = `/${type}`;

  if (type === "universities") {
    // Use new institutions data for accurate URLs + opening/closing dates
    const inst = allInstitutions.find((i) => i.id === id);
    if (!inst) notFound();
    content = {
      title: inst.name,
      subtitle: `${inst.city}, ${inst.province}`,
      description: inst.description,
      deadline: inst.closingDate,
      openingDate: inst.openingDate,
      metaItems: [
        ...(inst.apsMin !== undefined ? [{ label: "APS Minimum", value: inst.apsMin.toString() }] : []),
        ...(inst.fees ? [{ label: "Fees", value: inst.fees }] : []),
        ...(inst.openingDate ? [{ label: "Opening Date", value: inst.openingDate }] : []),
        ...(inst.closingDate ? [{ label: "Closing Date", value: inst.closingDate }] : []),
        ...(inst.phone ? [{ label: "Phone", value: inst.phone }] : []),
        ...(inst.email ? [{ label: "Email", value: inst.email }] : []),
      ],
      requirements: inst.fields,
    };
  } else if (type === "bursaries") {
    const b = bursaries.find((b) => b.id === id);
    if (b) {
      content = {
        title: b.name,
        subtitle: `by ${b.sponsor}`,
        description: b.eligibility,
        deadline: b.deadline,
        metaItems: [
          { label: "Amount", value: b.amount },
          { label: "Deadline", value: b.deadline },
          { label: "Level", value: b.level },
          { label: "Province", value: b.province },
        ],
        coverItems: b.covers,
        requirements: [b.eligibility],
      };
    }
  } else if (type === "jobs") {
    const j = jobs.find((j) => j.id === id);
    if (j) {
      content = {
        title: j.title,
        subtitle: j.company,
        description: j.description,
        deadline: j.deadline,
        metaItems: [
          { label: "Location", value: j.location },
          { label: "Salary", value: j.salary },
          { label: "Type", value: j.type },
          { label: "Deadline", value: j.deadline },
        ],
        requirements: j.requirements,
      };
    }
  } else if (type === "internships") {
    const i = internships.find((i) => i.id === id);
    if (i) {
      content = {
        title: i.title,
        subtitle: i.organization,
        description: i.description,
        deadline: i.deadline,
        metaItems: [
          { label: "Location", value: i.location },
          { label: "Duration", value: i.duration },
          { label: "Stipend", value: i.stipend },
          { label: "Deadline", value: i.deadline },
        ],
        requirements: i.requirements,
      };
    }
  } else if (type === "learnerships") {
    const l = learnerships.find((l) => l.id === id);
    if (l) {
      content = {
        title: l.title,
        subtitle: l.provider,
        description: l.description,
        deadline: l.deadline,
        metaItems: [
          { label: "SETA", value: l.seta },
          { label: "Level", value: l.level },
          { label: "Duration", value: l.duration },
          { label: "Stipend", value: l.stipend },
          { label: "Location", value: l.location },
          { label: "Deadline", value: l.deadline },
        ],
        requirements: l.requirements,
      };
    }
  }

  // Fallback: this listing might only exist in the newer opportunityFeed
  // (src/lib/opportunities.ts) rather than the older src/lib/data.ts arrays
  // above — e.g. SANDF, Motsepe Foundation, and every other hand-curated
  // entry added directly to opportunities.ts. Previously any of these
  // 404'd the moment someone clicked "How to apply", because this route
  // only ever checked data.ts. This is what fixes that.
  let feedFallback: (typeof opportunityFeed)[number] | undefined;
  if (!content) {
    feedFallback = opportunityFeed.find(
      (o) => o.id === id && o.type === TYPE_TO_FEED_TYPE[type]
    );
    if (feedFallback) {
      content = {
        title: feedFallback.title,
        subtitle: feedFallback.company,
        description: feedFallback.description,
        deadline: feedFallback.closingDate,
        metaItems: [
          { label: "Location", value: feedFallback.location },
          ...(feedFallback.salary ? [{ label: "Salary/Amount", value: feedFallback.salary }] : []),
          ...(feedFallback.category ? [{ label: "Category", value: feedFallback.category }] : []),
          { label: "Closing Date", value: feedFallback.closingDate },
        ],
        requirements: feedFallback.requirements,
      };
    }
  }

  if (!content) notFound();

  // Look up verified URL + fallback instructions
  let verified;
  if (type === "universities") {
    const inst = allInstitutions.find((i) => i.id === id);
    const isPrivate = privateUniversities.some((p) => p.id === id);
    verified = getVerifiedUrls(
      isPrivate ? "private-university" : "university",
      id,
      inst ? { website: inst.website, name: inst.name, phone: inst.phone, email: inst.email } : undefined
    );
  } else {
    verified = feedFallback
      ? {
          applyUrl: feedFallback.applyUrl,
          prospectusUrl: undefined,
          applyInstructions: feedFallback.howToApply ?? [],
        }
      : getVerifiedUrls("opportunity", id);
  }

  // Prefer verified URL over the old link; if this came from the
  // opportunityFeed fallback above, its own applyUrl/email are already
  // real, individually-verified values — use those directly rather than
  // falling through to the (irrelevant, id-mismatched) apply-links.ts data.
  const finalApplyUrl = verified.applyUrl || link?.applyUrl || feedFallback?.applyUrl;
  const finalProspectusUrl = verified.prospectusUrl || link?.prospectusUrl || undefined;
  const finalHowToApply = verified.applyInstructions || link?.howToApply || feedFallback?.howToApply || [];
  const finalEmail = feedFallback?.email;

  return (
    <OpportunityDetail
      type={type}
      id={id}
      backUrl={backUrl}
      applyUrl={finalApplyUrl}
      prospectusUrl={finalProspectusUrl}
      howToApply={finalHowToApply}
      email={finalEmail}
      {...content}
    />
  );
}
