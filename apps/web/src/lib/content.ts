import contentData from '../data/content.json';

interface NavigationLink {
  text: string;
  href: string;
}

interface NavigationCtaButton {
  text: string;
  href: string;
}

interface Navigation {
  logo_text: string;
  links: NavigationLink[];
  cta_button: NavigationCtaButton;
}

interface HeroSectionCtaButton {
  text: string;
  href: string;
}

interface HeroSectionImage {
  src: string;
  alt: string;
}

interface HeroSection {
  headline: string;
  subheadline: string;
  cta_button: HeroSectionCtaButton;
  image: HeroSectionImage;
}

interface CounterSection {
  label: string;
  headline: string;
  counter_value: number;
  counter_text: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSection {
  headline: string;
  subheadline: string;
  features: Feature[];
}

interface ImageBannerSectionImage {
  src: string;
  alt: string;
}

interface ImageBannerSection {
  image: ImageBannerSectionImage;
}

interface DisclaimerSectionCtaButton {
  text: string;
  href: string;
}

interface DisclaimerSection {
  label: string;
  headline: string;
  description: string;
  cta_button: DisclaimerSectionCtaButton;
}

interface PremiumItem {
  title: string;
  description: string;
}

interface PremiumItemsSection {
  id: string;
  headline: string;
  subheadline: string;
  items: PremiumItem[];
}

interface FinalCtaSectionCtaButton {
  text: string;
  href: string;
}

interface FinalCtaSection {
  headline: string;
  subheadline: string;
  cta_button: FinalCtaSectionCtaButton;
}

interface FooterLink {
  text: string;
  href: string;
}

interface Footer {
  logo_icon: string;
  copyright_text: string;
  links: FooterLink[];
}

export interface Content {
  navigation: Navigation;
  hero_section: HeroSection;
  counter_section: CounterSection;
  features_section: FeaturesSection;
  image_banner_section: ImageBannerSection;
  disclaimer_section: DisclaimerSection;
  premium_items_section: PremiumItemsSection;
  final_cta_section: FinalCtaSection;
  footer: Footer;
}

export const content: Content = contentData as Content;
