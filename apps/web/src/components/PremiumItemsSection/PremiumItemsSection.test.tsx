import React from 'react';
import { render, screen } from '@testing-library/react';
import PremiumItemsSection from './index';
import { content } from '@/lib/content';

// Mock content to include price for testing
jest.mock('@/lib/content', () => ({
  content: {
    premium_items_section: {
      headline: "Premium Items Headline",
      subheadline: "Premium Items Subheadline",
      items: [
        { title: "Item 1", description: "Description 1", price: 10.00 },
        { title: "Item 2", description: "Description 2", price: 20.00 },
        { title: "Item 3", description: "Description 3", price: 30.00 },
        { title: "Item 4", description: "Description 4", price: 40.00 },
      ],
    },
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('PremiumItemsSection', () => {
  it('renders the headline and subheadline', () => {
    // Arrange
    render(<PremiumItemsSection />);

    // Act & Assert
    expect(screen.getByText(content.premium_items_section.headline)).toBeInTheDocument();
    expect(screen.getByText(content.premium_items_section.subheadline)).toBeInTheDocument();
  });

  it('renders all premium items with correct details', () => {
    // Arrange
    render(<PremiumItemsSection />);

    // Act & Assert
    content.premium_items_section.items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      
      
    });
  });
});
