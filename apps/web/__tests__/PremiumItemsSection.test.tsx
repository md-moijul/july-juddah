import { render, screen } from '@testing-library/react';
import PremiumItemsSection from '@/components/sections/premium-items-section';
import content from '@/data/content.json';

describe('PremiumItemsSection', () => {
  it('renders the premium items content correctly', () => {
    render(<PremiumItemsSection />);

    const { premium_items_section } = content;

    expect(screen.getByText(premium_items_section.headline)).toBeInTheDocument();
    expect(screen.getByText(premium_items_section.subheadline)).toBeInTheDocument();

    premium_items_section.items.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });
});
