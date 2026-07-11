import { CvData } from "./types";

// SKILLS-BASED — Skills at top with proficiency bars, then experience
export function SkillsBased({ data }: { data: CvData }) {
  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <article className="overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50/60 to-white shadow-premium">
      {/* Top banner */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold">{data.fullName}</h1>
            <p className="mt-1 text-sm text-white/90">{data.location}</p>
          </div>
          <div className="text-right text-xs">
            <p>{data.email}</p>
            <p>{data.phone}</p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-white/90 leading-relaxed">
          {data.summary}
        </p>
      </header>

      {/* Skills Showcase — Hero section */}
      <section className="bg-amber-100/40 p-8">
        <h2 className="mb-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-amber-900">
          Core Skills & Proficiencies
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {skills.map((s) => (
            <div key={s} className="rounded-xl bg-white p-3 text-center shadow-sm">
              <span className="text-xs font-bold text-kk-navy">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience + Education */}
      <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
        <Section title="Professional Experience" emoji="💼">
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-kk-navy/80">
            {data.experience}
          </pre>
        </Section>
        <Section title="Education" emoji="🎓">
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-kk-navy/80">
            {data.education}
          </pre>
        </Section>
      </div>

      {/* References */}
      <section className="border-t border-amber-200 bg-amber-50/40 p-6 text-center">
        <h2 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-900">
          References
        </h2>
        <p className="mt-2 text-xs italic text-kk-navy/70">{data.references}</p>
      </section>
    </article>
  );
}

function Section({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 font-display text-sm font-extrabold text-amber-900">
        {emoji} {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
