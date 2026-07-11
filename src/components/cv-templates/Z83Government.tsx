import { CvData } from "./types";

// Z83 GOVERNMENT — Official SA-style form layout, table-based, no colours
export function Z83Government({ data }: { data: CvData }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white p-10 font-serif text-kk-navy shadow-premium">
      {/* Header — formal */}
      <header className="border-b-4 border-double border-kk-navy pb-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest">
          Republic of South Africa
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold uppercase">
          Curriculum Vitae
        </h1>
        <p className="mt-1 text-[10px] uppercase tracking-wider">
          Z83 Format · Department of Public Service & Administration
        </p>
      </header>

      {/* Personal Details Table */}
      <FormTable title="1. Personal Information">
        <Row label="Full Names" value={data.fullName} />
        <Row label="ID Number" value={data.idNumber || "_________________________"} />
        <Row label="Postal Address" value={data.location} />
        <Row label="Email Address" value={data.email} />
        <Row label="Contact Number" value={data.phone} />
        <Row label="Nationality" value="South African" />
        <Row label="Language Proficiency" value="English (read, write, speak)" />
      </FormTable>

      <FormTable title="2. Educational Qualifications">
        <pre className="whitespace-pre-wrap p-3 text-xs leading-relaxed">
          {data.education}
        </pre>
      </FormTable>

      <FormTable title="3. Employment History">
        <pre className="whitespace-pre-wrap p-3 text-xs leading-relaxed">
          {data.experience}
        </pre>
      </FormTable>

      <FormTable title="4. Skills & Competencies">
        <ul className="grid grid-cols-2 gap-x-4 p-3 text-xs">
          {data.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
            <li key={s} className="border-b border-kk-navy/10 py-1">
              • {s}
            </li>
          ))}
        </ul>
      </FormTable>

      <FormTable title="5. Profile Statement">
        <p className="p-3 text-xs leading-relaxed">{data.summary}</p>
      </FormTable>

      <FormTable title="6. References">
        <p className="p-3 text-xs">{data.references}</p>
      </FormTable>

      {/* Signature line */}
      <div className="mt-8 grid grid-cols-2 gap-8 text-[10px]">
        <div>
          <div className="border-b border-kk-navy"></div>
          <p className="mt-1 uppercase tracking-wider">Signature of Applicant</p>
        </div>
        <div>
          <div className="border-b border-kk-navy"></div>
          <p className="mt-1 uppercase tracking-wider">Date</p>
        </div>
      </div>

      <p className="mt-6 text-center text-[9px] italic text-kk-navy/60">
        I hereby declare that the information furnished above is true and correct.
      </p>
    </article>
  );
}

function FormTable({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 border border-kk-navy">
      <h2 className="border-b border-kk-navy bg-kk-navy px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[35%_65%] border-b border-kk-navy/30 last:border-b-0">
      <div className="border-r border-kk-navy/30 bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide">
        {label}
      </div>
      <div className="px-3 py-2 text-xs">{value}</div>
    </div>
  );
}
