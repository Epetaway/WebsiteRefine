import React, { createContext, useContext, useEffect, useState } from 'react';

type PageChrome = 'dark' | 'light';

interface ThemeContextType {
  theme: 'dark';
  toggleTheme: () => void;
  pageChrome: PageChrome;
  setPageChrome: (chrome: PageChrome) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [pageChrome, setPageChrome] = useState<PageChrome>('dark');

  useEffect(() => {
    localStorage.removeItem('theme');
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {}, pageChrome, setPageChrome }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
