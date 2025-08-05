import React from 'react';
import { render, screen } from '@testing-library/react';
import CounterSection from './index';
import { content } from '@/lib/content';

describe('CounterSection', () => {
  it('renders correctly with data from content.json', () => {
    render(<CounterSection />);

    // Check if label, headline, counter value, and counter text are rendered
    expect(screen.getByText(content.counter_section.label)).toBeInTheDocument();
    expect(screen.getByText(content.counter_section.headline)).toBeInTheDocument();
    expect(screen.getByText(content.counter_section.counter_value.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText(content.counter_section.counter_text)).toBeInTheDocument();
  });
});