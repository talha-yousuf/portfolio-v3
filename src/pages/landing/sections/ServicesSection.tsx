import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../theme/useTheme";
import portFolioData, { type PortfolioDataType } from "../../../data";

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setVisible(true);
            });
          });
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {portFolioData.service.map((service, i) => (
          <TerminalCard
            key={service.title}
            index={i}
            service={service}
            visible={visible}
          />
        ))}
      </div>
    </section>
  );
}

function TerminalCard({
  index,
  service,
  visible,
}: {
  index: number;
  service: PortfolioDataType["service"][0];
  visible: boolean;
}) {
  const { t } = useTheme();

  const filename = `0${index + 1}_${service.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")}.sh`;

  const animationDelay = `${0.05 + index * 0.2}s`;

  return (
    <div
      style={{
        flex: "1 1 calc(50% - 8px)",
        minWidth: "320px",
        border: `1px solid ${t.accent}22`,
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: t.bgSecondary,
        boxShadow: t.shadow,
        opacity: 0,
        ...(visible && {
          animationName: "terminalOpen",
          animationDuration: "0.75s",
          animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          animationDelay,
          animationFillMode: "forwards",
          animationIterationCount: 1,
        }),
      }}
    >
      {/* title bar */}
      <div
        style={{
          backgroundColor: t.bg,
          padding: "11px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: `1px solid ${t.accent}22`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          {["#c0392b", "#c8a96e", "#27ae60"].map((color, di) => (
            <div
              key={di}
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                backgroundColor: color + "55",
              }}
            />
          ))}
        </div>

        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            color: t.text + "44",
            letterSpacing: "0.05em",
            marginRight: "29px",
          }}
        >
          {filename}
        </span>
      </div>

      {/* terminal body */}
      <div
        style={{
          padding: "22px 20px 28px",
          flex: 1,
          backgroundColor: t.bgSecondary,
        }}
      >
        {/* prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "12px",
              color: t.accent,
            }}
          >
            →
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "12px",
              color: t.text,
            }}
          >
            ls ./{service.title.toLowerCase().replace(/\s+/g, "-")}/
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "12px",
                backgroundColor: t.accent,
                marginLeft: "3px",
                verticalAlign: "middle",
                animationName: "blink",
                animationDuration: "1.1s",
                animationTimingFunction: "step-end",
                animationIterationCount: "infinite",
              }}
            />
          </span>
        </div>

        {/* output label */}
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "10px",
            color: t.text + "30",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "14px 0 12px",
          }}
        >
          // output
        </div>

        {/* pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {sortBulletsForLayout(service.bullets).map((bullet) => (
            <Pill key={bullet} label={bullet} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Pill({ label }: { label: string }) {
  const { t } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: t.bg,
        border: `1px solid ${hovered ? t.accent : t.accent + "22"}`,
        borderRadius: "100px",
        padding: "6px 12px",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "11px",
        color: hovered ? t.accent : t.accent + "85",
        lineHeight: "1.4",
        cursor: "default",
        transition: "border-color 0.18s, color 0.18s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function sortBulletsForLayout(bullets: string[]): string[] {
  const sorted = [...bullets].sort((a, b) => a.length - b.length);
  const result: string[] = [];
  let lo = 0;
  let hi = sorted.length - 1;
  while (lo <= hi) {
    if (lo === hi) {
      result.push(sorted[lo++]);
    } else {
      result.push(sorted[lo++], sorted[hi--]);
    }
  }
  return result;
}
