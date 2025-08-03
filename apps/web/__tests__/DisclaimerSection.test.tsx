import { render, screen } from '@testing-library/react';
import DisclaimerSection from '@/components/sections/disclaimer-section';
import { content } from '@/lib/content';

describe('DisclaimerSection', () => {
  it('renders the disclaimer content correctly', () => {
    render(<DisclaimerSection />);

    const { disclaimer_section } = content;

    expect(screen.getByText(disclaimer_section.label)).toBeInTheDocument();
    expect(screen.getByText(disclaimer_section.headline)).toBeInTheDocument();
    expect(screen.getByText(disclaimer_section.description)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: disclaimer_section.cta_button.text })).toBeInTheDocument();
  });
});
