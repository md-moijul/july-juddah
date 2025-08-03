
import { render, screen } from '@testing-library/react';
import FeaturesSection from './features-section';
import { content } from '@/lib/content';
import { ImageProps } from 'next/image';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt as string} />;
  },
}));

describe('FeaturesSection', () => {
  it('renders the headline and subheadline', () => {
    render(<FeaturesSection />);
    expect(screen.getByText(content.features_section.headline)).toBeInTheDocument();
    expect(screen.getByText(content.features_section.subheadline)).toBeInTheDocument();
  });

  it('renders all features from content.json', () => {
    render(<FeaturesSection />);
    content.features_section.features.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
      if (feature.icon) {
        expect(screen.getByAltText(feature.title)).toHaveAttribute(
          'src', 
          `/images/${feature.icon}`
        );
      }
    });
  });

  it('renders the correct number of feature items', () => {
    render(<FeaturesSection />);
    const featureItems = screen.getAllByRole('heading', { level: 3 }); // Assuming each feature title is an h3
    expect(featureItems.length).toBe(content.features_section.features.length);
  });
});
