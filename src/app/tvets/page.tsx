import { redirect } from "next/navigation";

export default function TvetsRedirect() {
  redirect("/institutions?category=public-tvet");
}
