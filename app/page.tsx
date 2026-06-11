import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TrustBar from "@/components/TrustBar";
import Features from "@/components/Features";
import WhyPosify from "@/components/WhyPosify";
import MultiCounter from "@/components/MultiCounter";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LiveActivity from "@/components/LiveActivity";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <TrustBar />
        <Features />
        <WhyPosify />
        <MultiCounter />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <LiveActivity />
    </>
  );
}
