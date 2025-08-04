import React from 'react';
import { render, screen } from '@testing-library/react';
import PremiumItemsSection from '@/components/sections/premium-items-section';
import { content } from '@/lib/content';

describe('PremiumItemsSection', () => {
  it('renders the premium items section with headline, subheadline, and items', () => {
    render(<PremiumItemsSection />);

    // Check for headline and subheadline
    expect(screen.getByText(content.premium_items_section.headline)).toBeInTheDocument();
    expect(screen.getByText(content.premium_items_section.subheadline)).toBeInTheDocument();

    // Check for each item
    content.premium_items_section.items.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });

    // Check for styling (example: check for presence of a class that uses a CSS variable)
    const sectionElement = screen.getByRole('region', { name: content.premium_items_section.headline });
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveClass('py-[var(--section-padding-y)]');
    expect(sectionElement).toHaveClass('px-[var(--container-padding-x)]');

    const headlineElement = screen.getByText(content.premium_items_section.headline);
    expect(headlineElement).toHaveClass('text-[var(--h2-font-size)]');
    expect(headlineElement).toHaveClass('font-[var(--h2-font-weight)]');
    expect(headlineElement).toHaveClass('font-serif');
    expect(headlineElement).toHaveClass('leading-[var(--h2-line-height)]');
    expect(headlineElement).toHaveClass('text-[var(--primary-text)]');
    expect(headlineElement).toHaveClass('mb-[var(--spacing-md)]');

    const subheadlineElement = screen.getByText(content.premium_items_section.subheadline);
    expect(subheadlineElement).toHaveClass('max-w-3xl');
    expect(subheadlineElement).toHaveClass('mx-auto');
    expect(subheadlineElement).toHaveClass('text-[var(--body-font-size)]');
    expect(subheadlineElement).toHaveClass('font-[var(--body-font-weight)]');
    expect(subheadlineElement).toHaveClass('font-normal');
    expect(subheadlineElement).toHaveClass('font-sans');
    expect(subheadlineElement).toHaveClass('leading-[var(--body-line-height)]');
    expect(subheadlineElement).toHaveClass('text-[var(--medium-gray-text)]');
    expect(subheadlineElement).toHaveClass('mb-[var(--spacing-lg)]');

    content.premium_items_section.items.forEach(item => {
      const itemTitleElement = screen.getByText(item.title);
      expect(itemTitleElement).toHaveClass('text-[var(--h3-font-size)]');
      expect(itemTitleElement).toHaveClass('font-[var(--h3-font-weight)]');
      expect(itemTitleElement).toHaveClass('font-sans');
      expect(itemTitleElement).toHaveClass('leading-[var(--h3-line-height)]');
      expect(itemTitleElement).toHaveClass('text-[var(--primary-text)]');
      expect(itemTitleElement).toHaveClass('mb-[var(--spacing-sm)]');

      const itemDescriptionElement = screen.getByText(item.description);
      expect(itemDescriptionElement).toHaveClass('text-[var(--body-font-size)]');
      expect(itemDescriptionElement).toHaveClass('font-[var(--body-font-weight)]');
      expect(itemDescriptionElement).toHaveClass('font-sans');
      expect(itemDescriptionElement).toHaveClass('leading-[var(--body-line-height)]');
      expect(itemDescriptionElement).toHaveClass('text-[var(--medium-gray-text)]');
    });
  });
});