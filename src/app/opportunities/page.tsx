import { redirect } from "next/navigation";

// This route used to 404 — nothing ever rendered here, only
// /opportunities/[type]/[id] detail pages existed. Since /feed is the
// real, full-featured listing page, we redirect here rather than
// building a second listing page that would duplicate it.
export default function OpportunitiesIndexPage() {
  redirect("/feed");
}
