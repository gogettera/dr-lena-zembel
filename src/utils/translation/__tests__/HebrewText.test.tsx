
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HebrewText from '@/components/shared/HebrewText';
import { LanguageProvider } from '@/contexts/LanguageContext';
import React from 'react';

// Mock the translation hooks
vi.mock('@/utils/hebrewUtils', () => ({
  useHebrewText: () => ({
    getTextDirectionClass: vi.fn().mockReturnValue('text-right'),
    isRTL: true
  })
}));

describe('HebrewText', () => {
  it('renders children correctly', () => {
    render(
      <LanguageProvider>
        <HebrewText>Test Content</HebrewText>
      </LanguageProvider>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <LanguageProvider>
        <HebrewText className="custom-class">Test Content</HebrewText>
      </LanguageProvider>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass('text-right');
  });

  it('renders with custom tag', () => {
    render(
      <LanguageProvider>
        <HebrewText tag="h1">Heading</HebrewText>
      </LanguageProvider>
    );
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading');
  });

  it('sets RTL direction when forceRTL is true', () => {
    const { container } = render(
      <LanguageProvider>
        <HebrewText forceRTL={true}>RTL Content</HebrewText>
      </LanguageProvider>
    );
    
    expect(container.firstChild).toHaveAttribute('dir', 'rtl');
  });
});
