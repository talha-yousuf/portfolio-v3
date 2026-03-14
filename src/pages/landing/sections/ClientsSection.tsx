import { useTheme } from "../../../theme/useTheme";
import portFolioData from "../../../data";
import { useState } from "react";

const LANE_A = portFolioData.clientCompanies.slice(
  0,
  Math.ceil(portFolioData.clientCompanies.length / 2),
);
const LANE_B = portFolioData.clientCompanies.slice(
  Math.ceil(portFolioData.clientCompanies.length / 2),
);

export default function ClientsSection() {
  return (
    <section
      style={{
        width: "100%",
        padding: "80px 0",
        overflow: "hidden",
      }}
    >
      {/* lane 1 — scrolls left */}
      <MarqueeLane items={LANE_A} direction="left" duration={28} />

      <div
        style={{
          height: "12px",
        }}
      />

      {/* lane 2 — scrolls right */}
      <MarqueeLane items={LANE_B} direction="right" duration={24} />
    </section>
  );
}

function MarqueeLane({
  items,
  direction,
  duration,
}: {
  items: typeof portFolioData.clientCompanies;
  direction: "left" | "right";
  duration: number;
}) {
  const { t } = useTheme();

  const doubled = [...items, ...items];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* fade edges */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "140px",
          background: `linear-gradient(to right, ${t.bg}, transparent)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "140px",
          background: `linear-gradient(to left, ${t.bg}, transparent)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* scrolling track */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          width: "max-content",
          animationName: direction === "left" ? "scrollLeft" : "scrollRight",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {doubled.map((client, i) => (
          <LogoCell key={`${client.title}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

function LogoCell({
  client,
}: {
  client: (typeof portFolioData.clientCompanies)[0];
}) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <img
      src={client.thumbnailUrl}
      alt={client.title}
      title={client.title}
      style={{
        height: "130px",
        width: "200px",
        objectFit: "contain",
        transition: "all 0.2s",
        display: "block",
        background: "white",
        ...(hover
          ? {
              padding: "20px 32px",
              opacity: 1,
              filter: "grayscale(0)",
            }
          : {
              padding: "24px 36px",
              opacity: 0.7,
              filter: "grayscale(1)",
            }),
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    />
  );
}
