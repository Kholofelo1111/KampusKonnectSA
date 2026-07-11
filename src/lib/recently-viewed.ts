// Tracks the last N opportunities/institutions a user has viewed, stored
// client-side in localStorage. Deliberately not DB-backed — this is
// per-device "recently viewed" history, exactly like most browsers/apps
// implement it, and avoids adding a table + API round-trip for something
// this low-stakes. Safe to call from any client component.

export type RecentlyViewedItem = {
  id: string;
  type: string; // "job" | "internship" | "bursary" | "learnership" | "institution"
  title: string;
  subtitle?: string;
  href: string;
  viewedAt: number;
};

const KEY = "kk_recently_viewed";
const MAX_ITEMS = 12;

export function addRecentlyViewed(item: Omit<RecentlyViewedItem, "viewedAt">) {
  if (typeof window === "undefined") return;
  try {
    const existing = getRecentlyViewed().filter((i) => i.id !== item.id);
    const updated = [{ ...item, viewedAt: Date.now() }, ...existing].slice(0, MAX_ITEMS);
    window.localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable (private browsing, etc.) — fail silently,
    // this is a nice-to-have, not a critical feature.
  }
}

export function getRecentlyViewed(): RecentlyViewedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearRecentlyViewed() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
