import { useState } from "react";
import { Github, Linkedin, Mail, ArrowRight, Zap } from "lucide-react";

const themes = [
  {
    name: "GitHub Dark",
    bg: "#0d1117", // Deep Navy
    text: "#e6edf3", // Off White
    accent: "#2f81f7", // GitHub Blue
    card: "#161b22", // Layer Grey
    shadow: "0 8px 24px rgba(0,0,0,0.4)",
  },
  {
    name: "Onyx",
    bg: "#050505", // Pitch Black
    text: "#F5F5F5", // Cloud White
    accent: "#10B981", // Emerald Green
    card: "#121212", // Obsidian Grey
    shadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  {
    name: "Splash",
    bg: "#2D0B5A", // Deep Grape
    text: "#FFFFFF", // Pure White
    accent: "#de4050", // Hot Pink
    card: "#3B0D71", // Electric Violet
    shadow: "0 10px 40px rgba(0,0,0,0.3)",
  },
  {
    name: "Magma",
    bg: "#3E1404", // Deep Espresso
    text: "#FFFFFF", // Pure White
    accent: "#FB923C", // Neon Orange
    card: "#562006", // Spiced Cider
    shadow: "0 10px 40px rgba(0,0,0,0.4)",
  },
  {
    name: "Cobalt",
    bg: "#0A1931", // Deep Midnight
    text: "#FFFFFF", // Pure White
    accent: "#FFC947", // Electric Gold
    card: "#185ADB", // Brandeis Blue
    shadow: "0 10px 40px rgba(0,0,0,0.3)",
  },
  {
    name: "Emerald",
    bg: "#061A14", // Deep Forest
    text: "#ECFDF5", // Mint White
    accent: "#10B981", // Vivid Emerald
    card: "#062C21", // Dark Seaweed
    shadow: "0 10px 40px rgba(0,0,0,0.4)",
  },
  {
    name: "Oceanic",
    bg: "#0F172A", // Midnight Navy
    text: "#F1F5F9", // Ice White
    accent: "#38BDF8", // Sky Blue
    card: "#1E293B", // Slate Blue
    shadow: "0 10px 40px rgba(0,0,0,0.35)",
  },
  {
    name: "Ember",
    bg: "#181111", // Dark Charcoal
    text: "#FFF7ED", // Paper White
    accent: "#F97316", // Safety Orange
    card: "#261C1C", // Burnt Coffee
    shadow: "0 10px 40px rgba(0,0,0,0.45)",
  },
  {
    name: "Amethyst",
    bg: "#120B1A", // Deep Plum
    text: "#F3E8FF", // Lavender White
    accent: "#A855F7", // Bright Amethyst
    card: "#1E1329", // Muted Purple
    shadow: "0 10px 40px rgba(0,0,0,0.4)",
  },
  {
    name: "Crimson",
    bg: "#1A0505", // Blood Moon
    text: "#FEE2E2", // Rose White
    accent: "#EF4444", // Candy Apple Red
    card: "#2D0A0A", // Deep Maroon
    shadow: "0 10px 40px rgba(0,0,0,0.5)",
  },
  {
    name: "Midnight",
    bg: "#020617", // Deep Space
    text: "#F8FAFC", // Ghost White
    accent: "#6366F1", // Indigo Glow
    card: "#0F172A", // Deep Slate
    shadow: "0 10px 40px rgba(0,0,0,0.6)",
  },
  {
    name: "Light",
    bg: "#FDFDFD", // Snow White
    text: "#1A1A1A", // Charcoal Black
    accent: "#3B82F6", // Royal Blue
    card: "#FFFFFF", // Pure White
    shadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
];

const LandingPage = () => {
  const [themeIndex, setThemeIndex] = useState(0);

  const t = themes[themeIndex];

  const baseStyles = {
    container: {
      backgroundColor: t.bg,
      color: t.text,
      minHeight: "100vh",
      fontFamily: "Inter, system-ui, sans-serif",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    heroCard: {
      maxWidth: "1000px",
      width: "100%",
      display: "flex",
      flexDirection: "row" as const,
      alignItems: "center",
      gap: "60px",
      padding: "40px",
      borderRadius: "40px",
      // backgroundColor: t.card,
      // boxShadow: t.shadow,
      flexWrap: "wrap-reverse" as const,
    },
    title: {
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: "24px",
      letterSpacing: "-0.03em",
    },
    buttonBase: {
      padding: "16px 32px",
      borderRadius: "16px",
      fontWeight: 600,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      transition: "transform 0.2s ease, opacity 0.2s ease",
      border: "none",
      fontSize: "1rem",
    },
    iconLink: {
      padding: "12px",
      borderRadius: "12px",
      color: t.text,
      backgroundColor: "transparent",
      border: `1px solid ${t.text}33`,
      cursor: "pointer",
      display: "flex",
      transition: "all 0.2s ease",
    },
    image: {
      width: "320px",
      height: "320px",
      borderRadius: "100%",
      objectFit: "cover" as const,
      border: `8px solid ${t.accent}`,
    },
    splashToggle: {
      position: "fixed" as const,
      bottom: "30px",
      right: "30px",
      width: "56px",
      height: "56px",
      borderRadius: "28px",
      backgroundColor: t.accent,
      color: "#FFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "none",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    },
  };

  return (
    <div style={baseStyles.container}>
      {/* Color Splash Toggle */}
      <button
        style={baseStyles.splashToggle}
        onClick={() => setThemeIndex((themeIndex + 1) % themes.length)}
        title={t.name}
      >
        <Zap size={24} fill="currentColor" />
      </button>

      {/* Global Animation Styles */}
      <style>{`
        button:hover { transform: translateY(-2px); opacity: 0.9; }
        button:active { transform: translateY(0); }
      `}</style>

      <div style={baseStyles.heroCard}>
        {/* Text Content */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h1 style={baseStyles.title}>
            Building <span style={{ color: t.accent }}>digital</span>{" "}
            experiences.
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              opacity: 0.7,
              marginBottom: "40px",
              maxWidth: "480px",
            }}
          >
            A Senior Full Stack Engineer focused on clean code, scalable
            systems, and elegant design.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                ...baseStyles.buttonBase,
                backgroundColor: t.accent,
                color: "#FFF",
              }}
            >
              Get in touch <ArrowRight size={18} />
            </button>

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={baseStyles.iconLink} title="GitHub">
                <Github size={20} />
              </button>
              <button style={baseStyles.iconLink} title="LinkedIn">
                <Linkedin size={20} />
              </button>
              <button style={baseStyles.iconLink} title="Email">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div style={{ flexShrink: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
            alt="Profile"
            style={baseStyles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
