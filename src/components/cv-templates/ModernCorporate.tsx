import { CvData } from "./types";

// 2-COLUMN SIDEBAR LAYOUT — Modern Corporate
export function ModernCorporate({ data }: { data: CvData }) {
  return (
    <article className="grid min-h-[800px] grid-cols-[35%_65%] overflow-hidden rounded-2xl bg-white shadow-premium">
      {/* Dark sidebar */}
      <aside className="bg-kk-navy p-8 text-white">
        <div className="border-b-2 border-kk-blue pb-6">
          <h1 className="font-display text-2xl font-extrabold leading-tight">
            {data.fullName}
          </h1>
        </div>

        <Section title="CONTACT" sidebar>
          <div className="space-y-1.5 text-[11px]">
            <p>📧 {data.email}</p>
            <p>📞 {data.phone}</p>
            <p>📍 {data.location}</p>
          </div>
        </Section>

        <Section title="SKILLS" sidebar>
          <ul className="space-y-1">
            {data.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
              <li key={s} className="text-[11px] flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-kk-blue" />
                {s}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="REFERENCES" sidebar>
          <p className="text-[11px] italic text-white/70">{data.references}</p>
        </Section>
      </aside>

      {/* Main */}
      <main className="bg-white p-8">
        <Section title="PROFESSIONAL SUMMARY">
          <p className="text-xs text-kk-navy/80 leading-relaxed">{data.summary}</p>
        </Section>

        <Section title="EXPERIENCE">
          <pre className="whitespace-pre-wrap font-sans text-xs text-kk-navy/80 leading-relaxed">
            {data.experience}
          </pre>
        </Section>

        <Section title="EDUCATION">
          <pre className="whitespace-pre-wrap font-sans text-xs text-kk-navy/80 leading-relaxed">
            {data.education}
          </pre>
        </Section>
      </main>
    </article>
  );
}

function Section({
  title,
  children,
  sidebar,
}: {
  title: string;
  children: React.ReactNode;
  sidebar?: boolean;
}) {
  return (
    <section className="mt-5">
      <h2
        className={`mb-2 text-[10px] font-extrabold tracking-[0.2em] ${
          sidebar ? "text-kk-blue" : "text-kk-navy"
        }`}
      >
        {title}
      </h2>
      {!sidebar && <div className="mb-2 h-0.5 w-12 bg-gradient-to-r from-kk-blue to-kk-green" />}
      {children}
    </section>
  );
}
