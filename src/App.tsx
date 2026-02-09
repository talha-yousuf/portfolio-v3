import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import ResumePage from "./pages/resume";
import portfolioData from "./SSOT.json";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const cycleTheme = () => {
    const themes = ["light", "dark", "dim"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.className = nextTheme;
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "dim":
        return "🌆";
      default:
        return "☀️";
    }
  };

  const renderThemeSwitcherButton = (
    <button
      onClick={cycleTheme}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 dim:bg-neutral-800 shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-2xl"
      title={`Current: ${theme}`}
    >
      {getThemeIcon()}
    </button>
  );

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage data={portfolioData} />} />
          <Route path="/resume" element={<ResumePage data={portfolioData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
