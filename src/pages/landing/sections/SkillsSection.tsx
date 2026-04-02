import { useTheme } from "../../../utils/useTheme";
import portFolioData, { type PortfolioDataType } from "../../../data";
import { useState } from "react";

type RowConfig = {
  direction: "left" | "right";
  speed: number; // seconds for one full cycle
};

const DEFAULT_ROWS: RowConfig[] = [
  { direction: "left", speed: 25 },
  { direction: "left", speed: 35 },
  { direction: "left", speed: 30 },
];

function chunkSkills(
  skills: PortfolioDataType["skillsAndTechForWebpage"],
  numRows: number,
): PortfolioDataType["skillsAndTechForWebpage"][] {
  const chunkSize = Math.ceil(skills.length / numRows);
  return Array.from({ length: numRows }, (_, i) =>
    skills.slice(i * chunkSize, (i + 1) * chunkSize),
  );
}

export default function SkillsSection({
  rows = DEFAULT_ROWS,
}: {
  rows?: RowConfig[];
}) {
  const skills = portFolioData.skillsAndTechForWebpage;
  const chunks = chunkSkills(skills, rows.length);

  return (
    <section style={{ width: "100%", padding: "80px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {rows.map((rowConfig, i) => (
          <SkillRow key={i} skills={chunks[i] ?? []} config={rowConfig} />
        ))}
      </div>
    </section>
  );
}

function SkillRow({
  skills,
  config,
}: {
  skills: PortfolioDataType["skillsAndTechForWebpage"];
  config: RowConfig;
}) {
  const { t } = useTheme();
  const doubled = [...skills, ...skills];

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {/* fade edges */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "100px",
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
          width: "100px",
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
          animationName:
            config.direction === "left" ? "scrollLeft" : "scrollRight",
          animationDuration: `${config.speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {doubled.map((skill, i) => (
          <SkillTile key={`${skill.title}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

function SkillTile({
  skill,
}: {
  skill: PortfolioDataType["skillsAndTechForWebpage"][0];
}) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: "40px",
        padding: "0px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        border: hover ? "0px solid transparent" : `5px solid transparent`,
        transition: "all 0.25s ease",
        borderColor: "transparent",
        overflow: "hidden",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      <img
        src={skill.thumbnailUrl}
        alt={skill.title}
        style={{
          height: hover ? "45px" : "40px",
          display: "block",
          opacity: hover ? 1 : 0.8,
          transition: "all 0.3s ease",
        }}
      />
    </div>
  );
}
