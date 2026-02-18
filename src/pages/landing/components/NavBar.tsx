import { ThemeSwitcher } from "../../../theme/Components";
import { useTheme } from "../../../theme/useTheme";

const NAV_BUTTONS = [
  { title: "Home", hash: "home" },
  { title: "About", hash: "about" },
  { title: "Stack", hash: "skills" },
  { title: "Clients", hash: "clients" },
  { title: "Services", hash: "services" },
  { title: "Journey", hash: "experience" },
  { title: "Projects", hash: "projects" },
  { title: "Contact", hash: "Contact" },
];

export const NavBar = () => {
  const { t } = useTheme();
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "70px",
        padding: "0px 70px",
        zIndex: 1000,
        border: "none",
        backgroundColor: t.bg,
        boxShadow: `0 0px 1px ${t.bg}77`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "65px",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            flex: "1",
          }}
        >
          {NAV_BUTTONS.map((x) => (
            <button
              onClick={() => {
                window.location.hash = x.hash;
              }}
              style={{
                padding: "2px 0px",
                cursor: "pointer",
                transition: "color 0.1s ease",
                fontSize: "0.8rem",
                backgroundColor: "transparent",
                border: "none",
                color: t.text,
                fontWeight: "550",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.text;
              }}
            >
              {x.title}
            </button>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
