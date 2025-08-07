import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CertificateForm } from '@/components/CertificateForm';
import { useUserStore } from '@/stores/useUserStore';
import * as userActions from '@/app/actions/user';

jest.mock('@/stores/useUserStore');

// Mock the server action used by the component
jest.mock('@/app/actions/user');

// Mock the Select component from shadcn/ui to work in a test environment
jest.mock('@/components/ui/select', () => {
  const Select = ({ children, onValueChange, value }) => (
    <select data-testid="district-select" value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  );
  Select.displayName = 'Select';

  const SelectContent = ({ children }) => <>{children}</>;
  SelectContent.displayName = 'SelectContent';

  const SelectItem = ({ children, value }) => <option value={value}>{children}</option>;
  SelectItem.displayName = 'SelectItem';

  const SelectTrigger = ({ children }) => <>{children}</>;
  SelectTrigger.displayName = 'SelectTrigger';

  const SelectValue = ({ placeholder, value }) => <>{value || placeholder}</>;
  SelectValue.displayName = 'SelectValue';

  return { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
});

// A helper component that wraps the CertificateForm with the required provider
const TestWrapper = ({ onUserCreated = jest.fn() }) => (
  <CertificateForm
    initialFullName="John Doe"
    initialSelectedDistrict="Dhaka"
    initialPhone="1234567890"
    onUserCreated={onUserCreated}
  />
);

describe('CertificateForm', () => {
  beforeEach(() => {
    useUserStore.mockReturnValue({
      user: null,
      loading: false,
      setUser: jest.fn(),
      setLoading: jest.fn(),
    });
    // Reset mocks before each test
    (userActions.createUser as jest.Mock).mockClear();
  });

  it('should render with initial values populated', () => {
    // Arrange
    render(<TestWrapper />);

    // Assert
    expect(screen.getByLabelText('What is your name?')).toHaveValue('John Doe');
    expect(screen.getByLabelText('What is your phone number?')).toHaveValue('1234567890');
    expect(screen.getByTestId('district-select')).toHaveValue('Dhaka');
  });

  it('should update input values when changed', async () => {
    // Arrange
    render(<TestWrapper />);
    const nameInput = screen.getByLabelText('What is your name?');
    const phoneInput = screen.getByLabelText('What is your phone number?');
    const districtSelect = screen.getByTestId('district-select');

    // Act
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Jane Doe');
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, '0987654321');
    await userEvent.selectOptions(districtSelect, 'Bagerhat');

    // Assert
    expect(nameInput).toHaveValue('Jane Doe');
    expect(phoneInput).toHaveValue('0987654321');
    expect(districtSelect).toHaveValue('Bagerhat');
  });

  it('should call createUser and onUserCreated when the save button is clicked', async () => {
    // Arrange
    const handleUserCreated = jest.fn();
    (userActions.createUser as jest.Mock).mockResolvedValue({ success: true, userId: 1001 });
    render(<TestWrapper onUserCreated={handleUserCreated} />);
    const saveButton = screen.getByRole('button', { name: /save user/i });

    // Act
    await userEvent.click(saveButton);

    // Assert
    expect(userActions.createUser).toHaveBeenCalledWith('John Doe', 'Dhaka', '1234567890');
    expect(handleUserCreated).toHaveBeenCalledWith({ id: '1001', name: 'John Doe', town: 'Dhaka', phone: '1234567890' });
  });

  it('should show an error if user creation fails', async () => {
    // Arrange
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (userActions.createUser as jest.Mock).mockResolvedValue({ success: false, error: 'Creation failed' });
    render(<TestWrapper />);
    const saveButton = screen.getByRole('button', { name: /save user/i });

    // Act
    await userEvent.click(saveButton);

    // Assert
    expect(consoleErrorSpy).toHaveBeenCalledWith('Creation failed');
    consoleErrorSpy.mockRestore();
  });
});