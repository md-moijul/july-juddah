/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EcertificateTab from './index';
import { useUserStore } from '@/stores/useUserStore';

// Mock the createUser action
jest.mock('@/app/actions/user', () => ({
  createUser: jest.fn().mockResolvedValue({ success: true, userId: '12345' }),
}));

// Mock useUserStore
jest.mock('@/stores/useUserStore', () => ({
  useUserStore: jest.fn(() => ({
    user: {
      name: 'John Doe',
      town: 'Exampleville',
      phone: '',
    },
    setUser: jest.fn(),
    setUserPhone: jest.fn(),
  })),
}));

describe('EcertificateTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial elements', () => {
    render(<EcertificateTab />);

    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('I accept the Terms & Conditions')).toBeInTheDocument();
    const downloadButton = screen.getByRole('button', { name: 'Confirm & Download' });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toBeDisabled();
  });

  it('enables the button when all fields are filled and terms accepted', async () => {
    // Mock the user store to simulate phone number being filled
    (useUserStore as jest.Mock).mockReturnValue({
      user: {
        name: 'John Doe',
        town: 'Exampleville',
        phone: '1234567890', // Simulate phone number being set by PhoneNumberInput
      },
      setUser: jest.fn(),
      setUserPhone: jest.fn(),
    });

    render(<EcertificateTab />);
    const termsCheckbox = screen.getByLabelText('I accept the Terms & Conditions');
    const downloadButton = screen.getByRole('button', { name: 'Confirm & Download' });

    fireEvent.click(termsCheckbox);

    expect(downloadButton).toBeEnabled();
  });
});