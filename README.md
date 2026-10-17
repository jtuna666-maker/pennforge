# PennForge — Landing Page

Production-quality marketing site for PennForge, the AI-powered phone
receptionist for contractors and home-service businesses.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Lucide icons · Framer Motion

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-check + lint included via next build)
npm run lint     # eslint
npm run start    # serve the production build
```

Deploy the same way as any Next.js app (Vercel, Netlify, Docker, `next start`).

## Project layout

```
app/
  page.tsx            # composes sections A–L
  layout.tsx          # SEO metadata, Open Graph, JSON-LD, fonts
  globals.css         # Tailwind v4 theme (brand palette), keyframes, a11y base
  api/demo-request/   # demo form endpoint (development mode — see below)
components/
  Navbar.tsx          # A — sticky nav, mobile menu
  Hero.tsx            # B — headline, CTAs, phone mock composition
  Problem.tsx         # C — pain-point cards
  HowItWorks.tsx      # D — 4-step timeline
  DemoPreview.tsx     # E — interactive simulated call
  Features.tsx        # F — 8-feature grid
  Industries.tsx      # G — 6 trade cards
  Pricing.tsx         # H — the one approved plan
  WhyPennForge.tsx    # I — split value section
  Faq.tsx             # J — accordion
  FinalCta.tsx        # K — closing conversion block
  Footer.tsx          # L — footer
  DemoRequestModal.tsx# demo-request form (all CTAs open this)
  demo-modal-context.tsx
  Logo.tsx            # temporary logo (easy to swap)
  Reveal.tsx          # scroll-reveal helper (respects reduced motion)
lib/
  site-config.ts      # ★ edit copy, pricing, FAQs, etc. here
```

## Editing content

Almost everything customer-facing lives in **`lib/site-config.ts`**:
brand, nav, hero copy, pain points, steps, demo script, features,
industries, pricing, FAQ, contact info, and CTA labels. Colors live in
`app/globals.css` under `@theme`.

## Demo-request form → going live

The form posts to `POST /api/demo-request` and sends a plain-text notification through Resend. Replies go to the submitter. Success is returned only after Resend accepts the email; missing configuration and provider failures return errors without logging form data.

Configure these server-side environment variables in Vercel and redeploy:
- `RESEND_API_KEY`: a Resend key with Sending access.
- `RESEND_FROM_EMAIL`: a sender on your verified domain, or `PennForge <onboarding@resend.dev>` for testing.
- `DEMO_REQUEST_TO_EMAIL`: the inbox that receives demo requests.

Resend’s test sender can only deliver to the account owner’s email. A verified sending domain is required for other recipients. No visitor confirmation email is sent.

The existing honeypot silently discards spam. Consider durable rate limiting and CAPTCHA/Turnstile before promoting the form publicly. Never log the request body.

## Placeholders to fill before launch

| # | Where | What to provide |
|---|-------|-----------------|
| 1 | `lib/site-config.ts` → `contact.email` | Real public contact email (currently `hello@pennforge.example`) |
| 2 | `lib/site-config.ts` → `legal` | Real Privacy Policy + Terms of Service URLs (currently `#`) |
| 3 | `lib/site-config.ts` → `seo.canonicalUrl` | Production domain (currently `https://www.pennforge.example/`) |
| 4 | `app/layout.tsx` | OG image: add `app/og-image.png` (1200×630) and wire it into `metadata.openGraph.images` |
| 5 | `lib/site-config.ts` → `faqs` | Finalize the 4 `[PLACEHOLDER]` answers: number porting/carrier support, setup timeline, contract & cancellation policy, AI disclosure wording |
| 6 | `app/api/demo-request/route.ts` | Configure Resend environment variables (see above) |
| 7 | `components/Logo.tsx` | Swap the temporary SVG mark for the official logo |
| 8 | `components/DemoPreview.tsx` | Optional: wire a real demo phone number, audio clip, or backend to the scripted transcript UI (architecture notes are in the file) |
| 9 | `lib/site-config.ts` → `demoCall.callerPhone` | Fictional demo number — keep clearly fictional |

## Accessibility & performance notes

- Semantic landmarks, skip link, labelled regions, keyboard-operable
  accordion/modal/nav, visible `:focus-visible` rings.
- `prefers-reduced-motion` disables decorative animation site-wide.
- No external images or webfont-blocking render paths beyond
  `next/font` (self-hosted, `display: swap`); all visuals are inline SVG/CSS.
- No invented testimonials, stats, reviews, or customer logos anywhere.
