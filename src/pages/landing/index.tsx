import { useState } from "react";
import { Github, Linkedin, Mail, ArrowRight, Wand2Icon } from "lucide-react";
import data from "../../data/index";

const themes: {
  name: string;
  bg: string;
  text: string;
  accent: string;
  bgSecondary: string;
  shadow: string;
}[] = [
  {
    name: "Onyx",
    bg: "#050505",
    text: "#F5F5F5",
    accent: "#04b77c",
    bgSecondary: "#121212",
    shadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  {
    name: "Cobalt",
    bg: "#0A1931",
    text: "#FFFFFF",
    accent: "#FB923C",
    bgSecondary: "#185ADB",
    shadow: "0 10px 40px rgba(0,0,0,0.3)",
  },
  {
    name: "Amethyst",
    bg: "#120B1A",
    text: "#F3E8FF",
    accent: "#A855F7",
    bgSecondary: "#1E1329",
    shadow: "0 10px 40px rgba(0,0,0,0.4)",
  },
  {
    name: "Indigo",
    bg: "#2D0B5A",
    text: "#FFFFFF",
    accent: "#de4050",
    bgSecondary: "#3B0D71",
    shadow: "0 10px 40px rgba(0,0,0,0.3)",
  },
  {
    name: "Emerald",
    bg: "#061A14",
    text: "#ECFDF5",
    accent: "#10B981",
    bgSecondary: "#062C21",
    shadow: "0 10px 40px rgba(0,0,0,0.4)",
  },
  {
    name: "Oceanic",
    bg: "#0F172A",
    text: "#F1F5F9",
    accent: "#38BDF8",
    bgSecondary: "#1E293B",
    shadow: "0 10px 40px rgba(0,0,0,0.35)",
  },
  {
    name: "Midnight",
    bg: "#020617",
    text: "#F8FAFC",
    accent: "#6366F1",
    bgSecondary: "#0F172A",
    shadow: "0 10px 40px rgba(0,0,0,0.6)",
  },
  {
    name: "Light",
    bg: "#FDFDFD",
    text: "#1A1A1A",
    accent: "#3B82F6",
    bgSecondary: "#FFFFFF",
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
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: "100vw",
    },
    section: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      maxHeight: "100vh",
      minHeight: "100vh",
      maxWidth: "100%",
      minWidth: "100%",
      padding: "40px",
    },
    title: {
      fontSize: "clamp(3rem, 2.5vw, 4rem)",
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: "-0.03em",
    },
    paragraph: {
      fontSize: "1.5rem",
      opacity: 0.7,
      fontFamily: "'Fira Code', 'Courier New', monospace",
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
      width: "200px",
      height: "200px",
      translate: "3px 3px",
      background: t.accent,
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    image: {
      width: "200px",
      height: "200px",
      objectFit: "cover" as const,
      translate: "-6px -6px",
    },
    nav: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "80px",
      padding: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 1000,
      border: "none",
    },
    splashToggle: {
      width: "40px",
      height: "40px",
      backgroundColor: t.accent,
      color: t.text,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: t.shadow,
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      animation: "pulse 1s infinite",
      border: "none",
    },
  };

  const heroSection = (
    <>
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
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <h1 style={baseStyles.title}>
            {data.personalInfo.name.split(" ")[0] + " "}
            <span style={{ color: t.accent }}>
              {data.personalInfo.name.split(" ")[1]}
            </span>
          </h1>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <p style={baseStyles.paragraph}>{"> " + data.personalInfo.title}</p>

            <p style={baseStyles.paragraph}>
              {"> " +
                String(new Date().getFullYear() - data.stats.careerStartYear) +
                " YOE"}
              <span
                style={{ animation: "blink 1.2s steps(1, start) infinite" }}
              >
                {"|"}
              </span>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "48px",
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
            </div>
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
      {/* <div
        style={{
          display: "flex",
          paddingTop: "120px",
          gap: "120px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "end" }}>
          <div style={baseStyles.title}>
            {new Date().getFullYear() - data.stats.careerStartYear}
          </div>
          <strong>
            <div>Years of</div>
            <div>experience</div>
          </strong>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "end" }}>
          <div style={baseStyles.title}>{data.stats.projectsWorkedOn}</div>
          <strong>
            <div>Projects</div>
            <div>Worked On</div>
          </strong>
        </div>
      </div> */}
    </>
  );

  const clientsSection = (
    <div
      style={{
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "90vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data.clientCompanies.map((x, key) => (
          <img
            key={key}
            src={x.thumbnailUrl}
            title={x.title}
            style={{
              height: "180px",
              width: "200px",
              objectFit: "contain" as const,
              padding: "24px 36px",
              background: "white",
              borderLeft: `solid 4px ${t.accent + "70"}`,
              borderTop: `solid 4px ${t.accent + "70"}`,
            }}
          />
        ))}
      </div>
    </div>
  );

  const skillsSection = (
    <div
      style={{
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "80vw",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        {data.skillsAndTechForWebpage.map((x, key) => (
          <img key={key} src={x.thumbnailUrl} style={{ height: "50px" }} />
        ))}
      </div>
    </div>
  );

  const projectsSection = null;

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
        
        @keyframes blink {
          50% { visibility: hidden; }
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
          color: ${t.bgSecondary};
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

      <div style={baseStyles.nav}>
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
            height: "100%",
            flex: "1",
          }}
        >
          {["Home", "Skills", "Clients", "Services", "Projects"].map((x) => (
            <button
              style={{
                ...baseStyles.buttonBase,
                backgroundColor: "none",
                border: "0.3px solid",
                color: t.accent,
                borderColor: t.accent + "66",
                background: "transparent",
                fontWeight: "normal",
              }}
            >
              {x}
            </button>
          ))}
        </div>
        <button
          style={baseStyles.splashToggle}
          onClick={() => setThemeIndex((themeIndex + 1) % themes.length)}
          title={t.name}
        >
          <Wand2Icon size={18} fill="currentColor" />
        </button>
      </div>

      <div
        style={{
          ...baseStyles.section,
        }}
      >
        {heroSection}
      </div>

      <div
        style={{
          ...baseStyles.section,
          background: "white",
        }}
      >
        {clientsSection}
      </div>

      <div
        style={{
          ...baseStyles.section,
          background: t.bgSecondary,
        }}
      >
        {skillsSection}
      </div>

      <div
        style={{
          ...baseStyles.section,
        }}
      >
        {projectsSection}
      </div>

      <footer
        style={{
          textAlign: "center",
          padding: "40px 20px",
          marginTop: "60px",
          color: t.text,
          fontSize: "14px",
          background: t.bgSecondary,
          width: "100%",
        }}
      >
        <p>Thanks for stopping by! 👋</p>
        <p style={{ marginTop: "8px" }}>
          <a
            href={"mailto:" + data.personalInfo.email}
            style={{
              color: t.accent,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {data.personalInfo.email}
          </a>
          {" | "}
          &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
