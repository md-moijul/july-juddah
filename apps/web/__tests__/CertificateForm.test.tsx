
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CertificateForm } from '@/components/CertificateForm';
import React from 'react';

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

function TestWrapper() {
  const [fullName, setFullName] = React.useState('');
  const [selectedDistrict, setSelectedDistrict] = React.useState('');

  return (
    <CertificateForm
      fullName={fullName}
      setFullName={setFullName}
      selectedDistrict={selectedDistrict}
      setSelectedDistrict={setSelectedDistrict}
    />
  );
}

describe('CertificateForm', () => {
  it('should call setFullName when the name input changes', async () => {
    render(<TestWrapper />);

    await userEvent.type(screen.getByLabelText('What is your name?'), 'John Doe');
    expect(screen.getByLabelText('What is your name?')).toHaveValue('John Doe');
  });

  it('should call setSelectedDistrict when the district select changes', async () => {
    render(<TestWrapper />);

    await userEvent.selectOptions(screen.getByTestId('district-select'), 'Bagerhat');
    expect(screen.getByTestId('district-select')).toHaveValue('Bagerhat');
  });
});
