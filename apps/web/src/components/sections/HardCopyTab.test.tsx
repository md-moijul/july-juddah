import React from 'react';
import { render, screen } from '@testing-library/react';
import HardCopyTab from './HardCopyTab';

describe('HardCopyTab', () => {
  it('renders the heading and placeholder text', () => {
    render(<HardCopyTab />);
    expect(screen.getByRole('heading', { name: /Order Hard Copy/i })).toBeInTheDocument();
    expect(screen.getByText(/This is the placeholder content for the hard copy order section./i)).toBeInTheDocument();
  });
});
