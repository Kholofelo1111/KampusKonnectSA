import { FileText } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Terms of Service — Kampus KonnectSA",
  description: "The terms that govern your use of Kampus KonnectSA.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: 7 July 2026"
        icon={<FileText className="h-7 w-7 text-white" />}
        backHref="/"
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="prose prose-slate max-w-none space-y-8 text-kk-navy/80">
          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">1. Acceptance of terms</h2>
            <p>
              By creating an account or using Kampus KonnectSA, you agree to these Terms of
              Service. If you don't agree, please don't use the platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">2. What we provide</h2>
            <p>
              Kampus KonnectSA is an informational platform that aggregates and helps you
              discover universities, TVETs, bursaries, NSFAS information, jobs, internships
              and learnerships, and provides AI-assisted guidance and CV-building tools.
              We are not a university, employer, government body, or funding provider —
              we help you find and apply to them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">3. Accuracy of listings</h2>
            <p>
              We work to keep institution, bursary and job listings accurate and up to date,
              and to link to official application pages wherever possible. However, closing
              dates, requirements, and application links are set by the institutions and
              employers themselves and can change without notice. Always confirm details on
              the official website before relying on any deadline shown on our platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">4. Your account</h2>
            <p>
              You're responsible for keeping your login details confidential and for the
              accuracy of the information you add to your profile (e.g. matric results, APS
              score). You must be truthful when using our NSFAS/qualification-checking tools —
              they are guidance only and do not guarantee funding or admission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">5. Premium (Coming Soon)</h2>
            <p>
              We are building a Premium tier with AI-powered tools described on our{" "}
              <a href="/pricing" className="font-semibold text-kk-blue">Premium page</a>. Premium
              is not yet available for purchase — no payment is collected at this time. You can
              join the waiting list by providing your name, email, and age, and we'll notify you
              when Premium launches. Joining the waiting list does not create any payment
              obligation or guarantee of access.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">6. Future payments</h2>
            <p>
              When Premium launches with paid plans, this section will be updated to describe
              accepted payment methods, billing, cancellation, and refunds before any payment is
              collected. Check back here or watch for an email if you're on the waiting list.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">7. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Submit false information to obtain funding, admission, or employment.</li>
              <li>Use automated tools to scrape or overload the platform.</li>
              <li>Attempt to bypass account security or paid-plan restrictions.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">8. Limitation of liability</h2>
            <p>
              Kampus KonnectSA is provided "as is". We are not liable for decisions made by
              universities, employers, NSFAS, or other third parties, nor for losses arising
              from outdated or inaccurate third-party listings. We work to minimise this risk
              through regular link and content checks.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">9. Changes to these terms</h2>
            <p>
              We may update these terms as the platform grows. We'll update the "last
              updated" date above when we do.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-kk-navy">10. Contact</h2>
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
