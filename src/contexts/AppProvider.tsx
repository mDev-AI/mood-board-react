import type { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { CanvasProvider } from './CanvasContext';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider>
      <CanvasProvider>
        {children}
      </CanvasProvider>
    </ThemeProvider>
  );
}; 