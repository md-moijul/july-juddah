import React from 'react';
import { render, screen } from '@testing-library/react';
import { CertificatePreview } from '@/components/CertificatePreview'; // Assuming your component is exported from here
import { useUserStore } from '@/stores/useUserStore';

// Type assertion for the mocked hook to provide type safety
const mockedUseUserStore = useUserStore as jest.Mock;

// Mock the dependencies used by the component
jest.mock('@/stores/useUserStore');

jest.mock('@/lib/content', () => ({
  content: {
    certificate: {
      fullNamePlaceholder: 'Participant Name',
      locationPlaceholder: 'Your Town',
    },
  },
}));

// Mock the Next.js Image component to work in the Jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props?:{alt:'alt text'}) => {
    // Renders a simple <img> tag in place of the Next.js Image component
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props?.alt || ''} />;
  },
}));

describe('CertificatePreview', () => {
  beforeEach(() => {
    // Clear mock calls and implementations before each test
    mockedUseUserStore.mockClear();
  });

  it('should display the full user name, town, and ID when all data is available', () => {
    // Arrange: Provide a complete user object from the mock store
    const mockUser = {
      name: 'Jane Doe',
      town: 'Metropolis',
      id: 'CERT-12345',
    };
    mockedUseUserStore.mockReturnValue({ user: mockUser });

    // Act: Render the component
    render(<CertificatePreview />);

    // Assert: Check that the user's specific data is displayed
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();

    expect(screen.getByText('CERT-12345')).toBeInTheDocument();
  });

  it('should display placeholders when name and town are missing', () => {
    // Arrange: Provide a user object with missing name and town
    const mockUser = {
      id: 'CERT-67890',
    };
    mockedUseUserStore.mockReturnValue({ user: mockUser });

    // Act
    render(<CertificatePreview />);

    // Assert: Check that the placeholder text is displayed instead
    expect(screen.getByText('Participant Name')).toBeInTheDocument();

    expect(screen.getByText('CERT-67890')).toBeInTheDocument();
  });

  it('should display user name but a placeholder for town if only town is missing', () => {
    // Arrange: Provide a user object with a name but no town
    const mockUser = {
      name: 'John Smith',
      id: 'CERT-ABCDE',
    };
    mockedUseUserStore.mockReturnValue({ user: mockUser });

    // Act
    render(<CertificatePreview />);

    // Assert: Check for the mix of real data and placeholder text
    expect(screen.getByText('John Smith')).toBeInTheDocument();

    expect(screen.getByText('CERT-ABCDE')).toBeInTheDocument();
  });
});