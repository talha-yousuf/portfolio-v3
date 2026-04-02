import { useState } from "react";
import { NAV_BUTTONS } from "../../../data/nav";
import { useTheme } from "../../../utils/useTheme";

export default function NavMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTheme();

  return (
    <div
      style={{
        position: "relative",
        width: "36px",
        height: "36px",
      }}
    >
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          cursor: "pointer",
          position: "absolute",
          zIndex: 1009,
          left: 0,
          transition: "all 0.3s ease",
          padding: "4px",
          borderRadius: "100%",
          background: isOpen ? t.accent : "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            transition: "all 0.3s ease",
            transform: isOpen ? "translateY(-3.5px)" : "none",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "2px",
              background: isOpen ? t.bg : t.text,
              transition: "all 0.3s ease",
              transform: isOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <div
            style={{
              width: "24px",
              height: "2px",
              background: isOpen ? t.bg : t.text,
              transition: "all 0.3s ease",
              transform: isOpen ? "rotate(-45deg)" : "none",
            }}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: t.bg + "90",
          zIndex: 1007,
          display: isOpen ? "block" : "none",
          pointerEvents: isOpen ? "all" : "none",
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Slide-in Panel */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "70%",
          background: t.bg,
          zIndex: 1008,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 48px",
        }}
      >
        {/* Nav Items */}
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {Object.values(NAV_BUTTONS).map((item, i) => (
            <li
              key={item.hash}
              style={{
                marginBottom: "32px",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateX(0)" : "translateX(20px)",
                transition: `opacity 0.4s ease ${0.1 + i * 0.05}s, transform 0.4s ease ${0.1 + i * 0.05}s`,
              }}
            >
              <a
                href={"#" + item.hash}
                onClick={() => setIsOpen(false)}
                style={{
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "28px",
                    fontWeight: "300",
                    color: t.text,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    borderBottom: "1px solid",
                    borderColor: t.text + "33",
                    paddingBottom: "20px",
                  }}
                >
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
