// Skeleton loader for qualify page
export default function QualifyLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-40 animate-pulse rounded-3xl bg-gradient-to-br from-kk-navy/10 to-kk-navy/5" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[400px_1fr]">
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 animate-pulse rounded-2xl bg-kk-navy/5" />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-3xl bg-kk-navy/5" />
      </div>
    </div>
  );
}
