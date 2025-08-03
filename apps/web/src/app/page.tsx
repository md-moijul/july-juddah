import content from '@/data/content.json';
import FeaturesSection from '@/components/sections/features-section';
import HeroSection from '@/components/sections/hero-section';
import ImageBanner from '@/components/sections/image-banner';
import CounterSection from '@/components/sections/counter-section';
import DisclaimerSection from '@/components/sections/disclaimer-section';
import PremiumItemsSection from '@/components/sections/premium-items-section';
import FinalCtaSection from '@/components/sections/final-cta-section';
import Footer from '@/components/sections/footer';

export default function LandingPage() {
  const { image_banner_section } = content;

  return (
    <>
      <HeroSection />
      <CounterSection />
      <FeaturesSection />
      <ImageBanner
        src={image_banner_section.image.src}
        alt={image_banner_section.image.alt}
        className="my-8"
      />
      <DisclaimerSection />
      <PremiumItemsSection />
      <FinalCtaSection />
      <Footer />
    </>
  );
}
