import Link from "next/link";
import {
  Phone,
  Mail,
  Globe,
  Heart,
  ExternalLink,
} from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const cols = [
  {
    heading: "Education",
    links: [
      { href: "/institutions", label: "All Institutions" },
      { href: "/institutions?category=public-university", label: "Public Universities" },
      { href: "/institutions?category=private-university", label: "Private Universities" },
      { href: "/institutions?category=public-tvet", label: "Public TVETs" },
      { href: "/institutions?category=private-college", label: "Private Colleges" },
    ],
  },
  {
    heading: "Opportunities",
    links: [
      { href: "/feed", label: "Opportunity Feed" },
      { href: "/qualify", label: "Check Qualify" },
      { href: "/bursaries", label: "Bursaries" },
      { href: "/nsfas", label: "NSFAS Center" },
      { href: "/cv-builder", label: "CV Builder" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/ai", label: "AI Assistant" },
      { href: "/applications", label: "Applications" },
      { href: "/dashboard", label: "My Dashboard" },
      { href: "/pricing", label: "Premium" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-kk-navy/10 bg-kk-navy text-white">
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-kk-blue/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-kk-green/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-kk-blue to-kk-green">
                <span className="font-display text-base font-extrabold tracking-tight text-white">
                  KK
                </span>
              </div>
              <div className="font-display text-xl font-bold">
                Kampus<span className="text-kk-blue"> Konnect</span>
                <span className="text-kk-green">SA</span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Your AI guide to education, careers and opportunities in South Africa. From
              classroom to career — all in one intelligent platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-kk-blue/20 px-3 py-1 text-xs font-medium text-kk-blue">
                🇿🇦 Made for South Africans
              </span>
              <span className="rounded-full bg-kk-green/20 px-3 py-1 text-xs font-medium text-kk-green">
                ⚡ AI-Powered
              </span>
            </div>

            {/* Contact block */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-kk-green">
                Get in touch
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="tel:0673493612"
                    className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-kk-blue/20 text-kk-blue group-hover:bg-kk-blue group-hover:text-white">
                      <Phone className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">067 349 3612</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/27646130213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white">
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">064 613 0213 (WhatsApp)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Solocoder836@gmail.com"
                    className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-kk-green/20 text-kk-green group-hover:bg-kk-green group-hover:text-white">
                      <Mail className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">Solocoder836@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://kandktechsolutions.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-kk-accent/20 text-kk-accent group-hover:bg-kk-accent group-hover:text-white">
                      <Globe className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">kandktechsolutions.co.za</span>
                    <ExternalLink className="ml-1 h-3 w-3 opacity-60" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-5">
            {cols.map((col) => (
              <div key={col.heading}>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
                  {col.heading}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tools + Social column */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-kk-blue/20 to-kk-green/10 p-5 backdrop-blur">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-kk-blue to-kk-green">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white">K&K Tech Solutions</h4>
              </div>
              <p className="mt-2 text-xs text-white/70">
                Find more information, tools and tutorials at our official website.
              </p>
              <a
                href="https://kandktechsolutions.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-kk-navy shadow-md transition-transform hover:scale-[1.02]"
              >
                Visit kandktechsolutions.co.za
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white/80">
                Follow us
              </h4>
              <div className="grid grid-cols-4 gap-2">
                <a
                  href="https://www.facebook.com/kandktechsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="group flex h-11 items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-md transition-transform hover:scale-110 hover:bg-[#1465D1]"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/27646130213"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp 064 613 0213"
                  title="WhatsApp: 064 613 0213"
                  className="group flex h-11 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md transition-transform hover:scale-110 hover:bg-[#1FAE54]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/kandktechsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter) 067 349 3612"
                  title="X: 067 349 3612"
                  className="group flex h-11 items-center justify-center rounded-xl bg-black text-white shadow-md transition-transform hover:scale-110 hover:bg-zinc-800"
                >
                  <XIcon className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://www.instagram.com/kandktechsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram 067 349 3612"
                  title="Instagram: 067 349 3612"
                  className="group flex h-11 items-center justify-center rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-md transition-transform hover:scale-110"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} Kampus KonnectSA. All rights reserved.</p>
            <p className="flex items-center gap-1.5 text-xs">
              <span className="text-white/40">·</span>
              Designed & developed with
              <Heart className="h-3 w-3 fill-red-400 text-red-400" />
              by
              <a
                href="https://kandktechsolutions.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-kk-blue transition-colors hover:text-kk-green"
              >
                KandKTechSolutions
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
            <Link href="/partners" className="transition-colors hover:text-white">Partners</Link>
            <a
              href="tel:0673493612"
              className="hidden items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs transition-colors hover:bg-white/10 md:inline-flex"
            >
              <Phone className="h-3 w-3" /> 067 349 3612
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
