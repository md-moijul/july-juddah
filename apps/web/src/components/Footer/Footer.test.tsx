import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './index';
import { content } from '@/lib/content';

describe('Footer', () => {
  it('renders the copyright text correctly', () => {
    // Arrange
    render(<Footer />);

    // Act
    const copyrightText = screen.getByText(new RegExp(content.footer.copyright_text, 'i'));

    // Assert
    expect(copyrightText).toBeInTheDocument();
  });

  it('renders the social media links correctly', () => {
    // Arrange
    render(<Footer />);

    // Act & Assert
    content.footer.links.forEach((link) => {
      const socialLink = screen.getByText(link.text);
      expect(socialLink).toBeInTheDocument();
      expect(socialLink).toHaveAttribute('href', link.url);
    });
  });
});
