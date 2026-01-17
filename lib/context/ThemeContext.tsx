import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'dark' | 'light';

export interface Theme {
  mode: ThemeMode;
  colors: {
    background: string;
    backgroundSecondary: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
    textLight: string;
    border: string;
    card: string;
  };
  gradients: {
    background: [string, string];
    gold: [string, string];
    button: [string, string];
  };
}

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '#1a1a1a',
    backgroundSecondary: '#0a0a0a',
    primary: '#1a1a1a',
    secondary: '#c9a962',
    accent: '#d4af37',
    text: '#ffffff',
    textSecondary: '#b8b8b8',
    textLight: '#999999',
    border: '#2a2a2a',
    card: '#2a2a2a',
  },
  gradients: {
    background: ['#1a1a1a', '#0a0a0a'],
    gold: ['#c9a962', '#d4af37'],
    button: ['#c9a962', '#d4af37'],
  },
};

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    primary: '#1a1a1a',
    secondary: '#c9a962',
    accent: '#d4af37',
    text: '#1a1a1a',
    textSecondary: '#666666',
    textLight: '#999999',
    border: '#e0e0e0',
    card: '#ffffff',
  },
  gradients: {
    background: ['#ffffff', '#f5f5f5'],
    gold: ['#c9a962', '#d4af37'],
    button: ['#c9a962', '#d4af37'],
  },
};

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    AsyncStorage.getItem('theme').then((saved: string | null) => {
      if (saved === 'light' || saved === 'dark') {
        setThemeMode(saved);
      }
    });
  }, []);

  const toggleTheme = useCallback(() => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
    AsyncStorage.setItem('theme', newMode);
  }, [themeMode]);

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: themeMode === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
