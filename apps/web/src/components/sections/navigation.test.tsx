import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './navigation';
import { content } from '@/lib/content';

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'Link';
  return MockLink;
});

// Mock the Button component from shadcn/ui
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: React.ComponentPropsWithoutRef<'button'>) => (
    <button {...props}>{children}</button>
  ),
}));

describe('Navigation', () => {
  it('renders without crashing', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders logo text correctly', () => {
    render(<Navigation />);
    expect(screen.getByText(content.navigation.logo_text)).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    render(<Navigation />);
    content.navigation.links.forEach((link) => {
      expect(screen.getByText(link.text)).toBeInTheDocument();
      expect(screen.getByText(link.text)).toHaveAttribute('href', link.href);
    });
  });

  it('renders CTA button with correct text and link', () => {
    render(<Navigation />);
    const ctaButton = screen.getByText(content.navigation.cta_button.text);
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', content.navigation.cta_button.href);
  });

  it('toggles mobile menu on button click', () => {
    render(<Navigation />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    const navLinksContainer = screen.getByTestId('nav-links-and-button-container');

    // Initially hidden on larger screens, but for testing mobile toggle, we assume it's hidden
    // and check if it becomes visible after click.
    // This test might need adjustment based on actual CSS for mobile visibility.
    // For now, we'll check if the class changes.
    fireEvent.click(menuButton);
    expect(navLinksContainer).not.toHaveClass('hidden');

    fireEvent.click(menuButton);
    expect(navLinksContainer).toHaveClass('hidden');
  });
});
