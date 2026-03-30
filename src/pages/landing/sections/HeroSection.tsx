import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import portFolioData from "../../../data";
import { useTheme } from "../../../theme/useTheme";
import { useEffect, useState } from "react";
import { NAV_BUTTONS } from "../../../data/nav";
import BgAnimation from "../bgAnimation";

const a = (color: string, pct: number) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;

const HeroSection = () => {
  const { t } = useTheme();

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: "160px 40px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <BgAnimation type={0} />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          animation: "fadeUp 0.7s ease both",
        }}
      >
        <ProfilePic />

        <h1
          style={{
            fontSize: "clamp(2.8rem, 4vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
            color: t.text,
          }}
        >
          {portFolioData.personalInfo.name.split(" ")[0] + " "}
          <span style={{ color: t.accent }}>
            {portFolioData.personalInfo.name.split(" ")[1]}
          </span>
        </h1>

        <div
          style={{
            display: "flex",
            gap: 32,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            fontSize: "1.2rem",
            color: t.text,
            opacity: 0.8,
            fontWeight: "bold",
          }}
        >
          <span>{portFolioData.personalInfo.title}</span>
          <span style={{ color: t.accent }}>{"//"}</span>
          <span>
            {String(
              new Date().getFullYear() - portFolioData.stats.careerStartYear,
            )}
            {" years of experience"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {(
            [
              {
                icon: <Github size={16} />,
                label: "GitHub",
                href: portFolioData.personalInfo.github,
                isExt: true,
              },
              {
                icon: <Linkedin size={16} />,
                label: "LinkedIn",
                href: portFolioData.personalInfo.linkedin,
                isExt: true,
              },
              {
                icon: <Mail size={16} />,
                label: "Email",
                href: "#" + NAV_BUTTONS.contact.hash,
                isExt: false,
              },
            ] as const
          ).map(({ icon, label, href, isExt }) => (
            <a
              target={isExt ? "_blank" : ""}
              href={href}
              key={label}
              title={label}
              style={{
                width: 40,
                height: 40,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                background: "transparent",
                border: `1px solid ${a(t.text, 18)}`,
                color: t.text,
                cursor: "pointer",
              }}
            >
              {icon}
            </a>
          ))}

          <a
            href={"#" + NAV_BUTTONS.projects.hash}
            style={{
              padding: "11px 20px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 8,
              background: "transparent",
              border: `1px solid ${a(t.text, 18)}`,
              color: t.text,
              textDecoration: "none",
            }}
          >
            {"View My Work"}
            <ArrowDown size={15} />
          </a>

          <a
            target="_blank"
            href="/resume"
            style={{
              padding: "11px 20px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "none",
              borderRadius: 8,
              background: t.accent,
              color: t.text,
              textDecoration: "none",
            }}
          >
            {"Resume "}
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* ── BOTTOM CTAs ── */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          animation: "fadeUp 0.7s 0.28s ease both",
        }}
      >
        <a
          href={"#" + NAV_BUTTONS.stack.hash}
          style={{
            width: 40,
            height: 40,
            background: "transparent",
            color: t.text,
            borderRadius: 8,
            border: `1px solid ${a(t.text, 18)}`,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 1,
            animation: "scrollPrompt 1.6s ease-in-out infinite",
          }}
        >
          <ChevronDown size={16} />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;

const ProfilePic = () => {
  const { t } = useTheme();

  const src = portFolioData.personalInfo.profileImageUrl;

  const [cachedSrc, setCachedSrc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    let objectUrl: string;

    if (src) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCachedSrc("");
      setLoading(true);
      setError(false);

      setTimeout(() => {
        fetch(src)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch");
            }

            return res.blob();
          })
          .then((blob) => {
            if (!blob.type.startsWith("image/")) {
              throw new Error("Failed to fetch");
            }

            objectUrl = URL.createObjectURL(blob);

            setCachedSrc(objectUrl);
            setLoading(false);
            setError(false);
          })
          .catch(() => {
            setCachedSrc("");
            setLoading(false);
            setError(true);
          });
      }, 1000);
    } else {
      setCachedSrc("");
      setLoading(false);
      setError(true);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer static ring */}
      {/* <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          border: `1px solid ${a(t.accent, 18)}`,
          animation: "spin 36s linear infinite",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: t.accent,
            boxShadow: `0 0 10px ${t.accent}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -4,
            right: "50%",
            transform: "translateX(-70%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: t.accent,
            boxShadow: `0 0 10px ${t.accent}`,
          }}
        />
      </div> */}

      {/* Inner spinning dashed ring */}
      {/* <div
        style={{
          position: "absolute",
          width: 226,
          height: 226,
          borderRadius: "50%",
          border: `1px dashed ${a(t.accent, 28)}`,
          animation: "spin 28s linear infinite",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: t.accent,
            boxShadow: `0 0 10px ${t.accent}`,
          }}
        />
      </div> */}

      {/* Glow pooling beneath card */}
      {/* <div
        style={{
          position: "absolute",
          bottom: -30,
          left: "50%",
          transform: "translateX(-50%)",
          width: 150,
          height: 50,
          borderRadius: "50%",
          background: t.accent,
          filter: "blur(32px)",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      /> */}

      {/* Photo card */}
      <div
        style={{
          position: "relative",
          width: 150,
          height: 150,
          borderRadius: "100%",
          overflow: "hidden",
          border: `2px solid ${a(t.accent, 35)}`,
          boxShadow: `0 0 0 5px ${a(t.accent, 7)}, 0 20px 52px rgba(0,0,0,0.45)`,
          background: t.accent,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && !error && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${t.bgSecondary} 0%, ${t.accent}18 50%, ${t.bgSecondary} 100%)`,
              backgroundSize: "200% 200%",
              animation: "pulse 1s ease infinite",
              filter: "url(#noise)",
            }}
          >
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <filter id="noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.75"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
                <feBlend in="SourceGraphic" mode="overlay" result="blend" />
                <feComposite in="blend" in2="SourceGraphic" operator="in" />
              </filter>
            </svg>
          </div>
        )}

        {!loading && !error && (
          <>
            <img
              src={cachedSrc}
              alt="Profile"
              style={{
                width: "98%",
                height: "98%",
                borderRadius: "100%",
                objectFit: "cover",
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.4s ease",
                display: "block",
                // borderRadius: 0.95 * 14,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  borderRadius: "100%",
                  width: "98%",
                  height: "98%",
                  background:
                    "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
                  opacity: hovered ? 0 : 1,
                  transition: "opacity 0.8s ease",
                  pointerEvents: "none",
                }}
              />
            </div>
          </>
        )}

        {error && <ProfilePicPlaceHolder />}

        {/* Gradient sheen at bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `linear-gradient(to bottom, transparent 60%, ${a(t.accent, 30)} 100%)`,
          }}
        />
      </div>
    </div>
  );
};

const ProfilePicPlaceHolder = () => {
  const initials = portFolioData.personalInfo.name
    .split(" ")
    .map((x: string) => x.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <svg
      width="100%"
      height={"100%"}
      viewBox="0 0 240 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b2fff" />
          <stop offset="40%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <clipPath id="cardClip">
          <rect width="240" height="280" rx="16" />
        </clipPath>
      </defs>

      {/* background */}
      <rect width="240" height="280" rx="16" fill="url(#bgGrad)" />

      {/* subtle overlay shapes */}
      <g clipPath="url(#cardClip)" opacity="0.2">
        <rect
          x="18"
          y="28"
          width="20"
          height="20"
          rx="3"
          stroke="white"
          strokeWidth="2"
          transform="rotate(15 18 28)"
        />
        <rect
          x="190"
          y="60"
          width="18"
          height="18"
          rx="3"
          stroke="white"
          strokeWidth="2"
          transform="rotate(30 190 60)"
        />
        <circle cx="28" cy="170" r="7" stroke="white" strokeWidth="2" />
        <circle cx="210" cy="200" r="5" stroke="white" strokeWidth="2" />
        {/* plus signs */}
        <path d="M185 35 h4 v-4 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4z" fill="white" />
        <path d="M20 230 h4 v-4 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4z" fill="white" />
      </g>

      {/* head */}
      <ellipse cx="120" cy="110" rx="60" ry="60" fill="rgba(0,0,0,0.45)" />

      {/* body/shoulders */}
      <path
        d="M30 280 C30 220 60 190 120 185 C180 190 210 220 210 280Z"
        fill="rgba(0,0,0,0.5)"
      />

      {/* initials */}
      <text
        x="120"
        y="130"
        textAnchor="middle"
        fontFamily="Outfit, sans-serif"
        fontWeight="900"
        fontSize="48"
        fill="rgba(255,255,255,0.15)"
        letterSpacing="-2"
      >
        {initials}
      </text>
    </svg>
  );
};
