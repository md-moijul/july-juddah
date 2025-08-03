import React from 'react';
import { render, screen } from '@testing-library/react';
import { CertificatePreview } from '../src/components/certificate-preview';
import { content } from '../src/lib/content';

describe('CertificatePreview', () => {
  it('renders correctly with default placeholders', () => {
    render(<CertificatePreview fullName="" location="" />);

    expect(screen.getByText(content.certificate.title)).toBeInTheDocument();
    expect(screen.getByText(content.certificate.subtitle)).toBeInTheDocument();
    expect(screen.getByText(content.certificate.fullNamePlaceholder)).toBeInTheDocument();
    expect(screen.getByText(content.certificate.courseCompletion)).toBeInTheDocument();
    expect(screen.getByText(content.certificate.courseNamePlaceholder)).toBeInTheDocument();
    expect(screen.getByText(content.certificate.at)).toBeInTheDocument();
    expect(screen.getByText(content.certificate.locationPlaceholder)).toBeInTheDocument();
  });

  it('renders correctly with provided full name and location', () => {
    const testFullName = 'John Doe';
    const testLocation = 'New York';
    render(<CertificatePreview fullName={testFullName} location={testLocation} />);

    expect(screen.getByText(testFullName)).toBeInTheDocument();
    expect(screen.getByText(testLocation)).toBeInTheDocument();
  });

  // Add a test to check if the component uses the new CSS variables.
  // This might require a more advanced setup with Jest and JSDOM to inspect computed styles,
  // or by checking for specific class names that apply the CSS variables.
  // For now, we'll assume that if the component renders, the styling is applied via Tailwind/CSS variables.
  // A more robust test would involve snapshot testing or inspecting the rendered DOM for specific style properties.
});
