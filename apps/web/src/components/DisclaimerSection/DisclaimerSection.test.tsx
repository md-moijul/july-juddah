import { render, screen } from '@testing-library/react';
import DisclaimerSection from './index';
import React from 'react';

// Mock the content module
jest.mock('@/lib/content', () => ({
  content: {
    disclaimer_section: {
      label: 'Test Label',
      headline: 'Test Headline',
      description: 'Test Description',
      cta_button: {
        href: '/test-link',
        text: 'Test Button',
      },
    },
  },
}));

describe('DisclaimerSection', () => {
  it('renders correctly with content', () => {
    // Arrange & Act
    render(<DisclaimerSection />);

    // Assert
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Headline')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Test Button' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Test Button' })).toHaveAttribute('href', '/test-link');
  });
});