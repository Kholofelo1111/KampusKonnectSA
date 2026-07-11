import { Shield } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Privacy Policy — Kampus KonnectSA",
  description:
    "How Kampus KonnectSA collects, uses and protects your personal information, in line with South Africa's POPIA.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: 7 July 2026"
        icon={<Shield className="h-7 w-7 text-white" />}
        backHref="/"
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="prose prose-slate max-w-none space-y-8 text-kk-navy/80">
          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">1. Who we are</h2>
            <p>
              Kampus KonnectSA ("we", "us", "our") is a platform that helps South African
              students find universities, TVETs, bursaries, NSFAS funding, jobs, internships
              and learnerships. This policy explains what personal information we collect,
              why we collect it, and how it is protected under South Africa's Protection of
              Personal Information Act (POPIA).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">2. Information we collect</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Account details: name, email address, and password (stored as a secure hash, never in plain text).</li>
              <li>Profile details you choose to add: ID number, phone number, date of birth, school, matric results, APS score, subjects, province, and career interests.</li>
              <li>Usage data: pages visited, opportunities viewed or bookmarked, and AI chat queries you submit to our assistant.</li>
              <li>Premium waiting list: if you join it, we collect your full name, email address, and age, solely to notify you when Premium launches. We don't collect any payment information at this time — Premium is not yet available for purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">3. Why we collect it</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>To match you with universities, bursaries, NSFAS funding, and jobs relevant to your profile.</li>
              <li>To let our AI assistant give you personalised, accurate answers.</li>
              <li>To operate your account, application tracker, and CV builder.</li>
              <li>To notify you when Premium launches, if you've joined the waiting list.</li>
              <li>To send you optional notifications about deadlines, if you've enabled them.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">4. Who we share it with</h2>
            <p>
              We do not sell your personal information. We share data only with the service
              providers needed to run the platform — our hosting provider (Vercel), our
              database provider (Neon), and, where relevant, external institutions or employers
              when you choose to apply through their official channels. Each of these providers
              is contractually required to protect your data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">5. How we protect it</h2>
            <p>
              We use industry-standard security practices, including encrypted connections
              (HTTPS), hashed passwords, and access controls on our database. No system is
              100% secure, but we take reasonable technical and organisational steps to
              protect your information from loss, misuse, or unauthorised access.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">6. Your rights</h2>
            <p>Under POPIA, you have the right to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Ask us what personal information we hold about you.</li>
              <li>Ask us to correct or delete inaccurate or outdated information.</li>
              <li>Withdraw consent for optional processing (e.g. marketing notifications) at any time.</li>
              <li>Request that your account and associated data be permanently deleted.</li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href="mailto:Solocoder836@gmail.com" className="font-semibold text-kk-blue">
                Solocoder836@gmail.com
              </a>{" "}
              or message us on WhatsApp at{" "}
              <a href="https://wa.me/27646130213" className="font-semibold text-kk-blue">
                064 613 0213
              </a>
              . We aim to respond within 14 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">7. Cookies</h2>
            <p>
              We use essential cookies to keep you signed in and remember your preferences.
              We do not use third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">8. Children's information</h2>
            <p>
              Our platform is aimed at students, including those under 18. Where a user is a
              minor, we limit data collection to what's necessary to provide the service and
              encourage parents/guardians to be involved in the account where possible.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">9. Changes to this policy</h2>
            <p>
              We may update this policy as the platform evolves. Material changes will be
              reflected by updating the "last updated" date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">10. Contact us</h2>
            <p>
              Kampus KonnectSA · 067 349 3612 ·{" "}
              <a href="mailto:Solocoder836@gmail.com" className="font-semibold text-kk-blue">
                Solocoder836@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
