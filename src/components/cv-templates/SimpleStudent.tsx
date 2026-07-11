import { CvData } from "./types";

// SIMPLE STUDENT — Single-column, friendly, lots of breathing room
export function SimpleStudent({ data }: { data: CvData }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white p-12 shadow-premium">
      {/* Centered header */}
      <header className="text-center">
        <h1 className="font-display text-4xl font-light tracking-tight text-kk-navy">
          {data.fullName}
        </h1>
        <div className="mx-auto mt-3 h-px w-24 bg-kk-green" />
        <p className="mt-3 text-xs text-kk-navy/60">
          {data.email} &nbsp; · &nbsp; {data.phone} &nbsp; · &nbsp; {data.location}
        </p>
      </header>

      <Section title="About Me">
        <p className="text-sm leading-relaxed text-kk-navy/80">{data.summary}</p>
      </Section>

      <Section title="Education">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-kk-navy/80">
          {data.education}
        </pre>
      </Section>

      <Section title="Experience & Internships">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-kk-navy/80">
          {data.experience}
        </pre>
      </Section>

      <Section title="Skills">
        <p className="text-sm text-kk-navy/80">{data.skills}</p>
      </Section>

      <Section title="References">
        <p className="text-sm italic text-kk-navy/60">{data.references}</p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-lg font-semibold text-kk-green">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
