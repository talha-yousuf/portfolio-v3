import { useState } from "react";
import { Github, Linkedin, Copy, Check, ArrowRight } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import portFolioData from "../../../data";
import { useScreenSize } from "../../../utils/useScreenSize";

const a = (color: string, pct: number) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;

const ContactSection = () => {
  const { t } = useTheme();
  const { isMobile } = useScreenSize();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(portFolioData.personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        width: "100%",
        height: isMobile ? "auto" : "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
      }}
    >
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "fadeUp 0.6s 0.1s ease both",
            borderRadius: 8,
            border: `1px solid ${a(t.text, 18)}`,
            height: 60,
            padding: "10px 18px",
            background: t.bgSecondary,
          }}
        >
          <a
            href={"mailto:" + portFolioData.personalInfo.email}
            style={{
              color: t.accent,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            {portFolioData.personalInfo.email}
          </a>
          <button
            onClick={handleCopy}
            title="Copy email"
            style={{
              background: copied ? a(t.accent, 15) : "transparent",
              border: `1px solid ${a(t.text, 15)}`,
              borderRadius: 6,
              width: 30,
              height: 30,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: copied ? t.accent : t.text,
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "fadeUp 0.6s 0.2s ease both",
          }}
        >
          {[
            {
              icon: <Github size={16} />,
              href: portFolioData.personalInfo.github,
              label: "GitHub",
            },
            {
              icon: <Linkedin size={16} />,
              href: portFolioData.personalInfo.linkedin,
              label: "LinkedIn",
            },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              title={label}
              style={{
                width: 40,
                height: 40,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                border: `1px solid ${a(t.text, 18)}`,
                color: t.text,
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = a(t.accent, 50);
                e.currentTarget.style.color = t.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = a(t.text, 18);
                e.currentTarget.style.color = t.text;
              }}
            >
              {icon}
            </a>
          ))}

          <a
            href="/resume"
            target="_blank"
            style={{
              padding: "10px 18px",
              fontWeight: 600,
              fontSize: "0.88rem",
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
            View Resume <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${a(t.text, 10)}`,
          width: "100%",
          paddingTop: 12,
          textAlign: "center",
          color: t.text + "77",
          opacity: 0.3,
          fontSize: "0.8rem",
          animation: "fadeUp 0.6s 0.3s ease both",
        }}
      >
        {portFolioData.personalInfo.name} &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default ContactSection;
