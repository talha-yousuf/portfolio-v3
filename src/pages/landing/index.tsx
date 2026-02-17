import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import data from "../../data";
import { useTheme } from "../../theme/useTheme";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

const LandingPage = () => {
  const { t } = useTheme();

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
      minHeight: "90vh",
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
              height: "150px",
              width: "200px",
              objectFit: "contain" as const,
              padding: "24px 36px",
              background: "white",
              borderTop: `solid 6px ${t.accent + (key % 2 !== 0 ? "50" : "")}`,
              borderRight: `solid 6px ${t.accent + (key % 2 === 0 ? "50" : "")}`,
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
      <NavBar />
      <div style={baseStyles.section}>{heroSection}</div>
      <div style={baseStyles.section}>{clientsSection}</div>
      <div style={baseStyles.section}>{skillsSection}</div>
      <div style={baseStyles.section}>{projectsSection}</div>
      <Footer />
    </div>
  );
};

export default LandingPage;
