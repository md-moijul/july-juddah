import { render, screen } from '@testing-library/react';
import Footer from '../src/components/sections/footer';
import { content } from '../src/lib/content';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Footer', () => {
  it('renders the copyright text correctly', () => {
    render(<Footer />);
    expect(screen.getByText(content.footer.copyright_text)).toBeInTheDocument();
  });

  it('renders all navigation links correctly', () => {
    render(<Footer />);
    content.footer.links.forEach(link => {
      expect(screen.getByText(link.text)).toBeInTheDocument();
      expect(screen.getByText(link.text).closest('a')).toHaveAttribute('href', link.href);
    });
  });

  it('renders the logo icon if provided', () => {
    render(<Footer />);
    if (content.footer.logo_icon) {
      expect(screen.getByAltText('Logo Icon')).toBeInTheDocument();
      expect(screen.getByAltText('Logo Icon')).toHaveAttribute('src', `/${content.footer.logo_icon}`);
    } else {
      expect(screen.queryByAltText('Logo Icon')).not.toBeInTheDocument();
    }
  });
});
