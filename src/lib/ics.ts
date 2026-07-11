// ============================================================
// ICS calendar file generator
// Produces an .ics file that users can add to Google Calendar,
// Apple Calendar, Outlook, etc.
// ============================================================

export type IcsEvent = {
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD
  description?: string;
  location?: string;
  url?: string;
};

function formatDate(dateStr: string): string {
  // Convert YYYY-MM-DD to YYYYMMDD
  return dateStr.replace(/-/g, "");
}

function parseDate(dateStr: string): Date {
  // Parse "31 Jan 2026" or "31 January 2026" or "2026-01-31"
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return new Date(dateStr);
  
  // Try parsing human-readable date
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;
  
  // Fallback: try to parse "31 Jan 2026"
  const parts = dateStr.split(" ");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIdx = months.indexOf(month);
    if (monthIdx !== -1) {
      return new Date(`${year}-${String(monthIdx + 1).padStart(2, "0")}-${day.padStart(2, "0")}`);
    }
  }
  
  return new Date();
}

export function generateIcs(event: IcsEvent): string {
  const start = parseDate(event.startDate);
  const end = event.endDate ? parseDate(event.endDate) : start;
  
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kampus KonnectSA//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@kampuskonnectsa.co.za`,
    `DTSTAMP:${formatDate(new Date().toISOString().split("T")[0])}`,
    `DTSTART:${formatDate(start.toISOString().split("T")[0])}`,
    `DTEND:${formatDate(end.toISOString().split("T")[0])}`,
    `SUMMARY:${event.title}`,
    event.description ? `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}` : null,
    event.location ? `LOCATION:${event.location}` : null,
    event.url ? `URL:${event.url}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  
  return lines.join("\r\n");
}

export function downloadIcs(event: IcsEvent): void {
  const ics = generateIcs(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title.replace(/\s+/g, "_")}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
