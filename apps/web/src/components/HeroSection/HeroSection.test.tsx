import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from './index';

describe('HeroSection', () => {
  it('renders the headline, subheadline, and CTA button with correct content', () => {
    render(<HeroSection />);

    const headline = screen.getByText('A Testament to Your Participation.');
    expect(headline).toBeInTheDocument();

    const subheadline = screen.getByText(
      'Receive a personalized digital certificate commemorating your role in the July Student Revelation. A timeless memento, crafted instantly.'
    );
    expect(subheadline).toBeInTheDocument();

    const ctaButton = screen.getByRole('button', { name: 'Generate My Certificate' });
    expect(ctaButton).toBeInTheDocument();
  });

  it('applies the correct background image', () => {
    render(<HeroSection />);
    const section = screen.getByTestId('hero-section');
    expect(section).toHaveStyle('background-image: url(/example_certificate_image.png)');
  });
});
