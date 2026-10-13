import { Hero } from "@/components/home/Hero";
import { CapabilitiesTicker } from "@/components/home/CapabilitiesTicker";
import { RobustSolutions } from "@/components/home/RobustSolutions";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndiaAdvantage } from "@/components/home/IndiaAdvantage";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyEthixweb } from "@/components/home/WhyEthixweb";
import { HomeCTA } from "@/components/home/HomeCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CapabilitiesTicker />
      <RobustSolutions />
      <ProcessSection />
      <IndiaAdvantage />
      <FeaturedWork />
      <WhyEthixweb />
      <HomeCTA />
    </div>
  );
}
