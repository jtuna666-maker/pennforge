import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { brand, pricing, seo } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const title = "PennForge - AI Receptionist for Contractors | Never Miss Another Call";
const description =
  "PennForge is the AI-powered phone receptionist for contractors and home-service businesses. 24/7 call answering, lead capture, and message taking. Never miss another call.";

export const metadata: Metadata = {
  metadataBase: new URL(seo.canonicalUrl),
  title,
  description,
  keywords: [
    "AI receptionist for contractors",
    "AI answering service for small businesses",
    "24/7 contractor answering service",
    "AI phone answering for plumbers",
    "AI receptionist for HVAC companies",
    "missed call lead capture",
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  alternates: {
    canonical: seo.canonicalUrl,
  },
  openGraph: {
    type: "website",
    url: seo.canonicalUrl,
    siteName: seo.siteName,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Structured data: Organization + Product/Offer.
 * No review/aggregate-rating schema - PennForge is pre-launch and we do
 * not invent ratings, reviews, or customer counts.
 */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: brand.name,
        slogan: brand.tagline,
        url: seo.canonicalUrl,
      },
      {
        "@type": "Product",
        name: `${brand.name} Professional`,
        description,
        brand: { "@type": "Brand", name: brand.name },
        offers: {
          "@type": "Offer",
          price: pricing.monthlyPrice,
          priceCurrency: "USD",
          description: `${pricing.monthlyPrice}/month + $${pricing.setupFee} one-time setup. ${pricing.includedMinutes} AI minutes included; $${pricing.overageRate.toFixed(2)}/min overage.`,
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-navy-950 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-forge-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
        >
          Skip to content
        </a>
        <JsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
        <Script id="datamoon-pixel" strategy="afterInteractive">
          {`(function(s, p, i, c, e) {
    s[e] = s[e] || function() { (s[e].a = s[e].a || []).push(arguments); };
    s[e].l = 1 * new Date();
    var t = new Date().getTime();
    var k = c.createElement("script"), a = c.getElementsByTagName("script")[0];
    k.async = 1, k.src = p + "?request_id=" + i + "&t=" + t, a.parentNode.insertBefore(k, a);
    s.pixelClientId = i;
  })(window, "https://app.datamoon.com/script", "pennforgeapp", document, "script");`}
        </Script>
      </body>
    </html>
  );
}

