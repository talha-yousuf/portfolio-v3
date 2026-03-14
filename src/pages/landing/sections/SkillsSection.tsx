import portFolioData from "../../../data";

const SkillsSection = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      {portFolioData.skillsAndTechForWebpage.map((x, key) => (
        <img key={key} src={x.thumbnailUrl} style={{ height: "50px" }} />
      ))}
    </div>
  );
};

export default SkillsSection;
