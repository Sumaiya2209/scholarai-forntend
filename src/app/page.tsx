import { Hero } from "@/components/home/Hero";
import { FeaturedFields } from "@/components/home/FeaturedFields";
import { RecentlyApproved } from "@/components/home/RecentlyApproved";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PlatformStats } from "@/components/home/PlatformStats";
import { WhyScholarAI } from "@/components/home/WhyScholarAI";
import { CTA } from "@/components/home/CTA";
import { ResearchTips } from "@/components/home/Tips";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedFields />
      <RecentlyApproved />
      <ResearchTips />
      <HowItWorks />
      <PlatformStats />
      <WhyScholarAI />
      <CTA />
    </>
  );
}