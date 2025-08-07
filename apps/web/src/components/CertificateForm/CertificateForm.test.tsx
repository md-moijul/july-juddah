import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CertificateForm } from '@/components/CertificateForm';
import React from 'react';
import { useUserStore } from '@/stores/useUserStore';

// We will use the actual store, so no mock is needed for the store itself.

// Mock the Select component from shadcn/ui
jest.mock('@/components/ui/select', () => {
  const Select = ({ children, onValueChange, value }) => (
    <select data-testid="district-select" value={value || ''} onChange={(e) => onValueChange(e.target.value)}>
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


describe('CertificateForm', () => {
  beforeEach(() => {
    // FIX: Explicitly reset the store state before each test to prevent state leakage.
    // This is more reliable than using a snapshot which can cause issues with merging.
    useUserStore.setState({
      user: { name: '', town: '' },
      loading: true,
    });
  });

  it('should render with initial empty values from the store', () => {
    // Arrange
    render(<CertificateForm />);

    // Assert
    expect(screen.getByLabelText('What is your name?')).toHaveValue('');
    expect(screen.getByTestId('district-select')).toHaveValue(undefined);
  });

  it('should update the name in the store, which updates the input value', async () => {
    // Arrange
    render(<CertificateForm />);
    const nameInput = screen.getByLabelText('What is your name?');
    
    // Act
    await userEvent.type(nameInput, 'New Name');
    
    // Assert
    expect(nameInput).toHaveValue('New Name');
  });

  it('should update the town in the store, which updates the select value', async () => {
    // Arrange
    render(<CertificateForm />);
    const districtSelect = screen.getByTestId('district-select');

    // Act
    // Note: The `districts.json` data is not provided, so I'm assuming 'Bagerhat' is a valid option.
    await userEvent.selectOptions(districtSelect, 'Bagerhat');

    // Assert
    expect(districtSelect).toHaveValue('Bagerhat');
  });
});