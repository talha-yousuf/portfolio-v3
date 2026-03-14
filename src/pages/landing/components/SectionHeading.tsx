import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../theme/useTheme";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
  const { t } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <h2
        style={{
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          margin: 0,
          color: t.text,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>

      {/* animated line */}
      <div
        style={{
          height: 2,
          width: visible ? "60px" : "0px",
          background: t.accent,
          borderRadius: 99,
          transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {subtitle && (
        <p
          style={{
            color: t.text,
            opacity: 0.45,
            fontSize: "0.95rem",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 420,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
