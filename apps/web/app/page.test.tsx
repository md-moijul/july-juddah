import { render, screen } from '@testing-library/react';
import LandingPage from './page';

describe('LandingPage', () => {
  it('renders the headline and button', () => {
    render(<LandingPage />);

    const headline = screen.getByText(
      /Commemorate Your Achievement: Get Your Free Certificate!/i
    );
    const button = screen.getByRole('button', { name: /Get Started/i });

    expect(headline).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});