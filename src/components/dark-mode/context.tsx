"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  getInitialTheme,
  saveTheme,
  applyThemeClass,
  type Theme,
  LIGHT_THEME,
  DARK_THEME,
} from "./utils";

interface DarkModeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  // Initialize theme on mount
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyThemeClass(initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
      saveTheme(next);
      applyThemeClass(next);
      return next;
    });
  }, []);

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
