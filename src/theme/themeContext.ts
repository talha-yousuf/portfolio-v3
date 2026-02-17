import { createContext } from "react";
import type { themes } from "./themes";

interface ThemeContextType {
  t: (typeof themes)[number];
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
