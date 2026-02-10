import { useState } from "react";
import { Github, Linkedin, Mail, ArrowRight, Wand2Icon } from "lucide-react";
import data from "../../data/index";

const themes = [
  {
    name: "Cobalt",
    bg: "#0A1931",
    text: "#FFFFFF",
    accent: "#FB923C",
    card: "#185ADB",
    shadow: "0 10px 40px rgba(0,0,0,0.3)",
  },
  {
    name: "Amethyst",
    bg: "#120B1A",
    text: "#F3E8FF",
    accent: "#A855F7",
    card: "#1E1329",
    shadow: "0 10px 40px rgba(0,0,0,0.4)",
  },
  {
    name: "Onyx",
    bg: "#050505",
    text: "#F5F5F5",
    accent: "#10B981",
    card: "#121212",
    shadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  {
    name: "Indigo",
    bg: "#2D0B5A",
    text: "#FFFFFF",
    accent: "#de4050",
    card: "#3B0D71",
    shadow: "0 10px 40px rgba(0,0,0,0.3)",
  },
  {
    name: "Emerald",
    bg: "#061A14",
    text: "#ECFDF5",
    accent: "#10B981",
    card: "#062C21",
    shadow: "0 10px 40px rgba(0,0,0,0.4)",
  },
  {
    name: "Oceanic",
    bg: "#0F172A",
    text: "#F1F5F9",
    accent: "#38BDF8",
    card: "#1E293B",
    shadow: "0 10px 40px rgba(0,0,0,0.35)",
  },
  {
    name: "Midnight",
    bg: "#020617",
    text: "#F8FAFC",
    accent: "#6366F1",
    card: "#0F172A",
    shadow: "0 10px 40px rgba(0,0,0,0.6)",
  },
  {
    name: "Steppe",
    bg: "#0093d7",
    text: "#1A2E05",
    accent: "#b3fa41",
    card: "#BEF264",
    shadow: "0 10px 30px rgba(26,46,5,0.15)",
  },
  {
    name: "Light",
    bg: "#FDFDFD",
    text: "#1A1A1A",
    accent: "#3B82F6",
    card: "#FFFFFF",
    shadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
];

const LandingPage = () => {
  const [themeIndex, setThemeIndex] = useState(0);

  const t = themes[themeIndex];

  const baseStyles: Record<
    string,
    React.HTMLAttributes<HTMLDivElement>["style"]
  > = {
    container: {
      backgroundColor: t.bg,
      color: t.text,
      minHeight: "100vh",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    landingGrid: {
      display: "flex",
      flexWrap: "wrap",
      minHeight: "calc(100vh-100px)",
      width: "calc(100vw-100px)",
      margin: "50px",
    },
    landingGridSection: {
      flex: "0 0 50%",
      height: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    sectionCard: {
      height: "calc(100%-10px)",
      width: "calc(100%-10px)",
      margin: "5px",
      border: "0.3px solid",
      borderColor: t.text + "22",
      padding: "40px",
    },
    title: {
      fontSize: "clamp(2rem, 2vw, 3rem)",
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: "-0.03em",
    },
    buttonBase: {
      padding: "12px 18px",
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
      color: t.text,
      backgroundColor: "transparent",
      border: `1px solid ${t.text}33`,
      cursor: "pointer",
      display: "flex",
      transition: "all 0.2s ease",
    },
    imageFrame: {
      position: "relative",
      width: "160px",
      height: "160px",
      background: t.accent,
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    image: {
      width: "160px",
      height: "160px",
      objectFit: "cover" as const,
      position: "absolute",
      bottom: "6px",
      right: "6px",
    },
    splashToggle: {
      position: "fixed" as const,
      top: "35px",
      right: "55px",
      width: "40px",
      height: "40px",
      border: `solid 1px ${t.accent}`,
      backgroundColor: "transparent",
      color: t.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: t.shadow,
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      zIndex: 1000,
      animation: "pulse 1s infinite",
    },
  };

  const heroSection = (
    <div
      style={{
        display: "flex",
        flexDirection: "row" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "60px",
        flexWrap: "wrap",
      }}
    >
      <div style={baseStyles.imageFrame}>
        <img
          className="profile-pic"
          src={data.personalInfo.profileImageUrl}
          alt="Profile"
          style={baseStyles.image}
        />
      </div>

      <div
        style={{
          flex: 1,
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 style={baseStyles.title}>
          {data.personalInfo.name.split(" ")[0] + " "}
          <span style={{ color: t.accent }}>
            {data.personalInfo.name.split(" ")[1]}
          </span>
        </h1>

        <p style={{ fontSize: "1rem", opacity: 0.7 }}>
          {data.personalInfo.bio}
        </p>

        <p style={{ fontSize: "1rem", opacity: 0.7 }}>
          If you're looking to collabrate, you can reach me at:
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <button style={baseStyles.iconLink} title="GitHub">
              <Github size={16} />
            </button>
            <button style={baseStyles.iconLink} title="LinkedIn">
              <Linkedin size={16} />
            </button>
            <button style={baseStyles.iconLink} title="Email">
              <Mail size={16} />
            </button>
            <button
              style={{
                ...baseStyles.buttonBase,
                backgroundColor: t.accent,
                color: t.text,
              }}
            >
              Resume <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={baseStyles.container}>
      {/* Global Animation Styles */}
      <style>{`
        button:hover { transform: translateY(-2px); opacity: 0.9; }
        button:active { transform: translateY(0); }
        
        .profile-pic {
          filter: brightness(1);
          transition: filter 0.3s ease, transform 0.3s ease;
          cursor: pointer;
        }
  
        .profile-pic:hover {
          filter: brightness(0.7);
        }
      
        /* 1. The Breathing Pulse */
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0px ${t.accent}44; }
          50% { transform: scale(1.1); box-shadow: 0 0 0 15px ${t.accent}00; }
          100% { transform: scale(1); box-shadow: 0 0 0 0px ${t.accent}00; }
        }

        /* 2. Hover Interaction */
        .splash-button:hover {
          transform: scale(1.15) rotate(15deg) !important;
          animation: none; /* Stop pulsing when user engages */
        }

        /* 3. Click Feedback */
        .splash-button:active {
          transform: scale(0.9) !important;
        }

        /* 4. Optional Tooltip Hint */
        .splash-button::before {
          content: "Splash Themes";
          position: absolute;
          right: 80px;
          background: ${t.text};
          color: ${t.card};
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .splash-button:hover::before {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <button
        style={baseStyles.splashToggle}
        onClick={() => setThemeIndex((themeIndex + 1) % themes.length)}
        title={t.name}
      >
        <Wand2Icon size={18} fill="currentColor" />
      </button>

      <div style={baseStyles.landingGrid}>
        <div style={baseStyles.landingGridSection}>
          <div style={baseStyles.sectionCard}>{heroSection}</div>
        </div>
      </div>

      <div style={baseStyles.landingGrid}>
        <div style={baseStyles.landingGridSection}>
          <div style={baseStyles.sectionCard}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {data.skillsAndTechForWebpage.map((x, key) => (
                <div key={key}>{x.title}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
