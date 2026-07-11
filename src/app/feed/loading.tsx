// Skeleton loader for opportunity feed — instant visual feedback
export default function FeedLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-40 animate-pulse rounded-3xl bg-gradient-to-br from-kk-navy/10 to-kk-navy/5" />
      <div className="mt-6 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-kk-navy/5" />
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="ml-10 h-40 animate-pulse rounded-2xl bg-kk-navy/5"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
