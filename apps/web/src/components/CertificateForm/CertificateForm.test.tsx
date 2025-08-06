
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CertificateForm } from '@/components/CertificateForm';
import React from 'react';
import { UserDataProvider } from '@/context/UserDataContext';

// Mock the Select component from shadcn/ui
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

function TestWrapper({
  initialFullName = '',
  initialSelectedDistrict = '',
  initialPhone = '',
  onUserCreated = () => {},
}) {
  return (
    <UserDataProvider>
      <CertificateForm
        initialFullName={initialFullName}
        initialSelectedDistrict={initialSelectedDistrict}
        initialPhone={initialPhone}
        onUserCreated={onUserCreated}
      />
    </UserDataProvider>
  );
}

describe('CertificateForm', () => {
  it('should call setFullName when the name input changes', async () => {
    // Arrange
    render(<TestWrapper />);
    const nameInput = screen.getByLabelText('What is your name?');

    // Act
    await userEvent.type(nameInput, 'John Doe');

    // Assert
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should call setSelectedDistrict when the district select changes', async () => {
    // Arrange
    render(<TestWrapper />);
    const districtSelect = screen.getByTestId('district-select');

    // Act
    await userEvent.selectOptions(districtSelect, 'Bagerhat');

    // Assert
    expect(districtSelect).toHaveValue('Bagerhat');
  });
});
