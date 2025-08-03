import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';
import Image from 'next/image';
import '@testing-library/jest-dom';

// Mock the style.json import
jest.mock('@/data/style.json', () => ({
  designSystemProfile: {
    tokens: {
      typography: {
        scale: {
          'sub-text': { fontSize: '1rem', fontWeight: 'normal', fontFamily: 'sans-serif' },
          body: { fontSize: '1rem', fontWeight: 'normal', fontFamily: 'sans-serif', lineHeight: '1.5' },
          h2: { fontSize: '2rem', fontWeight: 'bold', fontFamily: 'serif', lineHeight: '1.2' },
          h3: { fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'sans-serif', lineHeight: '1.3' },
          link: { fontSize: '1rem', fontWeight: 'normal', fontFamily: 'sans-serif', lineHeight: '1.5' },
          'nav-link': { fontSize: '1rem', fontWeight: 'normal', fontFamily: 'sans-serif', lineHeight: '1.5' },
        },
        family: {
          'sans-serif': { value: '' },
          serif: { value: '' },
        },
      },
      colors: {
        accent: {
          'subtle-green-text': { value: '#000000' },
          'dark-olive': { value: '#000000' },
        },
        primary: {
          text: { value: '#000000' },
          background: { value: '#FFFFFF' },
        },
        neutral: {
          'medium-gray-text': { value: '#000000' },
          'light-gray-border': { value: '#E0E0E0' },
        },
      },
      spacing: {
        layout: {
          sectionPaddingY: '2rem',
          containerPaddingX: '1rem',
        },
        scale: {
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
        },
      },
    },
    components: {
      button: {
        baseStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          borderRadius: '0.5rem',
          padding: '1rem 2rem',
          transition: 'all 0.2s ease-in-out',
        },
        variants: {
          primary: {},
        },
      },
    },
  },
}));

// Mock the ImageBanner component
jest.mock('@/components/sections/ImageBanner', () => {
  const ImageBanner = ({ className }: { className?: string }) => (
    <div data-testid="mock-image-banner" className={className}>
      <Image src="/mock-image.jpg" alt="Mock Image" width={500} height={300} />
    </div>
  );
  ImageBanner.displayName = 'ImageBanner';
  return ImageBanner;
});

// Mock other section components
jest.mock('@/components/sections/counter-section', () => {
  const CounterSection = () => <div data-testid="mock-counter-section">Counter Section</div>;
  CounterSection.displayName = 'CounterSection';
  return CounterSection;
});

jest.mock('@/components/sections/features-section', () => {
  const FeaturesSection = () => <div data-testid="mock-features-section">Features Section</div>;
  FeaturesSection.displayName = 'FeaturesSection';
  return FeaturesSection;
});

jest.mock('@/components/sections/hero-section', () => {
  const HeroSection = () => <div data-testid="mock-hero-section">Hero Section</div>;
  HeroSection.displayName = 'HeroSection';
  return HeroSection;
});

describe('LandingPage', () => {
  it('renders the HeroSection, CounterSection, FeaturesSection, and ImageBanner components', () => {
    render(<LandingPage />);

    expect(screen.getByTestId('mock-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-counter-section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-features-section')).toBeInTheDocument();
    expect(screen.getByTestId('image-banner-container')).toBeInTheDocument();

    const imageBanner = screen.getByTestId('image-banner-container');
    expect(imageBanner).toHaveClass('my-8');
    expect(screen.getByAltText('A powerful and inspiring image from the July Revolution event.')).toHaveAttribute('src', '/_next/image?url=%2Fjuly_revolution_event_image.jpg&w=3840&q=75');
  });
});