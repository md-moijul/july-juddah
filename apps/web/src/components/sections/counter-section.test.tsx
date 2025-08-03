import React from 'react';
import { render, screen } from '@testing-library/react';
import CounterSection from './counter-section';

// Mock the content.json and style.json imports
jest.mock('@/data/content.json', () => ({
  navigation: {},
  hero_section: {},
  counter_section: {
    label: "Join the Movement",
    headline: "A Community United.",
    counter_value: 12547,
    counter_text: "Celebrating with over 12,500 participants who have already claimed their moment."
  },
  features_section: {},
  image_banner_section: {},
  disclaimer_section: {},
  premium_items_section: {},
  final_cta_section: {},
  footer: {}
}));

jest.mock('@/data/style.json', () => ({
  designSystemProfile: {
    tokens: {
      colors: {
        primary: { background: { value: '#FFFFFF' }, text: { value: '#000000' } },
        accent: { 'dark-olive': { value: '#4A5328' }, 'subtle-green-text': { value: '#A1B076' } },
        neutral: { 'medium-gray-text': { value: '#666666' } }
      },
      typography: {
        h1: { fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: '400', fontFamily: 'serif', lineHeight: '1.1' },
        h2: { fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '400', fontFamily: 'serif', lineHeight: '1.2' },
        body: { fontSize: '1rem', fontWeight: '400', fontFamily: 'sans-serif', lineHeight: '1.6' },
        'sub-text': { fontSize: '0.875rem', fontWeight: '400', fontFamily: 'sans-serif', lineHeight: '1.5' }
      },
      spacing: {
        layout: { sectionPaddingY: 'clamp(64px, 10vw, 128px)' }
      }
    }
  }
}));

describe('CounterSection', () => {
  it('renders correctly with data from content.json', () => {
    render(<CounterSection />);

    // Check if label, headline, counter value, and counter text are rendered
    expect(screen.getByText("Join the Movement")).toBeInTheDocument();
    expect(screen.getByText("A Community United.")).toBeInTheDocument();
    expect(screen.getByText("12,547")).toBeInTheDocument();
    expect(screen.getByText("Celebrating with over 12,500 participants who have already claimed their moment.")).toBeInTheDocument();
  });
});