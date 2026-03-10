import { useTheme } from "../../../theme/useTheme";
import portFolioData from "../../../data";

export const Footer = () => {
  const { t } = useTheme();
  return (
    <footer
      style={{
        height: "10vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        color: t.text,
        fontSize: "14px",
        background: t.bgSecondary,
        width: "100%",
      }}
    >
      <p>Thanks for stopping by! 👋</p>
      <p>
        <a
          href={"mailto:" + portFolioData.personalInfo.email}
          style={{
            color: t.accent,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {portFolioData.personalInfo.email}
        </a>
        {" | "}
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};
