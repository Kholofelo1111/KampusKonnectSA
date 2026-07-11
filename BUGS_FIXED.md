# Bugs Fixed

1. **CV Builder "Download PDF" did nothing** — was a bare `alert("Demo mode for now")` for every
   template, for every user. Now generates a real, downloadable, ATS-friendly PDF.
2. **Negative relative dates** ("Posted -119d ago") — missing floor guard in
   `getRelativePosted()`, plus 14 hardcoded listings with `postedDate` values months in the
   future. Both the function and the data were fixed.
3. **Wrong-company apply links** — auto-generated job listings guessed URLs like
   `{company}.co.za/careers`, which sent users to unrelated companies (e.g. a "Marriott" listing
   linked to an unrelated SA investment firm). Replaced with a safe search fallback and an
   honest "unverified" flag.
4. **8 broken/incorrect hardcoded company URLs**: Shoprite (redirected to homepage), Pick n Pay
   (redirected to the grocery shopping site, not careers), Fidelity ADT (wrong domain),
   Discovery, Bidvest Facilities Management (wrong domain), Department of Health (404), City of
   Tshwane, and Anglo American Platinum (company demerged to Valterra Platinum in 2025/26, name
   and URL were both stale). All individually verified and corrected.
5. **Dead footer links** — Privacy, Terms, and Partners all pointed to `#`. This alone would have
   failed Google Play review (no live Privacy Policy). All three now have real pages.
6. **Homepage "Latest Opportunities" section used fake, disconnected data** with `url: "#"` dead
   links on every card. Replaced with the real, verified opportunity feed.
7. **"View All" on the homepage 404'd** — linked to `/opportunities`, which had no index page.
   Fixed with a redirect to the real listing page (`/feed`).
8. **"Saved Opportunities" had no save button anywhere in the app** — the bookmarks API existed
   but nothing in the UI ever called it, so the feature was structurally dead. Added a working
   Save button with sign-in handling.
9. **Premium page misrepresented itself** — previously implied real payment processing
   (PayFast/cards) that didn't exist in the code. Replaced with an honest, complete "Coming Soon"
   page and a working waiting list.
10. **Leftover blocking `alert()`** for the prospectus-download-unavailable case — replaced with
    a proper toast notification.
11. **Duplicate type definitions** — `OpportunityCard.tsx` had its own local `Opportunity` type
    that had drifted from the real one in `src/lib/opportunities.ts`; now imports the shared type.
12. **Dead/orphaned file** — `src/data/opportunities.ts` was disconnected fake data used by
    nothing except the broken homepage section above; removed.

# Suggestions for Future Premium Features

Beyond the 11 already on the Coming Soon page, based on what would matter most to South African
students specifically:

- **NSFAS status tracker** — pull/parse NSFAS application status so students don't have to check
  a separate portal.
- **Deadline SMS alerts** — many students have limited data access; an SMS (not just push/email)
  alert for a saved bursary/learnership closing in 48 hours would be high-value and differentiated.
- **Offline mode** — cache saved/bookmarked opportunities and CV data for viewing without data,
  relevant given SA mobile data costs.
- **Peer referral / study group matching** — connect students applying to the same
  university/bursary for mutual support.
- **Employer-verified "real response rate"** — show which listed employers actually respond to
  applications, based on aggregated (anonymised) user-reported outcomes, building trust in the
  platform's job listings over time.
- **Multi-language support** (isiZulu, isiXhosa, Afrikaans, Sesotho) for AI Career Guidance and
  the AI Assistant — meaningfully differentiates from generic international job platforms.
- **Application fee assistance directory** — some bursaries/universities charge application fees;
  a curated list of fee-waiver programs would directly help the lowest-income users.
