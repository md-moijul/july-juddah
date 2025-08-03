import { render, screen } from "@testing-library/react";
import LandingPage from './page';
import HeroSection from "@/components/sections/hero-section";
import CounterSection from "@/components/sections/counter-section";

jest.mock("@/components/sections/hero-section", () => {
  return jest.fn(() => <div data-testid="hero-section-mock" />);
});

jest.mock("@/components/sections/counter-section", () => {
  return jest.fn(() => <div data-testid="counter-section-mock" />);
});

describe('LandingPage', () => {
  it('renders HeroSection and CounterSection', () => {
    render(<LandingPage />);

    expect(screen.getByTestId('hero-section-mock')).toBeInTheDocument();
    expect(screen.getByTestId('counter-section-mock')).toBeInTheDocument();

    // Ensure the original headline and button are no longer present
    expect(screen.queryByText(/Commemorate Your Achievement: Get Your Free Certificate!/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Get Started/i })).not.toBeInTheDocument();
  });
});