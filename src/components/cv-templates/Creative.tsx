import { CvData } from "./types";

// CREATIVE — Bold colours, asymmetric layout, design-focused
export function Creative({ data }: { data: CvData }) {
  const initials = data.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-premium">
      {/* Bold header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-10 text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 right-20 h-32 w-32 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <span className="font-display text-3xl font-extrabold">{initials}</span>
          </div>
          <div>
            <h1 className="font-display text-3xl font-extrabold">{data.fullName}</h1>
            <p className="mt-1 text-sm text-white/80">{data.location}</p>
          </div>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-3 text-[11px]">
          <div className="rounded-lg bg-white/15 px-3 py-2 backdrop-blur-sm">
            <div className="font-bold opacity-70">EMAIL</div>
            <div>{data.email}</div>
          </div>
          <div className="rounded-lg bg-white/15 px-3 py-2 backdrop-blur-sm">
            <div className="font-bold opacity-70">PHONE</div>
            <div>{data.phone}</div>
          </div>
        </div>
      </header>

      {/* Body grid */}
      <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
        <Block title="✨ About" color="purple">
          <p className="text-xs leading-relaxed text-kk-navy/80">{data.summary}</p>
        </Block>
        <Block title="🎓 Education" color="pink">
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-kk-navy/80">
            {data.education}
          </pre>
        </Block>
        <Block title="💼 Experience" color="orange" wide>
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-kk-navy/80">
            {data.experience}
          </pre>
        </Block>
        <Block title="🛠 Skills" color="purple">
          <div className="flex flex-wrap gap-1.5">
            {data.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
              <span
                key={s}
                className="rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-2.5 py-1 text-[11px] font-semibold text-purple-700"
              >
                {s}
              </span>
            ))}
          </div>
        </Block>
        <Block title="📚 References" color="orange">
          <p className="text-xs italic text-kk-navy/60">{data.references}</p>
        </Block>
      </div>
    </article>
  );
}

function Block({
  title,
  children,
  color,
  wide,
}: {
  title: string;
  children: React.ReactNode;
  color: "purple" | "pink" | "orange";
  wide?: boolean;
}) {
  const colorMap = {
    purple: "border-purple-300 bg-purple-50/40",
    pink: "border-pink-300 bg-pink-50/40",
    orange: "border-orange-300 bg-orange-50/40",
  };
  return (
    <div
      className={`rounded-2xl border-l-4 p-5 ${colorMap[color]} ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <h2 className="mb-3 font-display text-sm font-extrabold text-kk-navy">{title}</h2>
      {children}
    </div>
  );
}
