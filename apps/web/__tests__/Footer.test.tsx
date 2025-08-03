import { render, screen } from '@testing-library/react';
import Footer from '@/components/sections/footer';
import content from '@/data/content.json';

describe('Footer', () => {
  it('renders the footer content correctly', () => {
    render(<Footer />);

    const { footer } = content;

    expect(screen.getByText(footer.copyright_text)).toBeInTheDocument();
    expect(screen.getByAltText('Logo Icon')).toBeInTheDocument();

    footer.links.forEach(link => {
      expect(screen.getByRole('link', { name: link.text })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: link.text })).toHaveAttribute('href', link.href);
    });
  });
});
