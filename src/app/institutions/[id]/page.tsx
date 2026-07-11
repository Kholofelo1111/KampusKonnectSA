import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Globe,
  ExternalLink,
  GraduationCap,
  Calendar,
  Target,
  Phone,
  Mail,
  FileText,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import {
  allInstitutions,
  getApplicationStatus,
} from "@/lib/institutions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InstitutionPage({ params }: Props) {
  const { id } = await params;

  const institution = allInstitutions.find((i) => i.id === id);
  

  if (!institution) {
    notFound();
  }

  const status = getApplicationStatus(
    institution.openingDate,
    institution.closingDate
  );

  return (
<div>
      <PageHeader
        eyebrow="Institution"
        title={institution.name}
        description={institution.description}
        backHref="/institutions"
        icon={<GraduationCap className="h-6 w-6 text-white" />}
      />
{institution.bannerImage && (
  <div className="mx-auto max-w-6xl px-4 pt-8">
    <div className="overflow-hidden rounded-3xl shadow-lg">
      <Image
        src={institution.bannerImage}
        alt={`${institution.name} banner`}
        width={1600}
        height={500}
        className="h-64 w-full object-cover"
      />
    
</div>
  </div>

)}
      <div className="mx-auto max-w-6xl px-4 py-10">

<div
  className={`rounded-3xl bg-gradient-to-r ${
    institution.bannerColor ?? "from-kk-blue to-kk-green"
  } p-8 text-white shadow-sm`}
>
          

<div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

  <div>

<div className="mb-4 flex items-center gap-3">
  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
    <Image
      src={`/logos/${institution.id}.png`}
      alt={institution.name}
      width={72}
      height={72}
      className="object-contain"
    />
  </div>

  <div>
    <h1 className="text-3xl font-bold text-kk-navy">
      {institution.name}
    </h1>

    <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
      <MapPin className="h-4 w-4" />
      {institution.city}, {institution.province}
    </div>
  </div>
</div>

<p className="max-w-3xl text-gray-600">
  {institution.description}
</p>

<div className="mt-6 flex flex-wrap gap-3">
  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
    📍 {institution.city}, {institution.province}
  </span>

  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
    🎓 APS: {institution.apsMin ?? "Varies"}
  </span>

  <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
    🏫 {institution.short}
  </span>
</div>
</div>

<div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  status === "open"
                    ? "bg-green-100 text-green-700"
                    : status === "opening-soon"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status.replace("-", " ").toUpperCase()}
              </span>

            </div>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border p-4">
              <div className="flex items-center gap-2 font-semibold">
                <Target className="h-4 w-4 text-kk-blue" />
                APS Requirement
              </div>

              <p className="mt-2 text-lg font-bold">
                {institution.apsMin ?? "Varies"}
              </p>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="flex items-center gap-2 font-semibold">
                <Calendar className="h-4 w-4 text-kk-blue" />
                Applications
              </div>

              <p className="mt-2 text-sm">
                Opens: {institution.openingDate ?? "TBA"}
              </p>

              <p className="text-sm">
                Closes: {institution.closingDate ?? "TBA"}
              </p>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="flex items-center gap-2 font-semibold">
                <GraduationCap className="h-4 w-4 text-kk-blue" />
                Estimated Fees
              </div>

              <p className="mt-2">
                {institution.fees ?? "Contact institution"}
              </p>
            </div>

</div>
</div>


<div className="mt-10">
            <h2 className="mb-3 text-xl font-bold">
              Fields Offered
            </h2>

            <div className="flex flex-wrap gap-2">

              {institution.fields.map((field) => (
                <span
                  key={field}
                  className="rounded-full bg-kk-blue/10 px-3 py-1 text-sm text-kk-blue"
                >
                  {field}
                </span>
              ))}

          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">

            {institution.website && (
              <Link
                href={institution.website}
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-xl bg-kk-blue py-3 font-semibold text-white"
              >
                <Globe className="h-4 w-4" />
                Official Website
              </Link>
            )}

            {institution.applyUrl && (
              <Link
                href={institution.applyUrl}
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-xl bg-kk-green py-3 font-semibold text-white"
              >
                <ExternalLink className="h-4 w-4" />
                Apply Now
              </Link>
            )}

            {institution.prospectusUrl && (
              <Link
                href={institution.prospectusUrl}
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-xl border py-3 font-semibold"
              >
                <FileText className="h-4 w-4" />
                Prospectus
              </Link>
            )}

          </div>

          <div className="mt-10 rounded-2xl border p-6">

            <h2 className="mb-4 text-xl font-bold">
              Contact Information
            </h2>

            {institution.phone && (
              <div className="mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {institution.phone}
              </div>
            )}

                        {institution.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {institution.email}
              </div>
            )}

          </div>

        </div>

       </div>
    </div>
  );
}
