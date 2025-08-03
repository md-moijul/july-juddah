import { render, screen } from '@testing-library/react';
import ImageBanner from '@/components/sections/image-banner';
import '@testing-library/jest-dom';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ImageBanner', () => {
  const mockSrc = '/path/to/test-image.jpg';
  const mockAlt = 'Test Image';

  it('renders the image with correct src and alt attributes', () => {
    render(<ImageBanner src={mockSrc} alt={mockAlt} />);

    const image = screen.getByAltText(mockAlt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockSrc);
  });

  it('applies additional className prop', () => {
    const className = 'custom-class';

    render(<ImageBanner src={mockSrc} alt={mockAlt} className={className} />);

    const container = screen.getByTestId('image-banner-container');
    expect(container).toHaveClass(className);
  });
});