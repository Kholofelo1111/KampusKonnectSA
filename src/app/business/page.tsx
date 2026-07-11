"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ExternalLink,
  Building2,
  Users,
  DollarSign,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const supportPrograms = [
  {
    id: "nyda",
    name: "National Youth Development Agency (NYDA)",
    description: "Grants up to R250,000 for youth-owned businesses (18-35 years). Also offers mentorship and business skills training.",
    url: "https://www.nyda.gov.za/",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    type: "Grant & Mentorship",
  },
  {
    id: "sefa",
    name: "Small Enterprise Finance Agency (SEFA)",
    description: "Provides loans and credit guarantees to SMMEs and cooperatives. Focus on black-owned, women-owned, and youth-owned businesses.",
    url: "https://www.sefa.org.za/",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    type: "Loans & Credit",
  },
  {
    id: "idc",
    name: "Industrial Development Corporation (IDC)",
    description: "Financing for industrial projects and large-scale business ventures. Focus on manufacturing, agro-processing, and green energy.",
    url: "https://www.idc.co.za/",
    icon: Building2,
    color: "from-purple-500 to-pink-500",
    type: "Industrial Finance",
  },
  {
    id: "nef",
    name: "National Empowerment Fund (NEF)",
    description: "Financial and non-financial support to black-owned businesses. Offers loans, equity, and grants.",
    url: "https://www.nefcorp.co.za/",
    icon: TrendingUp,
    color: "from-orange-500 to-amber-500",
    type: "B-BBEE Finance",
  },
  {
    id: "dsbd",
    name: "Dept. of Small Business Development (DSBD)",
    description: "Government department offering various funding programmes, incubation, and export assistance for small businesses.",
    url: "https://www.dsbd.gov.za/",
    icon: Briefcase,
    color: "from-kk-blue to-kk-green",
    type: "Government Support",
  },
  {
    id: "seda",
    name: "Small Enterprise Development Agency (SEDA)",
    description: "Non-financial support: business plans, market access, technology support, and incubation for SMMEs.",
    url: "https://www.dsbd.gov.za/small-enterprise-development-agency-seda",
    icon: CheckCircle2,
    color: "from-red-500 to-rose-500",
    type: "Business Development",
  },
];

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business & Finance"
        title="Funding & Support for Entrepreneurs"
        description="Access grants, loans, and mentorship to start or grow your business in South Africa."
        backHref="/"
        icon={<TrendingUp className="h-6 w-6 text-white" />}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {supportPrograms.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <motion.a
                key={prog.id}
                href={prog.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-kk-navy/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${prog.color} text-white shadow-md`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-kk-navy/5 px-2 py-1 text-[10px] font-semibold text-kk-navy/60">
                    {prog.type}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-kk-navy">
                  {prog.name}
                </h3>
                <p className="mt-2 text-sm text-kk-navy/70 line-clamp-3">
                  {prog.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-kk-blue group-hover:gap-2 transition-all">
                  Visit website <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </>
  );
}
