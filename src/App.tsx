import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-900 dim:bg-neutral-900 text-gray-900 dark:text-gray-100 dim:text-neutral-200 transition-colors duration-300">
        <button
          onClick={cycleTheme}
          className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 dim:bg-neutral-800 shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-2xl"
          title={`Current: ${theme}`}
        >
          {getThemeIcon()}
        </button>

        <nav className="flex gap-4 p-6 bg-gray-50 dark:bg-slate-800 dim:bg-neutral-800 border-b border-gray-200 dark:border-slate-700 dim:border-neutral-700">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-colors font-medium"
          >
            Main
          </Link>
          <Link
            to="/resume"
            className="px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-colors font-medium"
          >
            Resume
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage data={portfolioData} />} />
          <Route path="/resume" element={<ResumePage data={portfolioData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
