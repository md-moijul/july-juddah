/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EcertificateTab from './index';

// Mock the createCertificate action (still needed by the component)
jest.mock('@/app/actions/certificate', () => ({
  createCertificate: jest.fn(),
}));

// Mock the Captcha component
jest.mock('@/components/Captcha', () => ({
  Captcha: ({ onChange }) => (
    <input
      data-testid="captcha-input"
      type="text"
      placeholder="Enter CAPTCHA"
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('EcertificateTab', () => {
  const mockName = 'John Doe';
  const mockTown = 'Exampleville';

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly with initial elements', () => {
    render(<EcertificateTab name={mockName} town={mockTown} />);

    expect(screen.getByLabelText('Register With Your Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your phone number')).toBeInTheDocument();
    expect(screen.getByLabelText('I accept the Terms & Conditions')).toBeInTheDocument();
    expect(screen.getByTestId('captcha-input')).toBeInTheDocument();
    const downloadButton = screen.getByRole('button', { name: 'Confirm & Download' });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toBeDisabled();
  });

  it('enables the button when all fields are filled and terms accepted', async () => {
    render(<EcertificateTab name={mockName} town={mockTown} />);
    const phoneInput = screen.getByPlaceholderText('Enter your phone number');
    const termsCheckbox = screen.getByLabelText('I accept the Terms & Conditions');
    const captchaInput = screen.getByTestId('captcha-input');
    const downloadButton = screen.getByRole('button', { name: 'Confirm & Download' });

    await userEvent.type(phoneInput, '1234567890');
    fireEvent.click(termsCheckbox);
    await userEvent.type(captchaInput, 'mock-captcha-token');

    expect(downloadButton).toBeEnabled();
  });
});