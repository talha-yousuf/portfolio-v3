import portFolioData from "../../../data";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsSection() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center ",
        flexWrap: "wrap",
        gap: "14px",
      }}
    >
      {portFolioData.projects
        .sort((a, b) => a.order - b.order)
        .map((x) => (
          <div
            key={x.folderName}
            style={{
              minWidth: "300px",
              maxWidth: "400px",
              height: "620px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center ",
            }}
          >
            <ProjectCard project={x} />
          </div>
        ))}
    </div>
  );
}
