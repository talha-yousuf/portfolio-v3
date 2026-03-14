import { useState } from "react";
import { Github, Linkedin, Mail, Copy, Check, ArrowRight } from "lucide-react";
import { useTheme } from "../../../theme/useTheme";
import portFolioData from "../../../data";

const a = (color: string, pct: number) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;

const ContactSection = () => {
  const { t } = useTheme();
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* bg orb */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${a(t.accent, 8)} 0%, transparent 70%)`,
          filter: "blur(80px)",
          bottom: -100,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      {/* heading */}
      <div style={{ textAlign: "center", animation: "fadeUp 0.6s ease both" }}>
        <p
          style={{
            color: t.accent,
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: "0 0 12px",
            opacity: 0.8,
          }}
        >
          Let's Work Together
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: "0 0 16px",
            color: t.text,
            lineHeight: 1.1,
          }}
        >
          Get in Touch
        </h2>
        <p
          style={{
            color: t.text,
            opacity: 0.45,
            fontSize: "0.95rem",
            lineHeight: 1.7,
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          Interested in working together or have a question?
          <br />
          Feel free to reach out!
        </p>
      </div>

      {/* email row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          animation: "fadeUp 0.6s 0.1s ease both",
        }}
      >
        <p
          style={{
            color: t.text,
            opacity: 0.4,
            fontSize: "0.8rem",
            margin: 0,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Contact me directly:
        </p>
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

      {/* social + resume */}
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
          {
            icon: <Mail size={16} />,
            href: "mailto:" + portFolioData.personalInfo.email,
            label: "Email",
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

      {/* footer line */}
      <div
        style={{
          borderTop: `1px solid ${a(t.text, 10)}`,
          width: "100%",
          maxWidth: 600,
          paddingTop: 24,
          textAlign: "center",
          color: t.text,
          opacity: 0.3,
          fontSize: "0.8rem",
          animation: "fadeUp 0.6s 0.3s ease both",
        }}
      >
        {portFolioData.personalInfo.name} &copy; {new Date().getFullYear()}{" "}
        &mdash; Thanks for stopping by! 👋
      </div>
    </div>
  );
};

export default ContactSection;
