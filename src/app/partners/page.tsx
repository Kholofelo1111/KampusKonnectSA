import { Handshake, Building2, GraduationCap, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Partner with us — Kampus KonnectSA",
  description:
    "Universities, employers and organisations: partner with Kampus KonnectSA to reach South African students.",
};

const audiences = [
  {
    icon: GraduationCap,
    title: "Universities & TVETs",
    desc: "Get your programmes, open days and application windows in front of thousands of prospective students.",
  },
  {
    icon: Briefcase,
    title: "Employers",
    desc: "List verified jobs, internships and learnerships directly, with guaranteed accurate application links.",
  },
  {
    icon: Building2,
    title: "Funders & NGOs",
    desc: "Reach eligible students for bursaries, scholarships and skills programmes at scale.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work with us"
        title="Partner with Kampus KonnectSA"
        description="We work with institutions, employers and funders to connect South African students to real opportunities."
        icon={<Handshake className="h-7 w-7 text-white" />}
        backHref="/"
      />

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="rounded-2xl border border-kk-navy/10 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-kk-navy">{a.title}</h3>
                <p className="mt-2 text-sm text-kk-navy/60">{a.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-kk-navy/10 bg-gradient-to-br from-kk-blue/5 to-kk-green/5 p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-kk-navy">
            Let's talk
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-kk-navy/70">
            Tell us about your institution or organisation and what you'd like to list or
            promote, and we'll get back to you within 2 business days.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:Solocoder836@gmail.com?subject=Partnership%20enquiry"
              className="rounded-xl bg-kk-navy px-5 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
            >
              Email Solocoder836@gmail.com
            </a>
            <a
              href="https://wa.me/27646130213?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20partnership%20with%20Kampus%20KonnectSA"
              className="rounded-xl border border-kk-navy/20 bg-white px-5 py-3 text-sm font-semibold text-kk-navy shadow-sm transition-transform hover:scale-105"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
