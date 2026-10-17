import { DemoModalProvider } from "@/components/demo-modal-context";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { DemoPreview } from "@/components/DemoPreview";
import { Features } from "@/components/Features";
import { Industries } from "@/components/Industries";
import { Pricing } from "@/components/Pricing";
import { WhyPennForge } from "@/components/WhyPennForge";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { DemoRequestModal } from "@/components/DemoRequestModal";

/**
 * PennForge landing page — sections A through L.
 * All customer-facing copy is centralized in lib/site-config.ts.
 */
export default function Home() {
  return (
    <DemoModalProvider>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <DemoPreview />
        <Features />
        <Industries />
        <Pricing />
        <WhyPennForge />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <DemoRequestModal />
    </DemoModalProvider>
  );
}
