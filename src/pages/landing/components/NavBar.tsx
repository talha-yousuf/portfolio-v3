import { useEffect, useState } from "react";
import { ThemeSwitcher } from "../../../theme/Components";
import { useTheme } from "../../../theme/useTheme";
import { NAV_BUTTONS } from "../../../data/nav";
import { ChevronUp } from "lucide-react";

export const NavBar = () => {
  const { t } = useTheme();

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
          height: "70px",
          padding: "0px 70px",
          zIndex: 1000,
          border: "none",
          backgroundColor: t.bg,
          boxShadow: scrolled ? `0 2px 12px ${t.text}33` : "none",
          transition: "all 1s ease",
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
      <div
        style={{
          position: "fixed",
          left: 50,
          transition: "all 0.6s ease-in-out",
          ...(scrolled ? { bottom: 60 } : { bottom: -60 }),
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
          }}
        >
          <ChevronUp size={16} />
        </button>
      </div>
    </>
  );
};
