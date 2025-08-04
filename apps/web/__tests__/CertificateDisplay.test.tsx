
import { render, screen } from '@testing-library/react';
import { CertificateDisplay } from '@/components/CertificateDisplay';

describe('CertificateDisplay', () => {
  it('should not render download and hard copy buttons when image is not generated', () => {
    render(
      <CertificateDisplay 
        fullName="John Doe" 
        selectedDistrict="District 1" 
        generatedImageUrl={null} 
        onDownload={() => {}} 
      />
    );

    expect(screen.queryByText('Download E-certificate')).not.toBeInTheDocument();
    expect(screen.queryByText('Get a Hard Copy')).not.toBeInTheDocument();
  });

  it('should enable buttons when fullName and selectedDistrict are provided', () => {
    const { getByText } = render(
      <CertificateDisplay 
        fullName="John Doe" 
        selectedDistrict="District 1" 
        generatedImageUrl="/test.jpg" 
        onDownload={() => {}} 
      />
    );

    expect(getByText('Download E-certificate').closest('button')).not.toBeDisabled();
    expect(getByText('Get a Hard Copy').closest('button')).not.toBeDisabled();
  });

  it('should render the correct navigation link for Get a Hard Copy', () => {
    const { getByText } = render(
      <CertificateDisplay 
        fullName="John Doe" 
        selectedDistrict="District 1" 
        generatedImageUrl="/test.jpg" 
        onDownload={() => {}} 
      />
    );

    expect(getByText('Get a Hard Copy').closest('a')).toHaveAttribute('href', '/purchase?imageUrl=%2Ftest.jpg');
  });
});
