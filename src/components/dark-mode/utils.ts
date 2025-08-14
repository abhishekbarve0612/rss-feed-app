export const THEME = "theme";
export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

// Get system preference (light/dark)
export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return LIGHT_THEME;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_THEME
    : LIGHT_THEME;
};

// Read from localStorage or fallback to system
export const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return LIGHT_THEME;
  const stored = localStorage.getItem(THEME);
  return stored === LIGHT_THEME || stored === DARK_THEME
    ? stored
    : getSystemTheme();
};

// Save to localStorage
export const saveTheme = (theme: Theme) => {
  localStorage.setItem(THEME, theme);
};

// Apply class to <html>
export const applyThemeClass = (theme: Theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove(theme === DARK_THEME ? LIGHT_THEME : DARK_THEME);
  root.classList.add(theme);
};
