import portFolioData from "../../data";
import { useTheme } from "../../theme/useTheme";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import HeroSection from "./components/HeroSection";
import { NAV_BUTTONS } from "../../data/nav";

const LandingPage = () => {
  const { t } = useTheme();

  const baseStyles = {
    container: {
      backgroundColor: t.bg,
      color: t.text,
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
      minHeight: "100vh",
      width: "100%",
    },
  } satisfies Record<string, React.CSSProperties>;

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

      <div style={baseStyles.section} id={NAV_BUTTONS.home.hash}>
        <HeroSection />
      </div>

      <div style={baseStyles.section} id={NAV_BUTTONS.stack.hash}>
        {skillsSection}
      </div>

      <div style={baseStyles.section} id={NAV_BUTTONS.clients.hash}>
        {clientsSection}
      </div>

      <div style={baseStyles.section} id={NAV_BUTTONS.projects.hash}>
        {projectsSection}
      </div>

      <div style={baseStyles.section} id={NAV_BUTTONS.contact.hash}>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
