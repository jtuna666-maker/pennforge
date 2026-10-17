/**
 * PENNFORGE — Central Site Configuration
 * --------------------------------------
 * Edit everything customer-facing here: brand, copy, pricing, features,
 * industries, FAQs, demo script, and contact/legal placeholders.
 * Components read from this file so copy changes don't require hunting
 * through JSX.
 */

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export const brand = {
  name: "PennForge",
  tagline: "Your business is always answering.",
  // Logo is an inline SVG component (components/Logo.tsx) so it can be
  // swapped for the official logo later without touching layout.
} as const;

// ---------------------------------------------------------------------------
// Contact & legal placeholders — FILL THESE IN before launch
// ---------------------------------------------------------------------------
export const contact = {
  /** Public contact email shown in footer / final CTA. */
  email: "PennForge2026@gmail.com",
  /** Optional phone number. Leave empty to hide phone references. */
  phone: "",
} as const;

export const legal = {
  privacyPolicyUrl: "#", // TODO: replace with real Privacy Policy URL
  termsOfServiceUrl: "#", // TODO: replace with real Terms of Service URL
} as const;

export const seo = {
  /** Update this when a custom production domain is connected. */
  canonicalUrl: "https://pennforge-landing.vercel.app/",
  siteName: "PennForge",
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const ctaLabels = {
  bookDemo: "Book a Demo",
  bookFreeDemo: "Book a Free Demo",
  bookYourFreeDemo: "Book Your Free Demo",
  seeHowItWorks: "See How It Works",
  askQuestion: "Ask a Question",
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const hero = {
  eyebrow: "AI-Powered Receptionist for Contractors",
  headlineTop: "TURN MISSED CALLS INTO",
  headlineAccent: "BOOKED JOBS.",
  subcopy:
    "You’re busy getting the job done. PennForge handles the phone — answering customer calls, capturing new leads, and helping schedule appointments, 24/7.",
  benefits: [
    "Answer Calls 24/7",
    "Capture New Leads",
    "Book Jobs",
    "Grow Revenue",
  ] as string[],
} as const;

// ---------------------------------------------------------------------------
// Problem (Section C) — pain points. No invented statistics.
// ---------------------------------------------------------------------------
export const painPoints = [
  {
    title: "You’re on the job and can’t answer",
    body: "Wrenches in hand, crawlspace, rooftop — the phone rings and there’s no good moment to pick up.",
  },
  {
    title: "Callers dial the next contractor",
    body: "When nobody answers, most people don’t leave a message. They call whoever picks up first.",
  },
  {
    title: "After-hours inquiries go unanswered",
    body: "Emergencies don’t respect business hours. Neither do the customers deciding who to hire.",
  },
  {
    title: "Leads get buried in voicemail",
    body: "Messages pile up, details get lost, and follow-ups happen days late — if they happen at all.",
  },
] as const;

// ---------------------------------------------------------------------------
// How it works (Section D)
// ---------------------------------------------------------------------------
export const howItWorksSteps = [
  {
    number: "01",
    title: "A Customer Calls",
    body: "An existing or prospective customer calls your business number — just like they always have.",
  },
  {
    number: "02",
    title: "PennForge Answers",
    body: "Your AI receptionist greets them professionally, using information about your business.",
  },
  {
    number: "03",
    title: "Details Are Captured",
    body: "PennForge gathers contact information, service needs, and relevant appointment details.",
  },
  {
    number: "04",
    title: "You Get the Lead",
    body: "The information is sent to you, with appointment requests or bookings handled according to your configuration.",
  },
] as const;

export const howItWorksNote =
  "Available call-routing and scheduling features depend on the selected configuration and integrations.";

// ---------------------------------------------------------------------------
// Interactive demo preview (Section E)
// ---------------------------------------------------------------------------
export const demoCall = {
  callerName: "Sarah Mitchell",
  callerPhone: "(570) 555-0148", // fictional demo number
  businessName: "Summit Ridge Plumbing", // fictional demo company
  request: "Leaking water heater",
  location: "Mansfield, PA",
  /** Scripted transcript. The component plays these in order. */
  script: [
    { speaker: "ai" as const, text: "Thank you for calling Summit Ridge Plumbing. How can I help you today?" },
    { speaker: "caller" as const, text: "Hi, my water heater is leaking and I need someone to take a look." },
    { speaker: "ai" as const, text: "I can help collect the details for the team. May I have your name and the best phone number to reach you?" },
    { speaker: "caller" as const, text: "Sarah Mitchell — 570-555-0148." },
    { speaker: "ai" as const, text: "Thanks, Sarah. Is the leak steady, or more of a slow drip?" },
    { speaker: "caller" as const, text: "Steady. There's water pooling around the base." },
    { speaker: "ai" as const, text: "Got it — I'll flag this as urgent. What's the address for the service visit?" },
    { speaker: "caller" as const, text: "214 Maple Street, Mansfield." },
    { speaker: "ai" as const, text: "Perfect. I've passed everything to the team — expect a call back shortly to confirm your appointment window. Anything else I can help with?" },
    { speaker: "caller" as const, text: "That's everything. Thank you!" },
  ],
  /** Lead summary shown after the call completes. */
  leadSummary: [
    { label: "Name", value: "Sarah Mitchell" },
    { label: "Phone", value: "(570) 555-0148" },
    { label: "Service needed", value: "Leaking water heater — steady leak, water pooling" },
    { label: "Address", value: "214 Maple Street, Mansfield, PA" },
    { label: "Priority", value: "Urgent" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Features (Section F)
// ---------------------------------------------------------------------------
export const features = [
  {
    icon: "PhoneCall",
    title: "24/7 Call Answering",
    body: "Every call gets answered — nights, weekends, holidays. No more ringing out to voicemail.",
  },
  {
    icon: "UserPlus",
    title: "Lead Capture",
    body: "Names, numbers, and service needs are collected on every call so no inquiry slips away.",
  },
  {
    icon: "CalendarCheck",
    title: "Appointment Requests & Scheduling",
    body: "PennForge can take appointment requests and handle bookings per your configuration.",
  },
  {
    icon: "BookOpen",
    title: "Business-Specific Answers",
    body: "Trained on your services, service area, and hours to answer the questions callers ask most.",
  },
  {
    icon: "BellRing",
    title: "Call Summaries & Notifications",
    body: "Get a clear summary after each call so you know exactly who called and what they need.",
  },
  {
    icon: "PhoneForwarded",
    title: "Call Transfers & Escalation",
    body: "Urgent or sensitive calls can be transferred to you or your team when it matters.",
  },
  {
    icon: "MoonStar",
    title: "After-Hours Coverage",
    body: "Evening and weekend callers get the same professional greeting as midday ones.",
  },
  {
    icon: "Megaphone",
    title: "Custom Greetings",
    body: "Your business name, your tone — callers hear a greeting that sounds like you.",
  },
] as const;

// ---------------------------------------------------------------------------
// Industries (Section G)
// ---------------------------------------------------------------------------
export const industries = [
  {
    icon: "Wrench",
    name: "Plumbing",
    useCase: "Capture emergency plumbing requests while you’re already on another job.",
  },
  {
    icon: "Thermometer",
    name: "HVAC",
    useCase: "Handle heating and cooling inquiries during your busiest seasons.",
  },
  {
    icon: "Zap",
    name: "Electrical",
    useCase: "Qualify service calls and outages without stopping mid-panel.",
  },
  {
    icon: "House",
    name: "Roofing",
    useCase: "Take storm-damage inquiries the moment they come in — even at 2am.",
  },
  {
    icon: "Leaf",
    name: "Landscaping",
    useCase: "Book estimates and seasonal cleanups while you’re out on the mower.",
  },
  {
    icon: "HardHat",
    name: "General Contracting",
    useCase: "Field project inquiries from the jobsite without missing a beat.",
  },
] as const;

// ---------------------------------------------------------------------------
// Pricing (Section H) — exact approved offer. Do not add tiers/discounts.
// ---------------------------------------------------------------------------
export const pricing = {
  planName: "PennForge Professional",
  monthlyPrice: 299,
  setupFee: 99,
  overageRate: 0.2,
  includedMinutes: 500,
  includes: [
    "AI receptionist answering",
    "24/7 availability",
    "500 AI call minutes per month",
    "Custom business knowledge base",
    "Lead information capture",
    "Appointment request handling",
    "Call summaries and notifications",
    "Custom greeting and basic call routing",
  ] as string[],
  note: "Advanced integrations and specific capabilities are subject to onboarding configuration and platform support.",
} as const;

// ---------------------------------------------------------------------------
// Why PennForge (Section I)
// ---------------------------------------------------------------------------
export const whyPennForge = {
  headline: "You Handle the Work. We’ll Handle the Calls.",
  points: [
    {
      title: "Stay focused on the jobsite",
      body: "No more stopping mid-job to answer the phone. Finish the work in front of you.",
    },
    {
      title: "A professional first impression",
      body: "Every caller gets a prompt, courteous greeting — even when you’re under a sink.",
    },
    {
      title: "Coverage outside business hours",
      body: "Evenings, weekends, holidays: your business keeps answering.",
    },
    {
      title: "Fewer interruptions",
      body: "Routine questions get handled; only the calls that need you reach you.",
    },
    {
      title: "Lead info stays organized",
      body: "Names, needs, and appointment details captured the same way, every time.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// FAQ (Section J)
// ---------------------------------------------------------------------------
// Answers are qualified; business policies not yet decided are marked
// [PLACEHOLDER] so they can be finalized before launch.
export const faqs = [
  {
    q: "Will PennForge work with my existing business phone number?",
    a: "Yes — PennForge is designed to work with your existing business number so customers keep calling the number they already know. [PLACEHOLDER: confirm supported carriers / forwarding method during onboarding.]",
  },
  {
    q: "Can it answer calls after hours?",
    a: "Yes. PennForge answers around the clock — evenings, weekends, and holidays — so after-hours callers reach your business instead of voicemail.",
  },
  {
    q: "Can it schedule appointments?",
    a: "PennForge can take appointment requests and handle bookings according to your configuration. The exact scheduling behavior is set up during onboarding to match how you run your calendar.",
  },
  {
    q: "What happens if a customer needs to speak with a real person?",
    a: "PennForge can transfer calls to you or a team member when a caller needs a human — for example, urgent or sensitive situations you define during setup.",
  },
  {
    q: "Can I customize what the AI says?",
    a: "Yes. Your greeting, business details, and how common questions are answered are all configured for your business during onboarding.",
  },
  {
    q: "What happens if I exceed 500 minutes?",
    a: "Additional AI minutes are billed at $0.20 per minute. You’ll see your usage so there are no surprises.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are up and running quickly once onboarding details are provided. [PLACEHOLDER: confirm typical setup timeline before launch.]",
  },
  {
    q: "Is there a contract or cancellation policy?",
    a: "[PLACEHOLDER: finalize contract terms and cancellation policy before launch.]",
  },
  {
    q: "Will customers know they’re speaking with AI?",
    a: "PennForge identifies itself appropriately and focuses on helping the caller. [PLACEHOLDER: confirm disclosure wording to match applicable regulations.]",
  },
] as const;

// ---------------------------------------------------------------------------
// Final CTA (Section K)
// ---------------------------------------------------------------------------
export const finalCta = {
  headline: "Your Next Customer Is Calling.",
  subheadline: "Make sure your business is ready to answer.",
} as const;

// ---------------------------------------------------------------------------
// Demo request form (Section 6)
// ---------------------------------------------------------------------------
export const demoForm = {
  industries: [
    "Plumbing",
    "HVAC",
    "Electrical",
    "Roofing",
    "Landscaping",
    "General Contracting",
    "Other",
  ] as string[],
  /** API endpoint the form posts to. The route currently runs in
   *  development mode (no provider connected) — see app/api/demo-request/route.ts */
  endpoint: "/api/demo-request",
} as const;
