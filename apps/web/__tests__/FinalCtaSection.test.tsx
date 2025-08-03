import { render, screen } from '@testing-library/react';
import FinalCtaSection from '@/components/sections/final-cta-section';
import { content } from '@/lib/content';

describe('FinalCtaSection', () => {
  it('renders the final CTA content correctly', () => {
    render(<FinalCtaSection />);

    const { final_cta_section } = content;

    expect(screen.getByText(final_cta_section.headline)).toBeInTheDocument();
    expect(screen.getByText(final_cta_section.subheadline)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: final_cta_section.cta_button.text })).toBeInTheDocument();
  });
});
