import { useState, type ReactNode } from "react";
import { themes } from "./themes";
import { ThemeContext } from "./themeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialIndex = () => {
    const raw = localStorage.getItem("theme");
    const i = raw ? parseInt(raw, 10) : 0;
    return !isNaN(i) && i >= 0 && i < themes.length ? i : 0;
  };

  const [themeIndex, setThemeIndex] = useState(getInitialIndex);
  const t = themes[themeIndex] ?? themes[0];

  const toggleTheme = () => {
    setThemeIndex((prev) => {
      const next = (prev + 1) % themes.length;
      localStorage.setItem("theme", String(next));
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ t, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
