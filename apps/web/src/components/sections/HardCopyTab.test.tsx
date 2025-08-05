import React from 'react';
import { render, screen } from '@testing-library/react';
import { HardCopyTab } from './HardCopyTab';

describe('HardCopyTab', () => {
  const defaultProps = {
    name: 'Test Name',
    town: 'Test Town',
    phone: '123-456-7890',
  };

  it('renders the form fields and button', () => {
    render(<HardCopyTab {...defaultProps} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Town/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Shipping Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I confirm my address is correct/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirm Order/i })).toBeInTheDocument();
  });

  it('pre-populates name and phone fields', () => {
    render(<HardCopyTab {...defaultProps} />);

    expect(screen.getByLabelText(/Name/i)).toHaveValue(defaultProps.name);
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue(defaultProps.phone);
  });

  it('disables the Confirm Order button initially', () => {
    render(<HardCopyTab {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Confirm Order/i })).toBeDisabled();
  });
});
