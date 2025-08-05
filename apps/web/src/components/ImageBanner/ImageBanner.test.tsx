import Image from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));
import { render, screen } from '@testing-library/react';
import ImageBanner from './index';

describe('ImageBanner', () => {
  it('renders the image banner with correct alt text and image source', () => {
    // Arrange
    const mockImageSrc = '/images/sample-banner.jpg'; // Example image source
    const mockAltText = 'Commemorative July Revolution Banner'; // Example alt text
    render(<ImageBanner src={mockImageSrc} alt={mockAltText} />);

    // Act
    const image = screen.getByAltText(mockAltText);

    // Assert
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImageSrc);
  });
});
