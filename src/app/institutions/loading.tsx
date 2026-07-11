// Skeleton loader for institutions directory
export default function InstitutionsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-40 animate-pulse rounded-3xl bg-gradient-to-br from-kk-navy/10 to-kk-navy/5" />
      <div className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-kk-navy/5" />
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-2xl bg-kk-navy/5"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
