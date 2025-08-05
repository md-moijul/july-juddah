import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HardCopyTab } from './index';
import React from 'react';
import * as orderActions from '@/app/actions/order';

// Mock the createOrder action
jest.mock('@/app/actions/order', () => ({
  createOrder: jest.fn(),
}));

describe('HardCopyTab', () => {
  const mockName = 'John Doe';
  const mockTown = 'Exampleville';
  const mockPhone = '1234567890';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial values', () => {
    // Arrange & Act
    render(<HardCopyTab name={mockName} town={mockTown} phone={mockPhone} />);

    // Assert
    expect(screen.getByLabelText('Name')).toHaveValue(mockName);
    expect(screen.getByLabelText('Phone Number')).toHaveValue(mockPhone);
    expect(screen.getByLabelText('Town')).toHaveValue(mockTown);
    expect(screen.getByLabelText('Shipping Address')).toHaveValue('');
    expect(screen.getByLabelText('I confirm my address is correct')).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Confirm Order' })).toBeDisabled();
  });

  it('enables the button when all required fields are filled', async () => {
    // Arrange
    render(<HardCopyTab name={mockName} town={mockTown} phone={mockPhone} />);
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

    render(<HardCopyTab name={mockName} town={mockTown} phone={mockPhone} />);
    const shippingAddressInput = screen.getByLabelText('Shipping Address');
    const confirmedCheckbox = screen.getByLabelText('I confirm my address is correct');
    const confirmButton = screen.getByRole('button', { name: 'Confirm Order' });

    await userEvent.type(shippingAddressInput, '123 Main St');
    fireEvent.click(confirmedCheckbox);

    // Act
    fireEvent.click(confirmButton);

    // Assert
    expect(confirmButton).toBeDisabled(); // Should be disabled while loading
    expect(screen.getByText('Confirming...')).toBeInTheDocument();

    await waitFor(() => {
      expect(orderActions.createOrder).toHaveBeenCalledWith({
        name: mockName,
        town: mockTown,
        phone: mockPhone,
        shippingAddress: '123 Main St',
      });
      expect(screen.getByText('Order Confirmed!')).toBeInTheDocument();
    });
  });

  it('displays an error message if order creation fails', async () => {
    // Arrange
    const errorMessage = 'Failed to create order.';
    (orderActions.createOrder as jest.Mock).mockResolvedValue({
      success: false,
      error: { message: errorMessage },
    });

    render(<HardCopyTab name={mockName} town={mockTown} phone={mockPhone} />);
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
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Confirm Order' })).toBeEnabled(); // Button should be re-enabled
  });

  it('updates the town value when changed', async () => {
    // Arrange
    render(<HardCopyTab name={mockName} town={mockTown} phone={mockPhone} />);
    const townInput = screen.getByLabelText('Town');

    // Act
    await userEvent.clear(townInput);
    await userEvent.type(townInput, 'NewTown');

    // Assert
    expect(townInput).toHaveValue('NewTown');
  });
});