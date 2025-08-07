import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HardCopyOrderTab } from './index';
import React from 'react';
import * as orderActions from '@/app/actions/order';
import { toast } from 'sonner';
import { useUserStore } from '@/stores/useUserStore';

// Mock the createOrder action
jest.mock('@/app/actions/order', () => ({
  createOrder: jest.fn(),
}));

// Mock sonner for toast notifications
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock useUserStore
jest.mock('@/stores/useUserStore', () => ({
  useUserStore: jest.fn(),
}));

describe('HardCopyOrderTab', () => {
  const mockName = 'John Doe';
  const mockTown = 'Exampleville';
  const mockPhone = '1234567890';

  beforeEach(() => {
    jest.clearAllMocks();
        (useUserStore as jest.Mock).mockReturnValue({
      user: {
        name: mockName,
        town: mockTown,
        phone: mockPhone,
      },
      setUserPhone: jest.fn(),
    });
  });

  it('renders correctly with initial values', () => {
    // Arrange & Act
    render(<HardCopyOrderTab />);

    // Assert
    expect(screen.getByLabelText('Name')).toHaveValue(mockName);
    expect(screen.getByLabelText('Town')).toHaveValue(mockTown);
    expect(screen.getByLabelText('Shipping Address')).toHaveValue('');
    expect(screen.getByLabelText('I confirm my address is correct')).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Confirm Order' })).toBeDisabled();
  });

  it('enables the button when all required fields are filled', async () => {
    // Arrange
    render(<HardCopyOrderTab />);
    const shippingAddressInput = screen.getByLabelText('Shipping Address');
    const confirmedCheckbox = screen.getByLabelText('I confirm my address is correct');
    const confirmButton = screen.getByRole('button', { name: 'Confirm Order' });

    // Act
    await userEvent.type(shippingAddressInput, '123 Main St');
    fireEvent.click(confirmedCheckbox);

    // Assert
    expect(confirmButton).toBeEnabled();
  });

  it('calls createOrder and shows success message on successful submission', async () => {
    // Arrange
    (orderActions.createOrder as jest.Mock).mockResolvedValue({ success: true });

    render(<HardCopyOrderTab />);
    const shippingAddressInput = screen.getByLabelText('Shipping Address');
    const confirmedCheckbox = screen.getByLabelText('I confirm my address is correct');
    const confirmButton = screen.getByRole('button', { name: 'Confirm Order' });

    await userEvent.type(shippingAddressInput, '123 Main St');
    fireEvent.click(confirmedCheckbox);

    // Act
    fireEvent.click(confirmButton);

    // Assert
    expect(confirmButton).toBeDisabled(); // Should be disabled while loading

    await waitFor(() => {
      expect(orderActions.createOrder).toHaveBeenCalledWith({
        name: mockName,
        town: mockTown,
        phone: mockPhone,
        shippingAddress: '123 Main St',
      });
      expect(toast.success).toHaveBeenCalledWith('Order Confirmed!', {
        description: 'Your hard copy order has been placed successfully.',
      });
    });
  });

  it('displays an error message if order creation fails', async () => {
    // Arrange
    const errorMessage = 'Failed to create order.';
    (orderActions.createOrder as jest.Mock).mockResolvedValue({
      success: false,
      error: { message: errorMessage },
    });

    render(<HardCopyOrderTab />);
    const shippingAddressInput = screen.getByLabelText('Shipping Address');
    const confirmedCheckbox = screen.getByLabelText('I confirm my address is correct');
    const confirmButton = screen.getByRole('button', { name: 'Confirm Order' });

    await userEvent.type(shippingAddressInput, '123 Main St');
    fireEvent.click(confirmedCheckbox);

    // Act
    fireEvent.click(confirmButton);

    // Assert
    await waitFor(() => {
      expect(orderActions.createOrder).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Order Failed', {
        description: errorMessage,
      });
    });
    expect(screen.getByRole('button', { name: 'Confirm Order' })).toBeEnabled(); // Button should be re-enabled
  });
});