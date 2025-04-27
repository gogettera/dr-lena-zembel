
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with testing-library matchers
// This properly makes DOM-specific matchers like toBeInTheDocument() available
expect.extend(matchers);

// Re-export vitest functions
export { vi, describe, it, expect, beforeEach };

// Mock function helper that's compatible with jest.fn()
export const fn = vi.fn;

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Make sure to export everything from testing-library/react
export * from '@testing-library/react';
export { customRender as render };

// Add a custom type declaration to make TypeScript happy with the extended matchers
declare module 'vitest' {
  interface Assertion<T = any> {
    toBeInTheDocument(): T;
    toHaveClass(className: string): T;
    toHaveAttribute(attr: string, value?: string): T;
    toBeDisabled(): T;
  }
}
