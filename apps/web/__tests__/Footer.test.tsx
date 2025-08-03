import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/sections/footer';
import { content } from '@/lib/content';

describe('Footer', () => {
  it('renders the footer with copyright and navigation links and correct styling', () => {
    render(<Footer />);

    // Check for copyright text
    const copyrightTextElement = screen.getByText(content.footer.copyright_text);
    expect(copyrightTextElement).toBeInTheDocument();
    expect(copyrightTextElement).toHaveClass('text-[var(--muted-foreground)]');

    // Check for navigation links and their styling
    content.footer.links.forEach(link => {
      const linkElement = screen.getByText(link.text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveClass('text-[var(--muted-foreground)]');
      expect(linkElement).toHaveClass('hover:text-[var(--primary)]');
    });

    // Check for footer border styling
    const footerElement = screen.getByRole('contentinfo'); // 'contentinfo' is the ARIA role for <footer>
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveClass('border-[var(--border)]');
  });
});