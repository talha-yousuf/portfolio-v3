import { useEffect, useState } from "react";
import { useTheme } from "../../../utils/useTheme";
import { NAV_BUTTONS } from "../../../data/nav";
import { ChevronUp } from "lucide-react";
import NavMobileMenu from "./NavMobileMenu";
import { useScreenSize } from "../../../utils/useScreenSize";

const NavBar = () => {
  const { t } = useTheme();
  const { isDesktop } = useScreenSize();

  const [currentHovered, setCurrentHovered] = useState<string>("");

  const [currentHash, setCurrentHash] = useState<string>(() =>
    window.location.hash.slice(1),
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const sections = Object.entries(NAV_BUTTONS).map((x) => x[1].hash);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentHash(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "60px",
          padding: isDesktop ? "0px 120px" : "0px 30px",
          zIndex: 1000,
          border: "none",
          background: t.bg + "50",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          // boxShadow: scrolled ? `0 2px 12px ${t.text}33` : "none",
          transition: "all 1s ease",
          display: "flex",
          alignItems: "center",
          animation: "fadeDown 0.5s 1s ease both",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {!isDesktop ? <NavMobileMenu /> : <div />}

          {isDesktop && (
            <div
              style={{
                display: "flex",
                gap: "65px",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {Object.keys(NAV_BUTTONS).map((key) => {
                return (
                  <button
                    key={key}
                    onClick={() => {
                      window.location.hash = key;
                    }}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      borderTopLeftRadius: "0px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      textDecoration: "none",
                      transition:
                        "background-color 0.25s ease, color 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), font-weight 0.25s ease",
                      transformOrigin: "center center",
                      lineHeight: 1.4,
                      whiteSpace: "nowrap",
                      willChange: "transform",
                      fontWeight: 550,
                      ...(currentHash === key
                        ? {
                            color: t.bg,
                            backgroundColor: t.accent,
                          }
                        : currentHovered === key
                          ? {
                              color: t.text,
                              backgroundColor: "transparent",
                            }
                          : {
                              color: t.text + "77",
                              backgroundColor: "transparent",
                            }),
                    }}
                    onMouseEnter={() => {
                      setCurrentHovered(key);
                    }}
                    onMouseLeave={() => {
                      setCurrentHovered("");
                    }}
                  >
                    {NAV_BUTTONS[key as keyof typeof NAV_BUTTONS].title}
                  </button>
                );
              })}
            </div>
          )}

          <ThemeSwitcher />
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          transition: "all 0.6s ease-in-out",
          ...(scrolled ? { bottom: 40 } : { bottom: -40 }),
          ...(isDesktop
            ? { left: 40 }
            : { left: "50%", transform: "translateX(-50%)" }),
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            width: 40,
            height: 40,
            background: t.accent,
            color: t.bg,
            border: "none",
            borderRadius: "100%",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: t.shadow,
          }}
        >
          <ChevronUp size={16} />
        </button>
      </div>
    </>
  );
};

export default NavBar;

const ThemeSwitcher = () => {
  const { t, toggleTheme } = useTheme();
  const Icon = t.icon;

  return (
    <button
      onClick={toggleTheme}
      title={t.name}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: t.accent,
        color: t.bg,
        // boxShadow: `0 6px 36px ${t.accent}77`,
        transition: "0.1s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.width = "40px";
        e.currentTarget.style.height = "40px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.width = "36px";
        e.currentTarget.style.height = "36px";
      }}
    >
      <Icon size={18} />
    </button>
  );
};
