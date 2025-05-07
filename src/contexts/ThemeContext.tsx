import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

// Types for theme context
export type ColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

export type Typography = {
  heading: string;
  body: string;
};

export type ThemeData = {
  prompt: string;
  palette: ColorPalette;
  typography: Typography;
  mood: string[];
  styleKeywords: string[];
};

// Default theme data
const defaultThemeData: ThemeData = {
  prompt: '',
  palette: {
    primary: '#0ea5e9',
    secondary: '#8b5cf6',
    accent: '#f97316',
    background: '#ffffff',
    text: '#0f172a',
  },
  typography: {
    heading: 'Inter',
    body: 'Inter',
  },
  mood: [],
  styleKeywords: [],
};

// Context type
type ThemeContextType = {
  themeData: ThemeData;
  setThemePrompt: (prompt: string) => void;
  updatePalette: (palette: Partial<ColorPalette>) => void;
  updateTypography: (typography: Partial<Typography>) => void;
  addMoodKeyword: (keyword: string) => void;
  removeMoodKeyword: (keyword: string) => void;
  addStyleKeyword: (keyword: string) => void;
  removeStyleKeyword: (keyword: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
};

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeData, setThemeData] = useState<ThemeData>(defaultThemeData);
  const [isGenerating, setIsGenerating] = useState(false);

  // Set theme prompt and trigger theme generation
  const setThemePrompt = (prompt: string) => {
    setThemeData((prev) => ({ ...prev, prompt }));
    // In a real implementation, this would trigger an API call to generate theme elements
  };

  // Update color palette
  const updatePalette = (palette: Partial<ColorPalette>) => {
    setThemeData((prev) => ({
      ...prev,
      palette: { ...prev.palette, ...palette },
    }));
  };

  // Update typography
  const updateTypography = (typography: Partial<Typography>) => {
    setThemeData((prev) => ({
      ...prev,
      typography: { ...prev.typography, ...typography },
    }));
  };

  // Mood keywords management
  const addMoodKeyword = (keyword: string) => {
    if (!themeData.mood.includes(keyword)) {
      setThemeData((prev) => ({
        ...prev,
        mood: [...prev.mood, keyword],
      }));
    }
  };

  const removeMoodKeyword = (keyword: string) => {
    setThemeData((prev) => ({
      ...prev,
      mood: prev.mood.filter((k) => k !== keyword),
    }));
  };

  // Style keywords management
  const addStyleKeyword = (keyword: string) => {
    if (!themeData.styleKeywords.includes(keyword)) {
      setThemeData((prev) => ({
        ...prev,
        styleKeywords: [...prev.styleKeywords, keyword],
      }));
    }
  };

  const removeStyleKeyword = (keyword: string) => {
    setThemeData((prev) => ({
      ...prev,
      styleKeywords: prev.styleKeywords.filter((k) => k !== keyword),
    }));
  };

  return (
    <ThemeContext.Provider
      value={{
        themeData,
        setThemePrompt,
        updatePalette,
        updateTypography,
        addMoodKeyword,
        removeMoodKeyword,
        addStyleKeyword,
        removeStyleKeyword,
        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 