
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GeneratePage from '@/app/generate/page';

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

describe('GeneratePage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should pre-populate fields from local storage', async () => {
    window.localStorage.setItem('fullName', JSON.stringify('Jane Doe'));
    window.localStorage.setItem('selectedDistrict', JSON.stringify('Bandarban'));

    render(<GeneratePage />);

    expect(screen.getByLabelText('What is your name?')).toHaveValue('Jane Doe');
    expect(screen.getByTestId('district-select')).toHaveValue('Bandarban');
  });

    it('should save form state to local storage in real-time', async () => {
    render(<GeneratePage />);

    await userEvent.type(screen.getByLabelText('What is your name?'), 'John Doe');
    await userEvent.selectOptions(screen.getByTestId('district-select'), 'Bagerhat');

    expect(window.localStorage.getItem('fullName')).toBe(JSON.stringify('John Doe'));
    expect(window.localStorage.getItem('selectedDistrict')).toBe(JSON.stringify('Bagerhat'));
  });

  it('should enable buttons when form is filled', async () => {
    render(<GeneratePage />);

    await userEvent.type(screen.getByLabelText('What is your name?'), 'John Doe');
    await userEvent.selectOptions(screen.getByTestId('district-select'), 'Bagerhat');

    expect(screen.getByText('Download E-certificate').closest('button')).not.toBeDisabled();
    expect(screen.getByText('Get a Hard Copy').closest('button')).not.toBeDisabled();
  });
});
