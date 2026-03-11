import portFolioData from "../../data";
import { useTheme } from "../../theme/useTheme";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import HeroSection from "./components/HeroSection";

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
      height: "100vh",
      width: "100%",
      overflow: "hidden",
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
        {portFolioData.clientCompanies.map((x, key) => (
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
        {portFolioData.skillsAndTechForWebpage.map((x, key) => (
          <img key={key} src={x.thumbnailUrl} style={{ height: "50px" }} />
        ))}
      </div>
    </div>
  );

  const projectsSection = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center ",
        flexWrap: "wrap",
        width: "80vw",
        gap: "14px",
      }}
    >
      {portFolioData.projects
        .sort((a, b) => a.order - b.order)
        .map((x) => (
          <div
            key={x.folderName}
            style={{
              minWidth: "300px",
              maxWidth: "400px",
              height: "620px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center ",
            }}
          >
            <ProjectCard project={x} />
          </div>
        ))}
    </div>
  );

  return (
    <div style={baseStyles.container}>
      <NavBar />
      <div style={baseStyles.section}>
        <HeroSection />
      </div>
      <div style={baseStyles.section}>{clientsSection}</div>
      <div style={baseStyles.section}>{skillsSection}</div>
      <div style={baseStyles.section}>{projectsSection}</div>
      <Footer />
    </div>
  );
};

export default LandingPage;
