import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="flex items-center gap-3 text-kk-navy/60">
        <Loader2 className="h-6 w-6 animate-spin text-kk-blue" />
        <span className="text-sm font-medium">Loading…</span>
      </div>
    </div>
  );
}
