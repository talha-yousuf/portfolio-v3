import portFolioData from "../../data";
import { useTheme } from "../../theme/useTheme";
import { NAV_BUTTONS } from "../../data/nav";
import NavBar from "./components/NavBar";
import SectionHeading from "./components/SectionHeading";
import ProjectCard from "./components/ProjectCard";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import ContactSection from "./sections/ContactSection";

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
    sectionContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "60px",
      width: "80vw",
      padding: "100px 0px",
    },
  } satisfies Record<string, React.CSSProperties>;

  return (
    <div style={baseStyles.container}>
      <NavBar />

      <div style={baseStyles.section} id={NAV_BUTTONS.home.hash}>
        <HeroSection />
      </div>

      <div style={baseStyles.section} id={NAV_BUTTONS.stack.hash}>
        <div style={baseStyles.sectionContainer}>
          <SectionHeading
            title="Stack"
            subtitle="Tools and technologies I worked with daily."
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
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
      </div>

      <div style={baseStyles.section} id={NAV_BUTTONS.services.hash}>
        <div style={baseStyles.sectionContainer}>
          <SectionHeading title="Services" />
          <ServicesSection />
        </div>
      </div>

      <div style={baseStyles.section} id={NAV_BUTTONS.clients.hash}>
        <div style={baseStyles.sectionContainer}>
          <SectionHeading
            title="Clients"
            subtitle="Companies and clients I have worked for over the years."
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
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
                  border: `solid 6px ${t.bg}`,
                  borderTopLeftRadius: "50px",
                  borderBottomRightRadius: "50px",
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={baseStyles.section} id={NAV_BUTTONS.projects.hash}>
        <div style={baseStyles.sectionContainer}>
          <SectionHeading
            title="Projects"
            subtitle="Explore some of my engineering projects and technical work."
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center ",
              flexWrap: "wrap",
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
        </div>
      </div>

      <div style={baseStyles.section} id={NAV_BUTTONS.contact.hash}>
        <ContactSection />
      </div>
    </div>
  );
};

export default LandingPage;
