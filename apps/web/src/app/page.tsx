import content from '@/data/content.json';
import FeaturesSection from '@/components/FeaturesSection';
import HeroSection from '@/components/HeroSection';
import ImageBanner from '@/components/ImageBanner';
import CounterSection from '@/components/CounterSection';
import DisclaimerSection from '@/components/DisclaimerSection';
import PremiumItemsSection from '@/components/PremiumItemsSection';
import FinalCtaSection from '@/components/FinalCtaSection';

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
    </>
  );
}
