import { useTheme } from "../../utils/useTheme";
import { NAV_BUTTONS } from "../../data/nav";
import NavBar from "./components/NavBar";
import SectionHeading from "./components/SectionHeading";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import ContactSection from "./sections/ContactSection";
import ClientsSection from "./sections/ClientsSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import SplashScreen from "./sections/SplashScreen";

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
    <SplashScreen>
      <div style={baseStyles.container}>
        <NavBar />

        <div style={baseStyles.section} id={NAV_BUTTONS.home.hash}>
          <HeroSection />
        </div>

        <div style={baseStyles.section} id={NAV_BUTTONS.stack.hash}>
          <div style={baseStyles.sectionContainer}>
            <SectionHeading
              title={NAV_BUTTONS.stack.title}
              subtitle={NAV_BUTTONS.stack.subtitle}
            />

            <SkillsSection />
          </div>
        </div>

        <div style={baseStyles.section} id={NAV_BUTTONS.services.hash}>
          <div style={baseStyles.sectionContainer}>
            <SectionHeading title={NAV_BUTTONS.services.title} />

            <ServicesSection />
          </div>
        </div>

        <div style={baseStyles.section} id={NAV_BUTTONS.clients.hash}>
          <div style={baseStyles.sectionContainer}>
            <SectionHeading
              title={NAV_BUTTONS.clients.title}
              subtitle={NAV_BUTTONS.clients.subtitle}
            />
            <ClientsSection />
          </div>
        </div>

        <div style={baseStyles.section} id={NAV_BUTTONS.projects.hash}>
          <div style={baseStyles.sectionContainer}>
            <SectionHeading
              title={NAV_BUTTONS.projects.title}
              subtitle={NAV_BUTTONS.projects.subtitle}
            />

            <ProjectsSection />
          </div>
        </div>

        <div style={baseStyles.section} id={NAV_BUTTONS.contact.hash}>
          <div style={baseStyles.sectionContainer}>
            <SectionHeading
              title={NAV_BUTTONS.contact.title}
              subtitle={NAV_BUTTONS.contact.subtitle}
            />

            <ContactSection />
          </div>
        </div>
      </div>
    </SplashScreen>
  );
};

export default LandingPage;
