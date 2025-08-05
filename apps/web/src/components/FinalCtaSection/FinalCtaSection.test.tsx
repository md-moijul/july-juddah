import React from 'react';
import { render, screen } from '@testing-library/react';
import FinalCtaSection from './index';
import { content } from '@/lib/content';

// Mock Next.js Link component
jest.mock('next/link', () => jest.fn(() => <a />));

describe('FinalCtaSection', () => {
  it('renders the headline, subheadline, and CTA button with correct content', () => {
    // Arrange
    render(<FinalCtaSection />);

    // Act
    const headline = screen.getByText(content.final_cta_section.headline);
    const subheadline = screen.getByText(content.final_cta_section.subheadline);
    const ctaButton = screen.getByRole('link', { name: content.final_cta_section.cta_button.text });

    // Assert
    expect(headline).toBeInTheDocument();
    expect(subheadline).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', content.final_cta_section.cta_button.href);
  });
});
