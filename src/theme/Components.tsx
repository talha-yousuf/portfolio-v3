import { useState, type ReactNode } from "react";
import { themes } from "./themes";
import { useTheme } from "./useTheme";
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

export const ThemeSwitcher = () => {
  const { t, toggleTheme } = useTheme();
  const Icon = t.icon;

  return (
    <button
      onClick={toggleTheme}
      title={t.name}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: t.accent,
        color: t.bg,
        boxShadow: `0 6px 36px ${t.accent}77`,
        transition: "0.1s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.width = "40px";
        e.currentTarget.style.height = "40px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.width = "36px";
        e.currentTarget.style.height = "36px";
      }}
    >
      <Icon size={18} />
    </button>
  );
};
