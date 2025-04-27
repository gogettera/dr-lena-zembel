
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { LanguageProvider } from '@/contexts/LanguageContext';

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

export * from '@testing-library/react';
export { customRender as render };
