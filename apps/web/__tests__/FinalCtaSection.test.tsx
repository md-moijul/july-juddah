import { render, screen } from '@testing-library/react';
import FinalCtaSection from '@/components/sections/final-cta-section';
import { content } from '@/lib/content';

describe('FinalCtaSection', () => {
  it('renders the final CTA content correctly with tokenized styles', () => {
    render(<FinalCtaSection />);

    const { final_cta_section } = content;

    const sectionElement = screen.getByRole('region', { name: /final CTA/i }); // Using regex for partial match
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveClass('py-[var(--section-padding-y)]');

    const headlineElement = screen.getByText(final_cta_section.headline);
    expect(headlineElement).toBeInTheDocument();
    expect(headlineElement).toHaveClass('text-[var(--h2-font-size)]');
    expect(headlineElement).toHaveClass('font-[var(--h2-font-weight)]');
    expect(headlineElement).toHaveClass('mb-[var(--spacing-md)]');
    expect(headlineElement).toHaveClass('text-[var(--foreground)]');

    const subheadlineElement = screen.getByText(final_cta_section.subheadline);
    expect(subheadlineElement).toBeInTheDocument();
    expect(subheadlineElement).toHaveClass('text-[var(--body-font-size)]');
    expect(subheadlineElement).toHaveClass('font-[var(--body-font-weight)]');
    expect(subheadlineElement).toHaveClass('mb-[var(--spacing-lg)]');
    expect(subheadlineElement).toHaveClass('text-[var(--muted-foreground)]');

    const ctaButton = screen.getByRole('link', { name: final_cta_section.cta_button.text });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveClass('bg-[var(--primary)]');
    expect(ctaButton).toHaveClass('text-[var(--primary-foreground)]');
  });
});
